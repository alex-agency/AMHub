angular.module( 'amhub', [
  'templates-app',
  'templates-common',
  'ui.router',
  'ui.bootstrap',
  'docker',
  'cookies',
  'amhub.home',
  'amhub.settings',
  'amhub.images',
  'amhub.containers',
  'amhub.imageInfo',
  'amhub.createContainer',
  'amhub.removeImage',
  'amhub.containerInfo',
  'amhub.commitContainer',
  'amhub.removeContainer',
  'amhub.startContainer'
])

.config( function myAppConfig ( $locationProvider, $urlRouterProvider ) {
  // use the HTML5 History API
  $locationProvider.html5Mode({ enabled: true, requireBase: false });
  // redirect any unmatched url
  $urlRouterProvider.otherwise( '/' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if( toState.data && toState.data.pageTitle ) {
      $scope.pageTitle = toState.data.pageTitle + ' | AM Hub';
    } else {
      $scope.pageTitle = 'AM Hub' ;
    }
  });
})

.directive( 'keyEnter', function () {
  return function (scope, element, attrs) {
    element.bind("keydown keypress", function ( event ) {
      if( event.which === 13 ) {
        scope.$apply(function () {
          scope.$eval(attrs.keyEnter);
        });
        event.preventDefault();
      }
    });
  };
})

;

