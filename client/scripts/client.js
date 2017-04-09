// setup angular module
var klmApp = angular.module( 'klmApp', []);


// setup main controller
// klmApp.controller( 'MainController' , [ '$scope', '$http', function( $scope, $http){
  // $scope.searchObject = {};
  // $scope.findMovie = findMovie;

  // function findMovie(object){
  //   var copy = angular.copy(object);
  //   var title = copy.title;
  //   object.title = '';
  //   var searchResult = {};
  //   $http.get('http://www.omdbapi.com/?t=' + title + '&y=&plot=full&r=json').
  //     then(function(response){
  //       console.log(response);
  //       var movie = {};
  //       movie.title = response.data.Title;
  //       movie.director = response.data.Director;
  //       movie.poster = response.data.Poster;
  //       movie.year = response.data.Year;
  //       movie.writer = response.data.Writer;
  //       movie.plot = response.data.Plot;
  //       searchResult.movie = movie;
  //     });//ends response
  //   $scope.searchResult = searchResult;
  // }//ends findMovie

  // var listOfFavoritesArray = [];
  // var favorites = {};
  // $scope.favorites = favorites;
  // favorites.list = listOfFavoritesArray;

  // $scope.addToFavorites = addToFavorites;

  // function addToFavorites(title, year){
  //   console.log( "You're trying to add to favorites", title, year);
  //   var favoriteObject = {};
  //   var newTitle = angular.copy(title);
  //   var newYear = angular.copy(year);
  //   favoriteObject.title = newTitle;
  //   favoriteObject.year = newYear;
  //   console.log(favoriteObject);
  //   listOfFavoritesArray.push(favoriteObject);
  //   console.log(listOfFavoritesArray, "listOfFavoritesArray");
  // }//ends addToFavorites

  // $scope.deleteMovie = deleteMovie;
  //
  // function deleteMovie(index){
  //   console.log("you are trying to delete a movie");
  //   $scope.favorites.list.splice(index, 1);
  // }
// }]);//ends MainController

klmApp.controller('SearchController', ['$scope', 'MovieService', function($scope, MovieService){
  $scope.searchObject = {};
  $scope.MovieService.findMovie = MovieService.findMovie;
}]);//ends SearchController

klmApp.controller('DisplayController', ['$scope', 'MovieService', function($scope, MovieService){
  $scope.MovieService.addToFavorites = MovieService.addToFavorites;
}]);//ends DisplayController

klmApp.controller('FavoritesController', ['$scope', 'MovieService', function($scope, MovieService){
  $scope.MovieService.favorites = favorites;
  $scope.MovieService.deleteMovie = MovieService.deleteMovie;
}]);//ends FavoritesController

klmApp.factory( 'MovieService', [$http, function(){
  var listOfFavoritesArray = [];
  var favorites = {};
  favorites.list = listOfFavoritesArray;

  return{
    findMovie: function (object){
      var copy = angular.copy(object);
      var title = copy.title;
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

}]);
