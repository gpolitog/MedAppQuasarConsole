<template>
    <q-drawer ref="mainNavRef" v-show="getIsLoggedIn">
        <div>
            <q-drawer-link icon="home" to="/dashboard">Home</q-drawer-link>
        </div>
        <div class="list platform-delimiter">
            <q-drawer-link icon="group" to="/accounts">Manage Accounts</q-drawer-link>
            <q-drawer-link icon="location_city" to="/affiliates">Manage Affiliates</q-drawer-link>
            <q-drawer-link icon="system_update" to="/notifications">Notifications</q-drawer-link>
        </div>
        <div>
            <q-drawer-link icon="power_settings_new" to="/logout">Log Out</q-drawer-link>
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
    }
}
</script>
