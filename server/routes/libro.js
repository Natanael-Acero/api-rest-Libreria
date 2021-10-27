const express = require('express');
const _ = require('underscore');
const Libro = require('../models/libro');
const app = express();


app.post('/libro', (req, res) => {
    let body = req.body;
    let libro = new Libro({
        nombre: body.nombre,
        editorial: body.editorial,
        autor: body.autor,
        noPag: body.noPag,
        precio: body.precio
    });

    libro.save((err, libDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            libDB
        });
    });
});

app.put('/libro/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'editorial', 'autor', 'noPag', 'precio', 'disponible']);
    Libro.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, libDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            libDB
        });

    });
});

app.get('/libro', (req, res) => {
    Libro.find({ disponible: true })
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: libros.length,
                libros
            });
        });
});
app.get('/libro/:id', (req, res) => {
    let id = req.params.id;
    Libro.find({ disponible: true, _id: id })
        .exec((err, libros) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: libros.length,
                libros
            });
        });
});


app.delete('/libro/:id', (req, res) => {
    let id = req.params.id;
    Libro.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            resp
        });
    });
});

module.exports = app;
