import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load(component) {
  return () => System.import(`components/${component}.vue`)
}


const routes = [
  { path: '/login', name: 'login', component: load('views/Login') },
  { path: '/dashboard', name: 'dashboard', component: load('views/Dashboard'), meta: { requiresAuth: true } },
  { path: '/accounts', name: 'accounts', component: load('views/Accounts'), meta: { requiresAuth: true } },
  { path: '/affiliates', name: 'affiliates', component: load('views/Affiliates'), meta: { requiresAuth: true } },
  { path: '/', redirect: '/login' },
  { path: '*', component: load('Error404') }
]

// const router = new VueRouter({
//   mode: 'history', /* for websites only and not cordova build*/
//   routes
// })

export default new VueRouter({
  mode: 'history', /* for websites only and not cordova build*/
  routes: routes
})