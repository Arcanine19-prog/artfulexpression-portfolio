document.addEventListener('DOMContentLoaded', function () {
  var hamburger = document.querySelector('.hamburger');
  var navlinks = document.querySelector('.navlinks');
  hamburger.addEventListener('click', function () {
    navlinks.classList.toggle('open');
  });
  navlinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      navlinks.classList.remove('open');
    });
  });

  var header = document.querySelector('header');
  window.addEventListener('scroll', function () {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }, { passive: true });

  var revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(function (el) { observer.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
