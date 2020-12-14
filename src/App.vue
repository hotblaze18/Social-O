<template>
  <v-app>
    <Navbar />  
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
export default {
  name: 'App',

  components: {
    Navbar
  },

  data: () => ({

  }),
};
</script>

<style>
  body {
    background: #f4f4f4
  }
</style>