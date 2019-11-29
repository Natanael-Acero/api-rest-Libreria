const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let libroSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del libro']
    },
    editorial: {
        type: String,
        required: [true, 'Por favor ingresa una editorial']
    },
    autor: {
        type: String,
        required: [true, 'Por favor ingresa el autor']
    },
    noPag: {
        type: Number,
        required: [true, 'Ingresa el numero de paginas']
    },
    precio: {
        type: Number,
        required: [true, 'Por favor ingresa el precio']
    },
    disponible: {
        type: Boolean,
        default: true
    }

});

libroSchema.plugin(uniqueValidator, {
    message: '{PATH} Debe ser unico y diferente'
});

module.exports = mongoose.model('Libro', libroSchema);