<template>
  <div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          @click="getComments()"
        >
          Show all comments
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="primary"
        >
          <v-btn
            icon
            dark
            @click="save"
          >
            <!-- <v-icon color="white">mdi-close-circle</v-icon> -->
            <v-icon>X</v-icon>
          </v-btn>
          <v-toolbar-title>Comments</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
              dark
              text
              @click="save"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        
        <div class="c-container">
          <form @submit.prevent class="commentForm">
            <v-textarea 
              v-model="comment" 
              filled 
              label="Add a comment"
            ></v-textarea>
            <v-btn 
              @click="addComment()" 
              :disabled="comment == ''" 
              color="primary"
            >
              Add
            </v-btn>
          </form>
        </div>

        <div v-for="comment in comments" :key="comment.id" class="comments">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>
                {{ comment.data.commentedBy }} {{ comment.data.createdOn }}
              </v-list-item-subtitle>
              <v-list-item-title>{{ comment.data.commentBody }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </div>
        
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
import { commentsCollection, auth } from '../../firebase'

export default {
  props: ['post'],
  data: function() {
    return {
      dialog: false,
      comment: '',
      comments: [],
    }
  },
  methods: {
    async getComments(){
      await commentsCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if(doc.data().postId === this.post.id)
            this.comments.push({'id': doc.id, 'data': doc.data()});
        });
      });
    },
    async addComment() {
      // create comment
      const newComment = {
        'createdOn': new Date(),
        'commentBody': this.comment,
        'postId': this.post.id,
        'commentedBy': auth.currentUser.uid,
      }
      await commentsCollection
      .add(newComment)
      .then((res) => {
        this.comments.unshift({ 'id': res.id, 'data': newComment });
        this.comment = '';
      })
    },
    save: function(){
      this.comment = '';
      this.comments = [];
      this.dialog = false;
    }
  }
}
</script>

<style scoped>

.commentForm{
  margin: 20px 40px;
  padding: 10px;
}

.comments{
  margin: 20px;
}

.comments:last-child{
  margin-bottom: 0px;
}

</style>