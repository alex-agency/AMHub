angular.module( 'cookies', [
  'ngCookies'
])

.factory( 'Cookies', function( $cookieStore, $location ) {
  // default settings
  var settings = {
    advanced: false,
    filter: ''
  };

  var cookies = $cookieStore.get('settings');
  if( ! cookies ) {
    $cookieStore.put( 'settings', settings );
  } else {
    settings = cookies;
  }

  return {
    settings: settings,
    update: function() {
      $cookieStore.put( 'settings', settings );
    }
  };
})

;

