import axios from 'axios'

class User {
  constructor(id) {
    this.id = id
  }
}

export default {
  state: {
    email: '',
    userId: null,
    isLoggedIn: false,
    loginError: '',
    user: null,
    getClientJson: '',
    getCompanyJson: '',
    getManagerJson: '',
    getUserJson: '',
  },
  mutations: {
    logInUser(state, payload) {
      state.email = payload.email;
      state.userId = payload.userId;
      state.isLoggedIn = true
    },
    loginError(state) {
      state.isLoggedIn = false;
      state.loginError = 'Email и/или Пароль не корректен. Авторизация УПС. '
    },
    setUser(state, payload) {
      state.user = payload
    },
    loadGetClientJson(state, payload) {
      state.getClientJson = payload
    },
    loadGetCompanyJson(state, payload) {
      state.getCompanyJson = payload
    },
    loadGetManagerJson(state, payload) {
      state.getManagerJson = payload
    },
    loadGetUserJson(state, payload) {
      state.getUserJson = payload
    },

  },
  actions: {
    async loginUser({commit}, data) {
      commit('clearError');
      commit('setLoading', true);
      try {
        axios.post('http://configurator.talmer.ru/api/login', data)
          .then((response) => {
            // console.log(response.data);
            commit('setUser', new User(response.data));
            axios.get('http://configurator.talmer.ru/api/user/' + response.data)
              .then(response => {
                console.log('manager')
                console.log(response.data)
                commit('loadGetUserJson', response.data);
              });
            commit('setLoading', false);
            axios.get('http://configurator.talmer.ru/api/cart/' + response.data)
              .then(response => {
                commit('loadTovarsJson', response.data);
                commit('setLoading', false)
              });
            commit('setLoading', false);
          });
      } catch (error) {
        commit('setLoading', false);
        commit('loginError');
        throw error
      }
    },
    async registerUser({commit}, data) {
      console.log(data);
      commit('clearError');
      commit('setLoading', true);
      // console.log(data);
      try {
        axios.post('http://configurator.talmer.ru/api/register', data)
          .then((response) => {
            // console.log(response.data);
            commit('setUser', new User(response.data));
            axios.get('http://configurator.talmer.ru/api/cart/' + response.data)
              .then(response => {
                commit('loadTovarsJson', response.data);
                commit('setLoading', false)
              });
            commit('setLoading', false);
          });
      } catch (error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error
      }
    },
    logoutUser({commit}) {
      try {
        axios.post('http://configurator.talmer.ru/api/logout')
          .then(commit('setUser', null));

      } catch (error) {
        commit('setError', error.message);
        throw error
      }
    },
    async updateUser({commit}, {id, data,idUser}) {
      console.log(data);
      commit('setLoading', true);
      try {
        await axios.post('http://configurator.talmer.ru/api/client/' + id, data)
          .then(response =>
            console.log(response));
        axios.get('http://configurator.talmer.ru/api/client/id/' + idUser)
          .then(response => {
            commit('loadGetClientJson', response.data);
            commit('setLoading', false)
          });
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
    async getGetUserJson({commit}, id) {
      commit('setLoading', true);
      try {
        await axios.get('http://configurator.talmer.ru/api/client/id/' + id)
          .then(response => {
            commit('loadGetClientJson', response.data);

            axios.get('http://configurator.talmer.ru/api/manager/' + response.data[0].idManager)
              .then(response => {
                commit('loadGetManagerJson', response.data);
                commit('setLoading', false)
              });

            axios.get('http://configurator.talmer.ru/api/company/' + response.data[0].idCompany)
              .then(response => {
                commit('loadGetCompanyJson', response.data);
                commit('setLoading', false)
              });
            commit('setLoading', false)
          })
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
    async autoLoginUser({commit}, id) {
      commit('setLoading', true);
      try {
        await axios.post('http://configurator.talmer.ru/api/session', id)
          .then(response => {
            console.log(response.data);
            commit('setUser', new User(response.data._id));
            axios.get('http://configurator.talmer.ru/api/cart/' + response.data._id)
              .then(response => {
                commit('loadTovarsJson', response.data);
                commit('setLoading', false)
              });
            commit('setLoading', false)
          })
      } catch (e) {
        commit('setError', e.message);
        throw e
      }
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    userId: state => state.userId,
    loginError: state => state.loginError,
    isUserLoggedIn(state) {
      return state.user !== null
    },
    user(state) {
      return state.user
    },
    getClient(state) {
      return state.getClientJson
    },
    getCompany(state) {
      return state.getCompanyJson
    },
    getManager(state) {
      return state.getManagerJson
    },
    getUser(state) {
      console.log(state.getUserJson)
      return state.getUserJson
    },

  }
}
