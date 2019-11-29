const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.get('/imagen/:ruta/:img', (req, res) => {
    let ruta = req.params.ruta;
    let img = req.params.img;
    let rutaImage = path.resolve(__dirname, `../../uploads/${ruta}/${img}`);
    let noImage = path.resolve(__dirname, `../assets/no-image.jpeg`);
    if (fs.existsSync(rutaImage)) {
        return res.sendFile(rutaImage);
    } else {
        return res.sendFile(noImage);
    }
});
module.exports = app;