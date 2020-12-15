<template>
    <v-app-bar app dense elevate-on-scroll class="topbar">
      <h2 class="grey--text text--darken-3"><router-link to="/dashboard">Social-O</router-link></h2>

    <v-spacer></v-spacer>

    <div v-if="user.isLoggedIn">
      <v-btn icon>
         <v-icon class="black--text">chat</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon class="black--text">notifications</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon class="black--text">post_add</v-icon>
      </v-btn>

      <v-menu offset-y flat>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" v-on="on">
            <v-avatar color="indigo" size="30" class="mx-2">
              <v-icon color="#fff">
                person  
              </v-icon>
            </v-avatar>
            <span>{{user.username}}</span>
            <v-icon right>keyboard_arrow_down</v-icon>     
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>
              <a><v-icon small left>person</v-icon>My Profile</a>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <a><v-icon small left>settings</v-icon>Settings</a>
          </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <a @click.prevent="signOutUser"><v-icon small left>exit_to_app</v-icon>Sign Out</a>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
    <div v-else>
        <span class="mx-2"><router-link to="/login">Log In</router-link></span>
        <span class="mx-2"><router-link to="/signup">Sign Up</router-link></span>
    </div>
   </v-app-bar>
</template>

<script>
import { auth } from "../../firebase";
import { mapState } from "vuex";
import { SIGN_OUT, SIGN_IN } from "../../vuex/types";

export default {
    created() {
      //listen to authchange
      auth.onAuthStateChanged((userObj) => {
        if(userObj === null) {
          this.$router.push('/');
        }

        const user = {
          username: userObj.displayName,
          email: userObj.email,
          profileImg: userObj.photoURL,
          isLoggedIn: true
        }
        this.$store.commit(SIGN_IN,{ user });
      });
    },
    methods: {
      signOutUser() {
        auth.signOut()
        .then(() => {
            this.$store.commit(SIGN_OUT);
            this.$router.push({ path: '/' });
        })
        .catch(() => alert("Unable to sign out."))
      },

    },
    computed: mapState({
      user: (state) => state.userModule.user
    })
}
</script>

<style>
  .topbar {
      background: #fff
  }
</style>