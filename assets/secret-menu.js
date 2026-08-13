// --- corner menu: click the corner icon to toggle the full-height panel
// open; click the scrim, click outside, or Escape closes it. Body scroll
// is locked while open since the panel + scrim together cover the whole
// viewport. Shared by every page — see the matching HTML block in each
// page's <body> and the CSS in /assets/site.css. ---
(function () {
  var menu = document.getElementById('secret-menu');
  var trigger = document.getElementById('secret-menu-trigger');
  var scrim = document.getElementById('secret-menu-scrim');
  var hotspot = menu ? menu.querySelector('.secret-menu__hotspot') : null;
  if (!menu || !trigger) return;

  var noHover = window.matchMedia('(hover: none)').matches;

  function isOpen() { return menu.classList.contains('is-open'); }
  function isRevealed() { return menu.classList.contains('is-revealed'); }
  function reveal() { menu.classList.add('is-revealed'); }
  function unreveal() { menu.classList.remove('is-revealed'); }
  function open() {
    menu.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function close() {
    menu.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // touch devices: hide the icon again on close instead of leaving it
    // revealed forever — back to the undiscovered state, same as a fresh
    // page load, so the reveal has to be re-earned with another tap
    if (noHover) unreveal();
  }

  trigger.addEventListener('click', function () {
    // touch devices have no hover, so the icon is invisible until a
    // first tap reveals it — that first tap shouldn't also open the menu
    if (noHover && !isRevealed()) { reveal(); return; }
    if (isOpen()) close(); else open();
  });
  // a tap anywhere else on the (larger) hotspot also reveals, matching
  // hover's "hovering the whole corner area shows the icon" behavior
  if (hotspot && noHover) {
    hotspot.addEventListener('click', function (e) {
      if (trigger.contains(e.target)) return;
      if (!isRevealed()) reveal();
    });
  }
  if (scrim) scrim.addEventListener('click', close);
  document.addEventListener('click', function (e) {
    if (isOpen() && !menu.contains(e.target)) close();
    else if (noHover && isRevealed() && !isOpen() && !menu.contains(e.target)) unreveal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) close();
  });
})();
