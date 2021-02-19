<!-- 
Template: Perfil.vue
Descripcion: Perfil de Usuario
Fecha: 02-01-2020
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 07/02/2021 ::: Si integra componente Dialog para editar Perfil de Usuario
* 07/02/2021 ::: Se integra de forma estatica Foto de Perfil(Temporal)
* 08/02/2021 ::: Se declara ...mapState("sesion", ["usuario"]) para mostrar datos en Perfil(editar)
-->
<template>
  <v-layout text-center align-start justify-center>
    <v-card v-if="usuario" class="elevation-6">
      <v-card-text>
        <div class="ma-2 nombre_apellido">
          {{ usuario.nombre + " " + usuario.aPaterno + " " + usuario.aMaterno }}
        </div>
        <!-- <v-img class="ma-2 fotoPerfil" :src="usuario.fotoPerfil"></v-img> -->
        <v-img
          class="ma-6 fotoPerfil"
          :src="require('@/assets/Yessica.jpg')"
        ></v-img>
        <v-row justify="center">
          <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-container mt-4 mb-4>
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Editar
                </v-btn>
              </v-container>
            </template>
            <v-card>
              <v-toolbar dark color="primary">
                <v-btn icon dark @click="dialog = false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title>Perfil</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items> </v-toolbar-items>
              </v-toolbar>
              <v-card-text>
                <v-container my-13>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="usuario.nombre"
                        label="Nombre"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="usuario.aPaterno"
                        label="Apellido Paterno"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="usuario.aMaterno"
                        label="Apellido Materno"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="usuario.email"
                        label="Email"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        label="Contraseña"
                        type="password"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-container ml-n10>
                        <v-menu
                          v-model="menuFechaNacimiento"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="dateFormatted"
                              label="Fecha de Nacimiento"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              @blur="date = parseDate(dateFormatted)"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            @input="menuFechaNacimiento = false"
                          ></v-date-picker>
                        </v-menu>
                      </v-container>
                    </v-col>
                    <v-col cols="12" sm="6"> </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-container mr-10>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="dialog = false" color="primary" dark>
                    Cancelar
                  </v-btn>

                  <v-btn @click="dialog = false" color="primary" dark>
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-container>
            </v-card>
          </v-dialog>
        </v-row>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Perfil",
  data: (vm) => ({
    dialog: false,
    menuFechaNacimiento: false,
    date: new Date().toISOString().substr(0, 10),
    dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
  }),
  computed: {
    ...mapState("sesion", ["usuario"]),
    computedDateFormatted() {
      return (
        this.formatDate(this.date),
        console.log("VALOR DE timestamp: "),
        console.log(this.timestamp)
      );
    },
  },
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date);
    },
  },
  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
  },
};
</script>

<style>
.fotoPerfil {
  width: 200px;
  height: 100%;
}
.link {
  text-decoration: none;
  font-size: 1rem;
  color: #553f75;
}
.nombre_apellido,
.descripcion,
.biografia {
  font-family: "Montserrat", sans-serif;
}
</style>
