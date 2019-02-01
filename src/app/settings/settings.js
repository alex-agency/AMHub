angular.module( 'app.settings', [
  'ui.router',
  'ui.bootstrap',
  'cookies',
  'server'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'settings', {
      url: 'settings',
      parent: home,
      onEnter: function onEnter( $uibModal, $state, $stateParams ) {
        $uibModal
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

.controller( 'SettingsCtrl', function SettingsCtrl( $scope, Cookies, Config ) {

  $scope.settings = Cookies.settings;
  $scope.updateCookies = Cookies.update;

  Config.get({}, function(data) {
    $scope.config = data;
  });

  /*$scope.updateConfig = function(item) {
    var value = { data: $scope.config[item] };
    Config.update({ item:item }, value);
  };*/

  $scope.saveConfig = function() {
    Config.save({}, $scope.config);
  };

  $scope.close = function() {
    $scope.$dismiss();
  };
})

;

