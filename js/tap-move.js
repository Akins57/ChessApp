// ── Tap-to-move for mobile ────────────────────────────────────────────────────
// Usage (in each page's JS, after DOM ready):
//   const tapMove = createTapToMove(boardId, getGame, getBoard, onDropFn, isActiveFn);
//   Then pass tapMove.onClick as onSquareClick in the Chessboard(...) config.
//   Call tapMove.reset() whenever a new puzzle/card is loaded.

function createTapToMove(boardId, getGame, getBoard, onDropFn, isActiveFn) {
  let selected = null;

  function container() { return document.getElementById(boardId); }

  function clearHighlights() {
    const c = container();
    if (!c) return;
    c.querySelectorAll('.tap-selected, .tap-legal').forEach(function(el) {
      el.classList.remove('tap-selected', 'tap-legal');
    });
  }

  function markSquare(sq, cls) {
    const c = container();
    if (!c) return;
    const el = c.querySelector('[data-square="' + sq + '"]');
    if (el) el.classList.add(cls);
  }

  function showLegalDots(gm, sq) {
    gm.moves({ square: sq, verbose: true }).forEach(function(m) {
      markSquare(m.to, 'tap-legal');
    });
  }

  function onClick(square, piece) {
    if (isActiveFn && !isActiveFn()) return;

    const gm = getGame();
    if (!gm) return;

    // ── Nothing selected: pick a piece ───────────────────
    if (!selected) {
      const p = gm.get(square);
      if (p && p.color === gm.turn()) {
        selected = square;
        clearHighlights();
        markSquare(square, 'tap-selected');
        showLegalDots(gm, square);
      }
      return;
    }

    // ── Tap same square: deselect ─────────────────────────
    if (selected === square) {
      selected = null;
      clearHighlights();
      return;
    }

    // ── Tap another own piece: switch selection ───────────
    const p = gm.get(square);
    if (p && p.color === gm.turn()) {
      selected = square;
      clearHighlights();
      markSquare(square, 'tap-selected');
      showLegalDots(gm, square);
      return;
    }

    // ── Confirm move ──────────────────────────────────────
    const from = selected;
    selected = null;
    clearHighlights();

    onDropFn(from, square);

    // Sync board visual (replaces onSnapEnd which doesn't fire for tap)
    const b = getBoard();
    const g = getGame();
    if (b && g) b.position(g.fen());
  }

  return {
    onClick: onClick,
    reset: function() { selected = null; clearHighlights(); }
  };
}
