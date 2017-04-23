klmApp.controller('SearchController', ['$scope', 'MovieService', function($scope, MovieService){
  $scope.searchObject = {};
  $scope.findMovie = MovieService.findMovie;
}]);//ends SearchController
