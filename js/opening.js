// ── Config ──────────────────────────────────────────────────────────────────
const PIECE_THEME_OP = 'img/chesspieces/wikipedia/{piece}.png';
const OP_KEY = 'chessapp_op_progress';

// ── State ────────────────────────────────────────────────────────────────────
let allLines = {};        // flat id → line lookup
let currentLine   = null;
let currentMode   = 'study';

// Study mode
let studyIdx       = -1;
let studyPositions = []; // FENs: index 0 = start, index i+1 = after move i
let studySanMoves  = []; // SAN notation for each move

// Test mode
let testIdx      = 0;
let testFailed   = false;
let testLineDone = false;

// Board (single shared instance, swapped between modes)
let opBoard = null;
let opGame  = null;
let opTap   = null;

// ── Progress ─────────────────────────────────────────────────────────────────
function getProgress()   { return JSON.parse(localStorage.getItem(OP_KEY) || '{}'); }
function saveProgress(p) { localStorage.setItem(OP_KEY, JSON.stringify(p)); }
function isLearned(id)   { return !!(getProgress()[id]?.learned); }
function toggleLearned(id) {
  const p = getProgress();
  if (!p[id]) p[id] = {};
  p[id].learned = !p[id].learned;
  saveProgress(p);
}

// ── Board management ─────────────────────────────────────────────────────────
function destroyBoard() {
  opTap = null;
  if (opBoard) { try { opBoard.destroy(); } catch(_) {} opBoard = null; }
  opGame = null;
}

function initBoard(boardId, interactive) {
  destroyBoard();
  opGame  = new Chess();
  opBoard = Chessboard(boardId, {
    draggable: false,
    position:  'start',
    orientation: 'white',
    pieceTheme: PIECE_THEME_OP,
  });
  if (interactive) {
    opTap = createTapToMove(boardId, () => opGame, () => opBoard, onTestDrop, () => !testLineDone);
  }
  window.addEventListener('resize', () => opBoard && opBoard.resize());
}

// ── Precompute line ───────────────────────────────────────────────────────────
function precomputeLine(line) {
  studyPositions = [];
  studySanMoves  = [];
  const g = new Chess();
  studyPositions.push(g.fen());
  for (const uci of line.moves) {
    const m = g.move({ from: uci.slice(0,2), to: uci.slice(2,4), promotion: uci[4] || 'q' });
    if (!m) { console.error('Illegal move in opening data:', uci, 'fen:', g.fen()); break; }
    studySanMoves.push(m.san);
    studyPositions.push(g.fen());
  }
}

// ── Select line ───────────────────────────────────────────────────────────────
function selectLine(lineId) {
  currentLine = allLines[lineId];
  if (!currentLine) return;

  // Sidebar highlight
  document.querySelectorAll('.op-line-item').forEach(el =>
    el.classList.toggle('active', el.dataset.lineId === lineId)
  );

  // Precompute
  precomputeLine(currentLine);

  // Show lesson panel
  document.getElementById('op-welcome').style.display = 'none';
  document.getElementById('op-lesson').style.display  = 'block';

  // Fill header
  document.getElementById('op-line-name').textContent = currentLine.name;
  document.getElementById('op-eco-badge').textContent  = currentLine.eco;

  // Fill summary + ideas
  document.getElementById('op-summary').textContent = currentLine.summary;
  document.getElementById('op-ideas').innerHTML =
    currentLine.ideas.map(i => `<li>${i}</li>`).join('');

  // Mark-as-learned button state
  updateLearnBtn();

  // Default to study
  switchMode('study');
}

// ── Mode switching ────────────────────────────────────────────────────────────
function switchMode(mode) {
  currentMode = mode;
  const isStudy = mode === 'study';
  document.getElementById('op-tab-study').classList.toggle('active', isStudy);
  document.getElementById('op-tab-test').classList.toggle('active', !isStudy);
  document.getElementById('op-study-area').style.display = isStudy ? 'flex' : 'none';
  document.getElementById('op-test-area').style.display  = isStudy ? 'none'  : 'flex';

  if (isStudy) {
    initBoard('op-board', false);
    studyIdx = -1;
    renderMoveList();
    navigateToMove(-1);
  } else {
    startTest();
  }
}

