klmApp.controller('FavoritesController', ['$scope', 'MovieService', function($scope, MovieService){
  $scope.favorites = MovieService.favorites;
  $scope.deleteMovie = MovieService.deleteMovie;
  $scope.findMovie = MovieService.findMovie;
}]);//ends FavoritesController
