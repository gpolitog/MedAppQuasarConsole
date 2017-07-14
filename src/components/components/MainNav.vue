<template>
    <q-drawer ref="mainNavRef" v-show="getIsLoggedIn">
        <div>
            <q-drawer-link icon="home" to="/dashboard">Home</q-drawer-link>
        </div>
        <div class="list platform-delimiter">
            <q-drawer-link icon="group" to="/accounts">Manage Accounts</q-drawer-link>
            <q-drawer-link icon="location_city" to="/affiliates">Manage Affiliates</q-drawer-link>
        </div>
        <div @click.capture="logout()">
            <q-drawer-link icon="power_settings_new" to="/">Log Out</q-drawer-link>
        </div>
    </q-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import STORAGE from '../../utils/storage'

export default {
    name: 'mainNav',
    computed: {
        ...mapGetters(['getIsLoggedIn'])
    },
    methods: {
        logout() {
            this.$store.dispatch('loggedIn', false)
            STORAGE.clear()
        }
    }
}
</script>
