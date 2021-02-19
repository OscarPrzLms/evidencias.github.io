<!-- 
Template: Login.vue
Descripcion: Login de Usuario
Fecha: 02-01-2020
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 04/01/2020 ::: Se instala Vuelidate para validar email y contraseña
* 04/01/2020 ::: Se realiza validacion general (email y contraseña) de formulario Login
* 05/02/2021 ::: Se actualiza metodo ingresar() y validaUsuario() para peticion POST a servidor.
* 06/02/2021 ::: Se integra mutation existeUsuario para validar usuario
* 06/02/2021 ::: Se integra Actions abreSesion para usuario activo
-->

<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <!-- Configuracion para todo tipo de dispositivos -->
      <v-card class="elevation-6">
        <v-app-bar color="primary" dark>
          <v-toolbar-title class="tituloLogin">
            Ingresa tus Credenciales
          </v-toolbar-title>
        </v-app-bar>
        <v-card-text class="fontTextField">
          <v-text-field
            label="Email"
            v-model="formulario.email"
            :error-messages="erroresEmail"
            @blur="$v.formulario.email.$touch()"
          >
          </v-text-field>
          <v-text-field
            label="Contraseña"
            @keyup.enter="ingresar"
            type="password"
            v-model="formulario.password"
            :error-messages="erroresPassword"
            @blur="$v.formulario.password.$touch()"
          >
          </v-text-field>
        </v-card-text>
        <v-card-text>
          <v-layout justify-end>
            <v-btn
              @click="ingresar"
              :depressed="$v.formulario.$invalid"
              :disabled="$v.formulario.$invalid"
              color="primary"
              class="fontButton"
            >
              Ingresar
            </v-btn>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" :to="{ name: 'Registro' }">
            ¿No tienes cuenta? Regístrate
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      formulario: {
        email: "",
        password: "",
      },
    };
  },
  validations: {
    formulario: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
    },
  },
  methods: {
    ...mapMutations([
      "ocultarOcupado",
      "mostrarOcupado",
      "mostrarExito",
      "mostrarErrorLogin",
    ]),
    ...mapMutations("sesion", ["existeUsuario"]),
    ...mapGetters("sesion", ["saludo"]),
    ...mapGetters("sesion", ["mensajeError"]),
    ...mapActions("sesion", ["abreSesion"]),

    async validaUsuario(loginUsuario) {
      let ocupado = {
        titulo: "Validando datos",
        mensaje: "Estamos validando tu información...",
      };

      this.mostrarOcupado(ocupado);

      try {
        let validaUsuario = await axios.post(
          "http://localhost:3000/login/",
          loginUsuario
        );
        console.log(validaUsuario);

        let ok = validaUsuario.data.ok;
        let data = validaUsuario.data;

        setTimeout(() => {
          this.ocultarOcupado();
          this.existeUsuario(ok);
          this.abreSesion(data);
          this.mostrarExito(this.saludo());
          this.$router.push("Menu");
        }, 1000);
      } catch (error) {
        console.log(error);
        setTimeout(() => {
          this.ocultarOcupado();
          this.mostrarErrorLogin(this.mensajeError());
          this.formulario.email = "";
          this.formulario.password = "";
          this.$router.push("Login");
        }, 1000);
      } finally {
        console.log();
      }
    },
    ingresar() {
      if (this.$v.formulario.$invalid) {
        this.$v.formulario.$touch();
        return;
      }

      let loginUsuario = {
        email: this.formulario.email,
        contrasena: this.formulario.password,
      };

      this.validaUsuario(loginUsuario);
    },
  },
  computed: {
    erroresEmail() {
      let errores = [];
      if (!this.$v.formulario.email.$dirty) {
        return errores;
      }
      if (!this.$v.formulario.email.required) {
        errores.push("Ingresa tu email");
      }
      if (!this.$v.formulario.email.email) {
        errores.push("Ingresa un email valido");
      }
      return errores;
    },
    erroresPassword() {
      let errores = [];
      if (!this.$v.formulario.password.$dirty) {
        return errores;
      }
      if (!this.$v.formulario.password.required) {
        errores.push("Ingresa tu contraseña");
      }
      if (!this.$v.formulario.password.minLength) {
        errores.push("Ingresa al menos 6 caracteres");
      }
      if (!this.$v.formulario.password.maxLength) {
        errores.push("Ingresa maximo 20 caracteres");
      }
      return errores;
    },
  },
};
</script>

<style>
.tituloLogin,
.fontButton,
.fontTextField {
  font-family: "Montserrat", sans-serif;
}
</style>
