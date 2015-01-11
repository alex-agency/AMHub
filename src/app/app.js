angular.module( 'vmhub', [
  'templates-app',
  'templates-common',
  'ui.router',
  'ui.bootstrap',
  'docker',
  'cookies',
  'vmhub.home',
  'vmhub.settings',
  'vmhub.images',
  'vmhub.containers',
  'vmhub.imageInfo',
  'vmhub.createContainer',
  'vmhub.removeImage',
  'vmhub.containerInfo',
  
  
  'vmhub.commitContainer',
  'vmhub.removeContainer',
  'vmhub.topContainer'
])

.config( function myAppConfig ( $locationProvider, $urlRouterProvider ) {
  // use the HTML5 History API
  $locationProvider.html5Mode({ enabled: false, requireBase: false });
  // redirect any unmatched url
  $urlRouterProvider.otherwise( '/' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if( toState.data && toState.data.pageTitle ) {
      $scope.pageTitle = toState.data.pageTitle + ' | VM Hub';
    } else {
      $scope.pageTitle = 'VM Hub' ;
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

