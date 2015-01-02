angular.module( 'docker', ['ngResource'] )

.factory( 'info', ['$resource', function( $resource ) {
  
  return $resource('http://192.168.59.103:8000/info', {}, {
    get: { method:'GET' }
  });
}])

.factory( 'image', ['$resource', function( $resource ) {
  
  return $resource('/images/:id/:action', {}, {
    query: { method: 'GET', params:{ action: 'json' }, isArray: true }
  });
}])

;
