document.addEventListener('DOMContentLoaded', function () {
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
      });
    });
  }

  var sections = ['top', 'services', 'results', 'blogs', 'contact']
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.main-nav a'));

  function setActiveLink() {
    var scrollPos = window.scrollY + 120;
    var current = sections[0];
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) current = sec;
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current.id);
    });
  }
  window.addEventListener('scroll', setActiveLink, { passive: true });

  var slides = Array.prototype.slice.call(document.querySelectorAll('.car-slide'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.dot-btn'));
  var prevBtn = document.querySelector('.car-prev');
  var nextBtn = document.querySelector('.car-next');
  var current = 0;
  var autoplayTimer;

  function goToSlide(index) {
    if (!slides.length) return;
    current = (index + slides.length) % slides.length;
    slides.forEach(function (s, i) { s.classList.toggle('active', i === current); });
    dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(function () { goToSlide(current + 1); }, 5000);
  }
  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goToSlide(current - 1); startAutoplay(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goToSlide(current + 1); startAutoplay(); });
  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () { goToSlide(i); startAutoplay(); });
  });

  var carousel = document.querySelector('.carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);
    startAutoplay();
  }

  var form = document.getElementById('audit-form');
  var toast = document.getElementById('toast');
  var toastTimer;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3500);
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var required = form.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) valid = false;
      });

      if (!valid) {
        showToast('Please fill in all required fields.');
        return;
      }

      var submitBtn = form.querySelector('.btn-submit');
      var originalHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Submitting...';
      submitBtn.disabled = true;

      setTimeout(function () {
        showToast("Thanks! We've received your audit request.");
        form.reset();
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
      }, 700);
    });
  }

});
