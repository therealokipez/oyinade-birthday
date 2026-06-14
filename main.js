/* ═══════════════════════════════════════
   BIRTHDAY SITE · main.js
   For You, Barr. O. A. Okunubi 🌹
═══════════════════════════════════════ */

/* ── PETALS ── */
(function () {
  var c = document.getElementById('petals');
  var sizes = [8, 10, 12, 7, 9];
  var colors = ['#f8c8d4', '#d4a0b4', '#e8b4c0', '#f0d0d8', '#c8a0b0'];
  for (var i = 0; i < 22; i++) {
    var p = document.createElement('div');
    p.className = 'petal';
    var s = sizes[i % sizes.length];
    p.style.cssText =
      'left:' + Math.random() * 100 + 'vw;' +
      'width:' + s + 'px;' +
      'height:' + s * 1.4 + 'px;' +
      'background:' + colors[i % colors.length] + ';' +
      'animation-duration:' + (9 + Math.random() * 11) + 's;' +
      'animation-delay:' + Math.random() * 14 + 's;';
    c.appendChild(p);
  }
})();

/* ── PASSWORD ── */
var shown = false;

function togglePwd() {
  var f = document.getElementById('pwd');
  shown = !shown;
  f.type = shown ? 'text' : 'password';
  f.focus();
}

function unlock() {
  var raw = document.getElementById('pwd').value;
  var val = raw.replace(/\s/g, '').toLowerCase();
  if (val === 'oyinade') {
    var lk = document.getElementById('lock');
    lk.style.opacity = '0';
    setTimeout(function () {
      lk.style.display = 'none';
      var s = document.getElementById('site');
      s.style.display = 'block';
      document.getElementById('cfbtn').style.display = 'flex';
      confetti();
      startAutoAdvance();
    }, 800);
  } else {
    var e = document.getElementById('lockerr');
    e.textContent = 'Not quite right — hint: type your name 💕';
    var f = document.getElementById('pwd');
    f.style.borderColor = '#ff8aaa';
    setTimeout(function () {
      e.textContent = '';
      f.style.borderColor = '';
    }, 3500);
  }
}

document.getElementById('unlockBtn').addEventListener('click', unlock);
document.getElementById('pwd').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') unlock();
});

