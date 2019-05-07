import Vue from 'vue'
import Vuex from 'vuex'
import ads from './ads'
import shared from './shared'
import getAttribute from './getAttribute'
import orders from './orders'
import user from './modules/user'
import company from './modules/company'


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ads,
    shared,
    getAttribute,
    orders,
    user,
    company,
  }
})
