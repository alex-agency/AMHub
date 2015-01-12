angular.module( 'amhub.imageInfo', [
  'ui.router',
  'ui.bootstrap',
  'docker'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'imageInfo', {
      url: 'images/:name',
      parent: home,
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'imageInfo/imageInfo.tpl.html',
            controller: 'ImageInfoCtrl',
            size: 'lg'
          })
          .result.then( function() {
            // after clicking OK button
          }, function() {
            // after clicking Cancel button or clicking background
            $state.transitionTo(home);
          });
      }
    })
  ;
})

.controller( 'ImageInfoCtrl', 
  function ImageInfoCtrl( $scope, $stateParams, Image, Container ) {

  $scope.image = Image.get({ id: $stateParams.name });

  $scope.imageContainers = [];
  Container.query({}, function( containers ) {
    for (var i in containers) {
      if( containers[i].Image == $stateParams.name ) {
        $scope.imageContainers.push(containers[i]);
      }
    }
  });

  $scope.close = function() {
    $scope.$dismiss();
  };

})

;

