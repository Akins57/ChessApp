// ── Config ──────────────────────────────────────────────────────────────────
const PIECE_THEME_ANALYSIS = 'img/chesspieces/wikipedia/{piece}.png';
const MISTAKES_KEY = 'chessapp_mistakes';
const SR_KEY       = 'chessapp_sr_progress';

// ── SM-2 Algorithm (duplicated from puzzles.js) ──────────────────────────────
function sm2Update(card, quality) {
  let { repetitions, easeFactor, interval } = card;
  let daysAhead = interval;
  if (quality < 3) {
    repetitions = 0;
    interval    = 1;
    easeFactor  = 2.5;
    daysAhead   = 0;
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
    daysAhead  = interval;
  }
  const next = new Date();
  next.setDate(next.getDate() + daysAhead);
  return { repetitions, easeFactor, interval, nextReview: next.toISOString().split('T')[0] };
}

function today() { return new Date().toISOString().split('T')[0]; }

function getProgress()  { return JSON.parse(localStorage.getItem(SR_KEY) || '{}'); }
function saveProgress(p){ localStorage.setItem(SR_KEY, JSON.stringify(p)); }

function getCardState(id) {
  return getProgress()[id] || { repetitions: 0, easeFactor: 2.5, interval: 1, nextReview: today() };
}

function recordResult(id, quality) {
  const p = getProgress();
  p[id] = sm2Update(getCardState(id), quality);
  saveProgress(p);
}

function isDue(card) {
  const state = getProgress()[card.id];
  if (!state) return false;
  return state.nextReview <= today();
}

function isNew(card) { return !getProgress()[card.id]; }

// ── Mistake storage ───────────────────────────────────────────────────────────
function getMistakes() { return JSON.parse(localStorage.getItem(MISTAKES_KEY) || '{}'); }
function saveMistakes(m){ localStorage.setItem(MISTAKES_KEY, JSON.stringify(m)); }

function getAllMistakesList() { return Object.values(getMistakes()); }

function saveMistakeCard(card) {
  const m = getMistakes();
  m[card.id] = card;
  saveMistakes(m);
}

function clearAllMistakes() {
  if (!confirm('Delete all stored mistakes? This also removes their SR progress.')) return;
  const mistakes = getMistakes();
  const p = getProgress();
  for (const id of Object.keys(mistakes)) { delete p[id]; }
  saveProgress(p);
  localStorage.removeItem(MISTAKES_KEY);
  allMistakes = [];
  drillQueue  = [];
  drillIndex  = 0;
  updateStats();
  showStatus('All mistakes cleared.');
}

// ── Stockfish engine ──────────────────────────────────────────────────────────
let engine      = null;
let engineReady = false;
let engineQueue = [];
let engineBusy  = false;
let pendingResolve = null;

function initEngine() {
  return new Promise((resolve, reject) => {
    try {
      engine = new Worker('js/lib/stockfish.js');
    } catch (e) {
      reject(new Error('Could not load js/lib/stockfish.js. Run setup_puzzles.py first.'));
      return;
    }

    engine.onmessage = (e) => {
      const line = e.data;
      if (line === 'uciok') {
        engineReady = true;
        resolve();
      }
      if (line.startsWith('bestmove') && pendingResolve) {
        const parts = line.split(' ');
        const move  = parts[1] === '(none)' ? null : parts[1];
        const res   = pendingResolve;
        pendingResolve = null;
        engineBusy     = false;
        res(move);
        if (engineQueue.length > 0) engineQueue.shift()();
      }
    };
    engine.onerror = (e) => {
      if (!engineReady) reject(new Error('Stockfish worker error: ' + e.message));
    };

    engine.postMessage('uci');
    // Timeout if Stockfish fails to respond
    setTimeout(() => {
      if (!engineReady) reject(new Error('Stockfish timed out. Check js/lib/stockfish.js.'));
    }, 5000);
  });
}

function getBestMove(fen, depth) {
  depth = depth || 16;
  return new Promise((resolve) => {
    const run = () => {
      engineBusy     = true;
      pendingResolve = resolve;
      engine.postMessage('position fen ' + fen);
      engine.postMessage('go depth ' + depth);
    };
    if (engineBusy) engineQueue.push(run);
    else run();
  });
}

// ── PGN eval parsing ─────────────────────────────────────────────────────────
function parseEvalFromComment(comment) {
  if (!comment) return null;
  const m = comment.match(/\[%eval\s+(-?\d+\.?\d*)\]/);
  if (!m) return null;
  const v = parseFloat(m[1]);
  return isNaN(v) ? null : v;
}

