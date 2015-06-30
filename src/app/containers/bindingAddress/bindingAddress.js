angular.module( 'app.bindingAddress', [])

.controller( 'BindingAddressCtrl', 
  function BindingAddressCtrl( $scope, $stateParams, Cookies, ContainerService ) {

  $scope.settings = Cookies.settings;

  ContainerService.getFreeAddresses().then(function( addresses ) {
    if(addresses.length > 0) {
      $scope.addresses = addresses;
      $scope.hostIp = addresses[0].ip;
      $scope.setBindings( $scope.hostIp );
    }
  });

  $scope.setBindings = function( ip ) {
    for(var port in $scope.bindingPorts) {
      if(ip) {
        $scope.bindingPorts[port] = [{ HostIp: ip, HostPort: port }];
      } else {
        $scope.bindingPorts[port] = [{ HostIp: '', HostPort: '' }];
      }
    }
  };

})

;

