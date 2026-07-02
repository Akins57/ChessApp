// ── Middlegame Study ──────────────────────────────────────────────────────────

const MG_PIECE_THEME = 'img/chesspieces/wikipedia/{piece}.png';
const MG_KEY = 'chessapp_mg_progress';

// ── Progress ──────────────────────────────────────────────────────────────────
function mgGetProgress() { return JSON.parse(localStorage.getItem(MG_KEY) || '{}'); }
function mgSaveProgress(p) { localStorage.setItem(MG_KEY, JSON.stringify(p)); }

function mgGetTopic(id) {
  return mgGetProgress()[id] || { done: false, exercisesDone: 0 };
}
function mgSetDone(id, done) {
  const p = mgGetProgress();
  if (!p[id]) p[id] = { done: false, exercisesDone: 0 };
  p[id].done = done;
  mgSaveProgress(p);
}
function mgRecordExercise(id, idx) {
  const p = mgGetProgress();
  if (!p[id]) p[id] = { done: false, exercisesDone: 0 };
  if (idx + 1 > p[id].exercisesDone) p[id].exercisesDone = idx + 1;
  mgSaveProgress(p);
}

// ── State ─────────────────────────────────────────────────────────────────────
let currentTopicId  = null;
let currentLesson   = null;
let exampleBoards   = [];
let exerciseBoards  = [];
let exerciseGames   = [];
let exerciseTaps    = [];
let exerciseStates  = [];

// ── Sidebar ───────────────────────────────────────────────────────────────────
function renderSidebar() {
  const container = document.getElementById('mg-sidebar-levels');
  container.innerHTML = '';
  const p = mgGetProgress();
  let totalDone = 0;
  const allTopics = window.MG_CURRICULUM.reduce((s, l) => s + l.topics.length, 0);

  for (const level of window.MG_CURRICULUM) {
    const levelDone = level.topics.filter(id => p[id]?.done).length;
    totalDone += levelDone;

    const levelDiv = document.createElement('div');
    levelDiv.className = 'mg-level';

    const isCollapsed = level.level > 1;
    levelDiv.innerHTML = `
      <div class="mg-level-header">
        <span class="mg-level-toggle">${isCollapsed ? '▸' : '▾'}</span>
        <span class="mg-level-name">Level ${level.level}: ${level.label}</span>
        <span class="mg-level-count">${levelDone}/${level.topics.length}</span>
      </div>
      <div class="mg-level-topics" style="${isCollapsed ? 'display:none' : ''}"></div>
    `;

    const header    = levelDiv.querySelector('.mg-level-header');
    const toggle    = levelDiv.querySelector('.mg-level-toggle');
    const topicsDiv = levelDiv.querySelector('.mg-level-topics');

    header.addEventListener('click', () => {
      const hidden = topicsDiv.style.display === 'none';
      topicsDiv.style.display = hidden ? '' : 'none';
      toggle.textContent = hidden ? '▾' : '▸';
    });

    for (const topicId of level.topics) {
      const lesson = window.MG_LESSONS[topicId];
      const isDone = p[topicId]?.done || false;
      const isActive = topicId === currentTopicId;
      const item = document.createElement('div');
      item.className = 'mg-topic-item' + (isDone ? ' done' : '') + (isActive ? ' active' : '');
      item.dataset.topic = topicId;
      item.innerHTML = `
        <span class="mg-topic-name">${lesson ? lesson.title : topicId}</span>
        <span class="mg-topic-check">${isDone ? '✓' : ''}</span>
      `;
      item.addEventListener('click', () => selectTopic(topicId));
      topicsDiv.appendChild(item);
    }

    container.appendChild(levelDiv);
  }

  document.getElementById('mg-overall-progress').textContent =
    `${totalDone} / ${allTopics} topics done`;
  const wp = document.getElementById('mg-welcome-progress');
  if (wp) wp.textContent = totalDone > 0
    ? `You have completed ${totalDone} of ${allTopics} topics.` : '';
}

// ── Board management ──────────────────────────────────────────────────────────
function destroyAllBoards() {
  exampleBoards.forEach(b => { try { b.destroy(); } catch(e) {} });
  exerciseBoards.forEach(b => { try { b.destroy(); } catch(e) {} });
  exampleBoards  = [];
  exerciseBoards = [];
  exerciseGames  = [];
  exerciseTaps   = [];
  exerciseStates = [];
}

// ── Example boards (read-only) ────────────────────────────────────────────────
function renderExamples(examples) {
  const container = document.getElementById('mg-examples');
  container.innerHTML = '';

  examples.forEach((ex, i) => {
    const id = `mg-example-${i}`;
    const card = document.createElement('div');
    card.className = 'mg-example-card';
    card.innerHTML = `
      <div id="${id}" class="mg-example-board"></div>
      <p class="mg-example-caption">${ex.caption}</p>
    `;
    container.appendChild(card);

    const board = Chessboard(id, {
      draggable: false,
      position: ex.fen,
      orientation: ex.orientation || 'white',
      pieceTheme: MG_PIECE_THEME
    });
    exampleBoards.push(board);
  });
}

