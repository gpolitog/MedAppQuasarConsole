<template>
  <div id="q-app">
    <q-layout>
      <main-header slot="header"></main-header>
      <main-nav></main-nav>
      <settings-nav></settings-nav>
      <div class="layout-view">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </q-layout>
  </div>
</template>

<style lang="stylus">
@import '~src/themes/app.variables.styl';
@import '~src/themes/app.styl';

body {
  background-color: $page-content-bg-color;
  height: 100vh;
  position: relative !important;
  margin: 0;
}

.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.fade-enter-active {
  transition-delay: 0s;
}

.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>

<script>
import mainHeader from './components/components/MainHeader.vue'
import mainNav from './components/components/MainNav.vue'
import settingsNav from './components/components/SettingsNav.vue'

import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters(['getLayoutNeeded'])
  },
  components: {
    mainHeader,
    mainNav,
    settingsNav
  }
}
</script>
