<template>
    <page-content :centerAligned="true">
        <div class="sm-width-4of5 md-width-2of5 gt-md-width-2of5">
            <card-panel sectionHeader="Change Password">
                <form>
                    <div class="stacked-label">
                        <input type="password" class="full-width" :disabled="isProcessing" v-model.trim="changePassword.oldPassword">
                        <label>Old Password</label>
                        <p class="error-msg" v-if="$v.changePassword.oldPassword.$error && !$v.changePassword.oldPassword.required">Old Password is required!</p>
                        <p class="error-msg" v-if="$v.changePassword.oldPassword.$error && !$v.changePassword.oldPassword.minLength">Old Password must be at least 5 characters long!</p>
                    </div>
                    <div class="stacked-label">
                        <input type="password" class="full-width" :disabled="isProcessing" v-model.trim="changePassword.newPassword">
                        <label>New Password</label>
                        <p class="error-msg" v-if="$v.changePassword.newPassword.$error && !$v.changePassword.newPassword.required">New Password is required!</p>
                        <p class="error-msg" v-if="$v.changePassword.newPassword.$error && !$v.changePassword.newPassword.minLength">New Password must be at least 5 characters long!</p>
                        <p class="error-msg" v-if="$v.changePassword.newPassword.$error && $v.changePassword.newPassword.required && $v.changePassword.newPassword.minLength && !$v.changePassword.newPassword.sameAs">Passwords do not match!</p>
                    </div>
                    <div class="stacked-label">
                        <input type="password" class="full-width" :disabled="isProcessing" v-model.trim="changePassword.confirmPassword">
                        <label>Confirm Password</label>
                        <p class="error-msg" v-if="$v.changePassword.confirmPassword.$error && !$v.changePassword.confirmPassword.required">Confirm Password is required!</p>
                        <p class="error-msg" v-if="$v.changePassword.confirmPassword.$error && $v.changePassword.confirmPassword.required && !$v.changePassword.confirmPassword.sameAs">Passwords do not match!</p>
                    </div>
                    <div class="button-container centered">
                        <button class="primary round" :disabled="isProcessing" @click.prevent="change()">
                            Change Password
                            <spinner class="button-spinner" color="white" :size="20" v-if="isProcessing"></spinner>
                        </button>
                    </div>
                </form>
            </card-panel>
        </div>
    </page-content>
</template>

<script>
import { minLength, required, sameAs } from 'vuelidate/lib/validators'
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
            },
            isProcessing: false
        }
    },
    validations: {
        changePassword: {
            oldPassword: { required, minLength: minLength(5) },
            newPassword: { required, minLength: minLength(5), sameAsPassword: sameAs('confirmPassword') },
            confirmPassword: { required, sameAsPassword: sameAs('newPassword') }
        }
    },
    methods: {
        change() {
            this.$v.changePassword.$touch()

            if (!this.$v.changePassword.$error) {
                this.isProcessing = true
                const payload = {
                    username: 'admin',
                    oldPassword: this.changePassword.oldPassword,
                    newPassword: this.changePassword.newPassword
                }

                HTTP.post(CONFIG.API.changePassword, payload).then(response => {
                    if (response) {
                        this.changePassword = {
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                        }
                        this.$v.changePassword.$reset()
                        Toast.create.positive({
                            html: `Password has been successfully upated.`
                        })
                    }
                    this.isProcessing = false
                }).catch(error => {
                    this.isProcessing = false
                })
            }
        }
    }
}
</script>