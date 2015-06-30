angular.module( 'app.commitContainer', [
  'ui.router',
  'ui.bootstrap'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'commitContainer', {
      url: 'containers/:name/commit',
      parent: home,
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'containers/commitContainer/commitContainer.tpl.html',
            controller: 'CommitContainerCtrl'
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

.controller( 'CommitContainerCtrl', 
  function CommitContainerCtrl( $scope, $stateParams, ContainerService, Commit, ImageService ) {

  ContainerService.getByName( decodeURIComponent($stateParams.name) )
    .then(function( container ) {
      $scope.container = container;
  });

  $scope.commit = function() {
    Commit.post({ 
      id: $scope.container.Id,
      name: $scope.name
    }, function() {
      console.log('Image created.');
      ImageService.update();
    });  
    $scope.$close();
  };

  $scope.close = function() {
    $scope.$dismiss();
  };

})

;

