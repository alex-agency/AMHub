angular.module( 'amhub.containers', [
  'ui.router',
  'docker'
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
  function ContainersCtrl( $scope, $rootScope, $modal, Cookies, Container ) {

  $scope.settings = Cookies.settings;
  $scope.searchThreshold = 10;

  $rootScope.updateContainers = function() {
    Container.query({}, function( containers ) {
      $rootScope.containers = [];
      angular.forEach( containers, function( item ) {
        if( advancedView(item, $scope.settings.filter) ) {
          this.push(item);
        }
      }, $rootScope.containers );
    });
  };
  $scope.updateContainers();
  $scope.sort = '-Created';

  $scope.imageFilter = function( data, filters ) {
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

  var advancedView = function( data, filters ) {
    if( !$scope.settings.advanced ) {
      filters += '|!alexagency/amhub';
    }
    return $scope.imageFilter(data, filters);
  };

})

;

