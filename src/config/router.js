import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function view(name) {
  return function (resolve) {
    require(['components/views/' + name + '.vue'], resolve);
  }
};

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
      component: view('Login')
    },
    {
      path: '/dashboard',
      meta: {
        name: 'Dashboard',
        requiresAuth: true
      },
      component: view('Dashboard')
    },
    {
      path: '/accounts',
      meta: {
        name: 'Accounts',
        requiresAuth: true
      },
      component: view('Accounts')
    },
    {
      path: '/affiliates',
      meta: {
        name: 'Affiliates',
        requiresAuth: true
      },
      component: view('Affiliates')
    },
    {
      path: '/notifications',
      meta: {
        name: 'Notifications',
        requiresAuth: true
      },
      component: view('Notifications')
    },
    {
      path: '/changePassword',
      meta: {
        name: 'Change Password',
        requiresAuth: true
      },
      component: view('ChangePassword')
    },
    {
      path: '*',
      component: view('Error404')
    }
  ]
})
