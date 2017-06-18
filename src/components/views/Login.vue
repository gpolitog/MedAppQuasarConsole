<template>
  <!-- root node required -->
  <div class="login">
    <div class="row card-container justify-center items-center">
      <div class="sm-width-4of5 md-width-3of5 gt-md-width-2of5">
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
    </div>
  </div>
</template>

<style>
.login {
  height: 100%;
}

.card-container {
  height: 100%;
}

.button-container {
  margin: 10px 0;
  text-align: center; 
}
</style>

<script>
  export default {
    data () {
      return {
        loginForm: {
          username: '',
          password: ''
        }
      }
    },
    methods: {
      login () {
        console.log('loginForm values: ' + JSON.stringify(this.loginForm))
      }
    }
  }
</script>
