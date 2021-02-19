/*
Archivo: Vuetify.js
Descripcion: Archivo de configuracion para Vuetify
Fecha: 02-01-2021
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 05/02/2021 ::: Se integra color error_snackbar: '#FF5252' para mensaje de error en validacion de Login
*/


import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import es from 'vuetify/lib/locale/es';
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#2A3952',
        secondary: '#553f75',
        tertiary: '#669795',
        prueba:'#206E61',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        success_snackbar: '#206E61',
        error_snackbar: '#FF5252',
        warning: '#FFC107'
      },
    },
  },
    lang: {
      locales: { es },
      current: 'es',
    },
  icons: {
    iconfont: 'md' || 'mdi'  
  },
});
