angular.module( 'vmhub.commitContainer', [
  'docker'
])

.controller( 'CommitContainerCtrl', 
  function CommitContainerCtrl( $scope, $modalInstance, $state, Commit ) {

  $scope.config = {
    name: ''
  };

  $scope.commit = function () {
    Commit.post({ 
      id: $scope.container.Id,
      name: $scope.config.name
    }, function( image ) {
        //alert('Image created: '+image.Id);
        $scope.updateImages();
    });  
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };

  $scope.onKeyPress = function($event) {
    if($event.keyCode == 13) {
        $scope.commit();
    }
  };

})

;

