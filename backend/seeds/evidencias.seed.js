const mongoose = require('mongoose');
const { MONGO_URI } = require('../config');
const { Evidencias } = require('../models');

mongoose.connect(MONGO_URI, { useNewUrlParser: true })


const evidencias = [
  {
    nombre: "Oscar Ricardo",
    aPaterno: "Pérez",
    aMaterno: "Lomes",
    fechaEntrega:21/01/21,
    materia:"Español",
    numeroActividad:1,
    grado: 3,
    grupo: "B",
    telefono:7353501617,
    nombreEvidencia:"node.svg",
    evidencias: []
  },
  {
    nombre: "Esteban",
    aPaterno: "Pérez",
    aMaterno: "Lomes",
    fechaEntrega:19/01/21,
    materia:"Matematicas",
    numeroActividad:5,
    grado: 3,
    grupo: "B",
    telefono:7351418812,
    nombreEvidencia:"node.svg",
    evidencias: []
  }
]

Evidencias.create(evidencias).then(() => {
  console.log('Evidencias creadas')
  mongoose.disconnect();
}).catch(console.log)