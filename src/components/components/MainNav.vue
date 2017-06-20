<template>
    <q-drawer ref="mainNavRef" v-show="getIsLoggedIn">
        <div class="list platform-delimiter">
            <q-drawer-link icon="home" to="/dashboard">Home</q-drawer-link>
        </div>
        <div class="list platform-delimiter">
            TODO LINKS HERE
        </div>
        <div @click.capture="logout()">
            <q-drawer-link icon="power_settings_new" to="/">Log Out</q-drawer-link>
        </div>
    </q-drawer>
</template>

<script type="text/javascript">
import { mapGetters, mapMutations } from 'vuex'
export default {
    name: 'mainNav',
    data() {
        return {

        }
    },
    methods: {
        ...mapMutations(['setIsLoggedIn']),
        logout() {
            console.log('logout')
            this.setIsLoggedIn(false)
        }
    },
    computed: {
        ...mapGetters(['getIsLoggedIn'])
    }
}
</script>