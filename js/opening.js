// ── Config ──────────────────────────────────────────────────────────────────
const PIECE_THEME_OP = 'img/chesspieces/wikipedia/{piece}.png';
const OP_KEY = 'chessapp_op_progress';

// ── State ────────────────────────────────────────────────────────────────────
let allLines = {};        // flat id → line lookup
let currentLine   = null;
let currentMode   = 'study';

// Study mode — main line
let studyIdx       = -1;
let studyPositions = []; // FENs: index 0 = start, index i+1 = after move i
let studySanMoves  = []; // SAN notation for each move

// Study mode — branches
let branchData    = [];  // precomputed branches: { positions[], sanMoves[], atIndex, comments[] }
let activeBranch  = -1;  // -1 = main line, 0+ = branch index

// Test mode
let testIdx      = 0;
let testFailed   = false;
let testLineDone = false;
let testMoves    = [];   // UCI moves for this test attempt (may include branch path)
let testSanMoves = [];   // SAN moves for this test attempt
let testPositions = [];  // FENs for this test attempt
let testComments  = [];  // comments for this test attempt

// Board (single shared instance, swapped between modes)
let opBoard = null;
let opGame  = null;
let opTap   = null;

// ── Helpers ─────────────────────────────────────────────────────────────────
function playUci(game, uci) {
  return game.move({ from: uci.slice(0,2), to: uci.slice(2,4), promotion: uci[4] || 'q' });
}

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
function replayMoves(moves) {
  const g = new Chess();
  const positions = [g.fen()];
  const sanMoves  = [];
  for (const uci of moves) {
    const m = playUci(g, uci);
    if (!m) { console.error('Illegal move:', uci, 'fen:', g.fen()); break; }
    sanMoves.push(m.san);
    positions.push(g.fen());
  }
  return { positions, sanMoves };
}

function precomputeLine(line) {
  // Main line
  const main = replayMoves(line.moves);
  studyPositions = main.positions;
  studySanMoves  = main.sanMoves;

  // Branches
  branchData = [];
  activeBranch = -1;
  if (line.branches) {
    for (const br of line.branches) {
      // Replay main line up to (but not including) the branch point
      const prefix = line.moves.slice(0, br.atIndex);
      const branchMoves = prefix.concat([br.move], br.continuation || []);
      const computed = replayMoves(branchMoves);
      branchData.push({
        atIndex:   br.atIndex,
        name:      br.name,
        move:      br.move,
        comment:   br.comment,
        positions: computed.positions,
        sanMoves:  computed.sanMoves,
        comments:  buildBranchComments(line, br),
      });
    }
  }
}

function buildBranchComments(line, br) {
  // Comments array: main line comments up to branch point, then branch comment + continuation comments
  const comments = [];
  for (let i = 0; i < br.atIndex; i++) {
    comments.push(line.comments[i] || null);
  }
  comments.push(br.comment || null); // the branch move itself
  if (br.contComments) {
    for (const c of br.contComments) comments.push(c);
  }
  return comments;
}

// ── Current view helpers ─────────────────────────────────────────────────────
function viewPositions() { return activeBranch >= 0 ? branchData[activeBranch].positions : studyPositions; }
function viewSanMoves()  { return activeBranch >= 0 ? branchData[activeBranch].sanMoves  : studySanMoves; }
function viewComments()  { return activeBranch >= 0 ? branchData[activeBranch].comments  : currentLine.comments; }
function viewLength()    { return viewSanMoves().length; }

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
    activeBranch = -1;
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
  const maxIdx = viewLength() - 1;
  studyIdx = Math.max(-1, Math.min(idx, maxIdx));
  opBoard.position(viewPositions()[studyIdx + 1], false);

  // Highlight move list
  document.querySelectorAll('.op-half-move').forEach(el => {
    const i = parseInt(el.dataset.idx);
    el.classList.toggle('current', i === studyIdx);
    el.classList.toggle('done', i < studyIdx);
  });

  // Comment
  const comments = viewComments();
  const comment = studyIdx >= 0 ? (comments[studyIdx] || null) : null;
  const cEl = document.getElementById('op-comment');
  if (comment) {
    cEl.textContent = '\uD83D\uDCAC ' + comment;
    cEl.style.display = 'block';
  } else {
    cEl.style.display = 'none';
  }

  // Buttons
  document.getElementById('op-prev-btn').disabled = studyIdx < 0;
  document.getElementById('op-next-btn').disabled = studyIdx >= maxIdx;

  // Scroll move into view
  const active = document.querySelector('.op-half-move.current');
  if (active) active.scrollIntoView({ block: 'nearest' });

  // Update branch indicators
  renderBranchIndicators();
}

