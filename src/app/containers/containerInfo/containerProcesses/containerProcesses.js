angular.module( 'app.containerProcesses', [])

.controller( 'ContainerProcessesCtrl', 
  function ContainerProcessesCtrl( $scope, $interval, Container, Cookies ) {

  $scope.settings = Cookies.settings;

  var top = function() {
    if($scope.container !== undefined && $scope.container.State.Running) {
      Container.top({ id: $scope.container.Id }, function( data ) {
        $scope.top = data;
      });
    }
  };
  var intervalPromise = $interval(top, 2500); 
  $scope.$on('$destroy', function () { 
    $interval.cancel(intervalPromise);
  });

})

;

