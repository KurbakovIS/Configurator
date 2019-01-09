// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as fb from 'firebase'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  created() {
    fb.initializeApp({
      apiKey: "AIzaSyCcaYuNHooCNugA-Q4X1ANIimU_sJr5r3s",
      authDomain: "itc-ads-c1528.firebaseapp.com",
      databaseURL: "https://itc-ads-c1528.firebaseio.com",
      projectId: "itc-ads-c1528",
      storageBucket: "itc-ads-c1528.appspot.com",
      messagingSenderId: "679528790386"
    });

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser',user)
      }
    })
  }
});
