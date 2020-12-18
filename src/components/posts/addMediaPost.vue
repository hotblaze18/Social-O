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
      <span v-for="(image, ind) in media" :key="ind" class="img-upload-container mx-2">
        <div class="img-upload">
          <v-btn icon color="grey darken-4"><v-icon small @click="removeMedia(ind)">close</v-icon></v-btn>
          <v-img class="img" :src="image" contain max-width="100" max-height="150"></v-img>
        </div>
      </span>
      <v-input>
          <input ref="media" type="file" @change="onFileChange" hidden multiple>
          <v-icon @click="browse">add</v-icon>
      </v-input>
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
      tags: [],
      media: [],
    }),
    computed: {
      ...mapState({
        userId: (state) => state.userModule.user.uid
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
        if(this.media.length === 0)
          return alert('Please insert media.')
        db.collection('posts').add(
          postDoc(this.title, this.userId, this.content, this.tags, this.media)
        ).then(() => this.$router.push({ path: '/dashboard' }))
        .catch(() => alert('Unable to post please try again.'))
      },
      browse() {
        this.$refs['media'].click();
      },
      onFileChange(e) {
        console.log(e);
        var files = e.target.files || e.dataTransfer.files;
        if (!files.length)
          return;
        this.createImage(files[0]);
      },
      createImage(file) {
        var reader = new FileReader();
        var vm = this;

        reader.onload = (e) => {
          vm.media.push(e.target.result);
        };
        console.log(this.media);
        reader.readAsDataURL(file);
      },
      removeMedia(ind) {
        this.media = this.media.filter((med, index) => index !== ind);
      }
    }
}
</script>

<style>
  .img-upload-container {
    display: inline-block;
  }
  .img-upload {
    position: relative;
  }

  .img-upload button {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
  }

  .img {
    border: 5px solid black;
  }
</style>