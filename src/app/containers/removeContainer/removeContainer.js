angular.module( 'app.removeContainer', [
  'ui.router',
  'ui.bootstrap'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'removeContainer', {
      url: 'containers/:name/remove',
      parent: home,
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'containers/removeContainer/removeContainer.tpl.html',
            controller: 'RemoveContainerCtrl'
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

.controller( 'RemoveContainerCtrl', 
  function RemoveContainerCtrl( $scope, $stateParams, ContainerService ) {

  ContainerService.getByName( decodeURIComponent($stateParams.name) )
    .then(function( container ) {
      $scope.container = container;
  });
  
  $scope.remove = function() {
    ContainerService.remove( $scope.container.Id ); 
    $scope.$close();
  };

  $scope.close = function() {
    $scope.$dismiss();
  };

})

;

