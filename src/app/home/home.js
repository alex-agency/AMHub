angular.module( 'vmhub.home', [
  'ui.router',
  'docker'
])

.config(function config( $stateProvider ) {
  $stateProvider
    .state( 'home', {
      url: '/',
      views: {
        "top": {
          controller: 'HomeCtrl',
          templateUrl: 'home/home.tpl.html'
        },
        "images": {
          controller: 'ImagesCtrl',
          templateUrl: 'images/images.tpl.html'
        },
        "containers": {
          controller: 'ContainersCtrl',
          templateUrl: 'containers/containers.tpl.html'
        }
      }
    })
    .state( 'startContainer', {
      url: 'containers/:name/start',
      parent: 'home',
      onEnter: function onEnter( $rootScope, $state, $stateParams, Container ) {
        Container.query({}, function( containers ) {
          for (var i in containers) {
            var names = containers[i].Names;
            for (var j in names) {
              if( names[j].slice(1) == $stateParams.name ) {
                start( containers[i] );
                break;
              }
            }
          }
        });
        var start = function( data ) {
          Container.start({ id: data.Id, PublishAllPorts: true }, function() {
            console.log('Container started.');
            $rootScope.updateContainers();
          });
        };
        $state.transitionTo('home');
      }
    })
    .state( 'stopContainer', {
      url: 'containers/:name/stop',
      parent: 'home',
      onEnter: function onEnter( $rootScope, $state, $stateParams, Container ) {
        Container.query({}, function( containers ) {
          for (var i in containers) {
            var names = containers[i].Names;
            for (var j in names) {
              if( names[j].slice(1) == $stateParams.name ) {
                stop( containers[i] );
                break;
              }
            }
          }
        });
        var stop = function( data ) {
          Container.stop({ id: data.Id }, function() {
            console.log('Container stopped.');
            $rootScope.updateContainers();
          });
        };
        $state.transitionTo('home');
      }
    })
  ;
})

.controller( 'HomeCtrl', 
  function HomeCtrl( $scope, $modal, Cookies, Image, Container ) {

})

.filter( 'filesize', function () {
  var units = ['bytes','KB','MB','GB'];
  return function( bytes, precision ) {
    if ( isNaN( parseFloat( bytes )) || ! isFinite( bytes ) || bytes === 0 ) {
      return '';
    }
    var unit = 0;
    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit ++;
    }
    return bytes.toFixed( + precision ) + ' ' + units[ unit ];
  };
})

;

