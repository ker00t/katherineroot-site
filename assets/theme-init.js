/* Runs before the stylesheet paints anything, so the right time-of-day
   theme applies immediately — no flash of the wrong colors.
   Load this with a plain blocking <script src>, no defer/async, in <head>.
   5–11:59 morning · 12–16:59 afternoon · 17–20:59 evening · 21–4:59 night

   If the visitor has manually picked a time of day (via the footer toggle,
   see time-toggle.js), that choice is saved in localStorage and takes
   priority on every page, overriding the real clock, until they pick again. */
(function () {
  var order = ['morning', 'afternoon', 'evening', 'night'];
  var override = null;
  try {
    override = localStorage.getItem('kr-time-override');
  } catch (e) {}

  var time;
  if (override && order.indexOf(override) !== -1) {
    time = override;
  } else {
    var h = new Date().getHours();
    time = (h >= 5 && h < 12) ? 'morning'
         : (h >= 12 && h < 17) ? 'afternoon'
         : (h >= 17 && h < 21) ? 'evening'
         : 'night';
  }
  document.documentElement.setAttribute('data-time', time);
})();
