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

/* ── NAV ── */
function go(id, btn) {
  document.querySelectorAll('.pg').forEach(function (p) { p.classList.remove('on'); });
  document.querySelectorAll('.nb').forEach(function (b) { b.classList.remove('on'); });
  document.getElementById(id).classList.add('on');
  if (btn) btn.classList.add('on');
  window.scrollTo(0, 0);
}

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
