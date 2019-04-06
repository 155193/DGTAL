// app/routes.js
var auten= require('../controllers/authentication');
const connDB=require('../config/dbConection');
//var fs = require('fs'); para subir archivos
//var formidable = require('formidable');
//var pathParse = require('path-parse');
module.exports = function(app, passport) {
	const conn = connDB();
	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	app.get('/', function(req, res) {
		res.render('index.ejs'); // load the index.ejs file
	});

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	app.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login.ejs', { message: req.flash('loginMessage') });
	});

	// process the login form
	app.post('/login', passport.authenticate('local-login', {
		successRedirect : '/uc/profile', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', { message: req.flash('signupMessage') });
	});

	// process the signup form
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/uc/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// DESPUES DEL LOGIN =========================
	// =====================================
	// tienes que estar logeado para entrar
	// usamos middleware para esto y tambien auten para los roles
	app.all("/uc/*", auten.roleAuthorization(['user','client']));
	app.all("/admin/*", auten.roleAuthorization(['admin']));
	app.get('/uc/profile', isLoggedIn, function(req, res) {
      res.render('profile.ejs',{
        documentos: resultado
      });
		});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated()){
		return next();
	}
	// if they aren't redirect them to the home page
	res.redirect('/login');
}