/* ── PAGE ORDER ── */
var pages = ['pw', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7'];
var currentPage = 0;
var autoTimer = null;
var countdownTimer = null;
var AUTO_SECONDS = 30; // seconds before auto-advancing

/* ── NAV ── */
function go(id, btn) {
  // clear any running auto-advance
  clearTimeout(autoTimer);
  clearInterval(countdownTimer);

  document.querySelectorAll('.pg').forEach(function (p) { p.classList.remove('on'); });
  document.querySelectorAll('.nb').forEach(function (b) { b.classList.remove('on'); });

  // slide out old, slide in new
  var el = document.getElementById(id);
  el.classList.add('on');
  if (btn) btn.classList.add('on');

  // update currentPage index
  var idx = pages.indexOf(id);
  if (idx !== -1) currentPage = idx;

  window.scrollTo(0, 0);

  // restart auto-advance
  startAutoAdvance();
}

function goNext() {
  if (currentPage < pages.length - 1) {
    currentPage++;
    var nextId = pages[currentPage];
    var nextBtn = document.querySelectorAll('.nb')[currentPage];
    go(nextId, nextBtn);
  } else {
    // last page — stop timer, hide bar
    clearTimeout(autoTimer);
    clearInterval(countdownTimer);
    updateProgressBar(0);
    hideNextBar();
  }
}

/* ── AUTO ADVANCE ── */
function startAutoAdvance() {
  if (currentPage >= pages.length - 1) {
    hideNextBar();
    return;
  }

  var remaining = AUTO_SECONDS;
  updateProgressBar(100);
  showNextBar(remaining);

  countdownTimer = setInterval(function () {
    remaining--;
    var pct = (remaining / AUTO_SECONDS) * 100;
    updateProgressBar(pct);
    updateCountdownText(remaining);
    if (remaining <= 0) {
      clearInterval(countdownTimer);
    }
  }, 1000);

  autoTimer = setTimeout(function () {
    clearInterval(countdownTimer);
    goNext();
  }, AUTO_SECONDS * 1000);
}

/* ── NEXT BAR UI ── */
function showNextBar(remaining) {
  var bar = document.getElementById('nextBar');
  if (!bar) return;
  bar.style.opacity = '1';
  bar.style.pointerEvents = 'auto';
  updateCountdownText(remaining);
}

function hideNextBar() {
  var bar = document.getElementById('nextBar');
  if (!bar) return;
  bar.style.opacity = '0';
  bar.style.pointerEvents = 'none';
}

function updateProgressBar(pct) {
  var fill = document.getElementById('progressFill');
  if (fill) fill.style.width = pct + '%';
}

function updateCountdownText(sec) {
  var txt = document.getElementById('countdownTxt');
  if (txt) txt.textContent = sec + 's';
}

function skipNext() {
  clearTimeout(autoTimer);
  clearInterval(countdownTimer);
  goNext();
}

function pauseAuto() {
  clearTimeout(autoTimer);
  clearInterval(countdownTimer);
  updateProgressBar(0);
  var txt = document.getElementById('countdownTxt');
  if (txt) txt.textContent = '⏸';
}

/* ── SWIPE SUPPORT ── */
var touchStartX = 0;
var touchStartY = 0;

document.addEventListener('touchstart', function (e) {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', function (e) {
  var dx = e.changedTouches[0].clientX - touchStartX;
  var dy = e.changedTouches[0].clientY - touchStartY;
  // only horizontal swipe, not scroll
  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
    if (dx < 0) {
      // swipe left → next page
      clearTimeout(autoTimer);
      clearInterval(countdownTimer);
      goNext();
    } else if (dx > 0 && currentPage > 0) {
      // swipe right → previous page
      clearTimeout(autoTimer);
      clearInterval(countdownTimer);
      currentPage--;
      var prevId = pages[currentPage];
      var prevBtn = document.querySelectorAll('.nb')[currentPage];
      go(prevId, prevBtn);
    }
  }
}, { passive: true });

/* ── DATES ── */
var d = new Date().toLocaleDateString('en-GB', {
  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
});
['ld1', 'ld2', 'ld3', 'ld4', 'ld5', 'ld6', 'ld7'].forEach(function (id) {
  var el = document.getElementById(id);
  if (el) el.textContent = d;
});

/* ── CONFETTI ── */
function confetti() {
  var colors = ['#F2C4CE', '#C9A96E', '#fff', '#F9E5EA', '#7B2D45', '#ff8ab0', '#D4708A'];
  if (!document.getElementById('cst')) {
    var s = document.createElement('style');
    s.id = 'cst';
    s.textContent = '@keyframes cfall{to{transform:translateY(115vh) rotate(800deg);opacity:0;}}';
    document.head.appendChild(s);
  }
  for (var i = 0; i < 100; i++) {
    (function (i) {
      setTimeout(function () {
        var d = document.createElement('div');
        var sz = 5 + Math.random() * 9;
        d.style.cssText =
          'position:fixed;z-index:9999;pointer-events:none;' +
          'width:' + sz + 'px;height:' + sz + 'px;' +
          'background:' + colors[Math.floor(Math.random() * colors.length)] + ';' +
          'border-radius:' + (Math.random() > .5 ? '50%' : '3px') + ';' +
          'left:' + Math.random() * 100 + 'vw;top:-12px;' +
          'animation:cfall ' + (1.8 + Math.random() * 2.2) + 's ease-in forwards;';
        document.body.appendChild(d);
        setTimeout(function () { d.remove(); }, 5000);
      }, i * 22);
    })(i);
  }
}
