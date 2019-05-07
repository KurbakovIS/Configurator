import store from '../store'

export default function (to, from, next) {
  if (store.getters.user) {
  // if (1) {
    next()
  }
  else {
    next('/login?loginError=true')
  }
}
