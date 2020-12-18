<template>  
  <v-card class="pa-5" outlined>
    <div class="my-2">
      <v-text-field
      label="Title"
      v-model="title"
      outlined
      clearable
    ></v-text-field>
    </div>
    <div class="mt-2">
      <v-textarea
        v-model="content"
        filled
        label="Post Content"
      ></v-textarea>
    </div>
    <div class="tags mb-5">
      <div><input v-model="tag" type="text" class="grey lighten-3 grey--text text--darken-2" placeholder="Add Tag" @keydown.enter="addTag"><v-btn icon><v-icon small fab @click="addTag">add</v-icon></v-btn></div>
      <span class="px-1" v-for="(tag, index) in tags" :key="index">
        <v-chip>{{tag}}<v-icon small right @click="removeTag(index)">close</v-icon></v-chip> 
      </span> 
    </div>
    <v-card-actions>
      <v-btn class="primary mr-2" @click="addPost">Post</v-btn>
      <router-link to="/dashboard"><v-btn outlined>Cancel</v-btn></router-link>
    </v-card-actions>
  </v-card>  
</template>

<script>
import { db } from "../../firebase";
import postDoc from "../../documents/postDoc";
import { mapState } from "vuex"

export default {
    data: () => ({
      tag: "",
      title: "",
      content: "",
      tags: []
    }),
    computed: {
      ...mapState({
        userId: (state) => state.userModule.user.uid,
        username: (state) => state.userModule.user.username
      })
    },
    methods: {
      addTag() {
        if(this.tag === "")
          return
        this.tags.push(this.tag)
        this.tag = ""
      },
      removeTag(index) {
        this.tags = this.tags.filter((tag, ind) => ind !=  index)
      },
      addPost() {
        if(this.title === '')
          return alert('Title can not be empty');
        const postedBy = {
          userId: this.userId,
          username: this.username
        }
        db.collection('posts').add(
          postDoc(this.title, postedBy, this.content, this.tags)
        ).then(() => this.$router.push({ path: '/dashboard' }))
        .catch(() => alert('Unable to post please try again.'))
      }
    }
}
</script>