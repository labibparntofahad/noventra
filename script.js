/* =========================================================
   NOVENTRA FOUNDATION — SCRIPT
   Navbar scroll state, scroll-reveal animation, form validation
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Navbar shadow/shrink on scroll ---- */
  var nav = document.getElementById('mainNav');
  function updateNavState() {
    if (window.scrollY > 12) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  updateNavState();
  window.addEventListener('scroll', updateNavState);

  /* Close mobile menu after a link is tapped */
  var navMenu = document.getElementById('navMenu');
  var navLinks = navMenu.querySelectorAll('.nav-link, .btn-donate');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navMenu.classList.contains('show')) {
        var collapseInstance = bootstrap.Collapse.getOrCreateInstance(navMenu);
        collapseInstance.hide();
      }
    });
  });

  /* ---- Scroll reveal (single, subtle fade-up on entry) ---- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    // Fallback: no IntersectionObserver support — show everything
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Contact form validation (frontend only, no backend) ---- */
  var form = document.getElementById('contactForm');
  var successMsg = document.getElementById('formSuccess');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      successMsg.classList.add('d-none');
      return;
    }

    form.classList.add('was-validated');
    successMsg.classList.remove('d-none');

    // NOTE: No backend is connected yet.
    // To send this data for real, connect the form to a backend endpoint,
    // a service like Formspree/EmailJS, or a serverless function, and
    // replace this block with the relevant submission code.
    form.reset();
    form.classList.remove('was-validated');
  });

});
