<template>
  <div id="q-app" >
    <div v-if="getMobileMode">
      <div  id="android-preview" class="platform-android mat-only">
        <iframe id="android-iframe" frameborder="0" src="https://quasar-admin.firebaseapp.com/android/#/"></iframe>
      </div>
      <div  id="ios-preview" class="platform-ios ios-only">
        <iframe id="ios-iframe" frameborder="0" src="https://quasar-admin.firebaseapp.com/ios/#/"></iframe>
      </div>
    </div>
    <q-layout v-else>
      <!-- <toolbar slot="header"></toolbar>
      <drawer></drawer> -->
      <div class="layout-view">
        <!-- <content-header></content-header> -->
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </q-layout>
  </div>
</template>
<script type="text/javascript">
  // import toolbar from './components/layout/toolbar/toolbar.vue'
  // import drawer from './components/layout/drawer/drawer.vue'
  // import contentHeader from './components/layout/content-header.vue'
  import { mapGetters } from 'vuex'
  export default {
    name: 'app',
    // data () {
    //   return {
    //     backgroundColor: 'whitesmoke'
    //   }
    // },
    computed: {
      ...mapGetters(['getLayoutNeeded', 'getMobileMode'])
    }
    // components: {
    //   toolbar,
    //   drawer,
    //   contentHeader
    // }
  }
</script>

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
