angular.module( 'amhub.images', [
  'ui.router',
  'docker'
])

/*
.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'images', {
      url: '/images',
      views: {
        "images": {
          controller: 'ImagesCtrl',
          templateUrl: 'images/images.tpl.html'
        }
      }
    })
  ;
})
*/

.controller( 'ImagesCtrl', 
  function ImagesCtrl( $scope, $rootScope, $modal, Cookies, Image ) {

  $scope.settings = Cookies.settings;
  $scope.searchThreshold = 10;

  $rootScope.updateImages = function() {
    Image.query({}, function( images ) {
      $rootScope.images = [];
      angular.forEach( images, function( item ) {
        if( advancedView(item, $scope.settings.filter) ) {
          this.push(item);
        }
      }, $rootScope.images );
    });
  };
  $scope.updateImages();
  $scope.sort = '-Created';

  $scope.imageFilter = function( data, filters ) {
    if( !data.RepoTags ) {
      return false;
    }
    var name = data.RepoTags[0];
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
      filters += '|!<none>|!alexagency/amhub';
    }
    return $scope.imageFilter(data, filters);
  };

  $scope.getContainersCount = function( data ) {
    var containers = [];
    for (var i in $scope.containers) {
      if( $scope.containers[i].Image == data.RepoTags[0] ) {
        containers.push($scope.containers[i]);
      }
    }
    return containers.length;
  };

})

;

