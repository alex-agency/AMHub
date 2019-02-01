angular.module( 'cookies', ['ngCookies'])

.factory( 'Cookies', function( $cookies ) {
  // default settings
  var settings = {
    advanced: false,
    filter: ''
  };

  var cookies = $cookies.getObject('settings');
  if( ! cookies ) {
    $cookies.putObject('settings', settings);
  } else {
    settings = cookies;
  }

  return {
    settings: settings,
    update: function() {
      $cookies.putObject( 'settings', settings );
    }
  };
})

;

