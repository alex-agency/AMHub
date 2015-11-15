angular.module( 'server', ['ngResource'] )
 
.factory( 'Server', function( $location ) {
  // url to api
  var url = 'http://' + $location.host() + ':80/api';
  return {
    url: url
  };
})

.factory( 'Config', function( $resource, Server ) {
  return $resource(Server.url+'/config/:item', {}, {
    'get': { method:'GET', params:{ item: '@item' } },
    //'update': { method:'PUT', params:{item: '@item'} },
    'save': { method: 'POST' }
  });
})

.factory( 'Env', function( $resource, Server ) {
  return $resource(Server.url+'/env/:item', {}, {
    'get': { method:'GET', params:{ item: '@item' } }
  });
})

;

