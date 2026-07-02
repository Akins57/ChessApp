// ── Click-to-move (chess.com style) ──────────────────────────────────────────
// Usage:
//   createTapToMove(boardId, getGame, getBoard, onDropFn, isActiveFn);
//   Call tapMove.reset() whenever a new puzzle/game is loaded.

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

  function handleSquare(square) {
    if (isActiveFn && !isActiveFn()) return;

    const gm = getGame();
    if (!gm) return;

    // Nothing selected: pick a piece
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

    // Tap same square: deselect
    if (selected === square) {
      selected = null;
      clearHighlights();
      return;
    }

    // Tap another own piece: switch selection
    const p = gm.get(square);
    if (p && p.color === gm.turn()) {
      selected = square;
      clearHighlights();
      markSquare(square, 'tap-selected');
      showLegalDots(gm, square);
      return;
    }

    // Confirm move
    const from = selected;
    selected = null;
    clearHighlights();
    onDropFn(from, square);
    const b = getBoard();
    const g = getGame();
    if (b && g) b.position(g.fen());
  }

  // Attach via event delegation on the board container.
  // Works even after board.destroy() + Chessboard() re-init because the
  // container div itself is never removed from the DOM.
  const c = container();
  if (c) {
    c.addEventListener('click', function(e) {
      const squareEl = e.target.closest('[data-square]');
      if (!squareEl) return;
      handleSquare(squareEl.getAttribute('data-square'));
    });
  }

  return {
    reset: function() { selected = null; clearHighlights(); }
  };
}
