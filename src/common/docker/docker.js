// https://docs.docker.com/reference/api/docker_remote_api_v1.16/ 
angular.module( 'docker', ['ngResource'] )
 
.factory( 'Settings', function( $location ) {
  var api = '/v1.19';
  // url to proxy server
  var url = 'http://' + $location.host() + ':8000' + api;
  return {
    url: url
  };
})

.factory( 'Ping', function( $resource, Settings ) {
  // GET /ping
  return $resource(Settings.url+'/_ping', {}, {
    get: { method:'GET' }
  });
})

.factory( 'Info', function( $resource, Settings ) {
  // GET /info
  return $resource(Settings.url+'/info', {}, {
    get: { method:'GET' }
  });
})

.factory( 'Image', function( $resource, Settings ) {
  return $resource(Settings.url+'/images/:name/:id/:action', {}, {
    // GET /images/json
    query: { method: 'GET', params:{ action: 'json' }, isArray: true },
    // GET /images/(name)/json
    get: { method: 'GET', params:{ name: '@name', action: 'json' } },
    // GET /images/search?term=(name)
    search: { method: 'GET', params:{ action: 'search', term: '@term' }, isArray: true },
    // POST /images/create?fromImage=(name)
    pull: { method: 'POST', params:{ action: 'create', fromImage: '@fromImage' } },
    // DELETE /images/(id)?forse=1
    remove: { method: 'DELETE', params:{ id: '@id', force: 1 }, isArray: true }
  });
})

.factory( 'Container', function( $resource, Settings ) {
  return $resource(Settings.url+'/containers/:id/:action', {}, {
    // GET /containers/json?all=1
    query: { method: 'GET', params:{ action: 'json', all: 1 }, isArray: true },
    // GET /containers/(id)/json
    get: { method: 'GET', params:{ id: '@id', action: 'json' } },
    // GET /containers/(id)/top
    top: { method: 'GET', params:{ id: '@id', action: 'top' } },
    // POST /containers/create
    create: { method: 'POST', params:{ name: '@name', action: 'create' } }, 
    // POST /containers/(id)/start
    start: { method: 'POST', params:{ id: '@id', action: 'start' } }, 
    // POST /containers/(id)/stop
    stop: { method: 'POST', params:{ id: '@id', action: 'stop' } },
    // POST /containers/(id)/kill
    kill: { method: 'POST', params:{ id: '@id', action: 'kill' } }, 
    // DELETE /containers/(id)
    remove: { method: 'DELETE', params:{ id: '@id' } }
  });
})

.factory( 'Commit', function( $resource, Settings ) {
  // POST /commit?container=(id)&repo=(name)
  return $resource(Settings.url+'/commit', {}, {
    post: { method: 'POST', params:{ container: '@id', repo: '@name' } }
  });
})

// tar zcf Dockerfile.tar.gz Dockerfile
// curl -v -X POST -H "Content-Type:application/tar" --data-binary '@Dockerfile.tar.gz' http://proxy/build?t=sample
.factory( 'Build', function( $resource, Settings ) {
  // POST /build?t=(name)
  return $resource(Settings.url+'/build', {}, {
    post: { method:'POST', t: '@name' }
  });
})

;

