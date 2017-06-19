<template>
    <q-drawer ref="mainNavRef" v-show="getIsLoggedIn">
        <div class="list platform-delimiter">
            <div class="list-header">
                Left Side Drawer
            </div>
            <q-drawer-link icon="mail" to="/">test</q-drawer-link>
            <q-drawer-link icon="alarm" to="/dashboard">test 1</q-drawer-link>
        </div>
    </q-drawer>
</template>
<script type="text/javascript">
    import { mapGetters } from 'vuex'
    export default {
        name: 'mainNav',
        data() {
            return {

            }
        },
        computed: {
      ...mapGetters(['getIsLoggedIn'])
        }
    }
</script>
<style scoped>
 
</style>