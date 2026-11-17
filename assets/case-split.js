// --- Back links that behave like the browser's Back button. ---
// A plain <a href> back link always lands at the top of its target. For
// links marked data-back-from="<regex>", when the visitor actually came
// from a page whose pathname matches that regex (same site), clicking
// goes back in history instead, so the previous page comes back at the
// scroll position they left it at. Anyone who arrived any other way — a
// shared link, a fresh tab, a search result — just follows the link's
// normal href. ---
(function () {
  document.querySelectorAll('[data-back-from]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      // leave modified clicks (open in new tab, etc.) to the browser
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!document.referrer || history.length < 2) return;
      var ref;
      try { ref = new URL(document.referrer); } catch (err) { return; }
      if (ref.origin !== location.origin) return;
      if (new RegExp(link.getAttribute('data-back-from')).test(ref.pathname)) {
        e.preventDefault();
        history.back();
      }
    });
  });
})();
