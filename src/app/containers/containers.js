angular.module( 'vmhub.containers', [
  'ui.router',
  'docker'
])

.controller( 'ContainersCtrl', 
  function ContainersCtrl( $scope, $modal, Cookies, Container ) {

  $scope.settings = Cookies.settings;
  $scope.searchThreshold = 10;

  $scope.update = function() {
    Container.query({}, function( containers ) {
      $scope.containers = [];
      angular.forEach( containers, function( item ) {
        if( advancedView(item) && imageName(item) ) {
          this.push(item);
        }
      }, $scope.containers );
    });
  };
  $scope.update();
  $scope.sort = '-Created';

  var customFilter = function( data, search ) {
    if( data.Image && data.Image.indexOf(search) != -1 ) {
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

  $scope.start = function( data ) {
    Container.start({ id: data.Id }, function( container ) {
      //alert('Container started: '+container.id);
      $scope.update();
    });
  };

  $scope.stop = function( data ) {
    Container.stop({ id: data.Id }, function( container ) {
      //alert('Container stoped: '+container.id);
      $scope.update();
    });
  };

  $scope.commit = function( data ) {
    $scope.container = data;
    $modal.open({
      scope: $scope,
      templateUrl: 'commitContainer/commitContainer.tpl.html',
      controller: 'CommitContainerCtrl'
    });
  };

  $scope.top = function( data ) {
    $scope.container = data;
    $modal.open({
      scope: $scope,
      templateUrl: 'topContainer/topContainer.tpl.html',
      controller: 'TopContainerCtrl',
      windowClass: 'large-Modal'
    });
  };

  $scope.remove = function( data ) {
    $scope.container = data;
    $modal.open({
      scope: $scope,
      templateUrl: 'removeContainer/removeContainer.tpl.html',
      controller: 'RemoveContainerCtrl'
    });
  };

  $scope.details = function( data ) {
    $scope.container = data;
    $modal.open({
      scope: $scope,
      templateUrl: 'containerInfo/containerInfo.tpl.html',
      controller: 'ContainerInfoCtrl',
      windowClass: 'large-Modal'
    });
  };

})

;

