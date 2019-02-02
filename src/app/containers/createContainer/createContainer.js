angular.module( 'app.createContainer', [
  'ui.router',
  'ui.bootstrap'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  var size = '';
  $stateProvider
    .state( 'createContainerMain', {
      parent: home,
      onEnter: function onEnter( $uibModal, $state, $stateParams ) {
        $uibModal
          // handle modal open
          .open({
            // main view
            templateUrl: 'containers/createContainer/createContainer.tpl.html',
            controller: 'CreateContainerCtrl',
            size: size,
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
    .state('createContainer', {
      url: 'images/:name/create',
      parent: 'createContainerMain',
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

.controller( 'CreateContainerCtrl', 
  function CreateContainerCtrl( $scope, params, Cookies, Config, Image, Container, Env ) {
  var imageName = decodeURIComponent(params.name);

  $scope.settings = Cookies.settings;
  $scope.hostVolumes = [];
  $scope.variables = [];
  $scope.searchThreshold = 10;
  $scope.variablesLimit = 10;
  $scope.count = 1;

  Image.get({ id: imageName }, function( image ) {
    $scope.image = image;
    $scope.bindingPorts = image.Config.ExposedPorts;    
    for(var i in image.Config.Env) {
      var pair = image.Config.Env[i];
      if($scope.variables.indexOf(pair) == -1) { 
        $scope.variables.push(pair);
      }
    }
  });

  Config.get({}, function( config ) {
    $scope.config = config;
    for(var i in config.variables) {
      var pair = config.variables[i].pair;
      if($scope.variables.indexOf(pair) == -1) { 
        $scope.variables.push(pair);
      }
    } 
  });
  
  $scope.env = Env.get({});

  $scope.restartPolicy = {
    value: {}
  };
  
  $scope.batch = function() {
    var name = $scope.name;
    for (var i=1; i <= $scope.count; i++) {
      if($scope.count > 1) {
        $scope.name = name+"-"+i;
      }
      $scope.create();
    }      
  };
  
  $scope.create = function() {
    Container.create({
      name: $scope.name,
      Hostname: $scope.name,
      Env: $scope.variables,
      Image: imageName,
      Volumes: $scope.image.Config.Volumes,
      ExposedPorts: transformExposedPorts($scope.image.Config.ExposedPorts),
      //MacAddress: "12:34:56:78:9a:bc",
      HostConfig: getHostConfig()
    }, function( created ) {
      console.log('Container created.');
      Container.start({ 
        id: created.Id
      }, function() {
        console.log('Container started.');
      });
      // close after creation
      $scope.$close();
    });
  };

  var getHostConfig = function() {
    return {
      Binds: getBinds(),
      PortBindings: getPortBindings($scope.bindingPorts),
      PublishAllPorts: true,
      RestartPolicy: $scope.restartPolicy.value 
    };
  };

  var getBinds = function() {
    var bindingVolumes = [];
    var index = 0;
    for (var volume in $scope.image.Config.Volumes) {
      var key = $scope.hostVolumes[index]; index++;
      if(key) {
        bindingVolumes.push(key+':'+volume);
      }
    }    
    if ( $scope.config.docker ) {
      bindingVolumes.push('/var/run/docker.sock:/var/run/docker.sock');
      bindingVolumes.push($scope.env.DOCKER + ':/bin/docker');
    }
    return bindingVolumes;
  };

  var transformExposedPorts = function( data ) {
    var ports = {};
    for (var key in data) {
      ports[key] = {};
    }
    return ports;
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

