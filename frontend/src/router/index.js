import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/usuario/Login.vue'
import Perfil from '../views/usuario/Perfil.vue'
import Registro from '../views/usuario/Registro.vue'
import Menu from '../views/usuario/Menu.vue'
import Evidencias from '../views/usuario/Evidencias.vue'
import Evidencias3 from '../views/usuario/Evidencias3.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: {
      autenticado: true
    }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/',
    name: 'Salir',
    component: Home
  },
  {
    path: '/evidencias',
    name: 'Evidencias',
    component: Evidencias
  },
  {
    path: '/evidencias3',
    name: 'Evidencias3',
    component: Evidencias3
  }
]

const router = new VueRouter({
  mode: 'history',
  //base: process.env.BASE_URL,
  base: '/evidencias.github.io/',
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.matched.some(record => record.meta.autenticado)){
    if(store.state.sesion.usuario){
      next()
    }else {
      next({ name: 'Login'})
    }
  }else{
    next()
  }
})

export default router
