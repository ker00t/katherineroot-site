// --- Article image lightbox: click any image in the case-study article
// to open it larger in a native <dialog> (free Escape-to-close + focus
// trap). Same pattern as the homepage's pretty-screens lightbox, shared
// across every case-study page. Clicking the backdrop or the close
// button closes it. ---
(function () {
  var dialog = document.getElementById('article-lightbox');
  var lightboxImg = document.getElementById('article-lightbox-img');
  var closeBtn = document.getElementById('article-lightbox-close');
  if (!dialog || !lightboxImg || !closeBtn) return;

  document.querySelectorAll('.article img').forEach(function (img) {
    img.addEventListener('click', function () {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      dialog.showModal();
    });
  });

  closeBtn.addEventListener('click', function () { dialog.close(); });
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });
  dialog.addEventListener('close', function () {
    lightboxImg.src = '';
  });
})();
