<template>
  <v-container>
    <v-layout>
      <v-flex md8 class="px-10">
        <div class="mt-2" v-for="post in posts" :key="post.postId">
          <Post :post="post" />
        </div>
      </v-flex>
      <v-flex md4>
        <h3>Trending</h3>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Post from "../posts/Post";
import { db } from "../../firebase";

export default {
  data: ()=> ({
    posts: []
  }),
  components: {
    Post
  },
  created() {
    const posts = []
    db.collection('posts').get().then((snapshot) => {
      snapshot.forEach((doc) => {
        const postId = doc.id
        posts.push({
          postId,
          ...doc.data(),
        })
      });
    })
    this.posts = posts;
  }
}
</script>

<style>

</style>