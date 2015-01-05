angular.module( 'vmhub.containerInfo', [
  'docker'
])

.controller( 'ContainerInfoCtrl', 
  function ContainerInfoCtrl( $scope, $modalInstance, $state, $location, Container ) {

  $scope.container = Container.get({ id: $scope.container.Id });

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

  $scope.open = function( port ) {
    $scope.targeturl = "http://"+$location.host()+":"+port;   
  };

  $scope.close = function () {
    $modalInstance.close();
  };

})

;

