document.addEventListener('DOMContentLoaded', function () {

  /* ---------- mobile nav toggle ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var isOpen = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- scroll-reveal animation ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealSelectors = '.card, .quote-card, .center-head, .hero-copy, .approach-list li, ' +
    '.focus-grid > div, .contact-item, .cta-banner, .grid-3 > *, .grid-2 > *';
  var revealEls = document.querySelectorAll(revealSelectors);

  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('reveal'); });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---------- hero background video: slow motion + reduced motion ---------- */
  var heroVideo = document.querySelector('.hero-photo-bg');
  if (heroVideo) {
    if (reduceMotion) {
      heroVideo.pause();
      heroVideo.removeAttribute('autoplay');
    } else {
      var setRate = function () { heroVideo.playbackRate = 0.55; };
      setRate();
      heroVideo.addEventListener('loadedmetadata', setRate);
      heroVideo.addEventListener('play', setRate);
    }
  }

  /* ---------- cookie consent banner ---------- */
  var COOKIE_KEY = 'riseSomaticCookieConsent';
  try {
    var consent = window.localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      var banner = document.createElement('div');
      banner.className = 'cookie-banner';
      banner.setAttribute('role', 'dialog');
      banner.setAttribute('aria-label', 'Cookie notice');
      banner.innerHTML =
        '<p>We use a small number of cookies for basic site functionality and to understand how the site is used. See our ' +
        '<a href="privacy-policy.html">Privacy Policy</a> for details.</p>' +
        '<div class="cookie-actions">' +
        '<button type="button" class="cookie-accept">Accept</button>' +
        '<button type="button" class="cookie-decline">Decline</button>' +
        '</div>';
      document.body.appendChild(banner);
      requestAnimationFrame(function () {
        setTimeout(function () { banner.classList.add('is-visible'); }, 400);
      });
      function dismiss(value) {
        try { window.localStorage.setItem(COOKIE_KEY, value); } catch (e) {}
        banner.classList.remove('is-visible');
        setTimeout(function () { banner.remove(); }, 450);
      }
      banner.querySelector('.cookie-accept').addEventListener('click', function () { dismiss('accepted'); });
      banner.querySelector('.cookie-decline').addEventListener('click', function () { dismiss('declined'); });
    }
  } catch (e) {
    /* localStorage unavailable — skip banner silently */
  }

});
