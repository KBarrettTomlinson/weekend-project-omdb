klmApp.factory( 'MovieService', ['$http', function($http){
  var listOfFavoritesArray = [];
  var favorites = {};
  var searchResult = {};
  var listOfClasses = ["hidden"];
  var classesObject = {};
  classesObject.classes = listOfClasses;

  function getFavorites(){
    $http.get('/favorites').then(function(response){
      console.log("get all favorites",response);
      favorites.list = response.data;
    });
  }//ends getFavorites
  getFavorites();

  function findMovie(object){
    console.log("inside findMovie", object);
    var copy = angular.copy(object);
    var title = copy.title;
    console.log("title",title);
    if ("undefined" === typeof object._id){
      object.title = '';
    }
    $http.get('/favorites/search/'+ title).
      then(function(response){
        var movie = {};
        movie.title = response.data.Title;
        movie.director = response.data.Director;
        movie.poster = response.data.Poster;
        movie.year = response.data.Year;
        movie.writer = response.data.Writer;
        movie.plot = response.data.Plot;
        searchResult.movie = movie;
        listOfClasses.pop("hidden");
        console.log("response from search", movie);
      });//ends response
  }//ends findMovie

  function addToFavorites(title,year){
    var favoriteObject = {};
    var newTitle = angular.copy(title);
    var newYear = angular.copy(year);
    favoriteObject.title = newTitle;
    favoriteObject.year = newYear;

    $http.post('/favorites/addFavorite', favoriteObject).then(function(response){
      $http.get('/favorites').then(function(response){
        console.log(response);
        favorites.list = response.data;
      });// ends get to favorites
    });//ends post to addFavorite
  }//ends addToFavorites

  function deleteMovie(id){
    var deleteId = {};
    deleteId.id = id;
    $http.delete('/favorites/deleteFavorite/'+ id).then(function(response){
      console.log(response);
      $http.get('/favorites').then(function(response){
        favorites.list = response.data;
      });//ends get to favorites
    });//ends delete to deleteFavorite
  }//ends deleteMovie

  return{
    classesObject: classesObject,
    searchResult: searchResult,
    favorites: favorites,
    findMovie: findMovie,
    addToFavorites: addToFavorites,
    deleteMovie: deleteMovie
  };//ends return

}]);//ends factory