// Extract moves with eval annotations from a verbose chess.js history
// PGN comments live in move.comment (chess.js 0.10 attaches them)
// We parse them out manually from the raw PGN string
function extractEvalsFromPgn(pgn) {
  // Returns array of evals indexed by half-move (0 = after move 1 by white, 1 = after move 1 by black...)
  const evals = [];
  // Match { ... } comment blocks after each move
  const commentRegex = /\{([^}]*)\}/g;
  let match;
  while ((match = commentRegex.exec(pgn)) !== null) {
    evals.push(parseEvalFromComment(match[1]));
  }
  return evals;
}

function detectBlunders(pgn, username, threshold) {
  const chess = new Chess();
  if (!chess.load_pgn(pgn)) return [];

  const headers   = chess.header();
  const whitePlayer = (headers.White || '').toLowerCase();
  const blackPlayer = (headers.Black || '').toLowerCase();
  const lc         = username.toLowerCase();

  let playerColor = null;
  if (whitePlayer.includes(lc)) playerColor = 'w';
  else if (blackPlayer.includes(lc)) playerColor = 'b';
  else return []; // user not in this game

  const dateStr  = headers.Date   || headers.UTCDate || '';
  const opponent = playerColor === 'w'
    ? (headers.Black || '?')
    : (headers.White || '?');
  const gameInfo = `vs. ${opponent}${dateStr ? ' · ' + dateStr.replace(/\./g, '-') : ''}`;

  // Extract evals from PGN comments
  const evals = extractEvalsFromPgn(pgn);

  // Replay the game to get FENs before each move
  const replay = new Chess();
  const fullHistory = chess.history({ verbose: true });

  const blunders = [];

  for (let i = 0; i < fullHistory.length; i++) {
    const moveColor = i % 2 === 0 ? 'w' : 'b';
    if (moveColor !== playerColor) {
      replay.move(fullHistory[i]);
      continue;
    }

    const evalBefore = (i > 0) ? evals[i - 1] : 0;
    const evalAfter  = evals[i];

    if (evalBefore === null || evalAfter === null) {
      replay.move(fullHistory[i]);
      continue;
    }

    // Eval drop from player's perspective (positive = player lost advantage)
    let evalDrop;
    if (playerColor === 'w') {
      evalDrop = evalBefore - evalAfter; // white wants eval high
    } else {
      evalDrop = evalAfter - evalBefore; // black wants eval low (negative)
    }

    if (evalDrop >= threshold) {
      const fenBefore   = replay.fen();
      const blunderMove = fullHistory[i];
      const moveNum     = Math.floor(i / 2) + 1;

      // Generate SAN of blunder move for display
      const tempChess = new Chess(fenBefore);
      const mObj = tempChess.move({ from: blunderMove.from, to: blunderMove.to, promotion: blunderMove.promotion || 'q' });
      const blunderSan = mObj ? mObj.san : (blunderMove.from + blunderMove.to);

      blunders.push({
        fen: fenBefore,
        blunderMove: blunderMove.from + blunderMove.to + (blunderMove.promotion || ''),
        blunderSan,
        evalBefore,
        evalAfter,
        evalDrop: Math.round(evalDrop * 100) / 100,
        gameInfo,
        moveNumber: moveNum,
        playerColor,
      });
    }

    replay.move(fullHistory[i]);
  }

  return blunders;
}

