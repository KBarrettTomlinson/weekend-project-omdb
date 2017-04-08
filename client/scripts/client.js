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

    $http.get('http://www.omdbapi.com/?t=' + title + '&y=&plot=full&r=json').
      then(function(response){
        console.log(response);
        var movie = {};
        console.log(response.data.Title);
        movie.title = response.data.Title;
        movie.director = response.data.Director;
        movie.poster = response.data.Poster;
        movie.year = response.data.Year;
        movie.writer = response.data.Writer;
        console.log(movie);
        searchResult.movie = movie;
      });
      
    var searchResult = {};
    $scope.searchResult = searchResult;
    console.log("search result object", $scope.searchResult);

  }//ends findMovie

}]);
