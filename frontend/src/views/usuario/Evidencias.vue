<!-- 
Template: Evidencias.vue
Descripcion: Evidencias de Alumnos
Fecha: 10-02-2021
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
* 10/02/2021 ::: Se implementa interfaz Evidencias para conexion a WhatsApp
-->

<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-app-bar color="#1dbea5" dark>
          <div class="text-left">
            <v-avatar size="36" tile>
              <img :src="require('@/assets/WhatsApp.png')" />
            </v-avatar>
          </div>
          <v-toolbar-title class="WhatsApp-titulo">WhatsApp</v-toolbar-title>
        </v-app-bar>
        <v-card>
          <v-container fluid>
            <v-row>
              <v-col cols="12" sm="4" md="4" lg="4" xl="4" class="pa-0">
                <v-card height="400" class="pa-5" >
                  <v-card-actions class="pt-10 pb-0">
                    <v-text-field
                      v-model="telefono"
                      placeholder="Número teléfonico"
                      clearable
                      solo
                      denso
                    >
                    </v-text-field>
                  </v-card-actions>
                  <v-card-actions class="pb-12 pt-0">
                    <v-btn
                      block
                      large
											color="#d0e9ea"
                      elevation="2"
                      class="teal--text"
											outlined
                      
                    > <!-- @click="iniciarSesion" -->
                      Iniciar sesión
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-col>
              <v-col cols="12" sm="8" md="8" lg="8" xl="8" class="pa-0">
								<v-card height="320" color="#fff">

								</v-card>
                <v-card height="80" color="#f9f9f9">
                  <v-card-actions>
                    <v-text-field
                      v-model="message"
                      :append-outer-icon="
                        message ? 'mdi-send' : 'mdi-microphone'
                      "
                      prepend-icon="mdi-emoticon"
                      filled
                      rounded
                      clear-icon="mdi-close-circle"
                      clearable
                      placeholder="Escribe un mensaje aquí"
                      type="text"
                      @click:append="toggleMarker"
                      @keyup.enter="sendMessage"
                      @click:prepend="changeIcon"
                      @click:clear="clearMessage"
                      
                    > <!-- @keyup.enter="enviarMensaje"  @click:append-outer="sendMessage"-->
                    </v-text-field>
                  </v-card-actions>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      telefono: "",
			message: "",
      imagen: ""
    };
  },
	methods: {

    toggleMarker() {

      this.marker = !this.marker;
    },
    sendMessage() {

      let mensajeWhatsApp = {
        // telefono: this.telefono,
        telefono:'7353501617',
        mensaje: this.message,
        evidencia: "https://i.pinimg.com/564x/f0/2f/a0/f02fa0a82951f98111648a7dfd3bdf1e.jpg"
         //evidencia: this.imagen,
       }

      this.mensajeWhatsApp(mensajeWhatsApp)

      this.resetIcon();
      this.clearMessage();

    },
    clearMessage() {
      this.message = "";
    },
    resetIcon() {
      this.iconIndex = 0;
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
    async mensajeWhatsApp(mensajeWhatsApp) {
    
      try {

        // let sesion = await axios.post("http://localhost:3000/sesionWhatsApp/", mensajeWhatsApp)
        //let sesion = await axios.post("https://oscarprzlms.github.io/evidencias.github.io/conversationWhatsApp/", mensajeWhatsApp)
        let sesion = await axios.post("http://localhost:3000/conversationWhatsApp/", mensajeWhatsApp)
        console.log(sesion);

       }catch(error){
         console.log(error);
       }finally {
        console.log();
       }

    }
  }
};
</script>

<style scope>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

.WhatsApp-titulo {
  font-family: "Roboto", sans-serif;
  margin-left: 10px;
}
</style>









