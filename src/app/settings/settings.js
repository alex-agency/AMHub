angular.module( 'vmhub.settings', [
  'ui.router',
  'ui.bootstrap',
  'cookies'
])

.config( function config( $stateProvider ) {
  var view = 'home';
  $stateProvider
    .state( 'settings', {
      url: 'settings',
      parent: 'settingsModal'
    })
    .state( 'settingsModal', {
      abstract: true,
      parent: view,
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
            $state.transitionTo(view);
          }, function() {
            // after clicking Cancel button or clicking background
            $state.transitionTo(view);
          });
      }
    })
  ;
})

.controller( 'SettingsCtrl', function SettingsCtrl( $scope, Cookies ) {

  $scope.settings = Cookies.settings;
  $scope.updateCookies = Cookies.update;

  $scope.close = function() {
    $scope.$dismiss();
    //$scope.$close(true);
  };
})

;