function nextMove() { if (studyIdx < viewLength() - 1) navigateToMove(studyIdx + 1); }
function prevMove() { if (studyIdx >= 0) navigateToMove(studyIdx - 1); }

function renderMoveList() {
  const list = document.getElementById('op-move-list');
  list.innerHTML = '';
  const sans = viewSanMoves();
  const comments = viewComments();

  for (let i = 0; i < sans.length; i += 2) {
    const num  = Math.floor(i / 2) + 1;
    const wSan = sans[i]   || '';
    const bSan = sans[i+1] || '';
    const pair = document.createElement('div');
    pair.className = 'op-move-pair';

    const wEl = document.createElement('span');
    wEl.className    = 'op-half-move';
    wEl.dataset.idx  = i;
    wEl.textContent  = wSan;
    if (comments[i]) wEl.classList.add('has-comment');

    const bEl = document.createElement('span');
    bEl.className    = 'op-half-move';
    bEl.dataset.idx  = i + 1;
    bEl.textContent  = bSan;
    if (bSan && comments[i+1]) bEl.classList.add('has-comment');

    pair.innerHTML = `<span class="op-move-num">${num}.</span>`;
    pair.appendChild(wEl);
    if (bSan) pair.appendChild(bEl);
    list.appendChild(pair);

    // Insert branch indicators after the pair that contains the branch point
    if (activeBranch === -1) {
      // On main line — show branch alternatives at this pair
      for (let bi = 0; bi < branchData.length; bi++) {
        const br = branchData[bi];
        if (br.atIndex === i + 1) {
          const ind = document.createElement('div');
          ind.className = 'op-branch-indicator';
          ind.innerHTML = `<span class="op-branch-arrow">\u21B3</span> Also: <strong>${br.sanMoves[br.atIndex]}</strong> <span class="op-branch-name">(${br.name})</span>`;
          ind.addEventListener('click', () => switchToBranch(bi));
          list.appendChild(ind);
        }
      }
    }
  }

  // If on a branch, show "back to main line" at top
  if (activeBranch >= 0) {
    const back = document.createElement('div');
    back.className = 'op-branch-back';
    back.textContent = '\u21A9 Back to main line';
    back.addEventListener('click', () => switchToBranch(-1));
    list.insertBefore(back, list.firstChild);
  }

  // Click to jump
  list.querySelectorAll('.op-half-move').forEach(el => {
    const idx = parseInt(el.dataset.idx);
    if (!isNaN(idx) && idx < viewLength()) {
      el.addEventListener('click', () => navigateToMove(idx));
    }
  });
}

function switchToBranch(branchIdx) {
  activeBranch = branchIdx;
  studyIdx = -1;
  initBoard('op-board', false);
  renderMoveList();
  navigateToMove(-1);
}

function renderBranchIndicators() {
  // Branch indicators are rendered inline in the move list (see renderMoveList)
  // This function can be used for additional highlighting if needed
}

// ── Test mode ─────────────────────────────────────────────────────────────────
function buildTestSequence() {
  // Build a test path that may randomly choose branch responses at branch points
  const line = currentLine;
  const branches = line.branches || [];

  // Build a map of branch points: atIndex → branch
  const branchMap = {};
  for (const br of branches) {
    if (!branchMap[br.atIndex]) branchMap[br.atIndex] = [];
    branchMap[br.atIndex].push(br);
  }

  // Walk through moves, randomly choosing at branch points
  const g = new Chess();
  testMoves    = [];
  testSanMoves = [];
  testPositions = [g.fen()];
  testComments  = [];

  let i = 0;
  while (i < line.moves.length) {
    // Check if this index is a branch point
    if (branchMap[i]) {
      const alternatives = branchMap[i];
      // 50% chance of taking a random branch (if multiple, pick one)
      if (Math.random() < 0.5) {
        const chosen = alternatives[Math.floor(Math.random() * alternatives.length)];
        // Play the branch move
        const m = playUci(g, chosen.move);
        if (!m) break;
        testMoves.push(chosen.move);
        testSanMoves.push(m.san);
        testPositions.push(g.fen());
        testComments.push(chosen.comment || null);

        // Play the continuation
        const cont = chosen.continuation || [];
        const contComments = chosen.contComments || [];
        for (let ci = 0; ci < cont.length; ci++) {
          const cm = playUci(g, cont[ci]);
          if (!cm) break;
          testMoves.push(cont[ci]);
          testSanMoves.push(cm.san);
          testPositions.push(g.fen());
          testComments.push(contComments[ci] || null);
        }
        return; // branch replaces the rest of the main line
      }
    }

    // Main line move
    const m = playUci(g, line.moves[i]);
    if (!m) break;
    testMoves.push(line.moves[i]);
    testSanMoves.push(m.san);
    testPositions.push(g.fen());
    testComments.push(line.comments[i] || null);
    i++;
  }
}

