/*
Template: Index.js
Descripcion: Store
Fecha: 02-01-2021
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 05/02/2021 ::: Se integra state(usuarioInvalido) y mutations(mostrarErrorLogin y ocultarUsuarioInvalido) para validacion de Login
*/


import Vue from 'vue'
import Vuex from 'vuex'
import sesion from './sesion'
 
Vue.use(Vuex) 

export default new Vuex.Store({
  state: {
    notificacion: {
      visible: false,
      mensaje: '',
      color: 'info'
    },
    usuarioInvalido: {
      visible: false,
      mensaje: '',
      color: 'error'
    },
    notificacionRegistro: { 
      visible: false,
      mensaje: '',
      color: 'info'
    },
    ocupado: {
      visible: false,
      titulo: '',
      mensaje: ''
    },
    exitoRegistro: {
      visible: false,
      titulo: '',
      mensaje: ''
    }
  },
  mutations: {
    mostrarInformacion(state, mensaje) {
      state.notificacion.visible = true
      state.notificacion.mensaje = mensaje
      state.notificacion.color = 'info'
    },
    mostrarExito(state, mensaje) {
      state.notificacion.visible = true
      state.notificacion.mensaje = mensaje
      state.notificacion.color = 'success_snackbar'
    },
    mostrarErrorLogin(state, mensaje) {
      state.usuarioInvalido.visible = true
      state.usuarioInvalido.mensaje = mensaje
      state.usuarioInvalido.color = 'error_snackbar'
    },
    mostrarRegistroExitoso(state, mensaje) {
      state.notificacionRegistro.visible = true
      state.notificacionRegistro.mensaje = mensaje
      state.notificacionRegistro.color = 'success_snackbar'
    },
    mostrarAdvertencia(state, mensaje) {
      state.notificacion.visible = true
      state.notificacion.mensaje = mensaje
      state.notificacion.color = 'warning'
    },
    mostrarError(state, mensaje) {
      state.notificacion.visible = true
      state.notificacion.mensaje = mensaje
      state.notificacion.color = 'error'
    },
    ocultarNotificacion(state) {
      state.notificacion.visible = false
    },
    ocultarNotificacionRegistro(state) {
      state.notificacionRegistro.visible = false
    },
    ocultarUsuarioInvalido(state) {
      state.usuarioInvalido.visible = false
    },
    mostrarOcupado(state, ocupado) {
      state.ocupado.titulo = ocupado.titulo
      state.ocupado.mensaje =  ocupado.mensaje
      state.ocupado.visible = true
    },
    mostrarExitoRegistro(state, exitoRegistro) {
      state.exitoRegistro.titulo = exitoRegistro.titulo
      state.exitoRegistro.mensaje = exitoRegistro.mensaje
      state.exitoRegistro.visible = true
    },
    ocultarOcupado(state) {
      state.ocupado.visible = false
    },
    ocultarExitoRegistro(state) {
      state.exitoRegistro.visible = false
    }
  },
  actions: {

  },
  getters: {

  },
  modules: {
    sesion
  }
})
