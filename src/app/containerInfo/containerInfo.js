angular.module( 'vmhub.containerInfo', [
  'ui.router',
  'ui.bootstrap',
  'docker'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'containerInfo', {
      url: 'containers/:name',
      parent: 'containerInfoModal'
    })
    .state( 'containerInfoModal', {
      abstract: true,
      parent: home,
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'containerInfo/containerInfo.tpl.html',
            controller: 'ContainerInfoCtrl',
            size: 'lg'
            //windowClass: 'large-Modal'
          })
          .result.then( function() {
            // after clicking OK button
          }, function() {
            // after clicking Cancel button or clicking background
            $state.transitionTo(home);
          });
      }
    })
  ;
})

.controller( 'ContainerInfoCtrl', 
  function ContainerInfoCtrl( $scope, $stateParams, $location, Container ) {

  $scope.container = {};
  $scope.top = {};
  Container.query({}, function( containers ) {
    for (var i in containers) {
      var names = containers[i].Names;
      for (var j in names) {
        if( names[j].slice(1) == $stateParams.name ) {
          $scope.container = Container.get({ id: containers[i].Id });
          $scope.top = Container.top({ id: containers[i].Id });
          break;
        }
      }
    }
  });

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

