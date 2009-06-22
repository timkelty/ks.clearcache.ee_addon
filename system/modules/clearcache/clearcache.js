(function() {
  if (typeof jQuery == 'undefined') {
    getScript('http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js', function() { 
      if (typeof jQuery != 'undefined') {
        return clearCache();
      }
    });
  } else {
    return clearCache();
  }
  
  function clearCache() {
    jQuery(document).ready(function($) {
      $('#ks-clear-cache').click(function() {
        var timer = new Date(),
            clearlink = this,
            clearlinkHref = clearlink.href;
            $clearlink = $(this).addClass('loading');
            clearText = $clearlink.html();
            $clearlink.html('Clearing Cache...').attr('href', '');
        $.post(clearlinkHref, function() {
          if (new Date() - timer < 1000) {
            setTimeout(function() {
              restoreLink($clearlink, clearText, clearlinkHref);
            }, 500);
          } else {
            restoreLink($clearlink, clearText, clearlinkHref);
          }
        });
        return false;
      });
    });    
  }
  function restoreLink(lnk, txt, hrf) {
    lnk.removeClass('loading').html(txt).attr('href', hrf);
  }
  
  // more or less stolen form jquery core and adapted by paul irish
  function getScript(url, success){
    var script=document.createElement('script');
    script.src=url;
    var body = document.getElementsByTagName('body')[0], 
        done = false;
    
    // Attach handlers for all browsers
    script.onload = script.onreadystatechange = function() {
      if ( !done && 
              (!this.readyState || this.readyState == 'loaded' || this.readyState == 'complete') 
         ) {
        done = true;
        success();
      }
    };
    body.appendChild(script);
  }
  
})();