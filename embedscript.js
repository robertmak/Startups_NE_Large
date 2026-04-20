(function() {
  'use strict';

  function getStartupIframes() {
    return document.querySelectorAll('iframe[id^="startups-ne-"]');
  }

  function resizeIframes() {
    var iframes = getStartupIframes();
    iframes.forEach(function(iframe) {
      var parent = iframe.parentElement;
      var width = parent ? parent.offsetWidth : iframe.offsetWidth;

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

      if (parent) {
        parent.style.lineHeight = '0';
        parent.style.fontSize = '0';
        parent.style.margin = '0';
        parent.style.padding = '0';
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

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', resizeIframes);
  } else {
    resizeIframes();
  }

  window.addEventListener('resize', resizeIframes);
})();
