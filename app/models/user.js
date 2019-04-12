// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        username        :{ type: String, required: true, lowercase: true },
        password     : {type: String, required: true },
        dni: String,
        direccion: String,
        phone: String,
        email: String,
        nombres: { type: String, required: true, lowercase: true },
        apellidos: { type: String, required: true, lowercase: true },
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

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
