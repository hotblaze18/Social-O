<template>
    <div class="post my-4">
        <v-card class="mx-auto" outlined>
            <div class="post-header ma-5">
              <v-avatar color="indigo" size="45" class="mx-2">
                <v-icon color="#fff">
                  person  
                </v-icon>
              </v-avatar>
            <span>User id: {{ post.data.userId }}</span>
            </div>

            <v-card-title>
              Post id: {{ post.id }}
            </v-card-title>

            <v-card-text>
              {{ post.data.content }}
            </v-card-text>

						<div class="post-tags px-2 py-1">
							<v-chip small class="mx-1">Anime</v-chip>
							<v-chip small class="mx-1">Spoiler</v-chip>
						</div>

            <v-card-actions>
                <v-icon medium class="mx-2">arrow_circle_up</v-icon>
                <v-icon medium class="mx-2">arrow_circle_down</v-icon>
                <v-icon medium class="mx-2">assistant_photo</v-icon>
                <v-btn icon>
                  <v-icon medium class="mx-2" @click="toggleCommentModal(post)">comment</v-icon>
                </v-btn>
            </v-card-actions>  
            <transition name="fade">
              <CommentModal
                v-if="showCommentModal" 
                :post="selectedPost"
                @close="toggleCommentModal()"
              ></CommentModal>
            </transition>
        </v-card>
    </div>
</template>


<script>
import { mapState } from 'vuex'
// import moment from 'moment'
import CommentModal from '../comments/CommentModal'

export default {
  props: ['post'],
  components: {
    CommentModal
  },
  data: function() {
    return {
      currentPost: {
        content: ''
      },
      showCommentModal: false,
      selectedPost: {},
      showPostModal: false,
      fullPost: {},
    }
  },
  computed: {
    ...mapState(['userProfile', 'posts'])
  },
  methods: {
    toggleCommentModal(currentPost) {
      this.showCommentModal = !this.showCommentModal

      // if opening modal set selectedPost, else clear
      if (this.showCommentModal) {
        this.selectedPost = currentPost
      } else {
        this.selectedPost = {}
      }
    }
  },
  filters: {
    formatDate(val) {
      if (!val) { return '-' }

      let date = val.toDate()
      // return moment(date).fromNow()
      return date
    },
    trimLength(val) {
      if (val.length < 200) { return val }
      return `${val.substring(0, 200)}...`
    }
  }
}
</script>