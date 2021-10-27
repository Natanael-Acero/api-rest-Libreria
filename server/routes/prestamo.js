const express = require('express');
const _ = require('underscore');
const { verificaToken } = require('../middlewares/autenticacion');
const Prestamo = require('../models/prestamo'); //subir nivel
const app = express();

app.post('/prestamo', (req, res) => {
    let body = req.body;
    let prestamo = new Prestamo({
        codigoLibro: body.codigoLibro,
        codigoUsuario: body.codigoUsuario,
        fechaDevolucion: body.fechaDevolucion
    });

    prestamo.save((err, preDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            preDB
        });
    });
});

app.get('/prestamo', (req, res) => {
    Prestamo.find({}).populate('codigoUsuario').populate('codigoLibro')
        .exec((err, prestamos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: prestamos.length,
                prestamos
            });
        });
});
app.get('/prestamo/:id', (req, res) => {
    let id = req.params.id;
    Prestamo.find({ _id: id }).populate('codigoUsuario').populate('codigoLibro')
        .exec((err, prestamos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: prestamos.length,
                prestamos
            });
        });
});

app.put('/prestamo/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['fechaDevolucion', 'estado']);
    Prestamo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, preDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            preDB
        });

    });
});

app.delete('/prestamo/:id', (req, res) => {
    let id = req.params.id;

    Prestamo.findByIdAndUpdate(id, { estado: true }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});
app.delete('/deletePrestamo/:id', (req, res) => {
    let id = req.params.id;

    Prestamo.findOneAndDelete({ _id: id }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;
