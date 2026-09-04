// 랜딩 페이지 동작: 언어 전환 · 릴리스에서 다운로드 정보 읽기 · 스크롤 리빌 ·
// 데모 루프(글쓰기 / 공부 / 일 세 예시). 외부 의존 없음.
(function () {
  'use strict';

  var REPO = 'mcnorton/thinkdown';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var isKo = function () { return root.getAttribute('data-lang') === 'ko'; };
  var L = function (o) { return isKo() ? o.ko : o.en; };

  // ── 데모 예시 ─────────────────────────────────────────────────────
  // 흔한 세 상황을 각각 보여 준다. 트리는 여기서만 정의하고 마크다운은 트리에서
  // 파생시킨다 — 두 벌을 손으로 맞추면 반드시 어긋난다(앱에서 마크다운이 트리에서
  // 나오는 관계와 같다).
  //   kind: h=제목 · b=문단 · l=목록 · t=표
  //   move: 2막에서 이 노드를 위로 끌어 올린다(자식과 함께)
  //
  // 엔진이 강제하는 모양 — 어기면 데모가 조용히 망가진다:
  //   · 제목(h) 3개, 각 제목 바로 뒤에 자식 1개씩 = 정확히 6개. build()가 첫 제목
  //     앞의 노드를 버리고, 두 번째 자식은 첫 자식을 덮어쓴다.
  //   · move 는 **세 번째** 제목과 그 자식에만. reorder()가 i<1 에서 빠져나가므로
  //     첫 제목에 달면 '덩어리 옮기기' 장면이 사라진다.
  //   · 셋 중 어딘가에 t(표)가 하나는 있어야 .dnode.tb 강조색이 쓰인다.
  var EXAMPLES = [
    {
      id: 'writing',
      tab: { ko: '글쓰기', en: 'Writing' },
      root: { ko: '독후감 쓰기', en: 'A book report' },
      cap: { ko: '무엇부터 쓸지 못 정해도 시작할 수 있어요. 적어 둔 순서가 그대로 개요가 됩니다.',
             en: 'Start before you know what comes first — the order you settle on is the outline.' },
      nodes: [
        { kind: 'h', ko: '읽은 책',   en: 'The book', md: { ko: '# 읽은 책', en: '# The book' } },
        { kind: 'b', ko: '어린 왕자 — 생텍쥐페리', en: 'The Little Prince — Saint-Exupery',
          md: { ko: '어린 왕자, 생텍쥐페리.', en: 'The Little Prince, by Saint-Exupery.' } },
        { kind: 'h', ko: '기억에 남은 장면', en: 'The scene I remember', md: { ko: '# 기억에 남은 장면', en: '# The scene I remember' } },
        { kind: 'l', ko: '여우와 헤어지는 장면', en: 'Saying goodbye to the fox',
          md: { ko: '- 여우와 헤어지는 장면', en: '- Saying goodbye to the fox' } },
        { kind: 'h', ko: '내 생각', en: 'What I think', move: true, md: { ko: '# 내 생각', en: '# What I think' } },
        { kind: 'l', ko: '나라면 어떻게 했을까', en: 'What I would have done', move: true,
          md: { ko: '- 나라면 어떻게 했을까', en: '- What I would have done' } }
      ]
    },
    {
      id: 'study',
      tab: { ko: '공부', en: 'Studying' },
      root: { ko: '시험 정리 노트', en: 'Revision notes' },
      cap: { ko: '배운 걸 가지로 나눠 두면, 빠진 곳이 눈에 띕니다.',
             en: 'Split what you learned onto branches and the gaps show themselves.' },
      nodes: [
        { kind: 'h', ko: '이번 단원', en: 'This unit', md: { ko: '# 이번 단원', en: '# This unit' } },
        { kind: 'b', ko: '광합성 — 잎에서 일어나는 일', en: 'Photosynthesis — what happens in a leaf',
          md: { ko: '광합성: 잎에서 일어나는 일.', en: 'Photosynthesis: what happens inside a leaf.' } },
        { kind: 'h', ko: '외울 것', en: 'To memorise', md: { ko: '# 외울 것', en: '# To memorise' } },
        { kind: 't', ko: '표 — 용어 · 뜻', en: 'Table — term · meaning',
          md: { ko: '| 용어 | 뜻 |', en: '| Term | Meaning |' } },
        { kind: 'h', ko: '헷갈리는 것', en: 'Still fuzzy', move: true, md: { ko: '# 헷갈리는 것', en: '# Still fuzzy' } },
        { kind: 'l', ko: '증산작용과 어떻게 다른지', en: 'How transpiration differs', move: true,
          md: { ko: '- 증산작용과 어떻게 다른지', en: '- How transpiration differs' } }
      ]
    },
    {
      id: 'work',
      tab: { ko: '일', en: 'Work' },
      root: { ko: '회의 준비', en: 'Meeting prep' },
      cap: { ko: '안건을 미리 짜 두면, 끝나고 나서 그대로 회의록이 됩니다.',
             en: 'Lay the agenda out first and it doubles as the minutes afterwards.' },
      nodes: [
        { kind: 'h', ko: '오늘 정할 것', en: 'To decide today', md: { ko: '# 오늘 정할 것', en: '# To decide today' } },
        { kind: 'b', ko: '다음 달 일정 확정', en: 'Lock next month\'s schedule',
          md: { ko: '다음 달 일정을 확정합니다.', en: 'Lock in next month\'s schedule.' } },
        { kind: 'h', ko: '안건', en: 'Agenda', md: { ko: '# 안건', en: '# Agenda' } },
        { kind: 'l', ko: '예산 · 담당 · 마감', en: 'Budget, owner, deadline',
          md: { ko: '- 예산 · 담당 · 마감', en: '- Budget, owner, deadline' } },
        { kind: 'h', ko: '미리 볼 자료', en: 'Read beforehand', move: true, md: { ko: '# 미리 볼 자료', en: '# Read beforehand' } },
        { kind: 'l', ko: '지난달 결과 한 장 요약', en: 'Last month on one page', move: true,
          md: { ko: '- 지난달 결과 한 장 요약', en: '- Last month on one page' } }
      ]
    }
  ];
  // 제목(h)은 루트의 자식, 나머지는 바로 앞 제목의 자식 — 앱의 트리와 같다.
  var KIND_CLASS = { h: 'dnode h', b: 'dnode', l: 'dnode l', t: 'dnode tb' };

  // ── 언어 전환 ─────────────────────────────────────────────────────
  var langBtn = document.getElementById('lang-btn');
  function paintLangBtn() { langBtn.textContent = isKo() ? 'English' : '한국어'; }
  langBtn.addEventListener('click', function () {
    var next = isKo() ? 'en' : 'ko';
    root.setAttribute('data-lang', next);
    root.setAttribute('lang', next);
    try { localStorage.setItem('thinkdown.site.lang', next); } catch (e) {}
    paintLangBtn(); paintTabs(); paintDownload(); demo.reload();
  });
  paintLangBtn();

  // ── 상단 바 ───────────────────────────────────────────────────────
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('stuck', window.scrollY > 8); };
  onScroll();
  addEventListener('scroll', onScroll, { passive: true });

  // ── 스크롤 리빌 ───────────────────────────────────────────────────
  if ('IntersectionObserver' in window && !reduced) {
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('seen'); rio.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    [].forEach.call(document.querySelectorAll('.rise'), function (el) { rio.observe(el); });
  } else {
    [].forEach.call(document.querySelectorAll('.rise'), function (el) { el.classList.add('seen'); });
  }

  // 장면 애니메이션은 보일 때만 — CSS가 .in 아래에서만 animation 을 건다.
  if ('IntersectionObserver' in window) {
    var sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) { e.target.classList.toggle('in', e.isIntersecting); });
    }, { threshold: 0.3 });
    [].forEach.call(document.querySelectorAll('.scene-art'), function (el) { sio.observe(el); });
  } else {
    [].forEach.call(document.querySelectorAll('.scene-art'), function (el) { el.classList.add('in'); });
  }

  // ── 다운로드 ──────────────────────────────────────────────────────
  // 버전과 주소를 릴리스에서 직접 읽는다. 페이지에 박아 두면 릴리스할 때마다 사이트를
  // 같이 고쳐야 하고, 그 단계는 언젠가 빠진다. 실패해도 버튼은 releases/latest 를
  // 가리키고 있으므로 아무것도 깨지지 않는다.
  var PICK = {
    'mac-arm':   function (n) { return /-arm64\.dmg$/.test(n); },
    'mac-intel': function (n) { return /-x64\.dmg$/.test(n); },
    'win':       function (n) { return /^Thinkdown-Setup-.*\.exe$/.test(n); },
    'linux':     function (n) { return /\.AppImage$/.test(n); },
    'linux-deb': function (n) { return /\.deb$/.test(n); }
  };
  var OSNAME = { 'mac-arm': 'macOS (Apple Silicon)', 'mac-intel': 'macOS (Intel)',
                 'win': 'Windows', 'linux': 'Linux' };
  var release = null;

  // mac의 칩 종류는 브라우저가 알려주지 않는 경우가 많아(Safari·Chrome 모두 Intel로
  // 보고한다) Apple Silicon을 기본으로 두고 Intel 링크를 바로 아래 함께 노출한다.
  function guessOs() {
    var p = (navigator.userAgentData && navigator.userAgentData.platform)
         || navigator.platform || navigator.userAgent || '';
    if (/mac/i.test(p)) return 'mac-arm';
    if (/win/i.test(p)) return 'win';
    if (/linux|x11|cros/i.test(p)) return 'linux';
    return null;
  }
  function assetFor(key) {
    if (!release || !PICK[key]) return null;
    var a = release.assets || [];
    for (var i = 0; i < a.length; i++) if (PICK[key](a[i].name)) return a[i];
    return null;
  }

  function paintDownload() {
    var ko = isKo(), note = document.getElementById('dl-version');
    if (!release) {
      note.textContent = ko ? 'macOS · Windows · Linux — 아래에서 받으세요.'
                            : 'macOS · Windows · Linux — grab one below.';
      return;
    }
    var ver = release.tag_name || '';
    note.textContent = ko ? '최신 버전 ' + ver + ' · macOS · Windows · Linux'
                          : 'Latest ' + ver + ' · macOS · Windows · Linux';

    [].forEach.call(document.querySelectorAll('#dl-list [data-os]'), function (row) {
      var a = assetFor(row.getAttribute('data-os'));
      if (!a) return;
      var link = row.tagName === 'A' ? row : row.querySelector('a.file');
      if (link) { link.href = a.browser_download_url; link.title = a.name; }
    });

    var os = guessOs(), pick = os && assetFor(os), btn = document.getElementById('dl-main');
    if (btn && pick) {
      btn.href = pick.browser_download_url;
      var label = btn.querySelector('span.' + (ko ? 'ko' : 'en'));
      if (label) label.textContent = ko ? OSNAME[os] + '용 ' + ver + ' 내려받기'
                                        : 'Download ' + ver + ' for ' + OSNAME[os];
      var hint = document.getElementById('dl-note');
      hint.innerHTML = os === 'mac-arm'
        ? (ko ? 'Intel Mac이라면 <a href="#download">아래에서 Intel용</a>을 받으세요.'
              : 'On an Intel Mac? <a href="#download">Grab the Intel build below.</a>')
        : (ko ? '<a href="#download">다른 운영체제용 파일</a>도 있습니다.'
              : '<a href="#download">Other platforms</a> are available too.');
    }
  }
  paintDownload();

  fetch('https://api.github.com/repos/' + REPO + '/releases/latest',
        { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (rel) { release = rel; paintDownload(); })
    .catch(function () { /* 폴백 문구가 이미 떠 있다 */ });

  // ── 탭 ────────────────────────────────────────────────────────────
  var tabsEl = document.getElementById('tabs');
  var current = 0;
  function paintTabs() {
    tabsEl.innerHTML = '';
    EXAMPLES.forEach(function (ex, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'tab'; b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', String(i === current));
      b.textContent = L(ex.tab);
      b.addEventListener('click', function () { current = i; paintTabs(); demo.reload(); });
      tabsEl.appendChild(b);
    });
    document.getElementById('demo-cap').textContent = L(EXAMPLES[current].cap);
  }
  paintTabs();

  // ── 데모 루프 ─────────────────────────────────────────────────────
  // 트리가 자란다 → 덩어리를 위로 옮긴다 → 마크다운이 따라 바뀐다 → 복사한다
  //   → AI에 붙여넣는다 → 처음부터.
  var demo = (function () {
    var map = document.getElementById('dmap');
    var edges = document.getElementById('dedges');
    var code = document.getElementById('dcode');
    var copyBtn = document.getElementById('copy-btn');
    var b1 = document.getElementById('b1'), b1t = document.getElementById('b1-text');
    var b2 = document.getElementById('b2');
    var dai = b1.parentNode;
    var timers = [], running = false;
    var rootEl = null, rows = [];   // rows[i] = { h, c, eh, ec, move }

    var at = function (ms, fn) { timers.push(setTimeout(fn, ms)); };
    var clearAll = function () { timers.forEach(clearTimeout); timers = []; };

    // 켜진 노드만, 행 순서 그대로. 루트(문서 제목)는 마크다운 본문에 들어가지 않는다 —
    // 앱에서도 제목은 문서의 title 이지 본문이 아니다.
    function markdown() {
      var out = [];
      rows.forEach(function (r) {
        [r.h, r.c].forEach(function (el) {
          if (!el || !el.classList.contains('on')) return;
          var t = el.dataset.md || '';
          if (!t) return;
          if (out.length && t.charAt(0) === '#') out.push('');
          out.push(t);
        });
      });
      return out.join('\n');
    }
    function paintCode(caret) {
      code.textContent = markdown();
      if (caret) { var c = document.createElement('span'); c.className = 'caret'; code.appendChild(c); }
    }

    function mkNode(cls, text, md) {
      var el = document.createElement('div');
      el.className = cls;
      el.textContent = text;
      if (md) el.dataset.md = md;
      return el;
    }
    function mkEdge() {
      var pa = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      edges.appendChild(pa);
      return pa;
    }

    // 행 순서를 격자 행 번호로 옮긴다. 루트는 전체 행에 걸쳐 세로 가운데.
    function applyRows() {
      rows.forEach(function (r, i) {
        r.h.style.gridRow = String(i + 1);
        if (r.c) r.c.style.gridRow = String(i + 1);
      });
      rootEl.style.gridRow = '1 / span ' + Math.max(1, rows.length);
    }

    // 부모 오른쪽 끝 → 자식 왼쪽 끝을 잇는 3차 베지어. canvas.js 의 연결선과 같은 식이다.
    function layoutEdges() {
      if (!rootEl) return;
      var box = map.getBoundingClientRect();
      if (!box.width) return;
      function d(a, b) {
        var ra = a.getBoundingClientRect(), rb = b.getBoundingClientRect();
        var fx = ra.right - box.left, fy = ra.top - box.top + ra.height / 2;
        var tx = rb.left - box.left,  ty = rb.top - box.top + rb.height / 2;
        var mx = (fx + tx) / 2;
        return 'M ' + fx + ' ' + fy + ' C ' + mx + ' ' + fy + ', ' + mx + ' ' + ty + ', ' + tx + ' ' + ty;
      }
      function set(pa, a, b) {
        if (!pa || !a || !b) return;
        pa.setAttribute('d', d(a, b));
        var len = 0;
        try { len = pa.getTotalLength(); } catch (e) { len = 200; }
        pa.style.setProperty('--len', len);
        pa.style.strokeDasharray = len;
      }
      rows.forEach(function (r) { set(r.eh, rootEl, r.h); if (r.c) set(r.ec, r.h, r.c); });
    }

    function build() {
      var ex = EXAMPLES[current];
      map.innerHTML = '';
      edges.innerHTML = '';
      map.appendChild(edges);
      rows = [];

      rootEl = mkNode('dnode root', L(ex.root), null);
      rootEl.style.gridColumn = '1';
      map.appendChild(rootEl);

      var cur = null;
      ex.nodes.forEach(function (n) {
        var el = mkNode(KIND_CLASS[n.kind], L(n), L(n.md));
        if (n.kind === 'h') {
          el.style.gridColumn = '2';
          cur = { h: el, c: null, eh: mkEdge(), ec: null, move: !!n.move };
          rows.push(cur);
        } else {
          if (!cur) return;
          el.style.gridColumn = '3';
          cur.c = el; cur.ec = mkEdge();
          if (n.move) cur.move = true;
        }
        map.appendChild(el);
      });

      applyRows();
      layoutEdges();
      code.textContent = '';
      copyBtn.classList.remove('hit');
      b1.classList.remove('on'); b2.classList.remove('on');
      dai.classList.remove('filled');
      b1t.textContent = '';
    }

    // move 로 표시된 가지를 첫 가지 바로 다음으로 끌어 올린다 — 순서를 고치는 장면.
    function reorder() {
      var i = -1;
      for (var k = 0; k < rows.length; k++) { if (rows[k].move) { i = k; break; } }
      if (i < 1) return;
      rows.splice(1, 0, rows.splice(i, 1)[0]);
      applyRows();
      layoutEdges();
    }
    function lift(on) {
      rows.forEach(function (r) {
        if (!r.move) return;
        r.h.classList.toggle('lift', on);
        if (r.c) r.c.classList.toggle('lift', on);
      });
    }

    function finalState() {
      build();
      rootEl.classList.add('on');
      rows.forEach(function (r) {
        r.h.classList.add('on'); if (r.c) r.c.classList.add('on');
        r.eh.classList.add('on'); if (r.ec) r.ec.classList.add('on');
      });
      reorder(); paintCode(false);
      b1t.textContent = markdown();
      b1.classList.add('on'); b2.classList.add('on');
      dai.classList.add('filled');
    }

    function play() {
      build();
      var t = 320;
      at(t, function () { rootEl.classList.add('on'); layoutEdges(); });
      t += 480;

      rows.forEach(function (r) {
        at(t, function () { layoutEdges(); r.eh.classList.add('on'); });
        at(t + 200, function () { r.h.classList.add('on'); paintCode(true); });
        t += 520;
        if (r.c) {
          at(t, function () { layoutEdges(); r.ec.classList.add('on'); });
          at(t + 200, function () { r.c.classList.add('on'); paintCode(true); });
          t += 520;
        }
      });

      t += 600;
      at(t, function () { lift(true); });
      at(t + 430, function () { reorder(); paintCode(true); });
      at(t + 1250, function () { lift(false); });

      t += 2050;
      at(t, function () { paintCode(false); copyBtn.classList.add('hit'); });
      at(t + 850, function () { copyBtn.classList.remove('hit'); });

      t += 1150;
      at(t, function () { b1t.textContent = markdown(); b1.classList.add('on'); dai.classList.add('filled'); });
      at(t + 780, function () { b2.classList.add('on'); });

      at(t + 3500, play);
    }

    // 폭이 바뀌면 노드 위치가 바뀌므로 연결선을 다시 그린다.
    if ('ResizeObserver' in window) new ResizeObserver(layoutEdges).observe(map);
    else window.addEventListener('resize', layoutEdges);

    return {
      start: function () { if (running) return; running = true; if (reduced) finalState(); else play(); },
      stop:  function () { running = false; clearAll(); },
      reload: function () { clearAll(); if (!running || reduced) finalState(); else play(); }
    };
  })();

  // 보일 때만 돌린다 — 화면 밖에서 타이머를 태울 이유가 없다.
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) demo.start(); else demo.stop(); });
    }, { threshold: 0.2 }).observe(document.getElementById('demo'));
  } else {
    demo.start();
  }
})();
