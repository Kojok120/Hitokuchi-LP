/**
 * Hitokuchi LP — gentle fade-in (IntersectionObserver)
 *
 * .fade-target elements slide up + fade in once they enter the viewport.
 * Respects prefers-reduced-motion (handled in CSS — we still toggle the
 * class so the content is visible, but CSS skips the animation).
 *
 * No external dependencies. Pure DOM.
 */
(function () {
  'use strict';

  var targets = document.querySelectorAll('.fade-target');
  if (!targets || targets.length === 0) return;

  // Fallback: if IntersectionObserver isn't available (very old browsers),
  // reveal everything immediately so the page is still usable.
  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(targets, function (el) {
      el.classList.add('is-visible');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.15
  });

  Array.prototype.forEach.call(targets, function (el) {
    observer.observe(el);
  });
})();
