//base modules
var express = require( 'express' );
var app = express();

//db modules
var davidBowie = require( './modules/db.js');

//route modules
var index = require( './routes/index.js' );
var favorites = require( './routes/favorites.js');

//app config
app.set( 'port', (process.env.PORT || 3000 ));

//middleware
var bodyParser = require( 'body-parser' );
var dotenv = require('dotenv').config();

app.use( bodyParser.json());
app.use( bodyParser.urlencoded({extended: true}));

app.use( express.static( 'server/public' ));

//routes
app.use( '/favorites', favorites);
app.use( '/', index);

//listens
var port = app.get( 'port' );
app.listen( port, function(){
  console.log( "I'm listening for you at port:", port, " I won't drop the ball!");
});

//exports
module.export = app;
