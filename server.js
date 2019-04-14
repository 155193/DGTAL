// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var session = require('express-session');
const fileUpload = require('express-fileupload');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
const bodyParser = require('body-parser');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url, {useNewUrlParser: true}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration


	// set up our express application
//app.use(express.cookieParser()); // read cookies (needed for auth)
app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({ cookie: { maxAge: 3600000 },
                  secret: 'eypZAZy0CY^g9%KreypZAZy0CY^g9%Kr',
                  resave: false,
                  saveUninitialized: false}));
app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static(__dirname + '/public'));
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('localhost: ' + port);
