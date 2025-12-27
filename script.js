// Accurate stopwatch using performance.now() and requestAnimationFrame
const displayEl = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let startTime = 0;      // timestamp when started (ms)
let elapsed = 0;        // elapsed time while paused (ms)
let running = false;
let rafId = null;

function formatTime(ms) {
  const totalCentis = Math.floor(ms / 10);
  const centis = totalCentis % 100;
  const totalSeconds = Math.floor(totalCentis / 100);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  const hh = String(hours).padStart(2,'0');
  const mm = String(minutes).padStart(2,'0');
  const ss = String(seconds).padStart(2,'0');
  const cs = String(centis).padStart(2,'0');

  return `${hh}:${mm}:${ss}.${cs}`;
}

function update() {
  const now = performance.now();
  const diff = now - startTime + elapsed;
  // update numeric overlay
  const numeric = document.getElementById('numeric');
  if (numeric) numeric.textContent = formatTime(diff);

  // rotate main hand: one full rotation per 60 seconds
  const hand = document.getElementById('dialHand');
  if (hand) {
    const seconds = diff / 1000;
    const angle = (seconds % 60) * 6; // 6deg per second
    hand.style.transform = `rotate(${angle}deg)`;
  }

  // rotate sub-hand (minutes/seconds indicator) slowly (one rotation per 60 minutes)
  const sub = document.querySelector('.sub-hand');
  if (sub) {
    const minutes = Math.floor(diff / 60000);
    const subAngle = ((diff / 60000) % 60) * 6; // 6deg per minute tick
    sub.style.transform = `rotate(${subAngle}deg)`;
  }
  rafId = requestAnimationFrame(update);
}

function start() {
  if (running) return;
  startTime = performance.now();
  running = true;
  rafId = requestAnimationFrame(update);
  startBtn.disabled = true;
  if (pauseBtn) pauseBtn.textContent = 'Pause';
  document.body.classList.add("running");

}

function stop() {
  // Make Stop behave like a pause (preserve elapsed), so Start will resume
  if (!running) return;
  cancelAnimationFrame(rafId);
  elapsed += performance.now() - startTime;
  startTime = 0;
  running = false;
  startBtn.disabled = false;
  if (pauseBtn) pauseBtn.textContent = 'Resume';
  document.body.classList.remove("running");

}


function reset() {
  // stop any running RAF and clear elapsed, then start fresh from zero
  if (rafId) cancelAnimationFrame(rafId);
  startTime = 0;
  elapsed = 0;
  running = false;
  document.body.classList.remove("running");


  // set numeric and hands to zero immediately
  const numeric = document.getElementById('numeric');
  if (numeric) numeric.textContent = '00:00:00.00';
  const hand = document.getElementById('dialHand');
  if (hand) hand.style.transform = 'rotate(0deg)';
  const sub = document.querySelector('.sub-hand');
  if (sub) sub.style.transform = 'rotate(0deg)';

  // disable Start button and reset Pause button text
  startBtn.disabled = false;
  if (pauseBtn) pauseBtn.textContent = 'Pause';
}

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
if (pauseBtn) {
  pauseBtn.addEventListener('click', () => {
    if (running) pause();
    // if not running, do nothing — use Start to resume
  });
}
resetBtn.addEventListener('click', reset);

// Keyboard shortcuts: Space = start/stop, R = reset
window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    running ? stop() : start();
  } else if (e.key.toLowerCase() === 'r') {
    reset();
  }
});

// build 60 ticks and numeric labels once
function buildTicks(){
  const ticksEl = document.getElementById('ticks');
  if (!ticksEl) return;
  for(let i=0;i<60;i++){
    const t = document.createElement('div');
    t.className = 'tick';
    const angle = i * 6;
    t.style.transform = `translateX(-50%) rotate(${angle}deg)`;
    if (i % 5 === 0){
      t.classList.add('major');
      const lbl = document.createElement('div');
      lbl.className = 'label';
      const value = (i===0?60:i);
      lbl.textContent = value;
      lbl.style.transform = `translateX(-50%) rotate(${angle}deg)`;
      ticksEl.appendChild(lbl);
    }
    ticksEl.appendChild(t);
  }
}

buildTicks();