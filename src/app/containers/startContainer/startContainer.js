angular.module( 'app.startContainer', [
  'ui.router',
  'ui.bootstrap'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'startContainerMain', {
      parent: home,
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            // main view
            templateUrl: 'containers/startContainer/startContainer.tpl.html',
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
    .state('startContainer', {
      url: 'containers/:name/start',
      parent: 'startContainerMain',
      // nestead views
      views: {
        "bindingAddress@": {
          controller: 'BindingAddressCtrl',
          templateUrl: 'containers/bindingAddress/bindingAddress.tpl.html'
        }
      }
    })
  ;
})

.controller( 'StartContainerCtrl', 
  function StartContainerCtrl( $scope, $stateParams, Cookies, ContainerService, Container ) {

  $scope.settings = Cookies.settings;

  ContainerService.getByName( decodeURIComponent($stateParams.name) )
    .then(function( container ) {
      Container.get({ id: container.Id }, function( info ) {
        $scope.container = info;
        $scope.bindingPorts = info.Config.ExposedPorts;
      });
  });

  $scope.restartPolicy = {
    value: {}
  };

  $scope.start = function() {
    Container.start({ 
      id: $scope.container.Id, 
      PublishAllPorts: true,
      PortBindings: getPortBindings($scope.bindingPorts),
      RestartPolicy: $scope.restartPolicy.value   
    }, function() {
      console.log('Container started.');
      $scope.$close();
    });
  };

  var getPortBindings = function( data ) {
    for(var i in data) {
      if(Array.isArray(data[i])) {
        return data;
      }
      // wrap object to array
      var arr = [];
      arr.push(data[i]);
      data[i] = arr;
    }
    return data;
  };

  $scope.close = function() {
    $scope.$dismiss();
  };

})

;

