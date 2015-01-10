angular.module( 'vmhub.images', [
  'ui.router',
  'docker'
])

.controller( 'ImagesCtrl', 
  function ImagesCtrl( $scope, $modal, Cookies, Image ) {

  $scope.settings = Cookies.settings;
  $scope.searchThreshold = 10;

  $scope.update = function() {
    Image.query({}, function( images ) {
      $scope.images = [];
      angular.forEach( images, function( item ) {
        if( advancedView(item) && imageName(item) ) {
          this.push(item);
        }
      }, $scope.images );
    });
  };
  $scope.update();
  $scope.sort = '-Created';

  var customFilter = function( data, search ) {
    if( data.RepoTags && data.RepoTags[0].indexOf(search) != -1 ) {
      return true;
    }
    return false;
  };

  var advancedView = function( data ) {
    if( $scope.settings.advanced ) {
      return true;
    }
    if( $scope.isVMHub(data) || $scope.isNone(data) ) {
      return false;
    }
    return true;
  };

  var imageName = function( data ) {
    var filters = $scope.settings.filter.split('|');
    var result = false;
    angular.forEach(filters, function( filter ) {
      if( customFilter( data, filter ) ) {
        result = true;
      }
    });
    return result;
  };

  $scope.isNone = function( data ) {
    return customFilter( data, '<none>' );
  };

  $scope.isMe = function( data ) {
    return customFilter( data, 'alexagency/vmhub' );
  };

  $scope.createContainer = function( data ) {
    $scope.image = data;
    $scope.containers = $scope.containers;
    $modal.open({
      scope: $scope,
      templateUrl: 'createContainer/createContainer.tpl.html',
      controller: 'CreateContainerCtrl'
    });
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

/*
  $scope.getContainersCount = function( data ) {
    var containers = [];
    angular.forEach($scope.containers, function( item ) {
      if( item.Image == data.RepoTags[0] ) {
        this.push(item);
      }
    }, containers);
    return containers.length;
  };
*/

})

;

