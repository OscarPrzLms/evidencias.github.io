import Vue from 'vue'
import store from './store'
import router from './router'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
