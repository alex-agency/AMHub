angular.module( 'vmhub.imageInfo', [
  'docker'
])

.controller( 'ImageInfoCtrl', 
  function ImageInfoCtrl( $scope, $modalInstance, $state, $location, Image ) {

  $scope.image = Image.get({ id: $scope.image.RepoTags[0] });

  $scope.close = function () {
    $modalInstance.close();
  };

})

;

