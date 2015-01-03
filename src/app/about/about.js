angular.module( 'vmhub.about', [
  'ui.router',
  'placeholders',
  'ui.bootstrap',
  'docker'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'about', {
    url: '/about',
    views: {
      "main": {
        controller: 'AboutCtrl',
        templateUrl: 'about/about.tpl.html'
      }
    },
    data:{ pageTitle: 'What is It?' }
  });
})

.controller( 'AboutCtrl', function AboutCtrl( $scope, Info, Image, Container, Commit ) {
  // This is simple a demo for UI Boostrap.
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];

  $scope.info = Info.get();

  $scope.images = Image.query();
  /*Image.query({}, function( data ) {
    $scope.images = data.map(function( item ) { 
      return {
        Created: item.Created,
        Id: item.Id,
        RepoTags: item.RepoTags,
        VirtualSize: item.VirtualSize
      };
    });
  });*/

  var i_Name = 'alex/vmhub';
  $scope.image = Image.get({ name: i_Name });

  $scope.containers = Container.query();
  /*Container.query({}, function( data ) {
    $scope.containers = data.map(function( item ) { 
      return {
        Created: item.Created,
        Id: item.Id,
        Image: item.Image,
        Names: item.Names,
        Ports: item.Ports,
        Status: item.Status
      };
    });
  });*/

  var c_Id = 'c85b01299b917fdacb8684bcbefc2cecc0e192345482a7dc2eec7c24bd9eff9f';
  $scope.container = Container.get({ id: c_Id });

  //Container.remove({ id: c_Id });

  //$scope.container_top = Container.top({ id: c_Id });

  /*$scope.create = Container.create({ 
    Image: 'alex/vmhub',
    Name: 'test',
    Hostname: 'test'
  });*/

  //Container.start({ id: c_Id });
  //Container.stop({ id: c_Id });

  var i_id = '74e956a15a8d54664c53879f7e790da6ccd7e5febcab892f7932855a219923e3';
  //$scope.image_removed = Image.remove({ id: i_id });

  /*var new_i_name = 'alexagency';
  Image.search({ term: new_i_name }, function( data ) {
    $scope.image_pull = data.map(function( item ) { 
      Image.pull({ fromImage: item.name });
      return item.name;
    });
  });*/
  
  /*$scope.commit = Commit.post({ 
    id: c_Id,
    name: 'test'
  });*/

})

;
