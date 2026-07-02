// ── Config ──────────────────────────────────────────────────────────────────
const PIECE_THEME = 'img/chesspieces/wikipedia/{piece}.png';
const SR_KEY = 'chessapp_sr_progress';

// ── SM-2 Algorithm ──────────────────────────────────────────────────────────
// quality: 0 = fail (wrong move), 4 = good (correct first try), 5 = easy
function sm2Update(card, quality) {
  let { repetitions, easeFactor, interval } = card;

  let daysAhead = interval;
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
    easeFactor = 2.5; // Full reset — treat as new card
    daysAhead = 0; // Show again today (same session)
  } else {
    if (repetitions === 0) {
      if      (quality === 3) interval = 2;
      else if (quality === 4) interval = 3;
      else                    interval = 7;
    } else if (repetitions === 1) {
      if      (quality === 3) interval = 4;
      else if (quality === 4) interval = 6;
      else                    interval = 10;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions++;
    easeFactor = Math.max(1.3, easeFactor + 0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    daysAhead = interval;
  }

  const next = new Date();
  next.setDate(next.getDate() + daysAhead);
  return { repetitions, easeFactor, interval, nextReview: next.toISOString().split('T')[0] };
}

function today() { return new Date().toISOString().split('T')[0]; }

// ── Progress (localStorage) ─────────────────────────────────────────────────
function getProgress() { return JSON.parse(localStorage.getItem(SR_KEY) || '{}'); }
function saveProgress(p) { localStorage.setItem(SR_KEY, JSON.stringify(p)); }

function getCardState(id) {
  return getProgress()[id] || { repetitions: 0, easeFactor: 2.5, interval: 1, nextReview: today() };
}

function recordResult(id, quality) {
  const p = getProgress();
  p[id] = sm2Update(getCardState(id), quality);
  saveProgress(p);
}

function isDue(puzzle) {
  const state = getProgress()[puzzle.id];
  if (!state) return false;          // Never seen = new, not a review
  return state.nextReview <= today();
}

function isNew(puzzle) {
  return !getProgress()[puzzle.id];
}

function getDuePuzzles(puzzles) {
  return puzzles.filter(isDue);
}

function getNewPuzzles(puzzles) {
  return puzzles.filter(isNew);
}

function getThemePuzzles(theme) {
  if (theme === '_all') return Object.values(allPuzzles).flat();
  return allPuzzles[theme] || [];
}

// ── State ────────────────────────────────────────────────────────────────────
let board        = null;
let game         = null;
let tapMove      = null;
let allPuzzles   = {};
let currentTheme = null;
let duePuzzles   = [];
let dueIndex     = 0;

let currentPuzzle   = null;
let currentMoveIdx  = 0;   // index into puzzle.moves we're waiting for next
let puzzleFailed    = false;
let puzzleDone      = false;

// ── Board init ───────────────────────────────────────────────────────────────
function initBoard() {
  if (typeof createTapToMove !== 'undefined') {
    tapMove = createTapToMove('board', () => game, () => board, onDrop, () => !puzzleDone);
  }
  board = Chessboard('board', {
    draggable: false,
    position: 'start',
    pieceTheme: PIECE_THEME
  });
  window.addEventListener('resize', () => board.resize());
}

// ── Move handler ─────────────────────────────────────────────────────────────
function onDrop(source, target) {
  if (!currentPuzzle || puzzleDone) return 'snapback';

  const move = game.move({ from: source, to: target, promotion: 'q' });
  if (!move) return 'snapback';

  const played   = source + target + (move.promotion || '');
  const expected = currentPuzzle.moves[currentMoveIdx];

  // Compare: allow matching without promotion char if puzzle move has no 5th char
  const matches = played === expected ||
                  (played.slice(0, 4) === expected.slice(0, 4) && expected.length === 4);

  if (matches) {
    currentMoveIdx++;
    flashBoard('correct');

    if (currentMoveIdx >= currentPuzzle.moves.length) {
      onPuzzleSolved();
    } else {
      // Play opponent's auto-response
      setTimeout(playAutoMove, 500);
    }
  } else {
    game.undo();
    board.position(game.fen());
    flashBoard('wrong');
    onWrongMove();
  }
}

function playAutoMove() {
  if (currentMoveIdx >= currentPuzzle.moves.length) return;
  const m = currentPuzzle.moves[currentMoveIdx];
  game.move({ from: m.slice(0, 2), to: m.slice(2, 4), promotion: m[4] || 'q' });
  board.position(game.fen());
  currentMoveIdx++;

  if (currentMoveIdx >= currentPuzzle.moves.length) {
    onPuzzleSolved();
  }
}

// ── Puzzle flow ──────────────────────────────────────────────────────────────
function onPuzzleSolved() {
  puzzleDone = true;
  if (!puzzleFailed) {
    showFeedback('Correct! How did it feel?', 'correct');
  } else {
    showFeedback('Solution shown. Rate yourself:', 'wrong');
  }
  document.getElementById('reveal-btn').style.display = 'none';
  document.getElementById('action-btns').style.display = 'flex';
  showRatingButtons();
  updateSidebarCounts();
}

function onWrongMove() {
  if (!puzzleFailed) {
    puzzleFailed = true;
    showFeedback('Wrong! Try again or reveal the solution.', 'wrong');
    document.getElementById('reveal-btn').style.display = 'inline-block';
    document.getElementById('action-btns').style.display = 'flex';
  }
}

function showRatingButtons() {
  const state = getCardState(currentPuzzle.id);
  const ratings = [
    { q: 0, label: 'Again', cls: 'btn-again' },
    { q: 3, label: 'Hard',  cls: 'btn-hard'  },
    { q: 4, label: 'Good',  cls: 'btn-good'  },
    { q: 5, label: 'Easy',  cls: 'btn-easy'  },
  ];
  const row = document.getElementById('rating-btns');
  row.innerHTML = '';
  for (const { q, label, cls } of ratings) {
    const interval = sm2Update(state, q).interval;
    const intervalStr = q < 3     ? 'now'
                      : interval >= 30 ? `${Math.round(interval / 30)}mo`
                      : interval >= 7  ? `${Math.round(interval / 7)}w`
                      : `${interval}d`;
    const btn = document.createElement('button');
    btn.className = `btn ${cls}`;
    btn.innerHTML = `${label}<span class="rating-interval">${intervalStr}</span>`;
    btn.onclick = () => rateAndNext(q);
    row.appendChild(btn);
  }
  row.style.display = 'flex';
}

function rateAndNext(quality) {
  recordResult(currentPuzzle.id, quality);
  if (quality < 3) {
    // Re-insert puzzle ~3 spots later in the current queue so it comes back soon
    const insertAt = Math.min(dueIndex + 3, duePuzzles.length);
    duePuzzles.splice(insertAt, 0, currentPuzzle);
    if (dueIndex >= duePuzzles.length) dueIndex = 0;
    loadPuzzle(duePuzzles[dueIndex]);
    updateSidebarCounts();
  } else {
    nextPuzzle();
  }
}

function revealSolution() {
  // Play out all remaining moves automatically
  const remaining = currentPuzzle.moves.slice(currentMoveIdx);
  let delay = 0;
  for (const m of remaining) {
    setTimeout(() => {
      game.move({ from: m.slice(0, 2), to: m.slice(2, 4), promotion: m[4] || 'q' });
      board.position(game.fen());
    }, delay);
    delay += 700;
  }
  setTimeout(() => {
    currentMoveIdx = currentPuzzle.moves.length;
    onPuzzleSolved();
  }, delay);
}

function nextPuzzle() {
  dueIndex++;
  const themePuzzles = getThemePuzzles(currentTheme);
  duePuzzles = getDuePuzzles(themePuzzles);

  if (duePuzzles.length === 0) {
    const newPuzzles = currentTheme === '_all' ? [] : getNewPuzzles(themePuzzles);
    if (newPuzzles.length > 0) {
      duePuzzles = newPuzzles;
      dueIndex = 0;
    } else {
      showNoPuzzles();
      return;
    }
  }

  // Pick next; wrap if needed
  if (dueIndex >= duePuzzles.length) dueIndex = 0;
  loadPuzzle(duePuzzles[dueIndex]);
}

// ── Load a puzzle ─────────────────────────────────────────────────────────────
function loadPuzzle(puzzle) {
  if (tapMove) tapMove.reset();
  currentPuzzle  = puzzle;
  currentMoveIdx = 0;
  puzzleFailed   = false;
  puzzleDone     = false;

  game = new Chess(puzzle.fen);

  // Play the trigger move (moves[0]) automatically
  const trigger = puzzle.moves[0];
  game.move({ from: trigger.slice(0, 2), to: trigger.slice(2, 4), promotion: trigger[4] || 'q' });
  currentMoveIdx = 1;

  // Orient board so puzzle player's pieces are at the bottom
  const orientation = game.turn() === 'w' ? 'white' : 'black';
  board.orientation(orientation);
  board.position(game.fen());

  // Reset UI
  hideFeedback();
  document.getElementById('action-btns').style.display = 'none';
  document.getElementById('reveal-btn').style.display = 'none';
  document.getElementById('rating-btns').style.display = 'none';

  const side  = game.turn() === 'w' ? 'White' : 'Black';
  const state = getCardState(puzzle.id);
  const isNewPuzzle = !getProgress()[puzzle.id];
  document.getElementById('puzzle-info').textContent =
    `Rating: ${puzzle.rating} · ${side} to move · ${isNewPuzzle ? 'New' : 'Review'}`;
  document.getElementById('puzzle-due-count').textContent =
    `${duePuzzles.length} remaining · interval ${state.interval}d`;
}

// ── Theme selection ──────────────────────────────────────────────────────────
function selectTheme(theme) {
  currentTheme = theme;
  dueIndex = 0;

  document.querySelectorAll('.theme-item').forEach(el => {
    el.classList.toggle('active', el.dataset.theme === theme);
  });

  const themePuzzles = getThemePuzzles(theme);
  duePuzzles = getDuePuzzles(themePuzzles);
  const total = themePuzzles.length;

  if (total === 0) {
    document.getElementById('status-msg').style.display = 'block';
    document.getElementById('puzzle-ui').style.display = 'none';
    document.getElementById('status-msg').innerHTML =
      `No puzzles for this theme yet. Run <code>setup_puzzles.py</code> to download them.`;
    return;
  }

  if (duePuzzles.length === 0) {
    // No reviews due — fall through to new (unseen) puzzles
    const newPuzzles = theme === '_all' ? [] : getNewPuzzles(themePuzzles);
    if (newPuzzles.length > 0) {
      duePuzzles = newPuzzles;
    } else {
      showNoPuzzles();
      return;
    }
  }

  document.getElementById('status-msg').style.display = 'none';
  document.getElementById('puzzle-ui').style.display = 'flex';
  loadPuzzle(duePuzzles[0]);
}

function showNoPuzzles() {
  document.getElementById('status-msg').style.display = 'block';
  document.getElementById('puzzle-ui').style.display = 'none';
  // Find next review date
  const p = getProgress();
  const theme = getThemePuzzles(currentTheme);
  const dates = theme.map(px => p[px.id]?.nextReview).filter(Boolean).sort();
  const nextDate = dates[0] || 'unknown';
  document.getElementById('status-msg').innerHTML =
    `All caught up! Next review due: <strong>${nextDate}</strong>`;
}

// ── UI helpers ────────────────────────────────────────────────────────────────
function showFeedback(msg, type) {
  const el = document.getElementById('feedback');
  el.textContent = msg;
  el.className = 'feedback ' + type;
}
function hideFeedback() {
  const el = document.getElementById('feedback');
  el.textContent = '';
  el.className = 'feedback';
}

function flashBoard(type) {
  const wrap = document.getElementById('board-wrap');
  wrap.classList.remove('flash-correct', 'flash-wrong');
  // Force reflow to restart animation
  void wrap.offsetWidth;
  wrap.classList.add('flash-' + type);
}

function updateSidebarCounts() {
  let total = 0;
  for (const theme of Object.keys(allPuzzles)) {
    const due = getDuePuzzles(allPuzzles[theme]).length;
    total += due;
    const el = document.getElementById('count-' + theme);
    if (el) el.textContent = due;
  }
  const allEl = document.getElementById('count-all');
  if (allEl) allEl.textContent = total;
}

// ── Bootstrap ────────────────────────────────────────────────────────────────
function init() {
  // Wire up sidebar clicks
  document.querySelectorAll('.theme-item').forEach(el => {
    el.addEventListener('click', () => selectTheme(el.dataset.theme));
  });

  // Load puzzle data FIRST (independent of board library)
  if (window.PUZZLE_DATA) {
    allPuzzles = window.PUZZLE_DATA;
    const hasAny = Object.values(allPuzzles).some(arr => arr.length > 0);
    if (!hasAny) {
      document.getElementById('data-warning').style.display = 'block';
    }
    updateSidebarCounts();
  } else {
    document.getElementById('status-msg').innerHTML =
      'No puzzle data found. Run <code>setup_puzzles.py</code> to download puzzles.';
    document.getElementById('data-warning').style.display = 'block';
  }

  // Initialize board (requires CDN libraries)
  try {
    initBoard();
  } catch (e) {
    console.error('Board init failed:', e);
    document.getElementById('status-msg').innerHTML =
      'Chess board failed to load. Check your internet connection and refresh.';
    document.getElementById('status-msg').style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', init);
