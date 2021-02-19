<!-- 
Template: Registro.vue
Descripcion: Registro de Usuario
Fecha: 02-01-2020
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 04/01/2020 ::: Se realiza validacion Vuelidate 
para email, password y repetirPassword en Formulario de Registro
* 22/01/2021 ::: Se implementa axios para peticiones HTTP a servidor NodeJS
-->

<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <!-- Configuracion para todo dispositivo-->
      <v-slide-y-transition mode="out-in" @enter="enter">
        <!-- Email y Contraseña -->
        <v-card v-if="vista == 1" :key="1" class="elevation-6">
          <v-app-bar color="primary" dark>
            <v-toolbar-title class="tituloRegistro">
              Regístrate
            </v-toolbar-title>
          </v-app-bar>
          <v-card-text class="fontTextField">
            <v-text-field
              @blur="$v.usuario.email.$touch()"
              :error-messages="erroresEmail"
              v-model="usuario.email"
              label="Email"
              autofocus
            >
            </v-text-field>
            <v-text-field
              @blur="$v.usuario.contrasena.$touch()"
              :error-messages="erroresContrasena"
              v-model="usuario.contrasena"
              label="Contraseña"
              type="password"
            >
            </v-text-field>
            <v-text-field
              @keyup.enter="siguiente(1)"
              @blur="$v.usuario.repContrasena.$touch()"
              :error-messages="erroresRepContrasena"
              v-model="usuario.repContrasena"
              label="Repetir Contraseña"
              type="password"
            >
            </v-text-field>
          </v-card-text>
          <v-card-text>
            <v-layout justify-end>
              <v-btn
                :depressed="
                  $v.usuario.email.$invalid ||
                    $v.usuario.contrasena.$invalid ||
                    $v.usuario.repContrasena.$invalid
                "
                :disabled="
                  $v.usuario.email.$invalid ||
                    $v.usuario.contrasena.$invalid ||
                    $v.usuario.repContrasena.$invalid
                "
                @click="siguiente(1)"
                color="primary"
                class="fontButton"
              >
                Siguiente
              </v-btn>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="{ name: 'Login' }">
              ¿Ya tienes cuenta? Ingresa
            </v-btn>
          </v-card-actions>
        </v-card>
        <!-- Nombre y Apellidos -->
        <v-card v-if="vista == 2" :key="2" class="elevation-6">
          <v-app-bar color="primary" dark>
            <v-toolbar-title class="tituloRegistro">
              Ingresa tu Nombre Completo
            </v-toolbar-title>
          </v-app-bar>
          <v-card-text class="fontTextField">
            <v-text-field
              @blur="$v.usuario.nombre.$touch()"
              :error-messages="erroresNombre"
              v-model="usuario.nombre"
              label="Nombre"
              autofocus
            >
            </v-text-field>
            <v-text-field
              @keyup.enter="siguiente(2)"
              @blur="$v.usuario.aPaterno.$touch()"   
              :error-messages="erroresApaterno"
              v-model="usuario.aPaterno"
              label="Apellido Paterno"
            >
            </v-text-field>
            <v-text-field
              @keyup.enter="siguiente(2)"
              @blur="$v.usuario.aMaterno.$touch()"
              :error-messages="erroresAmaterno"
              v-model="usuario.aMaterno"
              label="Apellido Materno"
            >
            </v-text-field>
          </v-card-text>
          <v-card-text>
            <v-layout>
              <v-flex xs6>
                <v-layout justify-start>
                  <v-btn @click="vista--" class="fontButton">
                    Atrás
                  </v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout justify-end>
                  <v-btn
                    :depressed="
                      $v.usuario.nombre.$invalid ||
                        $v.usuario.aPaterno.$invalid ||
                        $v.usuario.aMaterno.$invalid
                    "
                    :disabled="
                      $v.usuario.nombre.$invalid ||
                        $v.usuario.aPaterno.$invalid ||
                        $v.usuario.aMaterno.$invalid
                    "
                    @click="siguiente(2)"
                    color="primary"
                    class="fontButton"
                  >
                    Siguiente
                  </v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <!-- Fecha de Nacimiento -->
        <v-card v-if="vista == 3" :key="3" class="elevation-6">
          <v-app-bar color="primary" dark>
            <v-toolbar-title class="tituloRegistro">
              Selecciona tu Fecha de Nacimiento
            </v-toolbar-title>
          </v-app-bar>
          <v-card-text class="fontTextField">
            <v-layout justify-center>
              <v-date-picker
                ref="calendario"
                :max="fechaMaxima"
                v-model="usuario.fechaNacimiento"
                reactive
                class="elevation-3"
              >
              </v-date-picker>
            </v-layout>
          </v-card-text>
          <v-card-text>
            <v-layout>
              <v-flex xs6>
                <v-layout justify-start>
                  <v-btn @click="vista--" class="fontButton">
                    Atrás
                  </v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout justify-end>
                  <v-btn
                    :depressed="$v.usuario.fechaNacimiento.$invalid"
                    :disabled="$v.usuario.fechaNacimiento.$invalid"
                    @click="registrar"
                    color="primary"
                    class="fontButton"
                  >
                    Registrarse
                  </v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-slide-y-transition>
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
  sameAs,
} from "vuelidate/lib/validators";
import { nombreCompuesto } from "@/utilidades/validaciones";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";

