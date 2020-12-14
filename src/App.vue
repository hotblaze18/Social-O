<template>
  <v-app class="grey">
    <Navbar />
    <v-main class="my-9">
      <router-view></router-view>
    </v-main>  
  </v-app>
</template>

<script>
import Navbar from "./components/common/Navbar";

export default {
  name: 'App',

  components: {
    Navbar,
  },

  data: () => ({

  }),
};
</script>

<style>
  body {
    background: #f4f4f4
  }
  .v-application a {
    text-decoration: none;
    color: inherit !important;
  }
</style>