import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// FOR LAZY LOADING
// function load(component) {
//   return () => System.import(`components/${component}.vue`)
// }

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
  mode: 'history',
  routes: [{
      path: '/',
      redirect: '/login'
    },
    {
      path: '/logout',
      redirect: '/login'
    },
    {
      path: '/login',
      meta: {
        name: 'Login'
      },
      // FOR LAZY LOADING
      // component: load('views/Login'),
      component: function (resolve) {
        require(['components/views/Login.vue'], resolve)
      }
    },
    {
      path: '/dashboard',
      meta: {
        name: 'Dashboard',
        requiresAuth: true
      },
      // FOR LAZY LOADING
      // component: load('views/Dashboard'),
      component: function (resolve) {
        require(['components/views/Dashboard.vue'], resolve)
      }
    },
    {
      path: '/accounts',
      meta: {
        name: 'Accounts',
        requiresAuth: true
      },
      // FOR LAZY LOADING
      // component: load('views/Accounts'),
      component: function (resolve) {
        require(['components/views/Accounts.vue'], resolve)
      }
    },
    {
      path: '/affiliates',
      meta: {
        name: 'Affiliates',
        requiresAuth: true
      },
      // FOR LAZY LOADING
      // component: load('views/Affiliates'),
      component: function (resolve) {
        require(['components/views/Affiliates.vue'], resolve)
      }
    },
    {
      path: '/notifications',
      meta: {
        name: 'Notifications',
        requiresAuth: true
      },
      // FOR LAZY LOADING
      // component: load('views/Notifications'),
      component: function (resolve) {
        require(['components/views/Notifications.vue'], resolve)
      }
    },
    {
      path: '*',
      // FOR LAZY LOADING
      // component: load('Error404')
      component: function (resolve) {
        require(['components/Error404.vue'], resolve)
      }
    }
  ]
})
