<template>
    <q-drawer ref="settingsNavRef" v-show="getIsLoggedIn" right-side swipe-only>
        <div class="toolbar">
            <q-toolbar-title>
                Settings
            </q-toolbar-title>
        </div>
    
        <div class="list platform-delimiter">
            <q-drawer-link icon="lock" to="/changePassword">Change Password</q-drawer-link>
        </div>
    </q-drawer>
</template>

<script>
import { mapGetters } from 'vuex'
import STORAGE from '../../utils/storage'

export default {
    name: 'settingsNav',
    computed: {
        ...mapGetters(['getIsLoggedIn'])
    }
}
</script>
