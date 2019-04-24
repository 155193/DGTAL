// app/models/document.js
// load the things we need
var mongoose = require('mongoose');
var Schema=mongoose.Schema;

// define the schema for our user model
var documentSchema = mongoose.Schema({

    local            : {
        user_id: [
            {type: Schema.Types.ObjectId, ref: 'User'}
        ],
        nro_doc        :{ type: String, required: true},
        origen     : {type: String, required: true },
        documento     : {type: String, required: true },
        folios: {type: Number, required: true },
        interesado: {type: String, required: true },
        asunto: {type: String, required: true },
        plazo: {type: Date,required: true},
        estado:{
            type: String,
            uppercase: true,
            enum: ['REVISADO','PROCESO','VENCIDO'],
            default: 'PROCESO'
        },
        tipo: {
                type: String,
                uppercase: true,
                enum: ['INFORME','MEMORANDUM', 'OFICIO','SOLICITUD','EXPEDIENTE','SOLICITUD VALORADA','OTROS']
            }
    }
}, {
    timestamps: true
});

// methods ======================
// generating a hash

// checking if password is valid


// create the model for users and expose it to our app
module.exports = mongoose.model('Document', documentSchema);
