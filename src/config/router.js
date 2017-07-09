import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load(component) {
  return () => System.import(`components/${component}.vue`)
}


const routes = [
  { path: '/login', component: load('views/Login'), meta: { name: 'Login' } },
  { path: '/dashboard', component: load('views/Dashboard'), meta: { name: 'Dashboard', requiresAuth: true } },
  { path: '/accounts', component: load('views/Accounts'), meta: { name: 'Accounts', requiresAuth: true } },
  { path: '/affiliates', component: load('views/Affiliates'), meta: { name: 'Affiliates', requiresAuth: true } },
  { path: '', redirect: '/login' },
  { path: '*', component: load('Error404') }
]

const router = new VueRouter({
  mode: 'history', /* for websites only and not cordova build*/
  routes
})

export default router