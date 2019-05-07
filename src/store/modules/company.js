import axios from 'axios'


export default {
  state:{
    companysJson:''
  },
  mutations:{
    loadGetCompanysJson(state, payload) {
      state.companysJson = payload
    },
  },
  actions:{
    async getCompanysJson({commit}) {
      commit('setLoading', true);
      try {
        await axios.get('http://configurator.talmer.ru/api/company')
          .then(response => {
            commit('loadGetCompanysJson', response.data);
            commit('setLoading', false)
          })
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
  },
  getters:{
    company(state) {
      return state.companysJson
    },
  }
}