// ── Exercise engine ───────────────────────────────────────────────────────────
function renderExercises(exercises) {
  const container = document.getElementById('mg-exercises');
  container.innerHTML = '';
  updateExCount(0, exercises.length);

  exercises.forEach((ex, i) => {
    const boardId = `mg-exercise-${i}`;
    const card = document.createElement('div');
    card.className = 'mg-ex-card' + (i === 0 ? '' : ' mg-ex-locked');
    card.id = `mg-ex-card-${i}`;
    card.innerHTML = `
      <div class="mg-ex-card-header">
        <span class="mg-ex-number">Exercise ${i + 1}</span>
        <span class="mg-ex-status" id="mg-ex-status-${i}"></span>
      </div>
      <div class="mg-ex-board-wrap" id="mg-ex-wrap-${i}">
        <div id="${boardId}" class="mg-ex-board"></div>
      </div>
      <div class="mg-ex-feedback" id="mg-ex-feedback-${i}"></div>
      <div class="mg-ex-actions" id="mg-ex-actions-${i}" style="display:none">
        <button class="btn btn-secondary" id="mg-ex-reveal-${i}"
                onclick="revealExercise(${i})" style="display:none">
          Show Solution
        </button>
      </div>
    `;
    container.appendChild(card);
    initExerciseBoard(boardId, ex, i);
  });
}

function initExerciseBoard(boardId, ex, index) {
  const game = new Chess(ex.fen);

  // Auto-play the trigger move (moves[0])
  const trigger = ex.moves[0];
  game.move({ from: trigger.slice(0, 2), to: trigger.slice(2, 4), promotion: trigger[4] || 'q' });

  const orientation = game.turn() === 'w' ? 'white' : 'black';
  const board = Chessboard(boardId, {
    draggable: false,
    position: game.fen(),
    orientation: orientation,
    pieceTheme: MG_PIECE_THEME
  });

  const state = { done: false, failed: false, moveIdx: 1 };

  // Closure captures index at definition time
  const tap = createTapToMove(
    boardId,
    () => exerciseGames[index],
    () => exerciseBoards[index],
    (from, to) => onExerciseDrop(index, from, to),
    () => !exerciseStates[index].done
  );

  exerciseBoards.push(board);
  exerciseGames.push(game);
  exerciseTaps.push(tap);
  exerciseStates.push(state);
}

function onExerciseDrop(index, source, target) {
  const game  = exerciseGames[index];
  const board = exerciseBoards[index];
  const state = exerciseStates[index];
  const ex    = currentLesson.exercises[index];

  if (!game || state.done) return 'snapback';

  const move = game.move({ from: source, to: target, promotion: 'q' });
  if (!move) return 'snapback';

  const played   = source + target + (move.promotion || '');
  const expected = ex.moves[state.moveIdx];
  const matches  = played === expected ||
                   (played.slice(0, 4) === expected.slice(0, 4) && expected.length === 4);

  if (matches) {
    state.moveIdx++;
    flashExercise(index, 'correct');

    if (state.moveIdx >= ex.moves.length) {
      onExerciseSolved(index);
    } else {
      setTimeout(() => playAutoMove(index), 500);
    }
  } else {
    game.undo();
    board.position(game.fen());
    flashExercise(index, 'wrong');
    onExerciseWrong(index);
  }
}

function playAutoMove(index) {
  const game  = exerciseGames[index];
  const board = exerciseBoards[index];
  const state = exerciseStates[index];
  const ex    = currentLesson.exercises[index];

  if (state.moveIdx >= ex.moves.length) return;
  const m = ex.moves[state.moveIdx];
  game.move({ from: m.slice(0, 2), to: m.slice(2, 4), promotion: m[4] || 'q' });
  board.position(game.fen());
  state.moveIdx++;

  if (state.moveIdx >= ex.moves.length) {
    onExerciseSolved(index);
  }
}

function onExerciseSolved(index) {
  const state = exerciseStates[index];
  state.done = true;
  mgRecordExercise(currentTopicId, index);

  const statusEl   = document.getElementById(`mg-ex-status-${index}`);
  const feedbackEl = document.getElementById(`mg-ex-feedback-${index}`);
  const actionsEl  = document.getElementById(`mg-ex-actions-${index}`);
  const card       = document.getElementById(`mg-ex-card-${index}`);

  statusEl.textContent = '✓ Solved';
  statusEl.className   = 'mg-ex-status solved';
  feedbackEl.textContent = state.failed ? 'Solved after hint.' : 'Correct!';
  feedbackEl.className   = 'mg-ex-feedback correct';
  card.classList.add('mg-ex-done');
  actionsEl.style.display = 'none';

  const solvedCount = exerciseStates.filter(s => s.done).length;
  updateExCount(solvedCount, currentLesson.exercises.length);
  updateDoneArea();

  // Unlock next exercise
  const next = index + 1;
  if (next < currentLesson.exercises.length) {
    const nextCard = document.getElementById(`mg-ex-card-${next}`);
    if (nextCard) {
      nextCard.classList.remove('mg-ex-locked');
      if (exerciseTaps[next]) exerciseTaps[next].reset();
      setTimeout(() => nextCard.scrollIntoView({ behavior: 'smooth', block: 'start' }), 300);
    }
  }
}

