angular.module( 'app.containerInfo', [
  'ui.router',
  'ui.bootstrap'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'containerInfo', {
      url: 'containers/:name',
      parent: home,
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'containers/containerInfo/containerInfo.tpl.html',
            controller: 'ContainerInfoCtrl',
            size: 'lg'
          })
          .result.then( function() {
            // after clicking OK button
          }, function() {
            // after clicking Cancel button or clicking background
            $state.transitionTo(home);
          });
      }
    })
    .state( 'stopContainer', {
      url: 'containers/:name/stop',
      parent: 'home',
      onEnter: function onEnter( $rootScope, $state, $stateParams, ContainerService, Container ) {
        ContainerService.getByName( decodeURIComponent($stateParams.name) )
          .then(function( container ) {
            Container.stop({ id: container.Id }, function() {
              console.log('Container stoped.');
            });
        });
        $state.transitionTo('home');
      }
    })
  ;
})

.controller( 'ContainerInfoCtrl', 
  function ContainerInfoCtrl( $scope, $stateParams, $location, $interval, ContainerService, Container ) {

  var intervalPromise; 
  ContainerService.getByName( decodeURIComponent($stateParams.name) )
    .then(function( container ) {
      Container.get({ id: container.Id }, function( data ) {
        $scope.container = data;
        if(container.Status.indexOf('Up') != -1) {
          intervalPromise = $interval(top, 5000);
          top();
        }
      });
  });

  var top = function() {
    Container.top({ id: $scope.container.Id }, function( data ) {
      $scope.top = data;
    });
  };

  $scope.connectHTTP = function( ip, port ) {
    if(ip == '0.0.0.0') {
      ip = $location.host();
    }
    $scope.targeturl = "http://"+ip+":"+port;    
  };

  $scope.connectHTTPS = function( ip, port ) {
    if(ip == '0.0.0.0') {
      ip = $location.host();
    }
    $scope.targeturl = "https://"+ip+":"+port;   
  };

  $scope.connectRDP = function( ip, port ) {
    if(ip == '0.0.0.0') {
      ip = $location.host();
    }
    var blob = 
      new Blob(["auto connect:i:1\n"+
                "full address:s:"+ip+":"+port+"\n"+
                "username:s:user\n"+
                "redirectclipboard:i:1"],
      {type: "text/plain;charset=" + document.characterSet});
    // FileSaver.js
    saveAs(blob, $scope.container.Config.Hostname+".rdp");
  };

  $scope.close = function() {
    $scope.$dismiss();
  };

  $scope.$on('$destroy', function () { 
    $interval.cancel(intervalPromise);
  });

})

;

