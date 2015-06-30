angular.module( 'app.removeImage', [
  'ui.router',
  'ui.bootstrap'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'removeImage', {
      url: 'images/:name/remove',
      parent: home,
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'images/removeImage/removeImage.tpl.html',
            controller: 'RemoveImageCtrl'
          })
          .result.then( function() {
            // after clicking OK button
            $state.transitionTo(home);
          }, function() {
            // after clicking Cancel button or clicking background
            $state.transitionTo(home);
          });
      }
    })
  ;
})

.controller( 'RemoveImageCtrl', 
  function RemoveImageCtrl( $scope, $stateParams, ImageService, ContainerService ) {

  var name = decodeURIComponent($stateParams.name);

  ImageService.getAllByName( name )
    .then(function( images ) {
      $scope.images = images;
  });
  
  ContainerService.getAllByImage( name )
    .then(function( containers ) {
      $scope.imageContainers = containers;
  });

  $scope.remove = function() {
    ImageService.remove( name );
    $scope.$close();
  };

  $scope.close = function() {
    $scope.$dismiss();
  };

})

;

