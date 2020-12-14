import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import '@babel/polyfill'
import Router from "vue-router";

import routes from "./routes";

Vue.config.productionTip = false

Vue.use(Router)

const router = new Router({
  routes,
  mode: "history"
});

new Vue({
  vuetify,
  render: h => h(App),
  router
}).$mount('#app')