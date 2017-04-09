// setup angular module
var klmApp = angular.module( 'klmApp', []);
var testObject = {title: "Dune"};
console.log("testObject",testObject);

klmApp.controller('SearchController', ['$scope', 'MovieService', function($scope, MovieService){
  $scope.searchObject = {};
  $scope.findMovie = MovieService.findMovie;
}]);//ends SearchController

klmApp.controller('DisplayController', ['$scope', 'MovieService', function($scope, MovieService){
  MovieService.addToFavorites();
}]);//ends DisplayController

klmApp.controller('FavoritesController', ['$scope', 'MovieService', function($scope, MovieService){
  $scope.MovieService.favorites = MovieService.favorites;
  MovieService.deleteMovie();
}]);//ends FavoritesController

klmApp.factory( 'MovieService', ['$http', function(){
  var listOfFavoritesArray = [];
  var favorites = {};
  favorites.list = listOfFavoritesArray;

  return{
    favorites: favorites,
    findMovie: function (object){
      console.log("inside findMovie");
      console.log(object);
      var copy = angular.copy(object);
      var title = copy.title;
      console.log("copy",copy,"title", title);
      object.title = '';
      var searchResult = {};
      $http.get('http://www.omdbapi.com/?t=' + title + '&y=&plot=full&r=json').
        then(function(response){
          console.log(response);
          var movie = {};
          movie.title = response.data.Title;
          movie.director = response.data.Director;
          movie.poster = response.data.Poster;
          movie.year = response.data.Year;
          movie.writer = response.data.Writer;
          movie.plot = response.data.Plot;
          searchResult.movie = movie;
        });//ends response
      $scope.searchResult = searchResult;
    },//ends findMovie

    addToFavorites:   function (title, year){
        console.log( "You're trying to add to favorites", title, year);
        var favoriteObject = {};
        var newTitle = angular.copy(title);
        var newYear = angular.copy(year);
        favoriteObject.title = newTitle;
        favoriteObject.year = newYear;
        console.log(favoriteObject);
        listOfFavoritesArray.push(favoriteObject);
        console.log(listOfFavoritesArray, "listOfFavoritesArray");
      },//ends addToFavorites

    deleteMovie: function (index){
      console.log("you are trying to delete a movie");
      $scope.favorites.list.splice(index, 1);
    },//ends deleteMovie
  };//ends return

}]);//ends factory
