<template>
  <page-content :centerAligned="true">
    <div class="sm-width-4of5 md-width-2of5 gt-md-width-1of3">
      <card-panel cardTitle="Login">
        <form novalidate>
          <div class="floating-label">
            <input class="full-width" required v-model="loginForm.username" @input="$v.loginForm.username.$touch()">
            <label class="error">Username</label>
            <span class="error-msg" v-if="$v.loginForm.username.$error && !$v.loginForm.username.required">Username is required!</span>
          </div>
          <div class="floating-label">
            <input type="password" class="full-width" required v-model="loginForm.password">
            <label>Password</label>
            <span class="error-msg" v-if="$v.loginForm.password.$error && !$v.loginForm.password.required">Password is required!</span>
          </div>
          <div class="button-container centered">
            <button class="primary round" @click.prevent="login()">
              Login
            </button>
          </div>
        </form>
      </card-panel>
  
    </div>
  </page-content>
</template>

<script>
import { mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import { Loading } from 'quasar'

import cardPanel from '../components/CardPanel.vue'
import pageContent from '../components/PageContent.vue'

import { HttpService } from '../../config/http'

import { CONFIG } from '../../config/config'

export default {
  components: {
    cardPanel,
    pageContent
  },
  data: () => {
    return {
      http: new HttpService(),
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapMutations(['setIsLoggedIn']),
    login() {
      this.$v.$touch();
      if (!this.$v.loginForm.$error) {
        Loading.show()
        this.http.post(CONFIG.API.authenticate, this.loginForm).then(response => {
          if (response) {
            this.setIsLoggedIn(true)
            this.$router.push('/dashboard')
          }
          Loading.hide()
        })
      }
    }
  },
  validations: {
    loginForm: {
      username: { required },
      password: { required }
    }
  }
}
</script>