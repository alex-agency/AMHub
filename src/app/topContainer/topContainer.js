angular.module( 'vmhub.topContainer', [
  'docker'
])

.controller( 'TopContainerCtrl', 
  function TopContainerCtrl( $scope, $modalInstance, $state, Container ) {

  $scope.top = Container.top({ id: $scope.container.Id });

  $scope.close = function () {
    $modalInstance.close();
  };

  $scope.onKeyPress = function($event) {
    if($event.keyCode == 13) {
        $scope.close();
    }
  };

})

;

