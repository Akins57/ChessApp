"""
setup_puzzles.py — Download and process Lichess puzzle database + Stockfish engine

Usage:
  python setup_puzzles.py

Requirements:
  pip install zstandard

What it does:
  1. Streams the Lichess puzzle CSV (compressed, ~400 MB download)
  2. Filters puzzles by theme and rating range
  3. Writes data/puzzles.js (used by the Chess Trainer app)
  4. Downloads Stockfish engine (js/lib/stockfish.js, ~3.5 MB)
     used by the My Mistakes analysis module

Settings you can change:
  PUZZLES_PER_THEME  — how many puzzles to collect per theme (default 150)
  MIN_RATING         — minimum puzzle rating (default 800)
  MAX_RATING         — maximum puzzle rating (default 2200)
"""

import csv
import io
import json
import os
import sys
import urllib.request

# ── Settings ──────────────────────────────────────────────────────────────────
PUZZLES_PER_THEME = 150
MIN_RATING        = 800
MAX_RATING        = 2200

LICHESS_URL   = "https://database.lichess.org/lichess_db_puzzle.csv.zst"
OUT_PATH      = os.path.join(os.path.dirname(__file__), "data", "puzzles.js")
STOCKFISH_URL = "https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/10.0.2/stockfish.js"
STOCKFISH_OUT = os.path.join(os.path.dirname(__file__), "js", "lib", "stockfish.js")

# ── Themes to collect ─────────────────────────────────────────────────────────
# Keys must match Lichess theme names in the CSV
THEMES = [
    "fork",
    "pin",
    "skewer",
    "discoveredAttack",
    "doubleCheck",
    "deflection",
    "sacrifice",
    "xRayAttack",
    "hangingPiece",
    "trappedPiece",
    "attraction",
    "interference",
    "mateIn1",
    "mateIn2",
    "mateIn3",
    "smotheredMate",
    "pawnEndgame",
    "rookEndgame",
    "queenEndgame",
    "promotion",
    "enPassant",
]

# ── Check dependency ──────────────────────────────────────────────────────────
try:
    import zstandard
except ImportError:
    print("Missing dependency. Install it with:")
    print("  pip install zstandard")
    sys.exit(1)

# ── Main ──────────────────────────────────────────────────────────────────────
def main():
    os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)

    puzzles = {theme: [] for theme in THEMES}
    done    = {theme: False for theme in THEMES}

    print(f"Downloading puzzle database from Lichess...")
    print(f"(This is ~400 MB — may take a few minutes on a slow connection)\n")

    req = urllib.request.Request(LICHESS_URL, headers={"User-Agent": "chess-trainer-personal"})

    with urllib.request.urlopen(req) as response:
        dctx   = zstandard.ZstdDecompressor()
        reader = dctx.stream_reader(response)
        text   = io.TextIOWrapper(reader, encoding="utf-8")
        csv_reader = csv.reader(text)

        # Skip header
        header = next(csv_reader)
        # Expected: PuzzleId, FEN, Moves, Rating, RatingDeviation, Popularity, NbPlays, Themes, GameUrl, OpeningTags

        total_read   = 0
        total_saved  = 0

        for row in csv_reader:
            if len(row) < 8:
                continue

            puzzle_id     = row[0]
            fen           = row[1]
            moves_str     = row[2]
            rating_str    = row[3]
            puzzle_themes = row[7].split()

            # Filter by rating
            try:
                rating = int(rating_str)
            except ValueError:
                continue
            if not (MIN_RATING <= rating <= MAX_RATING):
                continue

            moves = moves_str.split()
            if len(moves) < 2:
                continue   # need at least trigger + one player move

            total_read += 1

            # Assign to first matching theme that still needs puzzles
            for theme in THEMES:
                if done[theme]:
                    continue
                if theme in puzzle_themes and len(puzzles[theme]) < PUZZLES_PER_THEME:
                    puzzles[theme].append({
                        "id":     puzzle_id,
                        "fen":    fen,
                        "moves":  moves,
                        "rating": rating,
                    })
                    total_saved += 1
                    if len(puzzles[theme]) >= PUZZLES_PER_THEME:
                        done[theme] = True
                        collected = sum(len(v) for v in puzzles.values())
                        target    = PUZZLES_PER_THEME * len(THEMES)
                        print(f"  [{collected}/{target}] {theme} complete ({PUZZLES_PER_THEME} puzzles)")
                    break  # one puzzle goes to one theme

            # Stop early if all themes are full
            if all(done.values()):
                print("\nAll themes complete — stopping early.")
                break

            # Progress every 100k rows
            if total_read % 100_000 == 0:
                collected = sum(len(v) for v in puzzles.values())
                target    = PUZZLES_PER_THEME * len(THEMES)
                print(f"  Scanned {total_read:,} puzzles, saved {collected}/{target}...")

    # Write output as a JS file (avoids CORS issues when opening HTML directly)
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        f.write("window.PUZZLE_DATA=")
        json.dump(puzzles, f, separators=(",", ":"))
        f.write(";")

    print(f"\nDone!")
    print(f"Saved {sum(len(v) for v in puzzles.values())} puzzles to {OUT_PATH} (JS format)")
    print("\nPuzzles per theme:")
    for theme, lst in puzzles.items():
        status = "OK" if len(lst) >= PUZZLES_PER_THEME else f"only {len(lst)} found"
        print(f"  {theme:20s} {len(lst):>4}  ({status})")

    # ── Download Stockfish.js ──────────────────────────────────────────────────
    if os.path.exists(STOCKFISH_OUT):
        print(f"\nStockfish already downloaded at {STOCKFISH_OUT} — skipping.")
    else:
        print(f"\nDownloading Stockfish engine (~3.5 MB)...")
        os.makedirs(os.path.dirname(STOCKFISH_OUT), exist_ok=True)
        req2 = urllib.request.Request(STOCKFISH_URL, headers={"User-Agent": "chess-trainer-personal"})
        try:
            with urllib.request.urlopen(req2) as resp:
                data = resp.read()
            with open(STOCKFISH_OUT, "wb") as f:
                f.write(data)
            print(f"Stockfish saved to {STOCKFISH_OUT}")
        except Exception as e:
            print(f"WARNING: Could not download Stockfish: {e}")
            print("My Mistakes analysis will not work until js/lib/stockfish.js is present.")

    print("\nOpen index.html in your browser to start training!")
    print("(For chess.com game import, run: python -m http.server 8000)")


if __name__ == "__main__":
    main()
