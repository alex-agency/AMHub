angular.module( 'amhub', [
  'templates-app',
  'templates-common',
  'ui.router',
  'ui.bootstrap',
  'docker',
  'cookies',
  'app.home',
  'app.settings',
  'app.images',
  'app.imageInfo',
  'app.removeImage',
  'app.browseRepos',
  'app.containers',
  'app.createContainer',
  'app.bindingAddress',
  'app.containerInfo',
  'app.containerProcesses',
  'app.containerNetwork',
  'app.commitContainer',
  'app.removeContainer'
])

.config( function myAppConfig ( $locationProvider, $urlRouterProvider ) {
  // use the HTML5 History API
  $locationProvider.html5Mode({ enabled: false, requireBase: false });
  // redirect any unmatched url
  $urlRouterProvider.otherwise( '/' );
  // remove #!/ prefix
  $locationProvider.hashPrefix( '' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if( toState.data && toState.data.pageTitle ) {
      $scope.pageTitle = toState.data.pageTitle + ' | AM Hub 2.0';
    } else {
      $scope.pageTitle = 'AM Hub 2.0' ;
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
