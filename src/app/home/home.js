angular.module( 'app.home', [
  'ui.router'
])

.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'home', {
      url: '/',
      views: {
        "images": {
          controller: 'ImagesCtrl',
          templateUrl: 'images/images.tpl.html'
        },
        "containers": {
          controller: 'ContainersCtrl',
          templateUrl: 'containers/containers.tpl.html'
        }
      }
    })
    .state( 'about', {
      url: '/about',
      views: {
        "about": {
          controller: 'AboutCtrl',
          templateUrl: 'home/home.tpl.html'
        }
      }
    })
  ;
})

.controller( 'AboutCtrl', 
  function AboutCtrl( $scope, $modal ) {

})

.filter( 'filesize', function () {
  var units = ['bytes','KB','MB','GB'];
  return function( bytes, precision ) {
    if ( isNaN( parseFloat( bytes )) || ! isFinite( bytes ) || bytes === 0 ) {
      return '';
    }
    var unit = 0;
    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit ++;
    }
    return bytes.toFixed( + precision ) + ' ' + units[ unit ];
  };
})

;

