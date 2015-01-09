angular.module( 'vmhub.home', [
  'ui.router',
  'docker'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'home', {
    url: '/',
    views: {
      "main": {
        controller: 'HomeCtrl',
        templateUrl: 'home/home.tpl.html'
      }
    }
  });
})

.controller( 'HomeCtrl', 
  function HomeCtrl( $scope, $modal, Cookies, Image, Container ) {

  $scope.settings = Cookies.settings;

  $scope.updateImages = function() {
    Image.query({}, function( data ) {
      $scope.images = data;
    });
  };
  $scope.updateImages();
  $scope.sortImages = '-Created';

  $scope.updateContainers = function() {
    Container.query({}, function( data ) {
      $scope.containers = data;
    });
  };
  $scope.updateContainers();
  $scope.sortContainers = '-Created';

  $scope.createContainer = function( data ) {
    $scope.image = data;
    $scope.containers = $scope.containers;
    $modal.open({
      scope: $scope,
      templateUrl: 'createContainer/createContainer.tpl.html',
      controller: 'CreateContainerCtrl'
    });
  };

  $scope.removeImage = function( data ) {
    $scope.image = data;
    $modal.open({
      scope: $scope,
      templateUrl: 'removeImage/removeImage.tpl.html',
      controller: 'RemoveImageCtrl'
    });
  };

  $scope.startContainer = function( data ) {
    Container.start({ id: data.Id }, function( container ) {
      //alert('Container started: '+container.id);
      $scope.updateContainers();
    });
  };

  $scope.stopContainer = function( data ) {
    Container.stop({ id: data.Id }, function( container ) {
      //alert('Container stoped: '+container.id);
      $scope.updateContainers();
    });
  };

  $scope.commitContainer = function( data ) {
    $scope.container = data;
    $modal.open({
      scope: $scope,
      templateUrl: 'commitContainer/commitContainer.tpl.html',
      controller: 'CommitContainerCtrl'
    });
  };

  $scope.topContainer = function( data ) {
    $scope.container = data;
    $modal.open({
      scope: $scope,
      templateUrl: 'topContainer/topContainer.tpl.html',
      controller: 'TopContainerCtrl',
      windowClass: 'large-Modal'
    });
  };

  $scope.removeContainer = function( data ) {
    $scope.container = data;
    $modal.open({
      scope: $scope,
      templateUrl: 'removeContainer/removeContainer.tpl.html',
      controller: 'RemoveContainerCtrl'
    });
  };

  $scope.containerInfo = function( data ) {
    $scope.container = data;
    $modal.open({
      scope: $scope,
      templateUrl: 'containerInfo/containerInfo.tpl.html',
      controller: 'ContainerInfoCtrl',
      windowClass: 'large-Modal'
    });
  };

  $scope.imageInfo = function( data ) {
    $scope.image = data;
    $modal.open({
      scope: $scope,
      templateUrl: 'imageInfo/imageInfo.tpl.html',
      controller: 'ImageInfoCtrl',
      windowClass: 'large-Modal'
    });
  };

  $scope.getContainersNumber = function( data ) {
    var imageContainers = [];
    angular.forEach($scope.containers, function( item ) {
      if( item.Image == data.RepoTags[0] ) {
        this.push(item);
      }
    }, imageContainers);
    return imageContainers.length;
  };

  $scope.isNone = function( data ) {
    return data.RepoTags[0] == '<none>:<none>';
  };

  $scope.isVMHub = function( data ) {
    if( data.RepoTags && 
          data.RepoTags[0].indexOf('vmhub') != -1 ) {
      return true;
    }
    if( data.Image && data.Image.indexOf('vmhub') != -1 ) {
      return true;
    }
    return false;
  };

})

.filter( 'filesize', function () {
  var units = ['bytes','KB','MB','GB'];
  return function( bytes, precision ) {
    if ( isNaN( parseFloat( bytes )) || ! isFinite( bytes ) || bytes === 0 ) {
      return '';
    }
    var unit = 0;
    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit ++;
    }
    return bytes.toFixed( + precision ) + ' ' + units[ unit ];
  };
})

;

