
var mongoose = require('mongoose');
var mongoURI = 'mongodb://localhost:27017/favoritemoviesdata';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
  console.log('Mongo Connection Error: ' + err);
});

MongoDB.once('open', function(){
  console.log('Hey, Mongo and I had coffee. We feel good about each other.');
});

module.exports = MongoDB;
