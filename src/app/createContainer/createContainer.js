angular.module( 'vmhub.createContainer', [
  'docker'
])

.controller( 'CreateContainerCtrl', 
  function CreateContainerCtrl( $scope, $modalInstance, $state, Container ) {

  $scope.config = {
    name: ''
  };

  $scope.create = function () {
    Container.create({ 
      Image: $scope.image.RepoTags[0],
      name: $scope.config.name,
      Hostname: $scope.config.name
    }, function( created ) {
      Container.start({ id: created.Id }, function( started ) {
        //alert('Container created and started: '+started.id);
        $scope.updateContainers();
      });  
    });
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss();
  };

  $scope.onKeyPress = function($event) {
    if($event.keyCode == 13) {
        $scope.create();
    }
  };

})

;

