<template>
    <page-content :centerAligned="true">
        <div class="sm-width-4of5 md-width-2of5 gt-md-width-2of5">
            <card-panel sectionHeader="Change Password">
                <form>
                    <div class="stacked-label">
                        <input type="email" class="full-width" :disabled="isProcessing" v-model.trim="changePassword.oldPassword">
                        <label>Old Password</label>
                    </div>
                    <div class="stacked-label">
                        <input type="number" class="full-width" :disabled="isProcessing" v-model.trim="changePassword.newPassword">
                        <label>New Password</label>
                    </div>
                    <div class="stacked-label">
                        <input type="number" class="full-width" :disabled="isProcessing" v-model.trim="changePassword.confirmPassword">
                        <label>Confirm Password</label>
                    </div>
                    <div class="button-container centered">
                        <button class="primary round" @click.prevent="openCreateAccountModal()">
                            Create Account
                        </button>
                    </div>
                </form>
            </card-panel>
        </div>
    </page-content>
</template>

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
    },
    data() {
        return {
            changePassword: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            }
        }
    }
}
</script>