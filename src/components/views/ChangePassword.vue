<template>
    <page-content :centerAligned="false">
        <div class="sm-width-4of5 md-width-4of5 gt-md-width-4of5">
            <card-panel sectionHeader="Change Password">
                ON GOING DEVELOPMENT
            </card-panel>
        </div>
    </page-content>
</template>

<style scoped lang="stylus">
@import '~src/themes/app.variables.styl';

@media (max-width: $max-width-sm) {
    .button-centered {
        text-align: center;
    }
}
</style>

<script>
import { required } from 'vuelidate/lib/validators'
import { Toast } from 'quasar'
import { mapGetters } from 'vuex'

import cardPanel from '../components/CardPanel.vue'
import modalComponent from '../components/Modal.vue'
import pageContent from '../components/PageContent.vue'

import CONFIG from '../../config/config'
import HTTP from '../../utils/http'

export default {
    components: {
        cardPanel,
        modalComponent,
        pageContent
    }
}
</script>