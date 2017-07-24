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
    
            <card-panel sectionHeader="Affiliates List" :showSpinner="!isAffiliateListLoaded">
                <q-data-table :data="affiliates" :config="config" :columns="columns" @refresh="refresh" v-if="isAffiliateListLoaded">
                    <template slot="selection" scope="selection">
                        <button class="primary clear" @click.prevent="openEditAffiliateModal(selection)">
                            <i>edit</i>
                        </button>
                    </template>
                </q-data-table>
            </card-panel>
    
            <modal-component ref="createAffiliateModal" modalHeader="Create Affiliate" :closeOnEscape="true" :closeOnOutsideClick="true" :showCloseButton="true" @onSubmit="createAffiliate()" :disableButtons="isProcessing" :showButtonSpinner="isProcessing">
                <form>
                    <div class="stacked-label">
                        <input class="full-width" :disabled="isProcessing" v-model.trim="newAffiliate.affiliateName">
                        <label class="input-label-error">Affiliate Name</label>
                        <p class="error-msg" v-if="$v.newAffiliate.affiliateName.$error && !$v.newAffiliate.affiliateName.required">Affiliate Name is required!</p>
                    </div>
                    <div class="stacked-label">
                        <input class="full-width" :disabled="isProcessing" v-model.trim="newAffiliate.affiliateCode">
                        <label>Affiliate Code</label>
                        <p class="error-msg" v-if="$v.newAffiliate.affiliateCode.$error && !$v.newAffiliate.affiliateCode.required">Affiliate Code is required!</p>
                    </div>
                </form>
            </modal-component>
    
            <modal-component ref="editAffiliateModal" modalHeader="Edit Affiliate" :closeOnEscape="true" :closeOnOutsideClick="true" :showCloseButton="true" @onSubmit="editAffiliate()" :disableButtons="isProcessing" :showButtonSpinner="isProcessing">
                <form>
                    <div class="stacked-label">
                        <input class="full-width" :disabled="isProcessing" v-model.trim="affiliate.affiliateName">
                        <label class="input-label-error">Affiliate Name</label>
                        <p class="error-msg" v-if="$v.affiliate.affiliateName.$error && !$v.affiliate.affiliateName.required">Affiliate Name is required!</p>
                    </div>
                    <div class="stacked-label">
                        <input class="full-width" :disabled="isProcessing" v-model.trim="affiliate.affiliateCode">
                        <label>Affiliate Code</label>
                        <p class="error-msg" v-if="$v.affiliate.affiliateCode.$error && !$v.affiliate.affiliateCode.required">Affiliate Code is required!</p>
                    </div>
                </form>
            </modal-component>
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
    },
    created() {
        if (this.getIsAffiliatesLoaded) {
            this.affiliates = this.getAffiliates;
            this.isAffiliateListLoaded = true;
        } else {
            HTTP.get(CONFIG.API.affiliates, []).then(response => {
                if (response) {
                    this.setAffiliates(response.result)
                }
                this.isAffiliateListLoaded = true
            }).catch(error => {
                this.affiliates = []
                this.isAffiliateListLoaded = true
            })
        }
    },
    data() {
        return {
            config: {
                rowHeight: '50px',
                refresh: true,
                leftStickyColumns: 1,
                bodyStyle: {
                    height: '30vh'
                },
                responsive: true,
                pagination: {
                    rowsPerPage: 5,
                    options: [5, 10]
                },
                selection: 'single',
                messages: {
                    noData: '<i>warning</i> No affiliates available to show.',
                    noDataAfterFiltering: '<i>warning</i> No affiliate(s) found.'
                },
            },
            columns: [
                {
                    label: 'Affiliate Name',
                    field: 'affiliateName',
                    filter: true,
                    sort: true,
                    sort: 'string'
                },
                {
                    label: 'Affiliate Code',
                    field: 'affiliateCode'
                }
            ],
            isProcessing: false,
            newAffiliate: {
                id: null,
                affiliateCode: '',
                affiliateName: ''
            },
            selectedAffiliate: null,
            affiliate: {
                id: null,
                affiliateCode: '',
                affiliateName: ''
            },
            affiliates: [],
            isAffiliateListLoaded: false
        }
    },
    validations: {
        newAffiliate: {
            affiliateCode: { required },
            affiliateName: { required }
        },
        affiliate: {
            affiliateCode: { required },
            affiliateName: { required }
        }
    },
    computed: {
        ...mapGetters(['getIsAffiliatesLoaded', 'getAffiliates'])
    },
    methods: {
        createAffiliate() {
            this.$v.newAffiliate.$touch();
            if (!this.$v.newAffiliate.$error) {
                this.isProcessing = true
                HTTP.post(CONFIG.API.affiliates, this.newAffiliate).then(response => {
                    if (response) {
                        this.$refs.createAffiliateModal.close()
                        Toast.create.positive({
                            html: `Affiliate has been successfully created.`
                        })
                        this.newAffiliate.id = response.result
                        this.affiliates.push(this.newAffiliate)
                        this.setAffiliates(this.affiliates)
                    }
                    this.isProcessing = false
                }).catch(error => {
                    this.isProcessing = false
                })
            }
        },
        clearNewAffiliateObject() {
            this.newAffiliate = {
                id: null,
                affiliateCode: '',
                affiliateName: ''
            }
            this.$v.newAffiliate.$reset()
        },
        clearNewAffiliateObject() {
            this.newAffiliate = {
                id: null,
                affiliateCode: '',
                affiliateName: ''
            }
            this.$v.newAffiliate.$reset()
        },
        clearSelectedAffiliateObject() {
            this.selectedAffiliate = null
            this.affiliate = {
                id: null,
                affiliateCode: '',
                affiliateName: ''
            }
            this.$v.affiliate.$reset()
        },
        openCreateAffiliateModal() {
            this.clearNewAffiliateObject()
            this.$refs.createAffiliateModal.open()
        },
        openEditAffiliateModal(affiliate) {
            this.clearSelectedAffiliateObject()
            this.getSelectedAffiliateInfo(affiliate)
            this.$refs.editAffiliateModal.open()
        },
        editAffiliate() {
            this.$v.affiliate.$touch();
            if (!this.$v.affiliate.$error) {
                this.isProcessing = true
                this.isAffiliateListLoaded = false
                HTTP.put(CONFIG.API.affiliates, this.affiliate).then(response => {
                    if (response) {
                        this.$refs.editAffiliateModal.close()
                        this.affiliates[this.selectedAffiliate.index] = this.affiliate
                        this.setAffiliates(this.affiliates)
                        Toast.create.positive({
                            html: `Affiliate has been successfully upated.`
                        })
                    }
                    this.isProcessing = false
                    this.isAffiliateListLoaded = true
                }).catch(error => {
                    this.isProcessing = false
                    this.isAffiliateListLoaded = true
                })
            }
        },
        refresh(done) {
            HTTP.get(CONFIG.API.affiliates, []).then(response => {
                if (response) {
                    this.setAffiliates(response.result)
                }
                done()
            }).catch(error => {
                this.affiliates = []
                done()
            })
        },
        setAffiliates(affiliates) {
            this.affiliates = affiliates ? affiliates : []
            this.$store.dispatch('setAffiliates', this.affiliates)
            this.$store.dispatch('affiliatesLoaded', true)
        },
        getSelectedAffiliateInfo(affiliate) {
            this.selectedAffiliate = affiliate.rows[0]
            Object.assign(this.affiliate, this.selectedAffiliate.data)
        }
    }
}
</script>