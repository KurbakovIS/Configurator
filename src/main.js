import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Vuetify from 'vuetify'
import * as axios from 'axios'
import 'vuetify/dist/vuetify.min.css'
import BuyModalComponent from './components/shared/BuyModal'
import CopyModalComponent from './components/shared/CopyModal'
import UpdateUserComponent from './components/shared/UpdateUser'
import AdminOrdersComponent from './components/User/admin/Orders'
import AdminCompanysComponent from './components/User/admin/Company'
import AdminUserComponent from './components/User/admin/Users'
import SelectParams from './components/shared/SelectParam'
import Vue2Storage from 'vue2-storage'

Vue.use(Vuetify, {
  theme: {
    primary: '#4d5c7f'
  }
});

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.component('app-buy-modal', BuyModalComponent);
Vue.component('app-copy-modal', CopyModalComponent);
Vue.component('app-update-modal', UpdateUserComponent);
Vue.component('app-select-param', SelectParams);
Vue.component('app-admin-orders', AdminOrdersComponent);
Vue.component('app-admin-companys', AdminCompanysComponent);
Vue.component('app-admin-user', AdminUserComponent);
Vue.use(Vue2Storage, {
  prefix: 'app_',
  driver: 'local',
  ttl: 60 * 60 * 24 * 1000
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: {App},
  template: '<App/>',
  created() {
    console.log(this.$storage);
    if (this.$storage.get('test')) {
      this.$store.dispatch('autoLoginUser', this.$storage.get('test'))
    }

  }
});
