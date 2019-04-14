// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var request=require('request');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        username        :{ type: String, required: true, lowecase: true },
        password     : {type: String, required: true },
        dni: String,
        direccion: String,
        phone: String,
        nombres: { type: String, required: true, uppercase: true },
        apellidos: { type: String, required: true, uppercase: true },
        role: {
                type: String,
                enum: ['admin', 'client'],
                default: 'client'
            }
    }
}, {
    timestamps: true
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

//Checkin if dni is valid
userSchema.methods.validDni = function(dni,nombre,apellido) {
    var valor=false;
    request({
        url: 'http://aplicaciones007.jne.gob.pe/srop_publico/Consulta/Afiliado/GetNombresCiudadano?DNI='+dni,
        json: false
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            // Pintamos la respuesta JSON en navegador.
            body=body.split('|');
            console.log(body+" "+dni+" "+nombre+" "+apellido);
            
            if(nombre==body[2] && apellido==body[0]+" "+body[1]){
                console.log("cierto");
                valor=true;
            }else{
                console.log("falso");
                valor=false;
            }
        }
    });
    return valor;
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
