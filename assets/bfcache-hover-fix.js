// bfcache-restored pages (back/forward navigation) can keep showing
// stale :hover-triggered CSS — fan-hover screenshots, color-swap logos,
// etc. — stuck in whatever state they were in when you navigated away,
// since browsers don't recompute :hover against the actual cursor
// position on restore, only on the next real pointer event. Forcing a
// reflow on pageshow makes every :hover match get re-evaluated
// immediately instead of waiting for the user to move the mouse.
window.addEventListener('pageshow', function (e) {
  if (!e.persisted) return;
  document.body.style.display = 'none';
  void document.body.offsetHeight;
  document.body.style.display = '';
});
