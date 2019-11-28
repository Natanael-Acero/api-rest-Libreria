require('./config/config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
//Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//Parse formato a application/jason
app.use(bodyParser.json());
//Archivo agrupador de rutas
app.use(require('./routes/index'));
//Conexion a la base de datos
mongoose.connect(process.env.URLDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}, (err, resp) => {
    if (err) throw err;
    console.log('Base de datos Online');
});
//Puerto de escucha de la aplicacion
app.listen(process.env.PORT, () => {
    console.log('Escuchando por el puerto', process.env.PORT);
});