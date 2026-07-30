/* Footer time-of-day toggle. Click cycles morning -> afternoon -> evening
   -> night, updating data-time (which every theme-aware color reacts to)
   and swapping the icon to match. Load at the end of <body>, after the
   #time-toggle button markup exists. Runs regardless of motion/hover prefs. */
(function () {
  var order = ['morning', 'afternoon', 'evening', 'night'];

  /* morning path is the exact Figma "sunrise" icon; afternoon/evening/night
     are hand-drawn to match its weight and proportions. */
  var icons = {
    morning: '<svg viewBox="0 0 36.3333 36.3333" width="40" height="40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18.1667 1.5V14.8333M24.8333 8.16667L18.1667 1.5L11.5 8.16667M6.38342 16.3836L8.73342 18.7336M1.5 28.1667H4.83333M31.5 28.1667H34.8333M29.9501 16.3836L27.6001 18.7336M34.8333 34.8333H1.5M24.8333 28.1667C24.8333 26.3986 24.131 24.7029 22.8807 23.4526C21.6305 22.2024 19.9348 21.5 18.1667 21.5C16.3986 21.5 14.7029 22.2024 13.4526 23.4526C12.2024 24.7029 11.5 26.3986 11.5 28.1667"/></svg>',
    afternoon: '<svg viewBox="0 0 36.3333 36.3333" width="40" height="40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="18.1667" cy="18.1667" r="7"/><path d="M18.1667 2.5v6M18.1667 27.8333v6M2.5 18.1667h6M27.8333 18.1667h6M7.8 7.8l4.2 4.2M24.3 24.3l4.2 4.2M28.5 7.8l-4.2 4.2M12 24.3l-4.2 4.2"/></svg>',
    evening: '<svg viewBox="0 0 36.3333 36.3333" width="40" height="40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18.1667 1.5V8.16667M11.5 8.16667L18.1667 14.8333L24.8333 8.16667M6.38342 16.3836L8.73342 18.7336M1.5 28.1667H4.83333M31.5 28.1667H34.8333M29.9501 16.3836L27.6001 18.7336M34.8333 34.8333H1.5M24.8333 28.1667C24.8333 26.3986 24.131 24.7029 22.8807 23.4526C21.6305 22.2024 19.9348 21.5 18.1667 21.5C16.3986 21.5 14.7029 22.2024 13.4526 23.4526C12.2024 24.7029 11.5 26.3986 11.5 28.1667"/></svg>',
    night: '<svg viewBox="0 0 36.3333 36.3333" width="40" height="40" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M30 22A12 12 0 1 1 14.5 6A9.8 9.8 0 0 0 30 22Z"/></svg>'
  };

  var btn = document.getElementById('time-toggle');
  if (!btn) return;
  var icon = document.getElementById('time-toggle-icon');
  var current = document.documentElement.getAttribute('data-time') || 'night';

  function render() {
    var label = current.charAt(0).toUpperCase() + current.slice(1);
    icon.innerHTML = icons[current];
    btn.setAttribute('aria-label', 'Preview a different time of day. Currently showing ' + label + '.');
  }
  render();

  btn.addEventListener('click', function () {
    current = order[(order.indexOf(current) + 1) % order.length];
    document.documentElement.setAttribute('data-time', current);
    render();
  });
})();
