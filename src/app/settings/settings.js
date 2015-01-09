angular.module( 'vmhub.settings', [
  'ui.router',
  'ui.bootstrap'
])

.config( function config( $stateProvider ) {
  $stateProvider
    .state( 'settings', {
      url: 'settings',
      parent: 'settingsModal'
    })
    .state( 'settingsModal', {
      abstract: true,
      parent: 'home',
      url: '',
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'settings/settings.tpl.html',
            controller: 'SettingsCtrl'
          })
          .result.then( function() {
            // after clicking OK button
            $state.transitionTo('home');
          }, function() {
            // after clicking Cancel button or clicking background
            $state.transitionTo('home');
          });
      }
    })
  ;
})

.controller( 'SettingsCtrl', function SettingsCtrl( $scope ) {

  $scope.close = function () {
    $scope.$dismiss();
    //$scope.$close(true);
  };

  $scope.keypressCallback = function( $event ) {
    $scope.$dismiss();
    $event.preventDefault();
  };
})

;

