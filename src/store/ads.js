import axios from 'axios'

function axioGet(http, load, commit, loading = false, value = '') {
  axios.get(http + value)
    .then(response => {
      commit(load, response.data);
      loading ? commit('setLoading', false) : ''
    });
}

const url = 'http://configurator.talmer.ru/api/';

export default {
  state: {
    categoryJson: '',
    oneCategoryJson: '',
    oneServerJson: '',
    disksJson: '',
    proccesorsJson: '',
    filtersJson: '',
    warrantyProgramJson: '',
    osJson: '',
    networkJson: '',
    hbaJson: '',
    superDomValueJson: '',
    raidJson: '',
    transiverJson: '',
    serversJson: '',
    oneCategoryFullJson: '',
    allOrdersAdminJson: ''
  },
  mutations: {
    loadCategory(state, payload) {
      state.categoryJson = payload
    },
    loadOneCategory(state, payload) {
      state.oneCategoryJson = payload
    },
    loadOneCategoryFull(state, payload) {
      state.oneCategoryFullJson = payload
    },
    loadOneServer(state, payload) {
      state.oneServerJson = payload
    },
    loadDisks(state, payload) {
      state.disksJson = payload
    },
    loadProcessors(state, payload) {
      state.proccesorsJson = payload
    },
    loadFilters(state, payload) {
      state.filtersJson = payload
    },
    loadWarrantyProgram(state, payload) {
      state.warrantyProgramJson = payload
    },
    loadOsJson(state, payload) {
      state.osJson = payload
    },
    loadNetworkJson(state, payload) {
      state.networkJson = payload
    },
    loadHbaJson(state, payload) {
      state.hbaJson = payload
    },
    loadSuperDomValueJson(state, payload) {
      state.superDomValueJson = payload
    },
    loadRaidJson(state, payload) {
      state.raidJson = payload
    },
    loadTransiverJson(state, payload) {
      state.transiverJson = payload
    },
    loadServersJson(state, payload) {
      state.serversJson = payload
    },
    loadAllOrdersAdminJson(state, payload) {
      state.allOrdersAdminJson = payload
    },

  },
  actions: {
    async adAllJson({commit}, _id) {
      commit('setLoading', true);
      try {
        await axios.get(url + 'server/' + _id)
          .then(response => {
            commit('loadOneServer', response.data);
            axioGet(url + 'proccesorsQname/?attributes.value=', 'loadServersJson', commit, false, response.data.pr_socet)
          });
        await axioGet(url + 'disks', 'loadDisks', commit);
        await axioGet(url + 'proccesorsAll', 'loadProcessors', commit);
        await axioGet(url + 'wpDisp', 'loadWarrantyProgram', commit);
        await axioGet(url + 'trsDisp', 'loadTransiverJson', commit);
        await axioGet(url + 'rcsDisp', 'loadRaidJson', commit);
        await axioGet(url + 'dvDOMDisp', 'loadSuperDomValueJson', commit);
        await axioGet(url + 'hbaDisp', 'loadHbaJson', commit);
        await axioGet(url + 'lpvDisp', 'loadNetworkJson', commit);
        await axioGet(url + 'osDisp', 'loadOsJson', commit, true)
      } catch (e) {
        commit('setError', e.message);
        throw e
      }

    },

    async getCategoryJson({commit}) {
      commit('setLoading', true);
      try {
        await axioGet(url + 'category', 'loadCategory', commit, true);
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
    async getOneCategoryJson({commit}, key) {
      commit('setLoading', true);
      try {
        await axioGet(url, 'loadOneCategory', commit, false, key + 'min');
        await axioGet(url + 'filters', 'loadFilters', commit, true);
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
    async getCategoryFullJson({commit}, key) {
      commit('setLoading', true);
      try {
        await axioGet(url, 'loadOneCategoryFull', commit, true, key);
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
    async getAllOrdersAdminJson({commit}) {
      commit('setLoading', true);
      try {
        await axioGet(url + 'ordersAdmin', 'loadAllOrdersAdminJson', commit, true);
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
  },
  getters: {
    category(state) {
      let one = state.categoryJson[0];
      return one['column']
    },
    ordersAdmin(state) {
      return state.allOrdersAdminJson
    },
    oneCategory(state) {
      return state.oneCategoryJson
    },
    oneCategoryFull(state) {
      return state.oneCategoryFullJson
    },
    adById(state) {
      return state.oneServerJson
    },
    disk(state) {
      return state.disksJson
    },
    lineproc(state) {
      return state.proccesorsJson
    },
    filters(state) {
      return state.filtersJson
    },
    warrantyProgram(state) {
      return state.warrantyProgramJson
    },
    os(state) {
      return state.osJson
    },
    network(state) {
      return state.networkJson
    },
    hba(state) {
      return state.hbaJson
    },
    superDomValue(state) {
      return state.superDomValueJson
    },
    raid(state) {
      return state.raidJson
    },
    transiver(state) {
      return state.transiverJson
    },
    server(state) {
      return state.serversJson
    }
  }
}
