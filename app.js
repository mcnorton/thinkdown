// 랜딩·사용법 페이지 공통 동작: 언어 전환 · 상단 바 · 스크롤 리빌 · 릴리스에서
// 다운로드 정보 읽기. 외부 의존 없음.
//
// 두 페이지가 이 파일 하나를 공유한다. 랜딩에만 있는 요소(다운로드 목록 등)는
// 존재 검사로 감싸서, 사용법 페이지에서 조용히 건너뛰게 한다.
(function () {
  'use strict';

  var REPO = 'mcnorton/thinkdown';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;
  var isKo = function () { return root.getAttribute('data-lang') === 'ko'; };
  var $ = function (id) { return document.getElementById(id); };

  // ── 언어 전환 ─────────────────────────────────────────────────────
  // 두 언어가 모두 마크업에 있고 CSS가 하나를 고른다. 여기서는 <html>의
  // data-lang 만 바꾸면 되고, 스크립트가 채운 문구만 다시 그린다.
  var langBtn = $('lang-btn');
  function paintLangBtn() { if (langBtn) langBtn.textContent = isKo() ? 'English' : '한국어'; }
  if (langBtn) {
    langBtn.addEventListener('click', function () {
      var next = isKo() ? 'en' : 'ko';
      root.setAttribute('data-lang', next);
      root.setAttribute('lang', next);
      try { localStorage.setItem('thinkdown.site.lang', next); } catch (e) {}
      paintLangBtn(); paintDownload();
    });
  }
  paintLangBtn();

  // ── 상단 바 — 스크롤하면 아래 테두리가 생긴다 ─────────────────────
  var nav = $('nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('stuck', window.scrollY > 8); };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
  }

  // ── 스크롤 리빌 ───────────────────────────────────────────────────
  var risers = document.querySelectorAll('.rise');
  if ('IntersectionObserver' in window && !reduced) {
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('seen'); rio.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    [].forEach.call(risers, function (el) { rio.observe(el); });
  } else {
    [].forEach.call(risers, function (el) { el.classList.add('seen'); });
  }

  // ── 실제 화면: 라이트·다크를 3초마다 겹쳐 넘긴다 ──────────────────
  // 두 장이 같은 자리에 겹쳐 있고 불투명도만 바뀐다. .auto 를 붙이는 순간부터
  // CSS의 테마 기본값 대신 .on 이 어느 장을 보일지 정한다 — 스크립트가 없으면
  // 테마에 맞는 한 장이 그대로 보인다.
  var shots = $('shots');
  if (shots && !reduced) {
    var frames = shots.querySelectorAll('.shot');
    var at = root.getAttribute('data-theme') === 'dark' ? 1 : 0;  // 지금 테마부터 시작
    shots.classList.add('auto');
    frames[at].classList.add('on');
    var flip = function () {
      frames[at].classList.remove('on');
      at = (at + 1) % frames.length;
      frames[at].classList.add('on');
    };
    var timer = null;
    var runShots = function (on) {
      if (on && !timer) timer = setInterval(flip, 3000);
      if (!on && timer) { clearInterval(timer); timer = null; }
    };
    // 화면 밖에서 타이머를 태울 이유가 없다.
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { runShots(e.isIntersecting); });
      }, { threshold: 0.15 }).observe(shots);
    } else {
      runShots(true);
    }
  }

  // ── 사용법 페이지: 목차 ───────────────────────────────────────────
  var toc = document.querySelector('.toc');

  // 좁은 화면에서는 목차가 접히는 카드가 된다(CSS). 펼친 채로 두면 본문이 한 화면
  // 아래로 밀려나므로 처음에는 닫아 둔다. 넓은 화면에서는 summary 자체가 숨겨져
  // 있으므로 open 을 유지해야 목록이 보인다.
  var tocDetails = toc && toc.querySelector('details');
  if (tocDetails) {
    var narrow = window.matchMedia('(max-width: 900px)');
    var syncToc = function () { tocDetails.open = !narrow.matches; };
    syncToc();
    narrow.addEventListener('change', syncToc);
    // 항목을 고르면 닫는다 — 좁은 화면에서 목차가 본문을 가린 채 남지 않도록.
    toc.addEventListener('click', function (e) {
      if (narrow.matches && e.target.closest('a')) tocDetails.open = false;
    });
  }

  if (toc && 'IntersectionObserver' in window) {
    var links = {};
    [].forEach.call(toc.querySelectorAll('a[href^="#"]'), function (a) {
      links[a.getAttribute('href').slice(1)] = a;
    });
    var tio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var a = links[e.target.id];
        if (a) a.classList.toggle('here', e.isIntersecting);
      });
    }, { rootMargin: '-76px 0px -70% 0px' });
    [].forEach.call(document.querySelectorAll('section[id]'), function (s) { tio.observe(s); });
  }

  // ── 다운로드 ──────────────────────────────────────────────────────
  // 버전과 주소를 릴리스에서 직접 읽는다. 페이지에 박아 두면 릴리스할 때마다
  // 사이트를 같이 고쳐야 하고, 그 단계는 언젠가 빠진다. 실패해도 버튼은
  // releases/latest 를 가리키고 있으므로 아무것도 깨지지 않는다.
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
    var note = $('dl-version');
    if (!note) return;                       // 사용법 페이지에는 이 절이 없다
    var ko = isKo();
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

    var os = guessOs(), pick = os && assetFor(os), btn = $('dl-main');
    if (btn && pick) {
      btn.href = pick.browser_download_url;
      var label = btn.querySelector('span.' + (ko ? 'ko' : 'en'));
      if (label) label.textContent = ko ? OSNAME[os] + '용 ' + ver + ' 내려받기'
                                        : 'Download ' + ver + ' for ' + OSNAME[os];
      var hint = $('dl-note');
      if (hint) {
        hint.innerHTML = os === 'mac-arm'
          ? (ko ? 'Intel Mac이라면 <a href="#download">아래에서 Intel용</a>을 받으세요.'
                : 'On an Intel Mac? <a href="#download">Grab the Intel build below.</a>')
          : (ko ? '<a href="#download">다른 운영체제용 파일</a>도 있습니다.'
                : '<a href="#download">Other platforms</a> are available too.');
      }
    }
  }
  paintDownload();

  if ($('dl-version')) {
    fetch('https://api.github.com/repos/' + REPO + '/releases/latest',
          { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (rel) { release = rel; paintDownload(); })
      .catch(function () { /* 폴백 문구가 이미 떠 있다 */ });
  }
})();
