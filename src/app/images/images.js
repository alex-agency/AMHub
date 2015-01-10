angular.module( 'vmhub.images', [
  'ui.router',
  'docker'
])

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
    filters = filters.split('|');
    var name = data.RepoTags[0];
    var result = false;
    angular.forEach(filters, function( filter ) {
      if( filter.charAt(0) != '!' && 
          name.indexOf(filter) != -1 ) {
        result = true;
      } else if( name.indexOf(filter.slice(1)) != -1 ) {
        result = false;
      }
    });
    return result;
  };

  var advancedView = function( data, filters ) {
    if( !$scope.settings.advanced ) {
      filters += '|!<none>|!alexagency/vmhub';
    }
    return $scope.imageFilter(data, filters);
  };

  $scope.remove = function( data ) {
    $scope.image = data;
    $modal.open({
      scope: $scope,
      templateUrl: 'removeImage/removeImage.tpl.html',
      controller: 'RemoveImageCtrl'
    });
  };

  $scope.details = function( data ) {
    $scope.image = data;
    $modal.open({
      scope: $scope,
      templateUrl: 'imageInfo/imageInfo.tpl.html',
      controller: 'ImageInfoCtrl',
      windowClass: 'large-Modal'
    });
  };

  $scope.getContainersCount = function( data ) {
    var containers = [];
    angular.forEach($scope.containers, function( item ) {
      if( item.Image == data.RepoTags[0] ) {
        this.push(item);
      }
    }, containers);
    return containers.length;
  };

})

;