// ── Study mode ────────────────────────────────────────────────────────────────
function navigateToMove(idx) {
  studyIdx = Math.max(-1, Math.min(idx, currentLine.moves.length - 1));
  opBoard.position(studyPositions[studyIdx + 1], false);

  // Highlight move list
  document.querySelectorAll('.op-half-move').forEach(el => {
    const i = parseInt(el.dataset.idx);
    el.classList.toggle('current', i === studyIdx);
    el.classList.toggle('done', i < studyIdx);
  });

  // Comment
  const comment = studyIdx >= 0 ? currentLine.comments[studyIdx] : null;
  const cEl = document.getElementById('op-comment');
  if (comment) {
    cEl.textContent = '💬 ' + comment;
    cEl.style.display = 'block';
  } else {
    cEl.style.display = 'none';
  }

  // Buttons
  document.getElementById('op-prev-btn').disabled = studyIdx < 0;
  document.getElementById('op-next-btn').disabled = studyIdx >= currentLine.moves.length - 1;

  // Scroll move into view
  const active = document.querySelector('.op-half-move.current');
  if (active) active.scrollIntoView({ block: 'nearest' });
}

function nextMove() { if (studyIdx < currentLine.moves.length - 1) navigateToMove(studyIdx + 1); }
function prevMove() { if (studyIdx >= 0) navigateToMove(studyIdx - 1); }

function renderMoveList() {
  const list = document.getElementById('op-move-list');
  list.innerHTML = '';
  for (let i = 0; i < studySanMoves.length; i += 2) {
    const num  = Math.floor(i / 2) + 1;
    const wSan = studySanMoves[i]   || '';
    const bSan = studySanMoves[i+1] || '';
    const pair = document.createElement('div');
    pair.className = 'op-move-pair';

    const wEl = document.createElement('span');
    wEl.className    = 'op-half-move';
    wEl.dataset.idx  = i;
    wEl.textContent  = wSan;
    if (currentLine.comments[i]) wEl.classList.add('has-comment');

    const bEl = document.createElement('span');
    bEl.className    = 'op-half-move';
    bEl.dataset.idx  = i + 1;
    bEl.textContent  = bSan;
    if (bSan && currentLine.comments[i+1]) bEl.classList.add('has-comment');

    pair.innerHTML = `<span class="op-move-num">${num}.</span>`;
    pair.appendChild(wEl);
    if (bSan) pair.appendChild(bEl);
    list.appendChild(pair);
  }
  // Click to jump
  list.querySelectorAll('.op-half-move').forEach(el => {
    const idx = parseInt(el.dataset.idx);
    if (!isNaN(idx) && idx < currentLine.moves.length) {
      el.addEventListener('click', () => navigateToMove(idx));
    }
  });
}

// ── Test mode ─────────────────────────────────────────────────────────────────
function startTest() {
  testIdx      = 0;
  testFailed   = false;
  testLineDone = false;
  initBoard('op-board', true);
  document.getElementById('op-test-status').textContent = 'Your move as White ▶';
  document.getElementById('op-test-status').className   = 'op-test-status';
  document.getElementById('op-test-complete').style.display  = 'none';
  document.getElementById('op-test-restart-btn').style.display = 'none';
  document.getElementById('op-test-learn-area').style.display = 'none';
  document.getElementById('op-test-log').innerHTML = '';
}

function onTestDrop(source, target) {
  if (testLineDone) return 'snapback';

  // Only accept White's turns (even indices)
  if (testIdx % 2 !== 0) return 'snapback';

  const expected = currentLine.moves[testIdx];
  const isCorrect = source === expected.slice(0,2) && target === expected.slice(2,4);

  const move = opGame.move({ from: source, to: target, promotion: expected[4] || 'q' });
  if (!move) return 'snapback';

  if (isCorrect) {
    opBoard.position(opGame.fen(), false);
    flashOpBoard('correct');
    addTestLog(studySanMoves[testIdx], 'correct', currentLine.comments[testIdx]);
    testIdx++;

    if (testIdx >= currentLine.moves.length) {
      onTestComplete();
    } else {
      document.getElementById('op-test-status').textContent = '✓ Correct!';
      document.getElementById('op-test-status').className   = 'op-test-status ok';
      setTimeout(playTestAutoMove, 550);
    }
  } else {
    opGame.undo();
    opBoard.position(opGame.fen(), false);
    flashOpBoard('wrong');
    testFailed = true;
    const correctSAN = studySanMoves[testIdx] || '?';
    document.getElementById('op-test-status').textContent = `✗ Wrong! Correct was ${correctSAN}`;
    document.getElementById('op-test-status').className   = 'op-test-status bad';
    addTestLog(move.san + ' (wrong)', 'wrong', `Correct: ${correctSAN}`);
  }
}

function playTestAutoMove() {
  if (testIdx >= currentLine.moves.length) return;
  const uci  = currentLine.moves[testIdx];
  const move = opGame.move({ from: uci.slice(0,2), to: uci.slice(2,4), promotion: uci[4] || 'q' });
  if (move) {
    opBoard.position(opGame.fen(), false);
    addTestLog(move.san, 'auto', null);
    testIdx++;
  }
  if (testIdx >= currentLine.moves.length) {
    onTestComplete();
  } else {
    document.getElementById('op-test-status').textContent = 'Your move as White ▶';
    document.getElementById('op-test-status').className   = 'op-test-status';
  }
}

