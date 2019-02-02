// https://docs.docker.com/engine/api/v1.39/
angular.module( 'docker', ['ngResource'] )
 
.factory( 'Settings', function( $location ) {
  var api = '/v1.39';  // TODO: move to '/v1.39';
  // url to proxy server
  var url = 'http://' + $location.host() + ':2375' + api;
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
    // DELETE /images/(id)?forse=true
    remove: { method: 'DELETE', params:{ id: '@id', force: true }, isArray: true }
  });
})

.factory( 'Container', function( $resource, Settings ) {
  return $resource(Settings.url+'/containers/:id/:action', {}, {
    // GET /containers/json?all=true
    query: { method: 'GET', params:{ action: 'json', all: true }, isArray: true },
    // GET /containers/(id)/json
    get: { method: 'GET', params:{ id: '@id', action: 'json' } },
    // GET /containers/(id)/top
    top: { method: 'GET', params:{ id: '@id', action: 'top' } },
    // POST /containers/create?name=(name)
    create: { method: 'POST', params:{ name: '@name', action: 'create' } }, 
    // POST /containers/(id)/start
    start: { method: 'POST', params:{ id: '@id', action: 'start' }, hasBody: false }, 
    // POST /containers/(id)/stop?t=5
    stop: { method: 'POST', params:{ id: '@id', action: 'stop', t: 5 } },
    // POST /containers/(id)/kill
    kill: { method: 'POST', params:{ id: '@id', action: 'kill' } }, 
    // DELETE /containers/(id)?forse=true
    remove: { method: 'DELETE', params:{ id: '@id', force: true } }
  });
})

.factory( 'Network', function( $resource, Settings ) {
  return $resource(Settings.url+'/networks/:id/:action', {}, {
    // GET /networks
    query: { method: 'GET', isArray: true },
    // GET /networks/(id)
    get: { method: 'GET', params:{ id: '@id' } },
    // GET /containers/(id)/connect?container=(name)
    connect: { method: 'POST', params:{ id: '@id', action: 'connect', container: '@container' } },
    // GET /containers/(id)/connect?container=(name)
    disconnect: { method: 'POST', params:{ id: '@id', action: 'disconnect', container: '@container', force: true } },
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

