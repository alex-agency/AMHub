angular.module( 'app.browseRepos', [
  'ui.router',
  'ui.bootstrap'
])

.config( function config( $stateProvider ) {
  var home = 'home';
  $stateProvider
    .state( 'browseRepos', {
      url: 'browse',
      parent: home,
      onEnter: function onEnter( $modal, $state ) {
        $modal
          // handle modal open
          .open({
            templateUrl: 'browseRepos/browseRepos.tpl.html',
            controller: 'BrowseReposCtrl',
            size: 'lg'
          })
          .result.then( function() {
            // after clicking OK button
          }, function() {
            // after clicking Cancel button or clicking background
            $state.transitionTo(home);
          });
      }
    })
  ;
})

.controller( 'BrowseReposCtrl', 
  function BrowseReposCtrl( $scope, $stateParams, Image ) {

  $scope.searchfor = '';
  $scope.sort = '-star_count';
  $scope.official = '';


  $scope.search = function( data ) {
    if($scope.searchfor === '') {
      return;
    }
    Image.search({ term: $scope.searchfor }, function( data ) {
      $scope.repos = data;
    });
  };
  
  $scope.pull = function( name ) {
    Image.pull({ fromImage: name+':latest' });
  };

  $scope.close = function() {
    $scope.$dismiss();
  };

})

;

