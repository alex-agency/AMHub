angular.module( 'amhub.removeContainer', [
  'ui.router',
  'ui.bootstrap',
  'docker'
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
            templateUrl: 'removeContainer/removeContainer.tpl.html',
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
  function RemoveContainerCtrl( $scope, $stateParams, Container ) {

  $scope.container = {};
  Container.query({}, function( containers ) {
    for (var i in containers) {
      var names = containers[i].Names;
      for (var j in names) {
        if( names[j].slice(1) == $stateParams.name ) {
          $scope.container = containers[i];
          break;
        }
      }
    }
  });

  $scope.remove = function() {
    Container.stop({ id: $scope.container.Id }, function() {
      console.log('Container stoped.');
      removeContainer();
    }, function() {
      removeContainer();
    });
    $scope.$close();
  };

  var removeContainer = function() {
    Container.remove({ id: $scope.container.Id }, function() {
      console.log('Container removed.');
      $scope.updateContainers();
    });
  };

  $scope.close = function() {
    $scope.$dismiss();
  };

})

;