export default {
  name: "Registro",
  data() {
    return {
      vista: 1,
      fechaMaxima: null,
    };
  },
  validations: {
    usuario: {
      nombre: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        nombreCompuesto,
      },
      aPaterno: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        nombreCompuesto,
      },
      aMaterno: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        nombreCompuesto,
      },
      email: {
        required,
        email,
      },
      contrasena: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20),
      },
      repContrasena: {
        sameAs: sameAs("contrasena"),
      },
      fechaNacimiento: {
        required,
      },
    },
  },
  created() {
    let fechaActual = new Date();
    this.fechaMaxima = new Date(
      fechaActual.setFullYear(fechaActual.getFullYear() - 18)
    )
      .toISOString()
      .substr(0, 10);
  },
  methods: {
    ...mapMutations([
      "mostrarExitoRegistro",
      "ocultarExitoRegistro",
      "mostrarRegistroExitoso",
    ]),
    ...mapActions("sesion", ["RegUsuarios"]),
    ...mapGetters("sesion", ["msjExitoRegistro"]),

    async nuevoUsuario(usuario) {
      try {
        let nuevoUsuario = await axios.post(
          "http://localhost:3000/nuevousuario/",
          usuario
        );
        console.log(nuevoUsuario);
      } catch (error) {
        console.log(error);
      } finally {
        console.log();
      }
    },
    siguiente(vista) {
      switch (vista) {
        case 1:
          if (
            this.$v.usuario.email.$invalid ||
            this.$v.usuario.contrasena.$invalid ||
            this.$v.usuario.repContrasena.$invalid
          ) {
            this.$v.usuario.$touch();
            return;
          } else {
            this.vista++;
          }
          break;
        case 2:
          if (
            this.$v.usuario.nombre.$invalid ||
            this.$v.usuario.aPaterno.$invalid ||
            this.$v.usuario.aMaterno.$invalid
          ) {
            this.$v.usuario.$touch();
            return;
          } else {
            this.vista++;
          }
      }
    },
    registrar() {
      let usuario = {
        nombre: this.usuario.nombre,
        aPaterno: this.usuario.aPaterno,
        aMaterno: this.usuario.aMaterno,
        email: this.usuario.email,
        contrasena: this.usuario.contrasena,
        repContrasena: this.usuario.repContrasena,
        fechaNacimiento: this.usuario.fechaNacimiento,
      };

      if (this.$v.usuario.fechaNacimiento.$invalid) {
        return;
      }

      this.RegUsuarios(usuario);
      this.nuevoUsuario(usuario);

      let exitoRegistro = {
        titulo: "Registrando datos",
        mensaje: "Estamos registrando tu información...",
      };

      this.mostrarExitoRegistro(exitoRegistro);

      setTimeout(() => {
        this.ocultarExitoRegistro();
        //this.actualizarUsuario(usuario)
        this.usuario.nombre = "";
        this.usuario.aPaterno = "";
        this.usuario.aMaterno = "";
        this.usuario.email = "";
        this.usuario.contrasena = "";
        this.usuario.repContrasena = "";
        this.usuario.fechaNacimiento = "";
        this.mostrarRegistroExitoso(this.msjExitoRegistro());
        this.$router.push("Login");
      }, 2000);
    },
    enter() {
      if (this.vista == 3 && !this.usuario.fechaNacimiento) {
        this.$refs.calendario.activePicker = "YEAR";
      }
    },
  },
  computed: {
    ...mapState("sesion", ["usuario"]),

    erroresEmail() {
      let errores = [];
      if (!this.$v.usuario.email.$dirty) {
        return errores;
      }
      if (!this.$v.usuario.email.required) {
        errores.push("Ingresa tu email");
      }
      if (!this.$v.usuario.email.email) {
        errores.push("Ingresa un email valido");
      }
      return errores;
    },
    erroresContrasena() {
      let errores = [];
      if (!this.$v.usuario.contrasena.$dirty) {
        return errores;
      }
      if (!this.$v.usuario.contrasena.required) {
        errores.push("Ingresa tu contraseña");
      }
      if (!this.$v.usuario.contrasena.minLength) {
        errores.push("Ingresa al menos 6 caracteres");
      }
      if (!this.$v.usuario.contrasena.maxLength) {
        errores.push("Ingresa maximo 20 caracteres");
      }
      return errores;
    },
    erroresRepContrasena() {
      let errores = [];
      if (!this.$v.usuario.repContrasena.$dirty) {
        return errores;
      }
      if (!this.$v.usuario.repContrasena.sameAs) {
        errores.push("Las contraseñas no coinciden");
      }
      return errores;
    },
    erroresNombre() {
      let errores = [];
      if (!this.$v.usuario.nombre.$dirty) {
        return errores;
      }
      if (!this.$v.usuario.nombre.required) {
        errores.push("Ingresa tu nombre");
      }
      if (!this.$v.usuario.nombre.minLength) {
        errores.push("Ingresa al menos 3 caracteres");
      }
      if (!this.$v.usuario.nombre.maxLength) {
        errores.push("Ingresa maximo 20 caracteres");
      }
      if (!this.$v.usuario.nombre.nombreCompuesto) {
        errores.push("Ingresa un nombre válido");
      }
      return errores;
    },
    erroresApaterno() {
      let errores = [];
      if (!this.$v.usuario.aPaterno.$dirty) {
        return errores;
      }
      if (!this.$v.usuario.aPaterno.required) {
        errores.push("Ingresa tu apellido paterno");
      }
      if (!this.$v.usuario.aPaterno.minLength) {
        errores.push("Ingresa al menos 3 caracteres");
      }
      if (!this.$v.usuario.aPaterno.maxLength) {
        errores.push("Ingresa maximo 20 caracteres");
      }
      if (!this.$v.usuario.aPaterno.nombreCompuesto) {
        errores.push("Ingresa un apellido válido");
      }
      return errores;
    },
    erroresAmaterno() {
      let errores = [];
      if (!this.$v.usuario.aMaterno.$dirty) {
        return errores;
      }
      if (!this.$v.usuario.aMaterno.required) {
        errores.push("Ingresa tu apellido materno");
      }
      if (!this.$v.usuario.aMaterno.minLength) {
        errores.push("Ingresa al menos 3 caracteres");
      }
      if (!this.$v.usuario.aMaterno.maxLength) {
        errores.push("Ingresa maximo 20 caracteres");
      }
      if (!this.$v.usuario.aMaterno.nombreCompuesto) {
        errores.push("Ingresa un apellido válido");
      }
      return errores;
    },
  },
};
</script>

<style>
.tituloRegistro,
.fontButton,
.fontTextField {
  font-family: "Montserrat", sans-serif;
}
</style>
