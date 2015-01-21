angular.module( 'amhub.containerInfo', [
  'ui.router',
  'ui.bootstrap',
  'docker'
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
            templateUrl: 'containerInfo/containerInfo.tpl.html',
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
      onEnter: function onEnter( $rootScope, $state, $stateParams, Container ) {
        Container.query({}, function( containers ) {
          for (var i in containers) {
            var names = containers[i].Names;
            for (var j in names) {
              if( names[j].slice(1) == $stateParams.name ) {
                stop( containers[i] );
                break;
              }
            }
          }
        });
        var stop = function( data ) {
          Container.stop({ id: data.Id }, function() {
            console.log('Container stopped.');
            $rootScope.updateContainers();
          });
        };
        $state.transitionTo('home');
      }
    })
  ;
})

.controller( 'ContainerInfoCtrl', 
  function ContainerInfoCtrl( $scope, $stateParams, $location, $interval, Container ) {

  Container.query({}, function( containers ) {
    for (var i in containers) {
      var names = containers[i].Names;
      for (var j in names) {
        if( names[j].slice(1) == $stateParams.name ) {
          get_info( containers[i].Id );
          break;
        }
      }
    }
  });

  var get_info = function( id ) {
    Container.get({ id: id }, function( data ) {
      $scope.container = data;
      refresh_top();            
    });
  };

  var refresh_top = function() {
    Container.top({ id: $scope.container.Id }, function( data ) {
      $scope.top = data;
    });
  };
  $interval(refresh_top, 5000);

  $scope.connectHTTP = function( port ) {
    $scope.targeturl = "http://"+$location.host()+":"+port;   
  };

  $scope.connectHTTPS = function( port ) {
    $scope.targeturl = "https://"+$location.host()+":"+port;   
  };

  $scope.connectRDP = function( port ) {
    var blob = 
      new Blob(["auto connect:i:1\n"+
                "full address:s:"+$location.host()+":"+port+"\n"+
                "username:s:user\n"+
                "redirectclipboard:i:1"],
      {type: "text/plain;charset=" + document.characterSet});
    // FileSaver.js
    saveAs(blob, $scope.container.Config.Hostname+".rdp");
  };

  $scope.close = function() {
    $scope.$dismiss();
  };

})

;