// ── Import flow ───────────────────────────────────────────────────────────────
async function runImport(pgns, username) {
  const threshold = parseFloat(document.getElementById('threshold-select').value);

  // Collect all blunders first
  let allBlunders = [];
  for (const pgn of pgns) {
    const b = detectBlunders(pgn, username, threshold);
    allBlunders = allBlunders.concat(b);
  }

  if (allBlunders.length === 0) {
    hideProgress();
    showStatus(`No blunders found (threshold: ${threshold} pawns). Try a lower threshold or make sure your games have been analyzed on chess.com.`);
    return;
  }

  // Check engine is available
  if (!engineReady) {
    try {
      showProgress('Loading Stockfish engine…', 0);
      await initEngine();
    } catch (e) {
      hideProgress();
      showStatus('⚠ ' + e.message);
      return;
    }
  }

  // Deduplicate against already-stored blunders by FEN+playerColor
  const existing = getMistakes();
  const existingKeys = new Set(Object.values(existing).map(c => c.fen + c.playerColor));
  const newBlunders = allBlunders.filter(b => !existingKeys.has(b.fen + b.playerColor));

  if (newBlunders.length === 0) {
    hideProgress();
    showStatus('No new blunders found (all positions already imported).');
    updateStats();
    return;
  }

  // Run Stockfish on each blunder position
  for (let i = 0; i < newBlunders.length; i++) {
    const b = newBlunders[i];
    updateProgress(i, newBlunders.length, `Finding best move for position ${i + 1}/${newBlunders.length}…`);
    const best = await getBestMove(b.fen, 16);
    b.bestMove = best;
  }

  // Save cards
  const imported = [];
  for (const b of newBlunders) {
    if (!b.bestMove) continue; // engine returned no move (game over position?)
    const id = 'mistake_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    const card = Object.assign({ id, importedAt: today() }, b);
    saveMistakeCard(card);
    imported.push(card);
  }

  hideProgress();
  allMistakes = getAllMistakesList();
  updateStats();

  if (imported.length === 0) {
    showStatus('Import complete — no new cards added.');
    return;
  }

  // Start drilling immediately
  drillQueue = [...imported];
  drillIndex = 0;
  startDrill();
}

async function fetchChessComGames() {
  if (window.location.protocol === 'file:') {
    document.getElementById('cors-warning').style.display = 'block';
  }

  const username = document.getElementById('username-input').value.trim();
  if (!username) { showStatus('Enter a chess.com username first.'); return; }

  showProgress('Fetching games from chess.com…', 0);

  // Fetch last 3 months
  const now = new Date();
  const months = [];
  for (let i = 0; i < 3; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({ year: d.getFullYear(), month: String(d.getMonth() + 1).padStart(2, '0') });
  }

  let pgns = [];
  try {
    const results = await Promise.all(months.map(({ year, month }) =>
      fetch(`https://api.chess.com/pub/player/${username}/games/${year}/${month}`, {
        headers: { 'User-Agent': 'ChessTrainer-Personal' }
      }).then(r => r.ok ? r.json() : { games: [] })
    ));
    for (const data of results) {
      if (data.games) {
        pgns = pgns.concat(data.games.map(g => g.pgn).filter(Boolean));
      }
    }
  } catch (e) {
    hideProgress();
    showStatus('Failed to fetch games: ' + e.message + '. Try using a local server (python -m http.server 8000).');
    return;
  }

  if (pgns.length === 0) {
    hideProgress();
    showStatus('No games found. Make sure the username is correct and games have eval annotations.');
    return;
  }

  showProgress(`Found ${pgns.length} games — detecting blunders…`, 10);
  await runImport(pgns, username);
}

