// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================
require('../node_modules/chart.js/dist/Chart.bundle.min.js')
require('../node_modules/hchs-vue-charts/dist/vue-charts.js')
require('chart.js')
require('hchs-vue-charts')

import Vue from 'vue'
import Quasar from 'quasar'
import IdleVue from 'idle-vue/src'
import Vuelidate from 'vuelidate'

import router from './config/router'
import store from './config/store'

import UTILS from './utils/utils'
import STORAGE from './utils/storage'

Vue.use(VueCharts)
Vue.use(Vuelidate)
Vue.use(Quasar)

// nav guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (UTILS.isLoggedIn()) {
      console.log(to.fullPath + ' allowed. redirecting..')
      next()
      store.dispatch('loggedIn', true)
    } else {
      console.log(to.fullPath + ' not allowed. redirecting to login')
      next('/logout')
    }
  } else {
    next()
    if (to.redirectedFrom === '/logout') {
      store.dispatch('clearStore')
      STORAGE.clear()
    }
  }
})

// idling - 2mins in ms
const eventsHub = new Vue()

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 120000
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App')),
    onIdle() {
      console.log(`auto logged out. console is inactive`)
      router.go('/')
      store.dispatch('clearStore')
      STORAGE.clear()
    },
    onActive() {
      console.log(`console is active. will auto logout in 2mins`)
    }
  })
})
