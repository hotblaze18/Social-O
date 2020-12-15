import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import Router from "vue-router";
import router from "./router/router";
import store from "./vuex/store";

Vue.config.productionTip = false

Vue.use(Router);

store.subscribe((mut, state) => {
  console.log(mut, state);
})

new Vue({
  vuetify,
  render: h => h(App),
  router,
  store
}).$mount('#app')