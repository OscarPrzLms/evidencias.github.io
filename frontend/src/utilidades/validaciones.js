/*Script: validaciones.js
Descripcion: Validaciones Personalizadas
Fecha: 05-01-2020
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 05/01/2020 ::: Se realiza validacion personalizada para
  Campo Nombres y Apellidos en Formulario de Registro:
  - Espacio en blanco
  - Doble espacio en blanco
  - Letras con tildes */
const nombreCompuesto = value => {
  if(value === undefined || value === null || value === ''){
    return true
  }
  return /^(?! )(?!.* {2})[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ ]+$/.test(value)
}
export { nombreCompuesto } 

