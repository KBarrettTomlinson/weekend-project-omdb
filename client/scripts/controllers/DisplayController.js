klmApp.controller('DisplayController', ['$scope', 'MovieService', function($scope, MovieService){
  $scope.classesObject = MovieService.classesObject;
  $scope.searchResult = MovieService.searchResult;
  $scope.addToFavorites = MovieService.addToFavorites;
}]);//ends DisplayController
