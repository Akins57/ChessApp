// ── Config ──────────────────────────────────────────────────────────────────
const PIECE_THEME_REPLAY = 'img/chesspieces/wikipedia/{piece}.png';
const FOLDERS_KEY = 'chessapp_folders';

// ── Folder storage ────────────────────────────────────────────────────────────
function genId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
function getFolders() { return JSON.parse(localStorage.getItem(FOLDERS_KEY) || '{}'); }
function saveFolders(f) { localStorage.setItem(FOLDERS_KEY, JSON.stringify(f)); }

function createFolder() {
  const input = document.getElementById('new-folder-input');
  const name = input.value.trim();
  if (!name) return;
  const folders = getFolders();
  const id = genId();
  folders[id] = { id, name, games: [] };
  saveFolders(folders);
  input.value = '';
  renderSidebar();
  populateFolderSelect();
}

function deleteFolder(id) {
  if (!confirm('Delete this folder and all its games?')) return;
  const folders = getFolders();
  delete folders[id];
  saveFolders(folders);
  renderSidebar();
  populateFolderSelect();
}

function saveCurrentGame() {
  const pgn = document.getElementById('pgn-input').value.trim();
  if (!pgn) return;
  const folderId = document.getElementById('folder-select').value;
  if (!folderId) { document.getElementById('save-msg').textContent = 'Pick a folder first.'; return; }

  const folders = getFolders();
  if (!folders[folderId]) return;

  // Auto-name from PGN headers
  const temp = new Chess();
  temp.load_pgn(pgn);
  const h = temp.header();
  const name = (h.White && h.Black) ? `${h.White} vs ${h.Black}` : `Game ${folders[folderId].games.length + 1}`;

  folders[folderId].games.push({ id: genId(), name, pgn, addedAt: new Date().toISOString().split('T')[0] });
  saveFolders(folders);
  renderSidebar();

  const msg = document.getElementById('save-msg');
  msg.textContent = `Saved to "${folders[folderId].name}"`;
  setTimeout(() => { msg.textContent = ''; }, 2500);
}

function deleteGame(folderId, gameId) {
  const folders = getFolders();
  if (!folders[folderId]) return;
  folders[folderId].games = folders[folderId].games.filter(g => g.id !== gameId);
  saveFolders(folders);
  renderSidebar();
}

function loadSavedGame(folderId, gameId) {
  const folders = getFolders();
  const folder = folders[folderId];
  if (!folder) return;
  const g = folder.games.find(x => x.id === gameId);
  if (!g) return;
  document.getElementById('pgn-input').value = g.pgn;
  loadGame();
}

// ── Sidebar rendering ─────────────────────────────────────────────────────────
function renderSidebar() {
  const folders = getFolders();
  const el = document.getElementById('folder-list');
  el.innerHTML = '';

  const arr = Object.values(folders);
  if (arr.length === 0) {
    const hint = document.createElement('div');
    hint.style.cssText = 'padding:16px;color:#444;font-size:0.83rem;text-align:center';
    hint.textContent = 'No folders yet.';
    el.appendChild(hint);
    return;
  }

  for (const folder of arr) {
    const folderDiv = document.createElement('div');
    folderDiv.className = 'folder-item';

    // Header row
    const headerRow = document.createElement('div');
    headerRow.className = 'folder-header-row';
    headerRow.onclick = () => toggleFolder(folder.id);

    const icon = document.createElement('span');
    icon.className = 'folder-toggle-icon';
    icon.id = `icon-${folder.id}`;
    icon.textContent = '▶';

    const nameSpan = document.createElement('span');
    nameSpan.className = 'folder-name-label';
    nameSpan.textContent = folder.name;

    const countSpan = document.createElement('span');
    countSpan.className = 'theme-count';
    countSpan.textContent = folder.games.length;

    const delBtn = document.createElement('button');
    delBtn.className = 'folder-del-btn';
    delBtn.title = 'Delete folder';
    delBtn.textContent = '×';
    delBtn.onclick = e => { e.stopPropagation(); deleteFolder(folder.id); };

    headerRow.append(icon, nameSpan, countSpan, delBtn);

    // Games list (collapsed by default)
    const gamesDiv = document.createElement('div');
    gamesDiv.className = 'folder-games';
    gamesDiv.id = `games-${folder.id}`;
    gamesDiv.style.display = 'none';

    if (folder.games.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'folder-empty-hint';
      empty.textContent = 'No games saved yet';
      gamesDiv.appendChild(empty);
    } else {
      for (const g of folder.games) {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        gameItem.onclick = () => loadSavedGame(folder.id, g.id);

        const gName = document.createElement('span');
        gName.className = 'game-item-name';
        gName.textContent = g.name;

        const gDate = document.createElement('span');
        gDate.className = 'game-item-date';
        gDate.textContent = g.addedAt;

        const gDel = document.createElement('button');
        gDel.className = 'folder-del-btn';
        gDel.title = 'Remove game';
        gDel.textContent = '×';
        gDel.onclick = e => { e.stopPropagation(); deleteGame(folder.id, g.id); };

        gameItem.append(gName, gDate, gDel);
        gamesDiv.appendChild(gameItem);
      }
    }

    folderDiv.append(headerRow, gamesDiv);
    el.appendChild(folderDiv);
  }
}