async function analyzePgn() {
  const pgn = document.getElementById('pgn-input').value.trim();
  if (!pgn) { showStatus('Paste a PGN first.'); return; }

  // Try to extract username from PGN headers — ask user
  const usernameInput = document.getElementById('username-input').value.trim();
  if (!usernameInput) {
    showStatus('Enter your chess.com username in the field above so we know which side\'s blunders to track.');
    return;
  }

  showProgress('Detecting blunders…', 5);
  // Support pasting multiple games separated by blank lines
  const pgnBlocks = pgn.split(/\n\s*\n(?=\[)/).map(s => s.trim()).filter(Boolean);
  await runImport(pgnBlocks, usernameInput);
}

// ── Drill state ───────────────────────────────────────────────────────────────
let board        = null;
let game         = null;
let tapMove      = null;
let allMistakes  = [];
let drillQueue   = [];
let drillIndex   = 0;

let currentCard   = null;
let cardFailed    = false;
let cardDone      = false;

// ── Board init ────────────────────────────────────────────────────────────────
function initBoard() {
  if (typeof createTapToMove !== 'undefined') {
    tapMove = createTapToMove('board', () => game, () => board, onDrop, () => currentCard && !cardDone);
  }
  board = Chessboard('board', {
    draggable: true,
    position: 'start',
    onDrop: onDrop,
    onSnapEnd: () => board.position(game ? game.fen() : 'start'),
    pieceTheme: PIECE_THEME_ANALYSIS
  });
  window.addEventListener('resize', () => board.resize());
}

// ── Load a card ───────────────────────────────────────────────────────────────
function loadCard(card) {
  currentCard = card;
  cardFailed  = false;
  cardDone    = false;

  game = new Chess(card.fen);
  const orientation = card.playerColor === 'w' ? 'white' : 'black';

  if (tapMove) tapMove.reset();
  board.destroy();
  board = Chessboard('board', {
    draggable: true,
    position: card.fen,
    orientation,
    onDrop: onDrop,
    onSnapEnd: () => board.position(game.fen()),
    pieceTheme: PIECE_THEME_ANALYSIS
  });

  // Info bar
  document.getElementById('mistake-game-info').textContent =
    `Move ${card.moveNumber} · ${card.playerColor === 'w' ? 'White' : 'Black'} to move · ${card.gameInfo}`;

  const badge = document.getElementById('eval-drop-badge');
  badge.textContent = `Eval drop: ${card.evalDrop}`;
  badge.className   = 'eval-drop-badge' + (card.evalDrop < 1.5 ? ' mild' : '');

  const state = getCardState(card.id);
  const isNewCard = !getProgress()[card.id];
  document.getElementById('mistake-side-info').textContent =
    `${card.playerColor === 'w' ? 'White' : 'Black'} to move · ${isNewCard ? 'New' : 'Review'}`;
  document.getElementById('mistake-due-count').textContent =
    `${drillQueue.length} remaining · interval ${state.interval}d`;

  // Reset UI
  hideFeedback();
  document.getElementById('action-btns').style.display  = 'none';
  document.getElementById('reveal-btn').style.display   = 'none';
  document.getElementById('rating-btns').style.display  = 'none';
}

// ── Move handler ──────────────────────────────────────────────────────────────
function onDrop(source, target) {
  if (!currentCard || cardDone) return 'snapback';

  const move = game.move({ from: source, to: target, promotion: 'q' });
  if (!move) return 'snapback';

  const played   = source + target + (move.promotion || '');
  const expected = currentCard.bestMove;
  const matches  = played === expected ||
                   (played.slice(0, 4) === expected.slice(0, 4) && expected.length === 4);

  if (matches) {
    cardDone = true;
    flashBoard('correct');
    onCardSolved();
  } else {
    game.undo();
    board.position(game.fen());
    flashBoard('wrong');
    onWrongMove();
  }
}

function onCardSolved() {
  cardDone = true;
  if (!cardFailed) {
    showFeedback('Correct! You found the best move.', 'correct');
  } else {
    showFeedback('Solution shown. Rate yourself:', 'wrong');
  }
  document.getElementById('reveal-btn').style.display  = 'none';
  document.getElementById('action-btns').style.display = 'flex';
  showRatingButtons();
  updateStats();
}

function onWrongMove() {
  if (!cardFailed) {
    cardFailed = true;
    // Show the blunder move for context
    const tempChess = new Chess(currentCard.fen);
    const m = currentCard.bestMove;
    const best = tempChess.move({ from: m.slice(0, 2), to: m.slice(2, 4), promotion: m[4] || 'q' });
    const bestSan = best ? best.san : m;
    showFeedback(`Wrong! (You played ${currentCard.blunderSan} in the game.) Try again or see the answer.`, 'wrong');
    document.getElementById('reveal-btn').style.display  = 'inline-block';
    document.getElementById('action-btns').style.display = 'flex';
  }
}

function revealBestMove() {
  const m = currentCard.bestMove;
  game.move({ from: m.slice(0, 2), to: m.slice(2, 4), promotion: m[4] || 'q' });
  board.position(game.fen());
  cardDone = true;
  onCardSolved();
}

// ── SR rating buttons ─────────────────────────────────────────────────────────
function showRatingButtons() {
  const state   = getCardState(currentCard.id);
  const ratings = [
    { q: 0, label: 'Again', cls: 'btn-again' },
    { q: 3, label: 'Hard',  cls: 'btn-hard'  },
    { q: 4, label: 'Good',  cls: 'btn-good'  },
    { q: 5, label: 'Easy',  cls: 'btn-easy'  },
  ];
  const row = document.getElementById('rating-btns');
  row.innerHTML = '';
  for (const { q, label, cls } of ratings) {
    const interval    = sm2Update(state, q).interval;
    const intervalStr = q < 3      ? 'now'
                      : interval >= 30 ? `${Math.round(interval / 30)}mo`
                      : interval >= 7  ? `${Math.round(interval / 7)}w`
                      : `${interval}d`;
    const btn = document.createElement('button');
    btn.className = `btn ${cls}`;
    btn.innerHTML = `${label}<span class="rating-interval">${intervalStr}</span>`;
    btn.onclick   = () => rateAndNext(q);
    row.appendChild(btn);
  }
  row.style.display = 'flex';
}

function rateAndNext(quality) {
  recordResult(currentCard.id, quality);
  if (quality < 3) {
    const insertAt = Math.min(drillIndex + 3, drillQueue.length);
    drillQueue.splice(insertAt, 0, currentCard);
    if (drillIndex >= drillQueue.length) drillIndex = 0;
    loadCard(drillQueue[drillIndex]);
    updateStats();
  } else {
    nextCard();
  }
}

function nextCard() {
  drillIndex++;
  if (drillIndex >= drillQueue.length) {
    // Re-check for newly-due cards
    const due = getAllMistakesList().filter(isDue);
    if (due.length > 0) {
      drillQueue = due;
      drillIndex = 0;
      loadCard(drillQueue[0]);
    } else {
      const p = getProgress();
      const all = getAllMistakesList();
      const dates = all.map(c => p[c.id]?.nextReview).filter(Boolean).sort();
      const nextDate = dates[0] || 'unknown';
      document.getElementById('mistake-ui').style.display = 'none';
      showStatus(`All caught up! Next review due: <strong>${nextDate}</strong>`);
    }
    return;
  }
  loadCard(drillQueue[drillIndex]);
}

// ── Start drill session ───────────────────────────────────────────────────────
function startDrill() {
  if (drillQueue.length === 0) {
    showStatus('No mistakes to drill right now. Import your games first.');
    return;
  }
  document.getElementById('status-msg').style.display  = 'none';
  document.getElementById('mistake-ui').style.display  = 'flex';
  loadCard(drillQueue[drillIndex]);
}

function buildDrillQueue() {
  allMistakes = getAllMistakesList();
  const due = allMistakes.filter(isDue);
  if (due.length > 0) {
    drillQueue = due;
    drillIndex = 0;
    startDrill();
    return;
  }
  const newCards = allMistakes.filter(isNew);
  if (newCards.length > 0) {
    drillQueue = newCards;
    drillIndex = 0;
    startDrill();
    return;
  }
  const p = getProgress();
  const dates = allMistakes.map(c => p[c.id]?.nextReview).filter(Boolean).sort();
  const nextDate = dates[0] || 'unknown';
  if (allMistakes.length > 0) {
    showStatus(`All caught up! Next review due: <strong>${nextDate}</strong>`);
  }
  // else: no mistakes yet — default status message stays
}

// ── UI helpers ────────────────────────────────────────────────────────────────
function showFeedback(msg, type) {
  const el = document.getElementById('feedback');
  el.innerHTML = msg;
  el.className = 'feedback ' + type;
}
function hideFeedback() {
  const el = document.getElementById('feedback');
  el.textContent = '';
  el.className   = 'feedback';
}

function flashBoard(type) {
  const wrap = document.getElementById('board-wrap');
  wrap.classList.remove('flash-correct', 'flash-wrong');
  void wrap.offsetWidth;
  wrap.classList.add('flash-' + type);
}

function showStatus(html) {
  const el = document.getElementById('status-msg');
  el.innerHTML     = html;
  el.style.display = 'block';
}

function showProgress(label, pct) {
  const wrap = document.getElementById('progress-wrap');
  wrap.style.display = 'flex';
  document.getElementById('progress-label').textContent = label;
  document.getElementById('progress-bar').style.width   = pct + '%';
}

function updateProgress(done, total, label) {
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  showProgress(label || `Analyzing ${done}/${total}…`, pct);
}

function hideProgress() {
  document.getElementById('progress-wrap').style.display = 'none';
}

function updateStats() {
  const all  = getAllMistakesList();
  const due  = all.filter(isDue).length;
  const nw   = all.filter(isNew).length;
  document.getElementById('stat-total').textContent = all.length;
  document.getElementById('stat-due').textContent   = due;
  document.getElementById('stat-new').textContent   = nw;
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  try {
    initBoard();
  } catch (e) {
    console.error('Board init failed:', e);
  }

  allMistakes = getAllMistakesList();
  updateStats();

  // Show file:// warning if needed
  if (window.location.protocol === 'file:') {
    document.getElementById('cors-warning').style.display = 'block';
  }

  // Auto-start drill if there are due/new cards
  buildDrillQueue();
});
