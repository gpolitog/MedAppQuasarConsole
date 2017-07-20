import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let state = {
  isLoggedIn: false,
  isAccountsLoaded: false,
  accounts: []
}

let mutations = {
  setIsLoggedIn(state, value) {
    Vue.set(state, 'isLoggedIn', value)
  },
  setAccounts(state, value) {
    Vue.set(state, 'accounts', value)
  },
  setIsAccountsLoaded(state, value) {
    Vue.set(state, 'isAccountsLoaded', value)
  }
}

let actions = {
  loggedIn(context, value) {
    context.commit('setIsLoggedIn', value)
  },
  setAccounts(state, value) {
    context.commit('setaccounts', value)
  },
  accountsLoaded(state, value) {
    context.commit('setisAccountsLoaded', value)
  }
}

let getters = {
  getIsLoggedIn() {
    return state.isLoggedIn
  },
  getIsAccountsLoaded() {
    return state.isAccountsLoaded
  },
  getAccounts() {
    return state.accounts
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
