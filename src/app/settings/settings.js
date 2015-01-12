angular.module( 'amhub.settings', [
  'ui.router',
  'ui.bootstrap',
  'cookies'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'settings', {
      url: 'settings',
      parent: home,
      onEnter: function onEnter( $modal, $state, $stateParams ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'settings/settings.tpl.html',
            controller: 'SettingsCtrl'
          })
          .result.then( function() {
            // after clicking OK button
          }, function() {
            // after clicking Cancel button or clicking background
            $state.transitionTo(home, $stateParams, { reload: true });
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
  };
})

;

