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

})

;

