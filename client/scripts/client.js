console.log("I'm still here for you.");
// setup angular module
var klmApp = angular.module( 'klmApp', []);

klmApp.controller('SearchController', ['$scope', 'MovieService', function($scope, MovieService){
  console.log("does this happen on loading of the webpage?");
  $scope.searchObject = {};
  $scope.findMovie = MovieService.findMovie;
}]);//ends SearchController

klmApp.controller('DisplayController', ['$scope', 'MovieService', function($scope, MovieService){
  $scope.searchResult = MovieService.searchResult;
  $scope.addToFavorites = MovieService.addToFavorites;
}]);//ends DisplayController

klmApp.controller('FavoritesController', ['$scope', 'MovieService', function($scope, MovieService){
  $scope.favorites = MovieService.favorites;
  $scope.deleteMovie = MovieService.deleteMovie;
  $scope.findMovie = MovieService.findMovie;
}]);//ends FavoritesController

klmApp.factory( 'MovieService', ['$http', function($http){
  var listOfFavoritesArray = [];
  var favorites = {};
  var searchResult = {};

  $http.get('/favorites').then(function(response){
    console.log("get all favorites",response);
    favorites.list = response.data;
    console.log("favorites.list");
  });


  return{
    searchResult: searchResult,
    favorites: favorites,
    findMovie: function (object){
      var copy = angular.copy(object);
      var title = copy.title;
      console.log("object._id",object._id);
      if ("undefined" === typeof object._id){
        object.title = '';
      }
      $http.get('http://www.omdbapi.com/?t=' + title + '&y=&plot=full&r=json').
        then(function(response){
          var movie = {};
          movie.title = response.data.Title;
          movie.director = response.data.Director;
          movie.poster = response.data.Poster;
          movie.year = response.data.Year;
          movie.writer = response.data.Writer;
          movie.plot = response.data.Plot;
          searchResult.movie = movie;
        });//ends response
    },//ends findMovie

    addToFavorites:   function (title, year){
        console.log( "You're trying to add to favorites", title, year);
        var favoriteObject = {};
        var newTitle = angular.copy(title);
        var newYear = angular.copy(year);
        favoriteObject.title = newTitle;
        favoriteObject.year = newYear;

        $http.post('/favorites/addFavorite', favoriteObject).then(function(response){
          console.log(response);
          $http.get('/favorites').then(function(response){
            console.log("get all favorites",response);
            favorites.list = response.data;
            console.log("favorites.list");
          });// ends get to favorites
        });//ends post to addFavorite
      },//ends addToFavorites

    deleteMovie: function (id){
        var deleteId = {};
        deleteId.id = id;
        $http.delete('/favorites/deleteFavorite/'+ id).then(function(response){
          console.log(response);
          $http.get('/favorites').then(function(response){
            favorites.list = response.data;
          });//ends get to favorites
        });//ends delete to deleteFavorite
      },//ends deleteMovie
  };//ends return

}]);//ends factory
