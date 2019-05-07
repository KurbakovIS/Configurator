import axios from 'axios'

function axioGet(http, load, commit, loading = false, value = '') {
  axios.get(http + value)
    .then(response => {
      commit(load, response.data);
      loading ? commit('setLoading', false) : ''
    });
}

function axioPost(http, data, value = '') {
  axios.post(http + value, data)
    .then(response => {
      console.log(response)
    });
}

function axioDelete(http, value = '') {
  axios.delete(http + value)
    .then(response => {
      console.log(response)
    });
}

const url = 'http://configurator.talmer.ru/api/';

export default {
  state: {
    tovarsJson: '',
    OrdersClientJson: '',
    OrdersCompanyJson: '',
    OneCartJson: '',
  },
  mutations: {

    loadTovarsJson(state, payload) {
      state.tovarsJson = payload
    },
    loadOrdersClientJson(state, payload) {
      state.OrdersClientJson = payload
    },
    loadOneCartJson(state, payload) {
      state.OneCartJson = payload
    },
    loadOrdersCompanyJson(state, payload) {
      state.OrdersCompanyJson = payload
    },
  },
  actions: {
    async getOneCartJson({commit}, id) {
      commit('setLoading', true);
      try {
        await axioGet(url + 'cart/position/', 'loadOneCartJson', commit, true, id);
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
    async createOrder({commit}, {tovar, id}) {
      try {
        await axios.post(url + 'cart', tovar)
          .then(response =>
            console.log(response));
        axioGet(url + 'cart/', 'loadTovarsJson', commit, true, id)
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
    async cleanCart({commit}, id) {
      try {
        await axioDelete(url + 'cleancart/', id)
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
    async getTovarsJson({commit}, id) {
      commit('setLoading', true);
      try {
        await axioGet(url + 'cart/', 'loadTovarsJson', commit, true, id);
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
    async deleteTovar({commit}, id) {
      try {
        await axioDelete(url + 'cart/', id)
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
    async sendOrders({commit}, data) {
      console.log(data);
      try {
        await axioPost(url + 'order', data)
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
    async updateCart({commit}, {id, data}) {
      console.log(data);
      try {
        await axioPost(url + 'cart/', data, id)
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
    async getOrdersClientJson({commit}, id) {
      commit('setLoading', true);
      try {
        await axioGet(url + 'orders/user/', 'loadOrdersClientJson', commit, true, id);
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
    async getOrdersCompanyJson({commit}, id) {
      commit('setLoading', true);
      try {
        await axioGet(url + 'orders/company/', 'loadOrdersCompanyJson', commit, true, id);
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
  },
  getters: {
    tovar(state) {
      return state.tovarsJson
    },
    ordersClient(state) {
      return state.OrdersClientJson
    },
    ordersCompany(state) {
      return state.OrdersCompanyJson
    },
    oneCart(state) {
      // console.log(state.OneCartJson)
      return state.OneCartJson
    },

  }
}
