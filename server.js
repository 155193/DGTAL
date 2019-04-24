// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express');
var session = require('express-session');
var fileupload = require('express-fileupload');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
const bodyParser = require('body-parser');

// configuration ===============================================================

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const DB_URI = process.env.DB_URI;
const port = process.env.PORT;
mongoose.connect(DB_URI, { useNewUrlParser: true }); // connect to our database
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
//app.use(express.cookieParser()); // read cookies (needed for auth)
app.use(fileupload({
    preserveExtension: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    cookie: { maxAge: 3600000 * 24 },
    secret: 'eypZAZy0CY^g9%KreypZAZy0CY^g9%Kr',
    resave: false,
    saveUninitialized: false
}));
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use(express.static(__dirname + '/public'));

//ERROR HANDLERS
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error.ejs', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('localhost: ' + port);
