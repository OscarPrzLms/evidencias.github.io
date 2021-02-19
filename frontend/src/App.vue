<!-- 
Template: App.vue
Descripcion: Contenedor Principal
Fecha: 02-01-2020
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 03/01/2021 ::: Se integra menu (componente Navigation-Drawer)
* 05/01/2021 ::: Se integra mensaje de Bienvenida (Componente Snackbar)
* 06/01/2021 ::: Se integra Dialogo Validando Datos en Logueo
* 07/01/2021 ::: Se crea variable computada itemsMenuSesion para mostrar
                 el menu correspondiente
* 05/02/2021 ::: Se integra componente snackbar (Notificacion Error Login)   
* 06/02/2021 ::: Se integra evento @click en v-list-item para funcionalidad Menu
* 06/02/2021 ::: Se integra metodo to para salir de la sesion de usuario  
* 06/02/2021 ::: Se integra metodo toMenu para Menu en sesion de usuario
-->

<template>
  <v-app>
    <v-navigation-drawer v-model="menu" temporary app>
      <v-list>
        <v-list-item
          v-for="item in itemsMenuSesion"
          :key="item.title"
          link
          @click="to(item.title)"
        >
          <v-list-item-icon>
            <v-icon color="primary">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content class="item-titulo">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dense color="primary" dark>
      <v-app-bar-nav-icon @click.stop="menu = !menu"></v-app-bar-nav-icon>
      <v-toolbar-title class="titulo logo" @click="toMenu()">
        <span>{{ titulo }}</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="fontNombreUsuario" v-if="usuario">
        {{ usuario.nombre }}
      </span>
    </v-app-bar>

    <v-main>
      <v-container fluid fill-height> <!--    class="px-0 py-0 my-0 mx-0"-->
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-main>

    <!-- Notificacion Exito Login -->
    <v-snackbar
      v-model="notificacion.visible"
      :color="notificacion.color"
      top
      :timeout="3000"
      dark
      multi-line
    >
      {{ notificacion.mensaje }}
      <v-btn color="white" text @click="ocultarNotificacion">
        Cerrar
      </v-btn>
    </v-snackbar>

    <!-- Notificacion Error Login -->
    <v-snackbar
      v-model="usuarioInvalido.visible"
      :color="usuarioInvalido.color"
      top
      :timeout="3000"
      dark
      multi-line
    >
      {{ usuarioInvalido.mensaje }}
      <v-btn color="white" text @click="ocultarUsuarioInvalido">
        Cerrar
      </v-btn>
    </v-snackbar>

    <!-- Mensaje Validando Login -->
    <v-dialog v-model="ocupado.visible" max-width="400" persistent>
      <v-layout>
        <v-flex>
          <v-card>
            <v-app-bar color="primary" dark class="ocupado-titulo">
              <v-toolbar-title>
                {{ ocupado.titulo }}
              </v-toolbar-title>
            </v-app-bar>
            <v-card-text class="subheading ocupado-mensaje">
              {{ ocupado.mensaje }}
            </v-card-text>
            <v-card-text>
              <v-progress-linear
                :indeterminate="true"
                color="primary"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>

    <!-- Notificacion Exito Registro -->
    <v-snackbar
      v-model="notificacionRegistro.visible"
      :color="notificacionRegistro.color"
      top
      :timeout="3000"
      dark
      multi-line
    >
      {{ notificacionRegistro.mensaje }}
      <v-btn color="white" text @click="ocultarNotificacionRegistro">
        Cerrar
      </v-btn>
    </v-snackbar>

    <!-- Mensaje Validando Datos Registro -->
    <v-dialog v-model="exitoRegistro.visible" max-width="400" persistent>
      <v-layout>
        <v-flex>
          <v-card>
            <v-app-bar color="primary" dark class="ocupado-titulo">
              <v-toolbar-title>
                {{ exitoRegistro.titulo }}
              </v-toolbar-title>
            </v-app-bar>
            <v-card-text class="subheading ocupado-mensaje">
              {{ exitoRegistro.mensaje }}
            </v-card-text>
            <v-card-text>
              <v-progress-linear
                :indeterminate="true"
                color="primary"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-dialog>

    <v-footer color="primary" dark class="footer-titulo" v-if="usuario">
      <v-layout justify-center>
        <span>Primaria Lic. Adolfo López Mateos</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "App",
  data: () => ({
    titulo: "Evidencias",
    menu: false,
    itemsMenu: [
      { title: "Home", icon: "home" },
      { title: "Perfil", icon: "account_circle" },
      { title: "Registro", icon: "contact_mail" },
      { title: "Login", icon: "arrow_forward" },
      { title: "Salir", icon: "arrow_back" },
      { title: "Menu", icon: "widgets" },
    ],
  }),
  computed: {
    ...mapState([
      "notificacion",
      "ocupado",
      "notificacionRegistro",
      "exitoRegistro",
      "usuarioInvalido",
    ]),
    ...mapState("sesion", ["usuario"]),
    ...mapState("sesion", ["existeUsuario"]),
    itemsMenuSesion: function() {
      let existeUsuario = this.existeUsuario;
      return this.itemsMenu.filter(function(item) {
        return existeUsuario === null && item.title === "Login"
          ? item.title
          : existeUsuario === null && item.title === "Registro"
          ? item.title
          : existeUsuario != null && item.title === "Menu"
          ? item.title
          : existeUsuario != null && item.title === "Perfil"
          ? item.title
          : existeUsuario != null && item.title === "Salir"
          ? item.title
          : "";
      });
    },
  },
  methods: {
    ...mapMutations([
      "ocultarNotificacion",
      "ocultarNotificacionRegistro",
      "ocultarUsuarioInvalido",
    ]),
    ...mapActions("sesion", ["cerrarSesion"]),

    to(itemTitle) {
      if (itemTitle === "Salir") {
        this.cerrarSesion();
        this.menu = false;
        this.$router.push("/");
      } else {
        this.$router.push(itemTitle).catch(() => {});
        this.menu = false;
      }
    },
    toMenu() {
      if (this.existeUsuario != null) {
        this.$router.push("Menu").catch(() => {});
      } else {
        this.$router.push("/").catch(() => {});
      }
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;500&display=swap");
.titulo {
  font-family: "Great Vibes", cursive;
  font-size: 2rem;
  color: white;
}
.footer-titulo,
.ocupado-titulo,
.fontNombreUsuario {
  font-family: "Montserrat", sans-serif;
}
.logo {
  font-family: "Great Vibes", cursive !important;
  cursor: pointer;
}
.item-titulo {
  font-family: "Monserrat", sans-serif !important;
}
.ocupado-mensaje {
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  font-weight: 400;
}
</style>
