// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import Vuelidate from 'vuelidate'

import router from './config/router'
import store from './config/store'

import UTILS from './utils/utils'

Vue.use(Quasar)
Vue.use(Vuelidate)

// nav guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (UTILS.isLoggedIn()) {
      store.dispatch('loggedIn', true)
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    store,
    render: h => h(require('./App'))
  })
})
