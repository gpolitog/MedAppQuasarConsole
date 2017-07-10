<template>
  <page-content :centerAligned="true">
    <div class="sm-width-4of5 md-width-2of5 gt-md-width-1of3">
      <card-panel cardTitle="Login">
        <form novalidate>
          <div class="stacked-label">
            <input class="full-width" required v-model="loginForm.username" @input="$v.loginForm.username.$touch()">
            <label class="error">Username</label>
            <span class="error-msg" v-if="$v.loginForm.username.$error && !$v.loginForm.username.required">Username is required!</span>
          </div>
          <div class="stacked-label">
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

import CONFIG from '../../config/config'
import HTTP from '../../utils/http'
import STORAGE from '../../utils/storage'

export default {
  components: {
    cardPanel,
    pageContent
  },
  data: () => {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      this.$v.$touch();
      if (!this.$v.loginForm.$error) {
        Loading.show()
        HTTP.post(CONFIG.API.authenticate, this.loginForm).then(response => {
          if (response) {
            STORAGE.put(CONFIG.STORAGE.token, response.result.token)
            this.$store.dispatch('loggedIn', true)
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