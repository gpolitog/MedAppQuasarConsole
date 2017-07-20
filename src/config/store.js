import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

let state = {
  isLoggedIn: false,
  isAccountsLoaded: false,
  accounts: [],
  isAffiliatesLoaded: false,
  affiliates: []
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
  },
  setAffiliates(state, value) {
    Vue.set(state, 'affiliates', value)
  },
  setIsAffiliatesLoaded(state, value) {
    Vue.set(state, 'isAffiliatesLoaded', value)
  }

}

let actions = {
  loggedIn(context, value) {
    context.commit('setIsLoggedIn', value)
  },
  setAccounts(context, value) {
    context.commit('setAccounts', value)
  },
  accountsLoaded(context, value) {
    context.commit('setIsAccountsLoaded', value)
  },
  setAffiliates(context, value) {
    context.commit('setAffiliates', value)
  },
  affiliatesLoaded(context, value) {
    context.commit('setIsAffiliatesLoaded', value)
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
  },
  getIsAffiliatesLoaded() {
    return state.isAffiliatesLoaded
  },
  getAffiliates() {
    return state.affiliates
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
