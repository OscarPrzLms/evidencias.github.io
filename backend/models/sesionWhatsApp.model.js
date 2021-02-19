/*
Modelo: sesionWhatsApp.model.js
Descripcion: Estructura del Schema(modelo) para sesiones de WhatsApp
Fecha: 16-02-2021
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 16/02/2021 ::: Se crea Schema para sesiones de WhatsApp
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

const sesionWhatsApp = new Schema({
    telefono: { type: Number, maxlength: 10},
    mensaje: { type: String },
    mediaUrl: { type: String }

},
{  timestamps: { createdAt: true, updatedAt: true } } 
)

module.exports = mongoose.model("SesionWhastApp",sesionWhatsApp);