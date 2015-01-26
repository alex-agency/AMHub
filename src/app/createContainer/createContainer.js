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
  function CreateContainerCtrl( $scope, $stateParams, Cookies, Image, Container ) {

  $scope.settings = Cookies.settings;
  $scope.hostVolumes = [];
  $scope.limits = {
    memory: '1.5',
    swap: '0',
    cpu: '50'
  };

  $scope.bindingPorts = {};
  Image.get({ id: $stateParams.name }, function( image ) {
    $scope.image = image;
    for (var port in image.Config.ExposedPorts) {
      $scope.bindingPorts[port] = [{ HostPort: '' }];
    }
  });

  $scope.create = function() {
    var bindingVolumes = [];
    var i = 0;
    for (var volume in $scope.image.Config.Volumes) {
      var key = $scope.hostVolumes[i]; i++;
      if(key) {
        bindingVolumes.push(key+':'+volume);
      }
    }
    Container.create({ 
      Image: $stateParams.name,
      name: $scope.name,
      Hostname: $scope.name,
      Memory: $scope.limits.memory*1073741824,
      MemorySwap: $scope.limits.swap,
      CpuShares: 1024*$scope.limits.cpu/100
    }, function( created ) {
      Container.start({ 
        id: created.Id, 
        PublishAllPorts: true,
        Binds: bindingVolumes,
        PortBindings: angular.toJson($scope.bindingPorts)
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

