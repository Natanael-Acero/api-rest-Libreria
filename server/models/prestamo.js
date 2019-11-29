const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Libro = require('./libro');
const Usuario = require('./usuario');

let Schema = mongoose.Schema;

let prestamoSchema = new Schema({

    codigoLibro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: [true, 'Ingresar codigo de libro']
    },
    codigoUsuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa el codigo de usuario']
    },
    fechaSalida: {
        type: Date,
        default: Date.now
    },
    fechaDevolucion: {
        type: Date
    },
    estado: {
        type: Boolean,
        default: true
    }
});

prestamoSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser único y diferente'
});

//crea una coleccion
module.exports = mongoose.model('Prestamo', prestamoSchema);