function startTest() {
  testIdx      = 0;
  testFailed   = false;
  testLineDone = false;
  buildTestSequence();
  initBoard('op-board-test', true);
  document.getElementById('op-test-status').textContent = 'Your move as White \u25B6';
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

  const expected = testMoves[testIdx];
  const isCorrect = source === expected.slice(0,2) && target === expected.slice(2,4);

  const move = opGame.move({ from: source, to: target, promotion: expected[4] || 'q' });
  if (!move) return 'snapback';

  if (isCorrect) {
    opBoard.position(opGame.fen(), false);
    flashOpBoard('correct');
    addTestLog(testSanMoves[testIdx], 'correct', testComments[testIdx]);
    testIdx++;

    if (testIdx >= testMoves.length) {
      onTestComplete();
    } else {
      document.getElementById('op-test-status').textContent = '\u2713 Correct!';
      document.getElementById('op-test-status').className   = 'op-test-status ok';
      setTimeout(playTestAutoMove, 550);
    }
  } else {
    opGame.undo();
    opBoard.position(opGame.fen(), false);
    flashOpBoard('wrong');
    testFailed = true;
    const correctSAN = testSanMoves[testIdx] || '?';
    document.getElementById('op-test-status').textContent = '\u2717 Wrong! Correct was ' + correctSAN;
    document.getElementById('op-test-status').className   = 'op-test-status bad';
    addTestLog(move.san + ' (wrong)', 'wrong', 'Correct: ' + correctSAN);
  }
}

function playTestAutoMove() {
  if (testIdx >= testMoves.length) return;
  const uci  = testMoves[testIdx];
  const move = playUci(opGame, uci);
  if (move) {
    opBoard.position(opGame.fen(), false);
    addTestLog(move.san, 'auto', null);
    testIdx++;
  }
  if (testIdx >= testMoves.length) {
    onTestComplete();
  } else {
    document.getElementById('op-test-status').textContent = 'Your move as White \u25B6';
    document.getElementById('op-test-status').className   = 'op-test-status';
  }
}

function onTestComplete() {
  testLineDone = true;
  const el = document.getElementById('op-test-complete');
  if (!testFailed) {
    el.textContent  = '\u2713 Perfect! You played the line from memory.';
    el.className    = 'op-test-complete success';
  } else {
    el.textContent  = '\u2713 Line complete \u2014 review the mistakes and try again.';
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
  item.innerHTML = '<span class="op-log-san">' + san + '</span>' + (comment ? '<span class="op-log-comment">' + comment + '</span>' : '');
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
    btn.textContent = learned ? '\u2713 Marked as Learned' : 'Mark as Learned';
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
        <span class="op-section-toggle" id="op-toggle-${section.id}">\u25BE</span>
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
            <span class="op-line-check">${prog[line.id]?.learned ? '\u2713' : ''}</span>
          </div>
        `).join('')}
      </div>
    `;
    container.appendChild(sEl);
  }

  document.getElementById('op-progress-summary').textContent =
    totalLearned + ' / ' + totalLines + ' lines learned';
}

function toggleSection(id) {
  const linesEl  = document.getElementById('op-lines-'  + id);
  const toggleEl = document.getElementById('op-toggle-' + id);
  const open     = linesEl.style.display !== 'none';
  linesEl.style.display  = open ? 'none' : 'block';
  toggleEl.textContent   = open ? '\u25B8' : '\u25BE';
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
