(function () {
  'use strict';

  if (window.__startupsNE) return;
  window.__startupsNE = true;

  const IFRAME_SELECTOR = 'iframe[id^="startups-ne-"]';

  function getFrames() {
    return document.querySelectorAll(IFRAME_SELECTOR);
  }

  function getHeight(width) {
    if (width <= 480) return 520;
    if (width <= 768) return 460;
    return 320;
  }

  function resizeFrame(frame) {
    const width = frame.parentElement
      ? frame.parentElement.offsetWidth
      : frame.offsetWidth;

    const height = getHeight(width);

    frame.style.setProperty('width', '100%', 'important');
    frame.style.setProperty('max-width', '100%', 'important');
    frame.style.setProperty('display', 'block', 'important');
    frame.style.setProperty('border', '0', 'important');
    frame.style.setProperty('overflow', 'hidden', 'important');
    frame.style.setProperty('height', height + 'px', 'important');
  }

  function resizeAll() {
    getFrames().forEach(resizeFrame);
  }

  // Message-based resize (future-proof)
  window.addEventListener('message', function (e) {
    if (!e.data || e.data.type !== 'startups-ne-resize') return;

    const frames = getFrames();
    for (let i = 0; i < frames.length; i++) {
      try {
        if (frames[i].contentWindow === e.source && e.data.height) {
          frames[i].style.setProperty(
            'height',
            e.data.height + 'px',
            'important'
          );
        }
      } catch (err) {}
    }
  });

  // Debounced resize
  let resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeAll, 80);
  });

  // DOM observer (lightweight, no layout hacking)
  const observer = new MutationObserver(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeAll, 80);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // init
  resizeAll();

  // ensure iframe load recalculates
  getFrames().forEach(frame => {
    frame.addEventListener('load', () => resizeFrame(frame));
  });
})();
