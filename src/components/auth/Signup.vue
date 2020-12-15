<template>
  <div id="signUpForm" class="my-16 mx-auto">
    <h2 class="text-center">Sign Up</h2>
    <p class="red--text text-center">{{error}}</p>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="signUpUser"
  >
    <v-text-field
      v-model="username"
      :counter="10"
      :rules="usernameRules"
      label="Username"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-text-field 
      type="password"
      v-model="password"
      :rules="passwordRules"
      label="Password"
    ></v-text-field>

    <v-btn type="submit" primary>Submit</v-btn>    
  </v-form>
  </div>
</template>

<script>
  import { auth, db } from "../../firebase";
  import userDoc from "../../documents/userDoc";
  import { SIGN_IN } from "../../vuex/types";

  export default {
    data: () => ({
      valid: true,
      error: '',
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
        v => (v && v.length <= 10) || 'Username must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 7) || 'Password must be greater equal to 7 characters ',
      ]
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      async signUpUser() {
        try {
         const cred = await auth.createUserWithEmailAndPassword(this.email, this.password)
         await Promise.all([
           cred.user.updateProfile({displayName: this.username}),
           db.collection('user').doc(cred.user.uid).set({
              ...userDoc
           })
         ]);
         
         const user = {
          username: cred.user.displayName,
          email: cred.user.email,
          profileImg: cred.user.photoURL,
          isLoggedIn: true
        }

        this.$store.commit(SIGN_IN,{ user });
        this.$router.push('/dashboard');

        // await db.collection('user').doc(cred.user.uid).set({
        //       ...userDoc
        // });
        }catch {
          this.error = "Unable to sign up";
        }
    },
  },
}
</script>

<style>
  #signUpForm {
    max-width: 600px;
  }
</style>