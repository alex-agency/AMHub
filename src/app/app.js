angular.module( 'vmhub', [
  'templates-app',
  'templates-common',
  'ui.router',
  'ui.bootstrap',
  'docker',
  'cookies',
  'vmhub.home',
  'vmhub.settings',


  'vmhub.createContainer',
  'vmhub.commitContainer',
  'vmhub.removeContainer',
  'vmhub.containerInfo',
  'vmhub.topContainer',
  'vmhub.removeImage',
  'vmhub.imageInfo'
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
          scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
})

;

