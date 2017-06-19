<template>
    <div class="toolbar" v-show="getIsLoggedIn">
        <q-ajax-bar color="#80cbc4"></q-ajax-bar>
        <router-link :to="'/'" v-if="$router.currentRoute.meta.backButton">
            <button>
        <i>arrow_back</i>
      </button>
        </router-link>
        <button class="hide-on-drawer-visible" @click="mainNav.open()" v-else>
      <i>menu</i>
    </button>
        <q-toolbar-title :padding="1">
            What's App Doc Admin Console
        </q-toolbar-title>
    </div>
</template>
<script type="text/javascript">
    import { mapGetters } from 'vuex'
    export default {
        name: 'mainHeader',
        data() {
            return {

            }
        },
        computed: {
      ...mapGetters(['getIsLoggedIn']),
      mainNav () {
        return this.$parent.$children[1].$refs.mainNavRef
      }
        }
    }
</script>
<style scoped>
 
</style>