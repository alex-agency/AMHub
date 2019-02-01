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
      onEnter: function onEnter( $uibModal, $state, $stateParams ) {
        $uibModal
          // handle modal open
          .open({
            templateUrl: 'images/imageInfo/imageInfo.tpl.html',
            controller: 'ImageInfoCtrl',
            size: 'lg',
            resolve: {
              params: $stateParams
            }
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
  function ImageInfoCtrl( $scope, params, Image, ContainerService ) {

  var name = decodeURIComponent(params.name);
  
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

