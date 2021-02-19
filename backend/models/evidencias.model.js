/*
Modelo: evidencias.model.js
Descripcion: Estructura del Schema(modelo)
Fecha: 21-01-2021
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 04/01/2020 ::: Se crea Schema para evidencias de los alumnos
*/

const mongoose = require('mongoose');
const { Schema } = mongoose;

const EvidenciasSchema = new Schema({
    nombre: { type: String, maxlength: 20 },
    aPaterno: { type: String, maxlength: 20 },
    aMaterno: { type: String, maxlength: 20 },
    fechaEntrega: { type: Date,},
    materia: { type: String, maxlength: 20 },
    numeroActividad: { type: Number },
    grado: { type: Number },
    grupo: { type: String, maxlength: 1 },
    telefono:{ type: Number, maxlength: 10 },
    nombreEvidencia: { type: String },
    evidencias: [{ type: String }]
}, 
{  timestamps: { createdAt: true, updatedAt: true } } 
);

module.exports = mongoose.model("Evidencias", EvidenciasSchema);



