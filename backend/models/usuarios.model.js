/*
Modelo: usuarios.model.js
Descripcion: Estructura del Schema(modelo)
Fecha: 22-01-2021
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 22/01/2021 ::: Se crea Schema para evidencias de los alumnos
*/

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  email: { type: String, unique:true },
  /*contrasena: { type: String, maxlength: 20 }, 
  repContrasena: { type: String, maxlength: 20},*/
  contrasena: { type: String }, 
  repContrasena: { type: String },
  nombre: { type: String, maxlength: 20},
  aPaterno: { type: String, maxlength: 20 },
  aMaterno: { type: String, maxlength: 20 },
  fechaNacimiento: { type: Date }
}, 
{  timestamps: { createdAt: true, updatedAt: true } } 
)

//Eliminacion de contrasena y repContrasena en respuesta del servidor
UsuarioSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.contrasena;
  delete userObject.repContrasena;

  return userObject;
}

//Validacion de email unico
UsuarioSchema.plugin( uniqueValidator, {
  message: '{PATH} debe de ser unico'
} );
module.exports =  mongoose.model("Usuarios", UsuarioSchema);


