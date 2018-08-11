window.fbAsyncInit = function() {
  FB.init({
    appId            : '506278836478647',
    autoLogAppEvents : true,
    xfbml            : true,
    version          : 'v3.1'
  });

};

(function(d, s, id) {
  let js; const fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


