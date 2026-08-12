/* Footer time-of-day toggle. Click cycles morning -> afternoon -> evening
   -> night, updating data-time (which every theme-aware color reacts to)
   and swapping the icon to match. Load at the end of <body>, after the
   #time-toggle button markup exists. Icon swap always happens; the little
   spin transition around it is skipped under prefers-reduced-motion.

   The chosen time is saved to localStorage so theme-init.js picks it up
   as an override on every other page too, not just this one. */
(function () {
  var order = ['morning', 'afternoon', 'evening', 'night'];

  /* lucide sunrise / sun / sunset / moon-star, default stroke-width */
  var icons = {
    morning: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>',
    afternoon: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>',
    evening: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 10V2"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m16 6-4 4-4-4"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>',
    night: '<svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 5h4"/><path d="M20 3v4"/><path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/></svg>'
  };

  var btn = document.getElementById('time-toggle');
  if (!btn) return;
  var icon = document.getElementById('time-toggle-icon');
  var current = document.documentElement.getAttribute('data-time') || 'night';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function label() {
    return current.charAt(0).toUpperCase() + current.slice(1);
  }

  function apply() {
    icon.innerHTML = icons[current];
    btn.setAttribute('aria-label', 'Preview a different time of day. Currently showing ' + label() + '.');
  }
  apply();

  btn.addEventListener('click', function () {
    current = order[(order.indexOf(current) + 1) % order.length];
    document.documentElement.setAttribute('data-time', current);
    try {
      localStorage.setItem('kr-time-override', current);
    } catch (e) {}

    if (reduce) {
      apply();
      return;
    }
    // spin the old icon out, swap it once it's invisible, spring the new one back in
    icon.classList.add('is-swapping');
    setTimeout(function () {
      apply();
      icon.classList.remove('is-swapping');
    }, 180);
  });
})();
