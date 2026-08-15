// --- background continuity: the page background cycles through colors
// on a 200s loop (see bgCycle in site.css). Each new page load would
// normally restart that loop from the beginning (pink), so navigating
// away and back always looked the same regardless of how long you'd
// been sitting on the previous page. This carries the loop's position
// across navigations via sessionStorage, so a new page picks up right
// where the last one left off instead of resetting.
//
// Not deferred, and deliberately the first thing in <head> — it needs
// to set --bg-delay on <html> before body's first paint, or you'd see
// a flash of the reset (pink) color before jumping to the carried-over
// one.
(function () {
  var STORAGE_KEY = 'bgCycleElapsedMs';
  var CYCLE_MS = 200000;
  var loadTime = Date.now();
  var startElapsed = parseFloat(sessionStorage.getItem(STORAGE_KEY)) || 0;
  startElapsed = startElapsed % CYCLE_MS;

  document.documentElement.style.setProperty('--bg-delay', '-' + (startElapsed / 1000) + 's');

  function saveElapsed() {
    var elapsedThisPage = Date.now() - loadTime;
    var totalElapsed = (startElapsed + elapsedThisPage) % CYCLE_MS;
    sessionStorage.setItem(STORAGE_KEY, totalElapsed);
  }

  window.addEventListener('pagehide', saveElapsed);
  window.addEventListener('beforeunload', saveElapsed);
})();
