angular.module( 'app.containers', [
  //'ui.router'
])

/*
.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'containers', {
      url: '/containers',
      views: {
        "containers": {
          controller: 'ContainersCtrl',
          templateUrl: 'containers/containers.tpl.html'
        }
      }
    })
  ;
})
*/

.controller( 'ContainersCtrl', 
  function ContainersCtrl( $scope, $modal, $interval, Cookies, ContainerService, ImageService ) {

  $scope.settings = Cookies.settings;
  $scope.searchThreshold = 10;
  $scope.viewLimit = 10;
  $scope.sort = '-Created';

  $scope.update = function() {
    ContainerService.update();
  };
  var intervalPromise = $interval($scope.update, 8000);

  ContainerService.update().then( ImageService.update() );
  
  $scope.imageFilter = ContainerService.imageFilter;

  $scope.$on('$destroy', function () { 
    $interval.cancel(intervalPromise);
  });

})

.service( 'ContainerService', 
  function ( $rootScope, $q, Cookies, Config, Container ) {
  var self = this;

  this.init = function() {
    if( !$rootScope.containers) {
      return self.update();
    }
    return $q.when();
  };

  this.imageFilter = function( data, filters ) {
    if( !data.Image ) {
      return false;
    }
    var name = data.Image;
    filters = filters.split('|');
    for (var i in filters) {
      if( filters[i].charAt(0) != '!' && 
          name.indexOf(filters[i]) != -1 ) {
        return true;
      } else if( name.indexOf(filters[i].slice(1)) != -1 ) {
        return false;
      }
    }
    return false;
  };

  this.update = function() {
    var settings = Cookies.settings;
    
    var advancedView = function( data, filters ) {
      if( !settings.advanced ) {
        filters += '|!alexagency/amhub';
      }
      return self.imageFilter(data, filters);
    };

    var deferred = $q.defer();
    Container.query({}, function( containers ) {
      $rootScope.containers = [];
      for(var i in containers) {
        if( advancedView(containers[i], settings.filter) ) {
          $rootScope.containers.push(containers[i]);
        }
      }
      return deferred.resolve();
    });
    return deferred.promise;
  };

  this.getByName = function( name ) {
    return self.init().then(function() {
      for (var i in $rootScope.containers) {
        var container = $rootScope.containers[i];
        if(container.Names[0]) {
          if(container.Names[0].slice(1) == name) { 
            return container;
          }
        } else {
          return container; //return first container without name
        }
      }
    });
  };

  this.getActive = function() {
    return self.init().then(function() {
      var containers = [];
      for(var i in $rootScope.containers) {
        if($rootScope.containers[i].Status.indexOf('Up') != -1) {
          containers.push($rootScope.containers[i]);
        }  
      }
      return containers;
    });
  };

  this.getFreeAddresses = function() {
    var deferred = $q.defer();
    Config.get({}, function(config) {
      var addresses = config.addresses;
      self.init().then(function() {
        for (var i in $rootScope.containers) {
          var container = $rootScope.containers[i];
          for(var index in container.Ports) {
            if(container.Ports[index] && container.Ports[index].IP) {
              var containerIp = container.Ports[index].IP;
              if(containerIp != "0.0.0.0") {
                for(var j in addresses) {
                  if(addresses[j].ip == containerIp) {
                    addresses.splice(j,1);
                    break;
                  }
                }
              } 
            }
          }
        }
        deferred.resolve(addresses);
      });
    });
    return deferred.promise;
  }; 

  this.remove = function( id ) {
    return Container.kill({ id: id }, function() {
      console.log('Container killed.');
      return Container.remove({ id: id }, function() {
        console.log('Container removed.');
      });
    });
  };

  this.getAllByImage = function( imageName ) {
    return self.init().then(function() {
      var imageContainers = [];
      for (var i in $rootScope.containers) {
        var container = $rootScope.containers[i];
        if( container.Image == imageName ) {
          imageContainers.push(container);
        }
      }
      return imageContainers;
    });
  };

  this.removeAllByImage = function( imageName ) {
    var deferred = $q.defer();
    self.init().then(function() {
      var promises = [];
      for (var i in $rootScope.containers) {
        var container = $rootScope.containers[i];
        if( container.Image == imageName ) {
          promises.push(self.remove( container.Id ));
        }
      }
      $q.all(promises)
        .then(function(resolutions) {
          return deferred.resolve();
      });
    });
    return deferred.promise;
  };

})

;

