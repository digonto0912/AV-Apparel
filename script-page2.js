(function () {
  const page = document.getElementById('figmaPage');
  if (!page) return;
  const BASE_W = parseFloat(page.dataset.baseWidth || '1920', 10) || 1920;
  function applyScale() {
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const scale = Math.min(1, vw / BASE_W);
    page.style.transform = 'scale(' + scale + ')';
    page.style.height = (page.scrollHeight / scale) + 'px';
  }
  window.addEventListener('resize', applyScale);
  applyScale();
})();
