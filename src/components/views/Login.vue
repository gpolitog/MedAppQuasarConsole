<template>
  <page-content>
    <div class="sm-width-4of5 md-width-2of5 gt-md-width-1of3">
      <div class="card">
        <div class="card-title bg-primary text-white">
          Login
        </div>
        <div class="card-content bg-light card-force-top-padding">
          <form>
            <div class="floating-label">
              <input required class="full-width" v-model="loginForm.username">
              <label>Username</label>
            </div>
            <div class="floating-label">
              <input required class="full-width" v-model="loginForm.password">
              <label>Password</label>
            </div>
            <div class="button-container">
              <button class="primary round" v-on:click.prevent="login()">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </page-content>
</template>

<style scoped>
.button-container {
  margin: 10px 0;
  text-align: center;
}
</style>

<script>
import { mapMutations } from 'vuex'
import pageContent from '../components/PageContent.vue'
export default {
  data() {
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
      console.log('loginForm values: ' + JSON.stringify(this.loginForm))
      this.setIsLoggedIn(true)
      this.$router.push('/dashboard')
    }
  },
  components: {
    pageContent
  }
}
</script>