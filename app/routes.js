// app/routes.js
var auten= require('../controllers/authentication');
var digital=require('../controllers/digitalizar');
var busque=require('../controllers/busqueda');
var profi=require('../controllers/autenprofile');
var request=require('request');

//var fs = require('fs'); para subir archivos
//var formidable = require('formidable');
//var pathParse = require('path-parse');
module.exports = function(app, passport) {
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
		successRedirect : '/profile', // redirect to the secure profile section
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
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	app.get('/profile',profi.profileautentification);

	// =====================================
	// DESPUES DEL LOGIN =========================
	// =====================================
	// tienes que estar logeado para entrar
	// usamos middleware para esto y tambien auten para los roles
	app.all("/client/*", auten.roleAuthorization(['client']));
	app.all("/admin/*", auten.roleAuthorization(['admin']));

	//===========================================
	//RUTAS SECRETARIA ===============================
	app.get('/client/profile', function(req, res) {		
      res.render('profile.ejs',{
		  cuenta: req.user.local
	  });
	});
	app.get('/client/digitalizar',(req,res)=>{
		res.render('digitalizar.ejs');
	});

	app.route('/client/busqueda')
		.get((req,res)=>{
			res.render('busqueda.ejs', {message: '' });
		})
		.post(busque.buscardocumento);


	//================================================
	//RUTAS ADMIN ====================================
	app.post('/nombre',(req,res)=>{
		try {
			request({
				url: 'http://aplicaciones007.jne.gob.pe/srop_publico/Consulta/Afiliado/GetNombresCiudadano?DNI='+req.body.dni,
				json: false
			}, function (error, response, body) {
				if (!error && response.statusCode === 200) {
					// Pintamos la respuesta JSON en navegador.
					res.send(body.split("|"))
				}else{
					res.send([]);
				}
			})	
		} catch (error) {
			next(error);
		}
	});

	app.post('/subir',digital.subirdocumento);

	app.get('/admin/profile',(req,res)=>{
		res.send("p");
	});

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