function toggleFolder(id) {
  const gamesDiv = document.getElementById(`games-${id}`);
  const icon = document.getElementById(`icon-${id}`);
  const open = gamesDiv.style.display !== 'none';
  gamesDiv.style.display = open ? 'none' : 'block';
  icon.textContent = open ? '▶' : '▼';
}

function populateFolderSelect() {
  const folders = getFolders();
  const select = document.getElementById('folder-select');
  const prev = select.value;
  select.innerHTML = '<option value="">— Select folder —</option>';
  for (const f of Object.values(folders)) {
    const opt = document.createElement('option');
    opt.value = f.id;
    opt.textContent = f.name;
    select.appendChild(opt);
  }
  if (folders[prev]) select.value = prev;
}

// ── Replay state ─────────────────────────────────────────────────────────────
let board        = null;
let game         = null;
let tapMove      = null;
let fullHistory  = [];
let historyIdx   = 0;
let playerColor  = 'w';
let waitingInput = false;
let skippedMoves = 0;

// ── Board init ────────────────────────────────────────────────────────────────
function initBoard() {
  if (typeof createTapToMove !== 'undefined') {
    tapMove = createTapToMove('replay-board', () => game, () => board, onDrop, () => waitingInput);
  }
  board = Chessboard('replay-board', {
    draggable: false,
    position: 'start',
    pieceTheme: PIECE_THEME_REPLAY
  });
  window.addEventListener('resize', () => board.resize());
}

function enableDragging() {
  board.destroy();
  board = Chessboard('replay-board', {
    draggable: true,
    position: game.fen(),
    orientation: playerColor === 'w' ? 'white' : 'black',
    onDrop: onDrop,
    onSnapEnd: () => board.position(game.fen()),
    onSquareClick: tapMove ? tapMove.onClick : undefined,
    pieceTheme: PIECE_THEME_REPLAY
  });
}

function disableDragging() {
  if (tapMove) tapMove.reset();
  board.destroy();
  board = Chessboard('replay-board', {
    draggable: false,
    position: game.fen(),
    orientation: playerColor === 'w' ? 'white' : 'black',
    pieceTheme: PIECE_THEME_REPLAY
  });
}

// ── Side selector ─────────────────────────────────────────────────────────────
function selectSide(color) {
  playerColor = color;
  document.getElementById('btn-white').classList.toggle('selected', color === 'w');
  document.getElementById('btn-black').classList.toggle('selected', color === 'b');
}

// ── Load game from PGN ────────────────────────────────────────────────────────
function loadGame() {
  const pgn = document.getElementById('pgn-input').value.trim();
  if (!pgn) { setFeedback('Paste a PGN first.', 'wrong'); return; }

  const temp = new Chess();
  if (!temp.load_pgn(pgn)) { setFeedback('Invalid PGN. Check the format and try again.', 'wrong'); return; }

  fullHistory = temp.history({ verbose: true });
  if (fullHistory.length === 0) { setFeedback('No moves found in PGN.', 'wrong'); return; }

  const headers = temp.header();
  const white = headers.White || '?';
  const black = headers.Black || '?';
  const event = headers.Event || '';
  document.getElementById('game-info').textContent =
    `${white} vs ${black}${event ? ' · ' + event : ''} (${fullHistory.length} moves)`;

  game = new Chess();
  historyIdx   = 0;
  skippedMoves = 0;
  waitingInput = false;

  board.destroy();
  board = Chessboard('replay-board', {
    draggable: false,
    position: 'start',
    orientation: playerColor === 'w' ? 'white' : 'black',
    onDrop: onDrop,
    onSnapEnd: () => board.position(game.fen()),
    pieceTheme: PIECE_THEME_REPLAY
  });

  buildMoveList();
  document.getElementById('skip-btn').style.display = 'inline-block';
  document.getElementById('replay-btn-row').style.display = 'none';

  // Show save section
  const saveSection = document.getElementById('save-section');
  saveSection.style.display = 'flex';
  document.getElementById('save-msg').textContent = '';
  populateFolderSelect();

  setFeedback('Game loaded! Make your first move.', 'info');
  stepForward();
}

// ── Main step logic ───────────────────────────────────────────────────────────
function stepForward() {
  if (historyIdx >= fullHistory.length) { onGameEnd(); return; }
  const moveColor = historyIdx % 2 === 0 ? 'w' : 'b';
  if (moveColor === playerColor) {
    waitingInput = true;
    enableDragging();
    setFeedback(`Your turn (${playerColor === 'w' ? 'White' : 'Black'}) — find the move!`, 'info');
  } else {
    waitingInput = false;
    disableDragging();
    setTimeout(playOpponentMove, 600);
  }
}

