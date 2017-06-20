<template>
  <div id="q-app">
    <q-layout>
      <main-header slot="header"></main-header>
      <main-nav></main-nav>
      <div class="layout-view">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </q-layout>
  </div>
</template>

<style>
body {
  background: url('./assets/console-bg.jpg');
  -moz-background-size: cover !important;
  -o-background-size: cover !important;
  -webkit-background-size: cover !important;
  background-attachment: fixed !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
  height: 100%;
  position: relative !important;
  margin: 0;
}
</style>

<script>
import mainHeader from './components/components/MainHeader.vue'
import mainNav from './components/components/MainNav.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  // data () {
  //   return {
  //     backgroundColor: 'whitesmoke'
  //   }
  // },
  computed: {
    ...mapGetters(['getLayoutNeeded'])
  },
  components: {
    mainHeader,
    mainNav
  }
}
</script>