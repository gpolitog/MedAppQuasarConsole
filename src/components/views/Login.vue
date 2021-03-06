<template>
  <page-content :centerAligned="true">
    <div class="sm-width-4of5 md-width-2of5 gt-md-width-1of3">
      <card-panel>
        <div class="header-logo">
          <img src="../../assets/icon.png" />
        </div>
        <div class="header">
          Sign in to Admin Console
        </div>
        <form novalidate>
          <div class="stacked-label">
            <input class="full-width" :disabled="isProcessing" v-model.trim="loginForm.username">
            <label>Username</label>
            <span class="error-msg" v-if="$v.loginForm.username.$error && !$v.loginForm.username.required">Username is required!</span>
          </div>
          <div class="stacked-label">
            <input type="password" class="full-width" :disabled="isProcessing" v-model.trim="loginForm.password">
            <label>Password</label>
            <span class="error-msg" v-if="$v.loginForm.password.$error && !$v.loginForm.password.required">Password is required!</span>
          </div>
          <div class="button-container centered">
            <button class="primary round" :disabled="isProcessing" @click.prevent="login()">
              Login
              <spinner class="button-spinner" color="white" :size="20" v-if="isProcessing"></spinner>
            </button>
          </div>
        </form>
      </card-panel>

    </div>
  </page-content>
</template>

<style scope>
form {
  margin-top: 10px;
}

.header {
  margin-top: 20px;
  text-align: center;
}

.header-logo {
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
</style>

<script>
import { required } from 'vuelidate/lib/validators'
import { Dialog } from 'quasar'
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
  created() {
    this.$store.dispatch('loggedIn', false)
  },
  data: () => {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      isProcessing: false
    }
  },
  methods: {
    login() {
      this.$v.loginForm.$touch();
      if (!this.$v.loginForm.$error) {
        this.isProcessing = true
        HTTP.post(CONFIG.API.authenticate, this.loginForm).then(response => {
          if (response) {
            const result = response.result;
            if (result && result.principal && result.principal.role === 0) {
              STORAGE.put(CONFIG.STORAGE.token, response.result.token)
              this.$store.dispatch('loggedIn', true)
              this.$router.push('/dashboard')
            }
            else {
              Dialog.create({
                message: 'Username not Found!',
                buttons: [
                  'OK'
                ],
                noBackdropDismiss: true,
                noEscDismiss: true
              })
            }
          }
          this.isProcessing = false
        }).catch(error => {
          this.isProcessing = false
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
