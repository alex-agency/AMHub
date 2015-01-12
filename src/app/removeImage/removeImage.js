angular.module( 'amhub.removeImage', [
  'ui.router',
  'ui.bootstrap',
  'docker'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'removeImage', {
      url: 'images/:name/remove',
      parent: home,
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'removeImage/removeImage.tpl.html',
            controller: 'RemoveImageCtrl'
          })
          .result.then( function() {
            // after clicking OK button
            $state.transitionTo(home);
          }, function() {
            // after clicking Cancel button or clicking background
            $state.transitionTo(home);
          });
      }
    })
  ;
})

.controller( 'RemoveImageCtrl', 
  function RemoveImageCtrl( $scope, $stateParams, Image, Container ) {

  Image.query({}, function( images ) {
    for (var i in images) {
      var names = images[i].RepoTags;
      for (var j in names) {
        if( names[j] == $stateParams.name ) {
          $scope.image = images[i];
          break;
        }
      }
    }
  });
  
  $scope.imageContainers = [];
  Container.query({}, function( containers ) {
    for (var i in containers) {
      if( containers[i].Image == $stateParams.name ) {
        $scope.imageContainers.push(containers[i]);
      }
    }
  });

  var removeContainers = function() {
    angular.forEach($scope.imageContainers, function( item ) {
      Container.stop({ id: item.Id }, function() {
        console.log('Container stoped.');
        Container.remove({ id: item.Id}, function() {
          console.log('Container removed.');
          $scope.updateContainers();
          removeImage();
        });
      });
    });
  };

  var removeImage = function() {
    Image.remove({ id: $scope.image.Id }, function( data ) {
      for (var i in data) {
        console.log('Image removed.');
      }
      $scope.updateImages();
    });
  };

  $scope.remove = function() {
    if($scope.imageContainers.length > 0) {
      removeContainers();
    } else {
      removeImage();
    }
    $scope.$close();
  };

  $scope.close = function() {
    $scope.$dismiss();
  };

})

;

