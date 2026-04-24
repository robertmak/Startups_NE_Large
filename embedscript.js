(function() {
  'use strict';

  // Prevent multiple executions if script is loaded more than once
  if (window._startupsNELoaded) return;
  window._startupsNELoaded = true;

  function getStartupIframes() {
    return document.querySelectorAll('iframe[id^="startups-ne-"]');
  }

  function resizeIframes() {
    var iframes = getStartupIframes();
    iframes.forEach(function(iframe) {
      var wrapper = iframe.parentElement;
      var width = wrapper ? wrapper.offsetWidth : iframe.offsetWidth;

      if (width <= 480) {
        iframe.style.height = '520px';
      } else if (width <= 768) {
        iframe.style.height = '460px';
      } else {
        iframe.style.height = '300px';
      }

      iframe.setAttribute('scrolling', 'no');
      iframe.style.overflow = 'hidden';
      iframe.style.display = 'block';
      iframe.style.border = 'none';
      iframe.style.margin = '0';
      iframe.style.padding = '0';
      iframe.style.lineHeight = '0';
      iframe.style.maxWidth = '100%';

      if (wrapper && wrapper.getAttribute('data-startups-embed') === 'true') {
        wrapper.style.lineHeight = '0';
        wrapper.style.fontSize = '0';
        wrapper.style.margin = '0';
        wrapper.style.padding = '0';
      }
    });
  }

  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'startups-ne-resize') {
      var iframe;
      if (event.data.id) {
        iframe = document.getElementById(event.data.id);
      }
      if (!iframe) {
        var iframes = getStartupIframes();
        for (var i = 0; i < iframes.length; i++) {
          try {
            if (iframes[i].contentWindow === event.source) {
              iframe = iframes[i];
              break;
            }
          } catch (err) {}
        }
      }
      if (iframe && event.data.height) {
        iframe.style.height = event.data.height + 'px';
      }
    }
  });

  resizeIframes();
  window.addEventListener('resize', resizeIframes);

  // Watch for dynamically added iframes
  var observer = new MutationObserver(function() {
    resizeIframes();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
