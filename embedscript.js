(function () {
  'use strict';

  // Prevent double execution
  if (window._startupsNELoaded) return;
  window._startupsNELoaded = true;

  function getStartupIframes() {
    return document.querySelectorAll('iframe[id^="startups-ne-"]');
  }

  function resizeIframes() {
    var iframes = getStartupIframes();

    iframes.forEach(function (iframe) {
      var wrapper = iframe.parentElement;
      var width = wrapper ? wrapper.offsetWidth : iframe.offsetWidth;

      // Responsive heights
      if (width <= 480) {
        iframe.style.height = '520px';
      } else if (width <= 768) {
        iframe.style.height = '460px';
      } else {
        iframe.style.height = '300px';
      }

      // Clean styling (safe re-apply)
      iframe.style.display = 'block';
      iframe.style.border = 'none';
      iframe.style.margin = '0';
      iframe.style.padding = '0';
      iframe.style.overflow = 'hidden';
      iframe.style.maxWidth = '100%';
      iframe.setAttribute('scrolling', 'no');

      if (wrapper && wrapper.getAttribute('data-startups-embed') === 'true') {
        wrapper.style.lineHeight = '0';
        wrapper.style.fontSize = '0';
        wrapper.style.margin = '0';
        wrapper.style.padding = '0';
      }
    });
  }

  // Handle iframe → parent communication (postMessage)
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'startups-ne-resize') return;

    var iframe = null;

    // Try direct ID match
    if (event.data.id) {
      iframe = document.getElementById(event.data.id);
    }

    // Fallback: match by source window
    if (!iframe) {
      var iframes = getStartupIframes();
      for (var i = 0; i < iframes.length; i++) {
        try {
          if (iframes[i].contentWindow === event.source) {
            iframe = iframes[i];
            break;
          }
        } catch (e) {}
      }
    }

    if (iframe && event.data.height) {
      iframe.style.height = event.data.height + 'px';
    }
  });

  // Initial resize
  resizeIframes();

  // Resize on window change (debounced)
  var resizeTimeout;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeIframes, 100);
  });

  // MutationObserver (debounced + safe)
  var mutationTimeout;
  var observer = new MutationObserver(function () {
    clearTimeout(mutationTimeout);
    mutationTimeout = setTimeout(resizeIframes, 100);
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

})();
