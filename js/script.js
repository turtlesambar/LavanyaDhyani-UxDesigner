/* =========================================================
   script.js
   The ONLY job of this file is the hamburger menu:
   open it, close it, and keep it accessible to keyboard
   and screen reader users. Nothing else on the site needs
   JavaScript to work.

   GSAP HOOK: if you want to animate the menu with GSAP instead
   of the CSS transition in style.css, this is the file to do
   it in — swap the classList.add/remove calls below for a
   gsap.to() timeline.
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  var menuToggle = document.getElementById('menu-toggle');
  var menuClose  = document.getElementById('menu-close');
  var mobileMenu = document.getElementById('mobile-menu');
  var body       = document.body;

  if (!menuToggle || !mobileMenu || !menuClose) return;

  // All focusable elements inside the menu, used for the focus trap below
  var focusableSelector = 'a[href], button:not([disabled])';

  function getFocusable() {
    return mobileMenu.querySelectorAll(focusableSelector);
  }

  function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    body.classList.add('menu-open');

    // Send keyboard focus into the menu (WCAG 2.4.3 Focus Order)
    menuClose.focus();

    document.addEventListener('keydown', handleKeydown);
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('menu-open');

    // Return focus to the button that opened the menu
    menuToggle.focus();

    document.removeEventListener('keydown', handleKeydown);
  }

  function handleKeydown(event) {
    // Escape closes the menu
    if (event.key === 'Escape') {
      closeMenu();
      return;
    }

    // Simple focus trap: keep Tab cycling inside the open menu
    if (event.key === 'Tab') {
      var focusable = getFocusable();
      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);

  // Close the menu when a nav link inside it is clicked
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });
});
