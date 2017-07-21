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
                        <button class="primary clear" @click.prevent="editAffiliate(selection)">
                            <i>edit</i>
                        </button>
                    </template>
                </q-data-table>
            </card-panel>
    
            <modal-component ref="createAffiliateModal" modalHeader="Create Affiliate" :closeOnEscape="true" :closeOnOutsideClick="true" :showCloseButton="true" @onSubmit="createAffiliate()" :disableButtons="isProcessing" :showSpinner="isProcessing">
                <form>
                    <div class="stacked-label">
                        <input class="full-width" :disabled="isProcessing" v-model="newAffiliate.affiliateName">
                        <label class="input-label-error">Affiliate Name</label>
                        <p class="error-msg" v-if="$v.newAffiliate.affiliateName.$error && !$v.newAffiliate.affiliateName.required">Affiliate Name is required!</p>
                    </div>
                    <div class="stacked-label">
                        <input class="full-width" :disabled="isProcessing" v-model="newAffiliate.affiliateCode">
                        <label>Affiliate Code</label>
                        <p class="error-msg" v-if="$v.newAffiliate.affiliateCode.$error && !$v.newAffiliate.affiliateCode.required">Affiliate Code is required!</p>
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

                    }
                    this.isProcessing = false
                }).catch(error => {
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
        },
        editAffiliate(affiliate) {
            console.log(JSON.stringify(affiliate))
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
        }
    }
}
</script>