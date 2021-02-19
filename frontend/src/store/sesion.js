/*
Template: sesion.js
Descripcion: Store sesion usuario
Fecha: 02-01-2021
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 05/02/2021 ::: Se integra getters(mensajeError) para validacion de Login
* 06/02/2021 ::: Se actualiza mutation actualizarUsuario
* 06/02/2021 ::: Se crea action abreSesion para actualizar datos de usuarioActivo
*/


export default {
  namespaced: true,
  state: {
    usuarios:[],
    usuario: {
      nombre: '',
      aPaterno: '',
      aMaterno: '',
      email: '',
      contrasena: '',
      repContrasena: '',
      fechaNacimiento: '',
      fotoPerfil: ''
    },
    existeUsuario: null
  },
  mutations: {
    usuarioActivo(state, data) {
      state.usuario.nombre = data.usuario.nombre,
      state.usuario.aPaterno = data.usuario.aPaterno,
      state.usuario.aMaterno = data.usuario.aMaterno,
      state.usuario.email = data.usuario.email,
      state.usuario.fechaNacimiento = data.usuario.fechaNacimiento
      state.usuario.contrasena = data
    },
    actualizarUsuario(state, usuario) {
      state.existeUsuario = usuario
      state.usuario.nombre = '',
      state.usuario.aPaterno = '',
      state.usuario.aMaterno = '',
      state.usuario.email = '',
      state.usuario.contrasena = '',
      state.usuario.repContrasena = '',
      state.usuario.fechaNacimiento = ''
    },
    Registro(state, usuario) {
      state.usuarios.push(usuario)
    },
    existeUsuario(state, ok){
      state.existeUsuario = ok
    }
  },
  actions: {
    abreSesion({commit}, data) {
      commit('usuarioActivo', data)
    },
    cerrarSesion({commit}) {
      commit('actualizarUsuario',null) 
    },
    RegUsuarios({commit}, usuario) {
      commit('Registro', usuario)
    }
  },
  getters: {
    saludo(state) {
      if(!state.usuario) { return '' }
      let vocal = state.usuario.sexo && state.usuario.sexo == 'F' ? 'a' : 'o'
      return `¡Bienvenid${vocal} ${state.usuario.nombre}!`
    },
    mensajeError() {
      return 'Usuario o Contraseña Invalido'
    },
    msjExitoRegistro() {
      return "Datos registrados correctamente"
    }
  },
  modules: {
  }
}

