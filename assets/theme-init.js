/* Runs before the stylesheet paints anything, so the right time-of-day
   theme applies immediately — no flash of the wrong colors.
   Load this with a plain blocking <script src>, no defer/async, in <head>.
   5–11:59 morning · 12–16:59 afternoon · 17–20:59 evening · 21–4:59 night */
(function () {
  var h = new Date().getHours();
  var time = (h >= 5 && h < 12) ? 'morning'
           : (h >= 12 && h < 17) ? 'afternoon'
           : (h >= 17 && h < 21) ? 'evening'
           : 'night';
  document.documentElement.setAttribute('data-time', time);
})();
