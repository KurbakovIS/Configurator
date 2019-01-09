import server from '../servers'

export default {
  state: {
    ads: server
    // ads: [
    //   {
    //     title: 'First',
    //     description: 'ssdsdsdsdsdsds',
    //     promo: true,
    //     imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
    //     id: '123'
    //   },
    //   {
    //     title: 'Firsts',
    //     description: 'ssdsdsdsdssdfdsds',
    //     promo: false,
    //     imageSrc: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
    //     id: '1234'
    //   }
    // ]
  },
  mutations: {
    createAd(state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    createAd({commit}, payload) {
      payload.id = '2345';

      commit('createAd', payload)
    }
  },
  getters: {
    ads(state) {
      return state.ads

    },
    promoAds(state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds(state) {
      return state.ads
    },
    adById(state) {
      return (adId) => {
        return state.ads.find(ad =>ad.id == adId)
      }
    }
  }
}
