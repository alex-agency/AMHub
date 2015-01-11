angular.module( 'vmhub.home', [
  'ui.router',
  'docker'
])

.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'home', {
      url: '/',
      views: {
        "top": {
          controller: 'HomeCtrl',
          templateUrl: 'home/home.tpl.html'
        },
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
  ;
})

.controller( 'HomeCtrl', 
  function HomeCtrl( $scope, $modal, Cookies, Image, Container ) {

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

