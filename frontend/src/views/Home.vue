<!-- 
Template: Home.vue
Descripcion: Template Principal
Fecha: 02-01-2020
Desarrollador: Ing. Oscar R. Pérez Lomes
Actualizaciones:
-->
<template>
  <v-layout justify-center align-center>
    <v-flex
      px-xs-0
      my-xs-0
      px-sm-0
      my-sm-0
      px-md-0
      my-md-0
      px-lg-0
      my-lg-0
      px-xl-0
      my-xl-0
    >
      <v-slide-y-transition mode="out-in">
        <v-img
          :src="require('@/assets/Alumnos.jpeg')"
          gradient="to bottom right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
        >
        </v-img>
      </v-slide-y-transition>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "Home",
};
</script>
<style>
/* html {
  overflow-y: hidden !important;
  overflow-x: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
} */
</style>
