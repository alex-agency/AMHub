angular.module( 'vmhub.removeImage', [
  'docker'
])

.controller( 'RemoveImageCtrl', 
  function RemoveImageCtrl( $scope, $modalInstance, $state, Image, Container ) {

  $scope.imageContainers = [];
  angular.forEach($scope.containers, function( item ) {
    if( item.Image == $scope.image.RepoTags[0] ) {
      this.push(item);
    }
  }, $scope.imageContainers);

  var removeContainers = function() {
    angular.forEach($scope.imageContainers, function( item ) {
      Container.stop({ id: item.Id }, function() {
        //alert('Container stoped: ');
        Container.remove({ id: item.Id}, function() {
          //alert('Container removed: ');
          $scope.updateContainers();
          removeImage();
        });
      });
    });
  };

  var removeImage = function() {
    Image.remove({ id: $scope.image.Id }, function( data ) {
      angular.forEach(data, function( item ) {
        //alert('Image removed: '+ item.Deleted);
      });
      $scope.updateImages();
    });
  };

  $scope.remove = function() {
    if($scope.imageContainers.length > 0) {
      removeContainers();
    } else {
      removeImage();
    }
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

