angular.module( 'vmhub', [
  'templates-app',
  'templates-common',
  'vmhub.home',
  'ui.router',
  'ui.bootstrap',
  'ngResource',
  'docker',
  'vmhub.createContainer',
  'vmhub.commitContainer',
  'vmhub.removeContainer',
  'vmhub.containerInfo',
  'vmhub.topContainer',
  'vmhub.removeImage',
  'vmhub.imageInfo',
  'vmhub.settings'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location, $modal ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = 'VM Hub' ;
    }
  });

  $scope.showSettings = function() {
    $modal.open({
      templateUrl: 'settings/settings.tpl.html',
      controller: 'SettingsCtrl'
    });
  };
})

;

