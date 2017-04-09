// requires
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

//schema
var MovieFavoritesSchema = mongoose.Schema({
  title: String,
  year: Number
});//ends FavoritesSchema


//prototype
var MovieFavorites = mongoose.model( "moviefavorites", MovieFavoritesSchema, "moviefavorites");

//CRUD
//gets
  //gets all favorites
  router.get( '/', function(req,res){
    MovieFavorites.find(function( err, allFavorites){
      if( err ){
        console.log(err);
        res.sendStatus(500);
      }//ends error
      res.send(allFavorites);
    });
  });//ends get all favorites

//posts
  router.post( '/addFavorite', function(req,res){
    var favorite = new MovieFavorites();
    favorite.title = req.body.title;
    favorite.year = req.body.year;
    favorite.save(function(err, savedFavorite){
      if(err){
        console.log(err);
        res.sendStatus(500);
      }
      res.send(savedFavorite);
    });//end favorite.save
  });//ends router.post to /addFavorite


//puts

//deletes
router.delete('/deleteFavorite/:id', function(req, res){
  var id = req.params.id;
  console.log("id",id);
  MovieFavorites.findByIdAndRemove(id, function(err, deletedFavorite){
    if(err){
      consle.log(err);
      res.sendStatus(500);
    }
    console.log(deletedFavorite);
    res.send(deletedFavorite);
  });//ends findByIdAndRemove
});//ends router.delete to /deleteFavorite

//exports
module.exports = router;
