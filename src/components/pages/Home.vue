<template>
  <v-container>
    <v-layout>
      <v-flex md8 class="px-10">
        <h3 class="my-3">Trending</h3>
          <Post />
          <Post />
      </v-flex>
      <v-flex md4>
        <h3>Top Communities</h3>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Post from "../posts/Post";
export default {
  data: ()=> ({

  }),
  components: {
    Post
  },
}
</script>

<style>

</style>