function onTestComplete() {
  testLineDone = true;
  const el = document.getElementById('op-test-complete');
  if (!testFailed) {
    el.textContent  = '✓ Perfect! You played the line from memory.';
    el.className    = 'op-test-complete success';
  } else {
    el.textContent  = '✓ Line complete — review the mistakes and try again.';
    el.className    = 'op-test-complete partial';
  }
  el.style.display = 'block';
  document.getElementById('op-test-restart-btn').style.display   = 'inline-flex';
  document.getElementById('op-test-learn-area').style.display    = 'flex';
}

function addTestLog(san, type, comment) {
  const log  = document.getElementById('op-test-log');
  const item = document.createElement('div');
  item.className = 'op-log-item ' + type;
  item.innerHTML = `<span class="op-log-san">${san}</span>${comment ? `<span class="op-log-comment">${comment}</span>` : ''}`;
  log.appendChild(item);
  log.scrollTop = log.scrollHeight;
}

// ── Flash ─────────────────────────────────────────────────────────────────────
function flashOpBoard(type) {
  const id   = currentMode === 'study' ? 'op-board-wrap' : 'op-board-wrap-test';
  const wrap = document.getElementById(id) || document.getElementById('op-board-wrap');
  wrap.classList.remove('flash-correct', 'flash-wrong');
  void wrap.offsetWidth;
  wrap.classList.add('flash-' + type);
}

// ── Mark as Learned ───────────────────────────────────────────────────────────
function markLearned() {
  if (!currentLine) return;
  toggleLearned(currentLine.id);
  updateLearnBtn();
  renderSidebar();
  // Restore active state
  document.querySelectorAll('.op-line-item').forEach(el =>
    el.classList.toggle('active', el.dataset.lineId === currentLine.id)
  );
}

function updateLearnBtn() {
  const learned = currentLine && isLearned(currentLine.id);
  ['op-learn-btn','op-learn-btn-test'].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.textContent = learned ? '✓ Marked as Learned' : 'Mark as Learned';
    btn.classList.toggle('op-learned-confirmed', !!learned);
  });
}

// ── Sidebar ───────────────────────────────────────────────────────────────────
function renderSidebar() {
  const container = document.getElementById('op-sidebar-sections');
  container.innerHTML = '';
  const prog = getProgress();
  let totalLearned = 0;
  let totalLines   = 0;

  for (const section of window.OPENING_REPERTOIRE.sections) {
    const learnedCount = section.lines.filter(l => prog[l.id]?.learned).length;
    totalLearned += learnedCount;
    totalLines   += section.lines.length;

    const sEl = document.createElement('div');
    sEl.className = 'op-section';
    sEl.innerHTML = `
      <div class="op-section-header" onclick="toggleSection('${section.id}')">
        <span class="op-section-toggle" id="op-toggle-${section.id}">▾</span>
        <span class="op-section-name">${section.name}</span>
        <span class="op-section-badge ${section.colorClass}">${section.badge}</span>
        <span class="op-section-count">${learnedCount}/${section.lines.length}</span>
      </div>
      <div class="op-section-lines" id="op-lines-${section.id}">
        ${section.lines.map(line => `
          <div class="op-line-item${prog[line.id]?.learned ? ' learned' : ''}"
               data-line-id="${line.id}"
               onclick="selectLine('${line.id}')">
            <span class="op-line-name">${line.name}</span>
            <span class="op-line-check">${prog[line.id]?.learned ? '✓' : ''}</span>
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(sEl);
  }

  document.getElementById('op-progress-summary').textContent =
    `${totalLearned} / ${totalLines} lines learned`;
}

function toggleSection(id) {
  const linesEl  = document.getElementById('op-lines-'  + id);
  const toggleEl = document.getElementById('op-toggle-' + id);
  const open     = linesEl.style.display !== 'none';
  linesEl.style.display  = open ? 'none' : 'block';
  toggleEl.textContent   = open ? '▸' : '▾';
}

// ── Keyboard navigation ───────────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (!currentLine || currentMode !== 'study') return;
  if (e.key === 'ArrowRight') nextMove();
  if (e.key === 'ArrowLeft')  prevMove();
});

// ── Init ──────────────────────────────────────────────────────────────────────
function init() {
  for (const section of window.OPENING_REPERTOIRE.sections) {
    for (const line of section.lines) {
      allLines[line.id] = line;
    }
  }
  renderSidebar();
}

document.addEventListener('DOMContentLoaded', init);
