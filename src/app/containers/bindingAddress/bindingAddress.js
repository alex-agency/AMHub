angular.module( 'app.bindingAddress', [])

.controller( 'BindingAddressCtrl', 
  function BindingAddressCtrl( $scope, $stateParams, Cookies, Config, ContainerService ) {

  $scope.settings = Cookies.settings;

  if($scope.settings.disableAddressesLookup) {
    Config.get({}, function(config) {
      $scope.addresses = config.addresses;
    });
  } else {
    ContainerService.getFreeAddresses().then(function( addresses ) {
      if(addresses.length > 0) {
        $scope.addresses = addresses;
        $scope.hostIp = addresses[0].ip;
        $scope.setBindings( $scope.hostIp );
      }
    }); 
  }

  $scope.setBindings = function( ip ) {
    for(var port in $scope.bindingPorts) {
      if(ip) {
        $scope.bindingPorts[port] = { HostIp: ip, HostPort: port.split('/')[0] };
      } else {
        $scope.bindingPorts[port] = { HostIp: '', HostPort: '' };
      }
    }
  };

})

;

