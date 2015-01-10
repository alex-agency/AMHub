angular.module( 'vmhub.containers', [
  'ui.router',
  'docker'
])

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
    filters = filters.split('|');
    var name = data.Image;
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
      filters += '|!alexagency/vmhub';
    }
    return $scope.imageFilter(data, filters);
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

