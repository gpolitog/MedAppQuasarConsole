<template>
    <page-content :centerAligned="false">
        <div class="sm-width-4of5 md-width-4of5 gt-md-width-4of5">
            <card-panel sectionHeader="Affiliates">
                Here clinic's affiliations are managed. Affiliate is an arm of an organization or a subsidiary.
                <br>
                <br> Ownership of Patient records belongs to the owner of the clinic. If the clinic has an affiliation, then the records belongs to the affiliate.
                </span>
            </card-panel>
    
            <card-panel sectionHeader="Create Affiliate">
                Affiliates are requested to be created. Affiliate name and Affiliate code should be provided by the affiliate.
                <br>
                <br>
                <div class="button-container button-centered">
                    <button class="primary round" @click.prevent="openCreateAffiliateModal()">
                        Create Affiliate
                    </button>
                </div>
            </card-panel>
    
            <card-panel sectionHeader="Affilaites List">
                ON GOING DEVELOPMENT
            </card-panel>
    
            <modal-component ref="createAffiliateModal" modalHeader="Create Account" :closeOnEscape="true" :closeOnOutsideClick="true" :showCloseButton="true" @onSubmit="createAffiliate()" :disableButtons="isProcessing" :showSpinner="isProcessing">
                <form>
                    <div class="stacked-label">
                        <input required class="full-width" :disabled="isProcessing" v-model="newAffiliate.affiliateName">
                        <label class="input-label-error">Affiliate Name</label>
                        <p class="error-msg" v-if="$v.newAffiliate.affiliateName.$error && !$v.newAffiliate.affiliateName.required">Affiliate Name is required!</p>
                    </div>
                    <div class="stacked-label">
                        <input required class="full-width" :disabled="isProcessing" v-model="newAffiliate.affiliateCode">
                        <label>Affiliate Code</label>
                        <p class="error-msg" v-if="$v.newAffiliate.affiliateCode.$error && !$v.newAffiliate.affiliateCode.required">Affiliate Code is required!</p>
                    </div>
                </form>
            </modal-component>
        </div>
    </page-content>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import { Toast } from 'quasar'

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
            isProcessing: false,
            newAffiliate: {
                affiliateCode: '',
                affiliateName: ''
            }
        }
    },
    validations: {
        newAffiliate: {
            affiliateCode: { required },
            affiliateName: { required }
        }
    },
    methods: {
        createAffiliate() {
            this.$v.newAffiliate.$touch();
            if (!this.$v.newAffiliate.$error) {
                this.isProcessing = true
                HTTP.post(CONFIG.API.affiliates, this.newAffiliate).then(response => {
                    this.isProcessing = false
                    if (response) {
                        this.$refs.createAffiliateModal.close()
                        Toast.create.positive({
                            html: `Affiliate has been successfully created.`
                        })

                    }
                }).catch(e => {
                    this.isProcessing = false
                })
            }
        },
        clearNewAffiliateObject() {
            this.newAffiliate = {
                affiliateCode: '',
                affiliateName: ''
            }
            this.$v.newAffiliate.$reset()
        },
        openCreateAffiliateModal() {
            this.clearNewAffiliateObject()
            this.$refs.createAffiliateModal.open()
        }
    }
}
</script>