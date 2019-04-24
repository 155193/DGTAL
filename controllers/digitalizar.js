var Docu = require('../app/models/documents');

exports.subirdocumento = (req, res) => {
    var document = new Docu();
    var file = req.files.archivo;
    var extension = file.name.split('.').pop();
    document.local.user_id.push(req.user._id);
    document.local.nro_doc = req.body.nroDoc;
    document.local.origen = req.body.origen;
    document.local.documento = req.body.documento;
    document.local.folios = req.body.folios;
    document.local.interesado = req.body.interesado;
    document.local.asunto = req.body.asunto;
    document.local.plazo = req.body.plazo;
    document.local.tipo = req.body.tipo;

    document.save((err) => {
        if (!err) {
            file.mv('public/assets/pdf/' + document._id + '.' + extension, (error) => {
                if (error)
                    return res.status(500).send(err);
                res.redirect('/client/profile');
            });
        } else {
            res.render(err);
        }
    });
};