function onExerciseWrong(index) {
  const state = exerciseStates[index];
  if (!state.failed) {
    state.failed = true;
    const feedbackEl = document.getElementById(`mg-ex-feedback-${index}`);
    const actionsEl  = document.getElementById(`mg-ex-actions-${index}`);
    const revealBtn  = document.getElementById(`mg-ex-reveal-${index}`);
    feedbackEl.textContent = 'Wrong — try again or reveal the solution.';
    feedbackEl.className   = 'mg-ex-feedback wrong';
    actionsEl.style.display = 'flex';
    if (revealBtn) revealBtn.style.display = 'inline-block';
  }
}

function revealExercise(index) {
  const game  = exerciseGames[index];
  const board = exerciseBoards[index];
  const state = exerciseStates[index];
  const ex    = currentLesson.exercises[index];

  const remaining = ex.moves.slice(state.moveIdx);
  let delay = 0;
  for (const m of remaining) {
    setTimeout(() => {
      game.move({ from: m.slice(0, 2), to: m.slice(2, 4), promotion: m[4] || 'q' });
      board.position(game.fen());
    }, delay);
    delay += 700;
  }
  setTimeout(() => {
    state.moveIdx = ex.moves.length;
    onExerciseSolved(index);
  }, delay);
}

function flashExercise(index, type) {
  const wrap = document.getElementById(`mg-ex-wrap-${index}`);
  if (!wrap) return;
  wrap.classList.remove('flash-correct', 'flash-wrong');
  void wrap.offsetWidth;
  wrap.classList.add('flash-' + type);
}

function updateExCount(solved, total) {
  const el = document.getElementById('mg-ex-count');
  if (el) el.textContent = `${solved} / ${total} solved`;
}

// ── Mark as Done ──────────────────────────────────────────────────────────────
function updateDoneArea() {
  const btn  = document.getElementById('mg-done-btn');
  const note = document.getElementById('mg-done-note');
  const tp   = mgGetTopic(currentTopicId);

  if (tp.done) {
    btn.textContent = 'Marked as Done ✓';
    btn.className   = 'btn mg-done-btn mg-done-confirmed';
    note.textContent = 'Click to unmark.';
  } else {
    btn.textContent = 'Mark as Done';
    btn.className   = 'btn btn-primary mg-done-btn';
    const solvedCount = exerciseStates.filter(s => s.done).length;
    const total       = currentLesson ? currentLesson.exercises.length : 0;
    note.textContent  = solvedCount > 0
      ? `${solvedCount} of ${total} exercises completed.`
      : 'Mark done when you understand the concept.';
  }
}

function markTopicDone() {
  const tp = mgGetTopic(currentTopicId);
  mgSetDone(currentTopicId, !tp.done);
  updateDoneArea();
  renderSidebar();
}

// ── Load topic ────────────────────────────────────────────────────────────────
function selectTopic(topicId) {
  destroyAllBoards();
  currentTopicId = topicId;
  currentLesson  = window.MG_LESSONS[topicId];
  if (!currentLesson) return;

  document.getElementById('mg-welcome').style.display = 'none';
  document.getElementById('mg-lesson').style.display  = '';

  document.getElementById('mg-lesson-title').textContent = currentLesson.title;
  const badge = document.getElementById('mg-level-badge');
  badge.textContent = `Level ${currentLesson.level}`;
  badge.className   = `mg-level-badge mg-level-${currentLesson.level}`;

  // Summary
  document.getElementById('mg-summary').innerHTML =
    currentLesson.summary.map(p => `<p>${p}</p>`).join('');

  // Examples + exercises
  renderExamples(currentLesson.examples);
  renderExercises(currentLesson.exercises);
  updateDoneArea();
  renderSidebar();

  document.getElementById('mg-main').scrollTop = 0;
}

// ── Resize all boards on window resize ───────────────────────────────────────
function resizeAllBoards() {
  [...exampleBoards, ...exerciseBoards].forEach(b => {
    try { b.resize(); } catch(e) {}
  });
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────
function init() {
  if (!window.MG_LESSONS || !window.MG_CURRICULUM) {
    document.getElementById('mg-welcome').innerHTML =
      '<p style="color:#e94560;padding:40px">Lesson data not found. Check that data/middlegame_lessons.js is loaded.</p>';
    return;
  }
  renderSidebar();
  window.addEventListener('resize', resizeAllBoards);
}

document.addEventListener('DOMContentLoaded', init);
