// Stale :hover fix. Browsers only recompute :hover in response to a
// real pointer-move event — never automatically — so a card's DOM has
// no way to learn the pointer left it while this tab wasn't visible.
// Two situations trigger that:
//   1. Returning to this tab after a target="_blank" card sent you to a
//      new tab. This tab never navigated away, so as far as it's
//      concerned the pointer is still sitting on the card you clicked;
//      nothing here ever received the mousemove that would normally
//      clear :hover.
//   2. Back/forward-cache restore — the page reappears frozen in
//      whatever :hover state it was in when you navigated away, for the
//      same underlying reason.
// Forcing a style recompute doesn't help here (the recorded pointer
// position genuinely hasn't changed, so :hover keeps matching), so
// instead: the moment this tab goes hidden/unfocused, add
// .js-hover-suspended (site.css force-overrides every hover-triggered
// property back to its resting value under that class, regardless of
// whether :hover still matches underneath). Only remove it on the next
// real mousemove after the tab is visible again — by then :hover has
// had a genuine chance to update, so normal hover behavior just resumes.
(function () {
  var root = document.documentElement;

  function reenableOnMove() {
    root.classList.remove('js-hover-suspended');
    document.removeEventListener('mousemove', reenableOnMove);
  }

  function suspend() {
    root.classList.add('js-hover-suspended');
    document.addEventListener('mousemove', reenableOnMove);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'hidden') suspend();
  });
  window.addEventListener('blur', suspend);
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) suspend();
  });
})();
