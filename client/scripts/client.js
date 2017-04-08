// setup angular module
var klmApp = angular.module( 'klmApp', []);


// setup main controller
klmApp.controller( 'MainController' , [ '$scope', '$http', function( $scope, $http){
  $scope.searchObject = {};

  $scope.findMovie = findMovie;
  function findMovie(object){
    var copy = angular.copy(object);
    var title = copy.title;

    object.title = '';

  }

}]);
