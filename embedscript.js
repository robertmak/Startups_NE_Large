(function() {
  'use strict';

  function getStartupIframes() {
    return document.querySelectorAll('iframe[id^="startups-ne-"]');
  }

  function resizeIframes() {
    var iframes = getStartupIframes();
    iframes.forEach(function(iframe) {
      var width = iframe.parentElement.offsetWidth;

      if (width <= 480) {
        iframe.style.height = '520px';
      } else if (width <= 768) {
        iframe.style.height = '460px';
      } else {
        iframe.style.height = '350px';
      }

      // Remove scrollbar
      iframe.setAttribute('scrolling', 'no');
      iframe.style.overflow = 'hidden';
    });
  }

  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'startups-ne-resize') {
      var iframe = document.getElementById(event.data.id);
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
