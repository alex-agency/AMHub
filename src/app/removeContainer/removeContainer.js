angular.module( 'vmhub.removeContainer', [
  'docker'
])

.controller( 'RemoveContainerCtrl', 
  function RemoveContainerCtrl( $scope, $modalInstance, $state, Image, Container ) {

  $scope.remove = function() {

/*
  $scope.removeContainer = function( data ) {
    Container.remove({ id: data.Id }, function() {
      //alert('Container removed: ');
      $scope.updateContainers();
    });
  };
*/

    $modalInstance.close();
  };

  $scope.close = function () {
    $modalInstance.dismiss();
  };

})

;

