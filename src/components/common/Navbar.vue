<template>
    <v-app-bar app dense elevate-on-scroll class="topbar">
      <h2 class="grey--text text--darken-3"><router-link to="/dashboard">Social-O</router-link></h2>

    <v-spacer></v-spacer>

    <div v-if="isLoggedIn">
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
              <a><v-icon small left>exit_to_app</v-icon>Sign Out</a>
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
export default {
    data: () => ({
        isLoggedIn: true,
        user: {
            username: 'hotblaze18',
        }
    })
}
</script>

<style>
  .topbar {
      background: #fff
  }
</style>