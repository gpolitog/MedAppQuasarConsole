import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load(component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '', component: load('views/Login'), meta: { name: 'Login' } },
    { path: '/dashboard', component: load('views/Dashboard'), meta: { name: 'Dashboard' } },
    { path: '/accounts', component: load('views/Accounts'), meta: { name: 'Accounts' } },
    { path: '/affiliates', component: load('views/Affiliates'), meta: { name: 'Affiliates' } },
    { path: '*', component: load('Error404') }
  ]
})
