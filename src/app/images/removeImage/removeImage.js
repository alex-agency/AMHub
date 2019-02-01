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
      onEnter: function onEnter( $uibModal, $state, $stateParams ) {
        $uibModal
          // handle modal open
          .open({
            templateUrl: 'images/removeImage/removeImage.tpl.html',
            controller: 'RemoveImageCtrl',
            resolve: {
              params: $stateParams
            }
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
  function RemoveImageCtrl( $scope, params, ImageService, ContainerService ) {

  var name = decodeURIComponent(params.name);

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

