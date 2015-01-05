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
  'vmhub.topContainer',
  'vmhub.removeImage'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/home' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | VMHub' ;
    }
  });
})

;

