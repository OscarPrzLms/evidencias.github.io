<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
        <!--<v-card height="440">-->
        <v-app-bar color="#1dbea5" dark>
          <div class="text-center">
            <v-avatar size="36" tile>
              <img :src="require('@/assets/WhatsApp.png')" />
            </v-avatar>
          </div>
          <v-toolbar-title class="WhatsApp-titulo">WhatsApp</v-toolbar-title>
          
          
         
          <!-- <v-row justify="end" align="center"> -->
            <v-col cols="3" sm="3" md="3" class="mt-6">   <!--cols="12" sm="4" md="4" lg="4" xl="4"-->
              <transition name="fade">
              <v-text-field
                v-if="mostrarTelefono"
                v-model="telefono"
                placeholder="Número de teléfono"
                clearable
                solo
                dense
              >
                  
              </v-text-field>
              </transition>
            </v-col>
             <v-col cols="2" sm="2" md="2" class="mr-4">  <!--cols="12" sm="8" md="8" lg="8" xl="8"-->
               <v-btn
                color="primary"
                class="fontButton"
                @click="iniciarSesion"
                >
                {{ txtButton }}
              </v-btn>
            </v-col>
          <!-- </v-row> -->
         
        </v-app-bar>
        <!--<v-container >-->
        <v-row>
          <v-col cols="12" sm="4" md="4" lg="4" xl="4">
            <v-card height="375">
              <p>Chats</p>
            </v-card>
          </v-col>
          <v-col cols="12" sm="8" md="8" lg="8" xl="8">
            <v-card width="800" height="300">
              <p>Conversacion</p>
            </v-card>
            <v-card color="#f9f9f9" width="800" height="75">
              <v-card-actions>
                <v-text-field
                  v-model="message"
                  :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
                  prepend-icon="mdi-emoticon"
                  filled
                  rounded
                  clear-icon="mdi-close-circle"
                  clearable
                  placeholder="Escribe un mensaje aquí"
                  type="text"
                  @click:append="toggleMarker"
                  @click:append-outer="sendMessage"
                  @click:prepend="changeIcon"
                  @click:clear="clearMessage"
                >
                </v-text-field>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <!--</v-container>-->
        <!--</v-card>-->
      </v-col>
    </v-row>
    <!--  Formulario de Conexion -->
  </v-container>
</template>

<script>
import { 
  required,
  maxLength
} from "vuelidate/lib/validators";
export default {
  data: () => ({
    txtButton:'INICIAR SESION',
    telefono: "",
    mostrarTelefono: false,
    password: "Password",
    show: false,
    message: "",
    marker: true,
    iconIndex: 0,
    icons: [
      "mdi-emoticon",
      "mdi-emoticon-cool",
      "mdi-emoticon-dead",
      "mdi-emoticon-excited",
      "mdi-emoticon-happy",
      "mdi-emoticon-neutral",
      "mdi-emoticon-sad",
      "mdi-emoticon-tongue",
    ],
  }),
  validations: {
    telefono: {
      required,
      maxLength: maxLength(10)
    }
  },
  computed: {
    icon() {
      return this.icons[this.iconIndex];
    },
    erroresTelefono() {
      
      let errores = [];

      if (!this.$v.telefono.$dirty) {
        return errores;
      }
      if (!this.$v.telefono.required) {
        return errores.push('Ingresa tu número de teléfono')
      }
      if (!this.$v.telefono.maxLength) {
        return errores.push('El número telefónico debe ser a 10 digitos')
      }

      return errores;
    }
  },

  methods: {
    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
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
    iniciarSesion() {
      this.mostrarTelefono = true
      this.txtButton = 'CONECTARME'
    
    }
  },
};
</script>

<style scope>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

.WhatsApp-titulo {
  font-family: "Roboto", sans-serif;
  margin-left: 10px;
}
.fontButton {
  font-family: "Montserrat", sans-serif;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
