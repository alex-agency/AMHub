angular.module( 'amhub.startContainer', [
  'ui.router',
  'ui.bootstrap',
  'docker'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'startContainer', {
      url: 'containers/:name/start',
      parent: home,
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'startContainer/startContainer.tpl.html',
            controller: 'StartContainerCtrl'
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

.controller( 'StartContainerCtrl', 
  function StartContainerCtrl( $scope, $stateParams, Cookies, Container ) {

  $scope.settings = Cookies.settings;

  Container.query({}, function( containers ) {
    for (var i in containers) {
      var names = containers[i].Names;
      for (var j in names) {
        if( names[j].slice(1) == $stateParams.name ) {
          getInfo(containers[i].Id);
          break;
        }
      }
    }
  });

  $scope.container = {};
  $scope.bindings = {};
  var getInfo = function( id ) {
    Container.get({ id: id }, function( container ) {
      $scope.container = container;
      for (var port in container.Config.ExposedPorts) {
        $scope.bindings[port] = [{ HostPort: '' }];
      }
    });
  };

  $scope.start = function() {
    Container.start({ 
      id: $scope.container.Id, 
      PublishAllPorts: true,
      PortBindings: angular.toJson($scope.bindings)
    }, function() {
      console.log('Container started.');
      $scope.updateContainers();
      $scope.$close();
    });
  };

  $scope.close = function() {
    $scope.$dismiss();
  };

})

;

