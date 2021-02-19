/*
Archivo: index.js
Descripcion: Archivo de configuracion de variables de entorno para BD y TWILIO
Fecha: 09-02-2021
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 09/02/2021 ::: Se declaran variables de entorno para BD y TWILIO
*/


if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  phone: '+527353501617'
};