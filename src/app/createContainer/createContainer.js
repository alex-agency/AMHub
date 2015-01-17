angular.module( 'amhub.createContainer', [
  'ui.router',
  'ui.bootstrap',
  'docker'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'createContainer', {
      url: 'images/:name/create',
      parent: home,
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'createContainer/createContainer.tpl.html',
            controller: 'CreateContainerCtrl'
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

.controller( 'CreateContainerCtrl', 
  function CreateContainerCtrl( $scope, $stateParams, Image, Container ) {

  $scope.bindings = {};
  Image.get({ id: $stateParams.name }, function( image ) {
    for (var port in image.Config.ExposedPorts) {
      $scope.bindings[port] = [{ HostPort: '' }];
    }
  });

  $scope.create = function() {
    Container.create({ 
      Image: $stateParams.name,
      name: $scope.name,
      Hostname: $scope.name
    }, function( created ) {
      Container.start({ 
        id: created.Id, 
        PublishAllPorts: true,
        PortBindings: angular.toJson($scope.bindings)
      }, function( started ) {
        console.log('Container created and started: '+started.id);
        $scope.updateContainers();
      });
    });
    $scope.$close();
  };

  $scope.close = function() {
    $scope.$dismiss();
  };

})

;

