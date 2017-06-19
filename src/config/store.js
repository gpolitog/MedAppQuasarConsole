import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let state = {
  isLoggedIn: false
}

let mutations = {
  setIsLoggedIn(state, value) {
    state.isLoggedIn = value
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
  getters
})
