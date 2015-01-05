angular.module( 'vmhub.settings', [
])

.controller( 'SettingsCtrl', 
  function SettingsCtrl( $scope, $modalInstance, $state ) {

  $scope.close = function () {
    $modalInstance.close();
  };

})

;

