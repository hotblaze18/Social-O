<template>
  <v-container>
    <v-layout>
      <v-flex md8 class="px-10">
        <h3 class="my-3">Posts</h3>
        <div>
          <div v-for="post in posts" :key="post.id">
            <Post :post="post"/>
          </div>
        </div>
      </v-flex>
      <v-flex md4>
        <h3>Trending</h3>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { postsCollection } from '../../firebase'
import Post from "../posts/Post";

export default {
  // props: {
  // },
    
  data: function() {
    return{
      posts: []
    }
  },
  components: {
    Post
  },
  created: function() {
    this.getPosts();
  },
  methods: {
    getPosts: function() {
      postsCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.posts.push({'id': doc.id, 'data': doc.data()});
        });
      })
    }
  }
}
</script>