function playOpponentMove() {
  if (historyIdx >= fullHistory.length) { onGameEnd(); return; }
  const m = fullHistory[historyIdx];
  game.move({ from: m.from, to: m.to, promotion: m.promotion || 'q' });
  board.position(game.fen());
  markMoveDone(historyIdx);
  historyIdx++;
  stepForward();
}

// ── User move handler ─────────────────────────────────────────────────────────
function onDrop(source, target) {
  if (!waitingInput) return 'snapback';
  const move = game.move({ from: source, to: target, promotion: 'q' });
  if (!move) return 'snapback';

  const expected = fullHistory[historyIdx];
  const correct  = source === expected.from && target === expected.to;

  if (correct) {
    markMoveDone(historyIdx);
    historyIdx++;
    waitingInput = false;
    setFeedback('Correct!', 'correct');
    flashBoard('correct');
    setTimeout(stepForward, 600);
  } else {
    game.undo();
    board.position(game.fen());
    setFeedback(`Wrong! The correct move was ${expected.san}. Try again or skip.`, 'wrong');
    flashBoard('wrong');
    skippedMoves++;
    revealMoveHint(historyIdx); // Show the correct move in the list after a mistake
  }
}

// ── Skip / Show Move ──────────────────────────────────────────────────────────
function skipMove() {
  if (!waitingInput || historyIdx >= fullHistory.length) return;
  const m = fullHistory[historyIdx];
  game.move({ from: m.from, to: m.to, promotion: m.promotion || 'q' });
  board.position(game.fen());
  markMoveDone(historyIdx);
  historyIdx++;
  waitingInput = false;
  skippedMoves++;
  setFeedback(`Skipped. The move was ${m.san}.`, 'info');
  setTimeout(stepForward, 700);
}

// ── Game over ─────────────────────────────────────────────────────────────────
function onGameEnd() {
  waitingInput = false;
  disableDragging();
  document.getElementById('skip-btn').style.display = 'none';
  document.getElementById('replay-btn-row').style.display = 'flex';
  historyIdx = fullHistory.length;
  setFeedback(`Game complete! Skipped/wrong: ${skippedMoves}`, skippedMoves === 0 ? 'correct' : 'info');
}

// ── Move list UI ──────────────────────────────────────────────────────────────
function buildMoveList() {
  const container = document.getElementById('move-list');
  container.innerHTML = '';
  for (let i = 0; i < fullHistory.length; i += 2) {
    const pair = document.createElement('div');
    pair.className = 'move-pair';

    const num = document.createElement('span');
    num.className = 'move-num';
    num.textContent = (Math.floor(i / 2) + 1) + '.';

    const white = document.createElement('span');
    white.className = 'move-san hidden';
    white.id = 'move-' + i;
    white.textContent = fullHistory[i].san;

    pair.append(num, white);

    if (i + 1 < fullHistory.length) {
      const black = document.createElement('span');
      black.className = 'move-san hidden';
      black.id = 'move-' + (i + 1);
      black.textContent = fullHistory[i + 1].san;
      pair.appendChild(black);
    }
    container.appendChild(pair);
  }
}

function markMoveDone(idx) {
  const el = document.getElementById('move-' + idx);
  if (el) { el.classList.remove('hidden', 'current'); el.classList.add('done'); }
  // Next move stays hidden — only revealed after a wrong attempt
  if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

function revealMoveHint(idx) {
  const el = document.getElementById('move-' + idx);
  if (el) { el.classList.remove('hidden'); el.classList.add('current'); }
  if (el) el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
}

// ── Manual prev/next (post-game) ─────────────────────────────────────────────
function replayPrev() {
  if (historyIdx <= 0) return;
  game.undo();
  historyIdx--;
  board.position(game.fen());
  const cur = document.getElementById('move-' + historyIdx);
  if (cur) { cur.classList.remove('done'); cur.classList.add('current'); }
  const prev = document.getElementById('move-' + (historyIdx - 1));
  if (prev) { prev.classList.remove('current'); prev.classList.add('done'); }
}

function replayNext() {
  if (historyIdx >= fullHistory.length) return;
  const m = fullHistory[historyIdx];
  game.move({ from: m.from, to: m.to, promotion: m.promotion || 'q' });
  board.position(game.fen());
  markMoveDone(historyIdx - 1);
  historyIdx++;
}

// ── UI helpers ────────────────────────────────────────────────────────────────
function setFeedback(msg, type) {
  const el = document.getElementById('replay-feedback');
  el.textContent = msg;
  el.className = 'replay-feedback ' + type;
}

function flashBoard(type) {
  const wrap = document.getElementById('replay-board-wrap');
  wrap.classList.remove('flash-correct', 'flash-wrong');
  void wrap.offsetWidth;
  wrap.classList.add('flash-' + type);
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initBoard();
  renderSidebar();
  // Allow Enter key in folder name input
  document.getElementById('new-folder-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') createFolder();
  });
});
