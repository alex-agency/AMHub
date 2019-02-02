angular.module( 'app.containerNetwork', [])

.controller( 'ContainerNetworkCtrl', 
  function ContainerNetworkCtrl( $scope, $q, Network ) {

  $scope.networks = [];
  var inspectNetwork = function( id ) {
    Network.get({ id: id }, function( data ) {
      $scope.networks.push(data);
    });
  };
  Network.query({}, function( data ) {
    for(var i in data) {
      var net = data[i];
      if (net.Driver === "bridge" || net.Driver === "macvlan") {
        inspectNetwork(net.Id);
      }
    }
  });

  $scope.connect = function( containerId, networkId ) {
    Network.connect({ id: networkId, container: containerId }, function() {
      console.log('Network connected.');
      $scope.$dismiss();
    });
  };

  $scope.disconnect = function( containerId, networkId ) {
    Network.disconnect({ id: networkId, container: containerId }, function() {
      console.log('Network disconnected.');
      $scope.$dismiss();
    });
  };

})

;

