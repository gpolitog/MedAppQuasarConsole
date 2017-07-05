<template>
  <page-content :centerAligned="true">
    <div class="sm-width-4of5 md-width-2of5 gt-md-width-1of3">
      <card-panel cardTitle="Login">
        <form novalidate>
          <div class="floating-label">
            <input required class="full-width" v-model="loginForm.username" @input="$v.loginForm.username.$touch()">
            <label class="error">Username</label>
            <span class="error-msg" v-if="$v.loginForm.username.$error && !$v.loginForm.username.required">Username is required!</span>
          </div>
          <div class="floating-label">
            <input required class="full-width" v-model="loginForm.password">
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
import { required, minLength } from 'vuelidate/lib/validators'

import cardPanel from '../components/CardPanel.vue'
import pageContent from '../components/PageContent.vue'

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
    ...mapMutations(['setIsLoggedIn']),
    login() {
      this.$v.$touch();
      if (!this.$v.loginForm.$error) {
        console.log('loginForm values: ' + JSON.stringify(this.loginForm))
        this.setIsLoggedIn(true)
        this.$router.push('/dashboard')
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