<!-- 
Template: Menu.vue
Descripcion: Menu Principal
Fecha: 02-01-2020
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
-->
<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap justify-center>
      <!---- UNO  --->
      <v-flex d-flex xs12 sm6 md4 lg3 child-flex>
        <!--<v-flex d-flex xs12 sm6 md3>-->
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex d-flex xs12 v-for="n in 2" :key="n">
                <v-menu absolute offset-y style="max-width: 400px">
                  <template v-slot:activator="{ on, attrs }">
                    <!--  color="#D9C043" -->
                    <v-hover v-slot="{ hover }">
                      <v-card
                        :elevation="hover ? 12 : 2"
                        :class="{ 'on-hover': hover }"
                        :color="n === 1 ? '#D9C043' : '#D99379'"
                        dark
                        class="elevation-9 mb-4"
                        v-bind="attrs"
                        v-on="on"
                        height="200"
                        @click="n === 1 ? Evidencias() : PorDefinir2()"
                      >
                        <v-layout align-center justify-center fill-height>
                          <v-flex xs4>
                            <v-avatar class="ma-3" size="100" tile>
                              <v-img
                                :src="require('@/assets/imagenEvidencias.png')"
                              ></v-img>
                            </v-avatar>
                          </v-flex>
                          <v-flex xs8>
                            <v-card-text class="text-center menu-titulo"
                              >Evidencias</v-card-text
                            >
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-hover>
                  </template>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <!---- UNO  --->

      <!---- DOS  --->
      <v-flex d-flex xs12 sm6 md4 lg3 child-flex>
        <!--<v-flex d-flex xs12 sm6 md3>-->
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout row wrap>
              <v-flex d-flex xs12 v-for="n in 2" :key="n">
                <v-menu absolute offset-y style="max-width: 400px">
                  <template v-slot:activator="{ on, attrs }">
                    <!--   color="#7FC0B8"   :color="n == 1 ? '#728C87' : '#C5D7D9'"-->
                    <v-hover v-slot="{ hover }">
                      <v-card
                        :elevation="hover ? 12 : 2"
                        :class="{ 'on-hover': hover }"
                        :color="n == 1 ? '#728C87' : '#5D8AA6'"
                        dark
                        class="elevation-9 mb-4"
                        v-bind="attrs"
                        v-on="on"
                        height="200"
                        @click="n === 1 ? PorDefinir1() : PorDefinir2()"
                      >
                        <v-layout align-center justify-center fill-height>
                          <v-flex xs4>
                            <v-avatar class="ma-3" size="100" tile>
                              <v-img
                                :src="require('@/assets/imagenEvidencias.png')"
                              ></v-img>
                            </v-avatar>
                          </v-flex>
                          <v-flex xs8>
                            <v-card-text class="text-center menu-titulo"
                              >Por Definir</v-card-text
                            >
                          </v-flex>
                        </v-layout>
                      </v-card>
                    </v-hover>
                  </template>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <!---- DOS  --->
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      itemsMenuApp: [
        { title: "Evidencias", icon: "photo_library" },
        { title: "Opcion 2", icon: "help_center" },
        { title: "Opcion 3", icon: "help_center" },
        { title: "Opcion 4", icon: "help_center" },
      ],
      lorem: `Lorem ipsum dolor sit amet, mel at clita quando. Te sit oratio vituperatoribus, nam ad ipsum posidonium mediocritatem, explicari dissentiunt cu mea. Repudiare disputationi vim in, mollis iriure nec cu, alienum argumentum ius ad. Pri eu justo aeque torquatos.`,
    };
  },
  methods: {
    Evidencias() {
      this.$router.push("Evidencias");
    },
  },
};
</script>

<style scoped>
.home-titulo {
  font-family: "Raleway", sans-serif;
  font-size: 3.5rem;
  color: #2a3952;
  text-shadow: 1px 1px 5px #acacac;
}
.menu-titulo {
  font-family: "Montserrat", sans-serif;
  font-size: 1.2rem;
  color: #fff;
  text-shadow: 1px 1px 5px #2a3952;
  justify-content: center;
}
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.9;
}
</style>
