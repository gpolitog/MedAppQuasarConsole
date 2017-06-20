<template>
    <div class="toolbar" v-show="getIsLoggedIn">
        <button class="hide-on-drawer-visible" @click="mainNav.open()">
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
        mainNav() {
            return this.$parent.$children[1].$refs.mainNavRef
        }
    }
}
</script>