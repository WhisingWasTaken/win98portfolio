(function setupCursors() {
  const isWindows = navigator.userAgent.includes('Windows') || (navigator.platform && navigator.platform.includes('Win'));
  const root = document.documentElement.style;
  if (isWindows) {
    root.setProperty('--win-pointer', 'url("win98.cur"), auto');
    root.setProperty('--win-select', 'url("win98_select.cur"), text');
    try {
      document.documentElement.style.cursor = 'url("win98.cur"), auto';
      document.body.style.cursor = 'url("win98.cur"), auto';
    } catch (e) {
      root.setProperty('--win-pointer', 'pointer');
      root.setProperty('--win-select', 'text');
    }
  } else {
    root.setProperty('--win-pointer', 'pointer');
    root.setProperty('--win-select', 'text');
    document.documentElement.style.cursor = 'default';
    document.body.style.cursor = 'default';
  }
})();

(function sliderInit() {
  const slider = document.getElementById('winSlider');
  const valueBox = document.getElementById('sliderValue');
  if (!slider || !valueBox) return;
  valueBox.textContent = slider.value;
  slider.setAttribute('aria-disabled', 'true');
  slider.setAttribute('tabindex', '-1');
  slider.disabled = true;
  slider.style.pointerEvents = 'none';
})();

(function updateTimestamp() {
  const el = document.getElementById('updated');
  const now = new Date();
  const d = now.toLocaleDateString();
  const t = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  el.textContent = d + ' ' + t;
})();

document.querySelectorAll('img').forEach(img => img.setAttribute('draggable','false'));