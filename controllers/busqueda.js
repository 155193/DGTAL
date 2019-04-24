var Docu = require('../app/models/documents');

exports.buscardocumento = (req, res) => {
    var año = req.body.año;
    var tipo = req.body.tipo;
    var nro = req.body.nro;

    Docu.find({ 'local.nro_doc': nro, 'local.user_id': req.user._id, 'local.tipo': tipo }, (err, docs) => {
        if (err) {
            res.status(422).json({ error: 'No user found.' });
            return next(err);
        }
        if (docs.length > 0) {
            res.send(docs);
        } else {
            res.send([]);
        }
    });
};