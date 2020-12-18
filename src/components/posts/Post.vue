<template>
    <div class="post">
        <v-card class="mx-auto" outlined>
            <div class="post-header ma-5">
              <v-avatar color="indigo" size="45" class="mx-2">
                <v-icon color="#fff">
                  person  
                </v-icon>
              </v-avatar>
            <span>{{post.postedBy.username}}</span>
            </div>

            <v-card-title>
                {{post.title}}
            </v-card-title>

            <v-card-text v-if="post.content !== ''">
                {{post.content}}
            </v-card-text>

						<div class="post-tags px-2 py-1" v-if="post.tags.length > 0">
							<v-chip
                v-for="(tag, ind) in post.tags"
                :key="ind" 
                small class="mx-1">{{tag}}</v-chip>
						</div>

            <v-card-actions>
                <span class="mx-2">
                  <v-icon 
                  :color="isUpvoted ? 'red' : ''" 
                  @click="toggleUpvote" 
                  medium>arrow_circle_up</v-icon>
                  <span>{{upvotes}}</span>  
                </span>
                <span class="mx-2">
                  <v-icon :color="isDownvoted ? 'red' : ''" 
                  @click="toggleDownvote" 
                  medium>arrow_circle_down</v-icon>
                  <span>{{downvotes}}</span>
                </span>
                <span class="mx-2">
                  <v-icon medium>comment</v-icon>
                </span>
                <span class="mx-2">
                  <v-icon medium>assistant_photo</v-icon>
                </span>
							</v-card-actions>  
        </v-card>
    </div>
</template>

<script>
import { db, firebase } from "../../firebase";
import { mapState } from "vuex";

export default {
    data: () => ({
      vote: 0,
      upvotes: 0,
      downvotes: 0
    }),
    props: ['post'],
    created() {
      const { votes, upvotes, downvotes } = this.$props.post
      if(votes[this.userId]) {
        this.vote = votes[this.userId]
      }
      this.upvotes = upvotes
      this.downvotes = downvotes
    },
    computed: {
      isUpvoted() {
        return (this.vote === 1 ? true : false)
      },
      isDownvoted() {
        return (this.vote === -1 ? true : false)
      },  
      ...mapState({
        userId: (store) => store.userModule.user.uid
      })
    },
    methods: {
      toggleUpvote() {
        if(this.vote === 0) {
          this.vote = 1;
          this.upvotes++
        } else if(this.vote === -1) {
          this.vote = 1;
          this.downvotes--
          this.upvotes++
        }
        else {
          this.vote = 0
          this.upvotes--
        }
        const ref = `votes.${this.userId}`
        if(this.vote === 1) {
          db.collection('posts').doc(this.post.postId).update({
            [ref]: 1,
            'upvotes': this.upvotes,
            'downvotes': this.downvotes
          });
        } else {
          db.collection('posts').doc(this.post.postId).update({
            [ref]: firebase.firestore.FieldValue.delete(),
            'upvotes': this.upvotes,
            'downvotes': this.downvotes
          });
        }
      },
      toggleDownvote() {
        if(this.vote === 0) {
          this.vote = -1
          this.downvotes++
        } else if(this.vote === 1) {
          this.vote = -1;
          this.downvotes++,
          this.upvotes--
        }
        else {
          this.vote = 0
          this.downvotes--
        }
        const ref = `votes.${this.userId}`
        if(this.vote === -1) {
          db.collection('posts').doc(this.post.postId).update({
            [ref]: -1,
            'upvotes': this.upvotes,
            'downvotes': this.downvotes
          });
        } else {
          db.collection('posts').doc(this.post.postId).update({
            [ref]: firebase.firestore.FieldValue.delete(),
            'upvotes': this.upvotes,
            'downvotes': this.downvotes
          });
        }
      }
    }
}
</script>