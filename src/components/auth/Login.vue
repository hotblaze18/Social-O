<template>
  <div id="signUpForm" class="my-16 mx-auto">
    <h2 class="text-center">Log In</h2>
    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
    @submit.prevent="loginUser"
  >
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="Email"
      required
    ></v-text-field>

    <v-text-field 
      type="password"
      v-model="password"
      :rules="passwordRules"
      label="Password"
      required
    ></v-text-field>

    <v-btn type="submit" primary>Submit</v-btn>    
  </v-form>
  </div>
</template>

<script>
  import { auth } from "../../firebase";
  export default {
    data: () => ({
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length >= 7) || 'Password must be greater than 7 characters ',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
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
      loginUser() {
        auth.signInWithEmailAndPassword(this.email, this.password)
        .then((cred) => {
          console.log(cred);
          this.$router.push({path: '/dashboard'});
        })
      }
    },
  }
</script>

<style>
  #signUpForm {
    max-width: 600px;
  }
</style>