angular.module( 'vmhub.commitContainer', [
  'ui.router',
  'ui.bootstrap',
  'docker'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'commitContainer', {
      url: 'containers/:name/commit',
      parent: 'commitContainerModal'
    })
    .state( 'commitContainerModal', {
      abstract: true,
      parent: home,
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'commitContainer/commitContainer.tpl.html',
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
  function CommitContainerCtrl( $scope, $stateParams, Container, Commit ) {

  var container = {};
  Container.query({}, function( containers ) {
    for (var i in containers) {
      var names = containers[i].Names;
      for (var j in names) {
        if( names[j].slice(1) == $stateParams.name ) {
          container = Container.get({ id: containers[i].Id });
          break;
        }
      }
    }
  });

  $scope.commit = function() {
    Commit.post({ 
      id: container.Id,
      name: $scope.name
    }, function( image ) {
        console.log('Image created: '+image.Id);
        $scope.updateImages();
    });  
    $scope.$close();
  };

  $scope.close = function() {
    $scope.$dismiss();
  };

})

;

