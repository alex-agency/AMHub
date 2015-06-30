angular.module( 'app.imageInfo', [
  'ui.router',
  'ui.bootstrap'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'imageInfo', {
      url: 'images/:name',
      parent: home,
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'images/imageInfo/imageInfo.tpl.html',
            controller: 'ImageInfoCtrl',
            size: 'lg'
          })
          .result.then( function() {
            // after clicking OK button
          }, function() {
            // after clicking Cancel button or clicking background
            $state.transitionTo(home);
          });
      }
    })
  ;
})

.controller( 'ImageInfoCtrl', 
  function ImageInfoCtrl( $scope, $rootScope, $stateParams, Image, ContainerService ) {

  var name = decodeURIComponent($stateParams.name);
  
  $scope.image = Image.get({ id: name });
  
  ContainerService.getAllByImage( name )
    .then(function( containers ) {
      $scope.imageContainers = containers;
  });

  $scope.close = function() {
    $scope.$dismiss();
  };

})

;

