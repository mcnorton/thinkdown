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

  // ── 실제 화면: 네 장을 4초마다 겹쳐 넘긴다 ──────────────────────
  // 마크다운 → 미리보기 → 슬라이드쇼 → 링크 미리보기 순서로, 같은 자리에 겹쳐
  // 있고 불투명도만 바뀐다. .auto 를 붙이는 순간부터 CSS의 기본값(.first) 대신
  // .on 이 어느 장을 보일지 정한다 — 스크립트가 없으면 첫 장이 그대로 보인다.
  var shots = $('shots');
  if (shots && !reduced) {
    var frames = shots.querySelectorAll('.shot');
    var at = 0;
    shots.classList.add('auto');
    frames[at].classList.add('on');
    var flip = function () {
      frames[at].classList.remove('on');
      at = (at + 1) % frames.length;
      frames[at].classList.add('on');
    };
    var timer = null;
    var runShots = function (on) {
      if (on && !timer) timer = setInterval(flip, 4000);
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
    // Edge 가 .exe 다운로드를 막아 Setup.exe 를 감싼 zip 을 준다. zip 이 없는 옛 릴리스는 exe 로.
    'win':       function (n) { return /^Thinkdown-Setup-.*\.zip$/.test(n); },
    'win-exe':   function (n) { return /^Thinkdown-Setup-.*\.exe$/.test(n); },
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
    return key === 'win' ? assetFor('win-exe') : null;
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
      btn.setAttribute('data-os', os);       // 아래 GA4 이벤트가 이 키로 OS를 읽는다
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

  // ── GA4 다운로드 이벤트 ──────────────────────────────────────────
  // 버튼이 고른 파일의 키(data-os)를 os·arch 로 풀어 보낸다. gtag 가 막혀 있어도
  // (광고 차단기) 링크는 그대로 열린다 — 측정이 다운로드를 방해하면 안 된다.
  var DL_EVENT = {
    'mac-arm':   { os: 'mac',   arch: 'arm64' },
    'mac-intel': { os: 'mac',   arch: 'x64' },
    'win':       { os: 'win',   arch: 'x64' },
    'linux':     { os: 'linux', arch: 'x64', format: 'appimage' },
    'linux-deb': { os: 'linux', arch: 'x64', format: 'deb' }
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('#dl-main, #dl-list a.file');
    if (!a || typeof gtag !== 'function') return;
    var keyed = a.closest('[data-os]');
    // 릴리스를 못 읽어 주 버튼에 키가 없으면 releases/latest 로 가는 것 — 짐작한 OS 로 남긴다.
    var key = keyed ? keyed.getAttribute('data-os') : guessOs();
    var params = DL_EVENT[key] || { os: 'unknown', arch: 'unknown' };
    gtag('event', 'download', params);
  });

  // ── 다운로드 수 ──────────────────────────────────────────────────
  // 우리는 최근 릴리스만 첨부를 남기고 정리하므로(prune-releases.sh) GitHub 에 남은 수를 다시
  // 더해서는 지난 몫을 되살릴 수 없다. **누적의 원본은 릴리스 때마다 적는 기록**이다
  // (release-stats.js → 릴리스 노트 마지막 줄 + stats.json history). 여기서는
  //   마지막 기록의 누적 + Σ (지금 첨부가 남은 릴리스마다) 지금 수 − 그 기록 때의 수(snapshot)
  // 를 보여 준다 — 그 뒤에 나온 릴리스(snapshot 에 없다)는 통째로, 이미 기록된 릴리스는 늘어난
  // 만큼만 더해진다. 기록이 아직 없으면 예전 방식(장부 pruned + 남은 첨부 전부)이다.
  // GitHub API 를 못 읽으면(시간당 60회 제한 등) 마지막 기록만 보여 준다.
  // 자동 업데이트가 받는 파일(mac .zip, win Setup.exe)도 센다. blockmap·yml 은 세지 않는다.
  // 분류 규칙은 scripts/count-os.jq(정리·누적 기록 스크립트가 공유)와 같아야 한다.
  var COUNT_OS = {
    mac:   /^Thinkdown-.*-(arm64|x64)\.(dmg|zip)$/,
    win:   /^Thinkdown-Setup-.*\.(exe|zip)$/,
    linux: /\.(AppImage|deb)$/
  };
  var counts = $('dl-counts');
  if (counts) {
    var ledger = fetch('stats.json', { cache: 'no-cache' })
      .then(function (r) { return r.ok ? r.json() : {}; })
      .catch(function () { return {}; });
    var rels = fetch('https://api.github.com/repos/' + REPO + '/releases?per_page=100',
                     { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
    var paintCounts = function (sum) {
      sum.total = sum.mac + sum.win + sum.linux;
      [].forEach.call(counts.querySelectorAll('[data-count]'), function (dd) {
        dd.textContent = sum[dd.getAttribute('data-count')].toLocaleString();
      });
    };
    var lastRecord = function (l) { return l && l.history && l.history[l.history.length - 1]; };
    Promise.all([ledger, rels]).then(function (got) {
      var h = lastRecord(got[0]);
      var base = h ? { mac: h.macos, win: h.windows, linux: h.linux } : ((got[0] && got[0].pruned) || {});
      var sum = { mac: +base.mac || 0, win: +base.win || 0, linux: +base.linux || 0 };
      got[1].forEach(function (rel) {
        if (rel.draft) return;
        var c = { mac: 0, win: 0, linux: 0 };
        (rel.assets || []).forEach(function (a) {
          for (var os in COUNT_OS) if (COUNT_OS[os].test(a.name)) { c[os] += a.download_count; break; }
        });
        var was = (h && h.snapshot && h.snapshot[rel.tag_name]) || { mac: 0, win: 0, linux: 0 };
        for (var os in c) sum[os] += Math.max(0, c[os] - (+was[os] || 0));
      });
      paintCounts(sum);
    }).catch(function () {
      ledger.then(function (l) {
        var h = lastRecord(l);
        if (h) paintCounts({ mac: +h.macos || 0, win: +h.windows || 0, linux: +h.linux || 0 });
      });
    });
  }

  if ($('dl-version')) {
    fetch('https://api.github.com/repos/' + REPO + '/releases/latest',
          { headers: { Accept: 'application/vnd.github+json' } })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (rel) { release = rel; paintDownload(); })
      .catch(function () { /* 폴백 문구가 이미 떠 있다 */ });
  }
})();
