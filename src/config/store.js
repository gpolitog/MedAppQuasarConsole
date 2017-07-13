import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let state = {
  isLoggedIn: false
}

let mutations = {
  setIsLoggedIn(state, value) {
    // state.isLoggedIn = value
    Vue.set(state, 'isLoggedIn', value)
  }
}

let actions = {
  loggedIn(context, value) {
    context.commit('setIsLoggedIn', value)
  }
}

let getters = {
  getIsLoggedIn() {
    return state.isLoggedIn
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})