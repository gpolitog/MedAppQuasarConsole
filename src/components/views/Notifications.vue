<template>
    <page-content :centerAligned="false">
        <div class="sm-width-4of5 md-width-4of5 gt-md-width-4of5">
            <card-panel sectionHeader="Notifications">
                Here the administrator can manually send notification by inputting the message and notification tags. Notification tags act as a filters. This determine who can receive the notification. If there are no tags provided, notifications are sent to all subscribers.
                <br>
                <br> Notification tags consist of the following: clinic id, affiliaton id, and user role.
            </card-panel>
    
            <card-panel sectionHeader="Push Notification" :showSpinner="!isAffiliateListLoaded">
                Toggle the notification tag to allow usage.
                <br>
                <br>
                <form>
                    <div class="stacked-label">
                        <textarea class="full-width" v-model.trim="msg" :disabled="isProcessing"></textarea>
                        <label>Message</label>
                        <span class="error-msg" v-if="$v.msg.$error && !$v.msg.required">Message is required!</span>
                    </div>
                    <table class="q-table full-width responsive highlight loose">
                        <thead>
                            <tr>
                                <th>Toogle</th>
                                <th>Notification Tag</th>
                                <th>Send To</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="tag in tags">
                                <td data-th="Use Tag">
                                    <q-toggle v-model="tag.used" :disable="tag.key === 'clinicId' || isProcessing" @input="toggleTag(tag)"></q-toggle>
                                </td>
                                <td data-th=">Notification Tag">
                                    {{ tag.key }}
                                </td>
                                <td data-th="Send To">
                                    <div v-if="tag.key === 'clinicId'">
                                        ON GOING DEVELOPMENT
                                    </div>
                                    <div v-if="tag.key === 'affilliationId'">
                                        <div class="full-width">
                                            <q-select type="radio" class="full-width" v-model="tag.value" label="Affiliate" :options="affiliates" :disable="!tag.used || isProcessing" @input="selectAffiliate(tag.value)"></q-select>
                                            <span class="error-msg" v-if="affiliateTagHasError">Affiliate is required!</span>
                                        </div>
                                    </div>
                                    <div v-if="tag.key === 'role'">
                                        <div class="full-width">
                                            <q-select type="radio" class="full-width" v-model="tag.value" label="Role" :options="role" :disable="!tag.used || isProcessing" @input="selectTag(tag.value)"></q-select>
                                            <span class="error-msg" v-if="roleTagHasError">Role is required!</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="button-container button-centered">
                        <button class="primary round" :disabled="isProcessing" @click.prevent="sendNotification()">
                            Send Notification
                            <spinner class="button-spinner" color="white" :size="20" v-if="isProcessing"></spinner>
                        </button>
                    </div>
                </form>
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

import cardPanel from '../components/CardPanel.vue'
import pageContent from '../components/PageContent.vue'

import CONFIG from '../../config/config'
import CONSTANTS from '../../config/constants'
import HTTP from '../../utils/http'

export default {
    components: {
        cardPanel,
        pageContent
    },
    created() {
        HTTP.get(CONFIG.API.affiliates, []).then(response => {
            if (response) {
                this.setAffiliates(response.result)
            }
            this.isAffiliateListLoaded = true
        }).catch(error => {
            this.affiliates = []
            this.isAffiliateListLoaded = true
        })
    },
    data() {
        return {
            msg: '',
            tags: [
                {
                    used: false,
                    field: 'tag',
                    key: 'clinicId',
                    relation: '=',
                    value: ''
                },
                {
                    used: false,
                    field: 'tag',
                    key: 'affilliationId',
                    relation: '=',
                    value: ''
                },
                {
                    used: false,
                    field: 'tag',
                    key: 'role',
                    relation: '=',
                    value: ''
                }
            ],
            role: CONSTANTS.LOVS.role,
            affiliates: [],
            isAffiliateListLoaded: false,
            isProcessing: false,
            clinicTagHasError: false,
            affiliateTagHasError: false,
            roleTagHasError: false,
            filters: []
        }
    },
    validations: {
        msg: { required },
    },
    methods: {
        setAffiliates(affiliates) {
            const tempAffiliates = affiliates ? affiliates : []
            tempAffiliates.forEach(affiliate => {
                this.affiliates.push({
                    label: affiliate.affiliateName,
                    value: affiliate.id
                })
            })
        },
        toggleTag(tag) {
            tag.value = tag.used ? tag.value : ''

            if (tag.key === 'clinicId') {
                this.clinicTagHasError = tag.used ? this.clinicTagHasError : false
            } else if (tag.key === 'affilliationId') {
                this.affiliateTagHasError = tag.used ? this.affiliateTagHasError : false
            } else if (tag.key === 'role') {
                this.roleTagHasError = tag.used ? this.roleTagHasError : false
            }
        },
        selectClinic(value) {
            this.clinicTagHasError = value ? false : true
        },
        selectAffiliate(value) {
            this.affiliateTagHasError = value ? false : true
        },
        selectTag(value) {
            this.roleTagHasError = value ? false : true
        },
        sendNotification() {
            this.$v.msg.$touch()
            if (this.isTagsValid() && !this.$v.msg.$error) {
                this.isProcessing = true
                const payload = {
                    contents: {
                        en: this.msg
                    },
                    filters: this.filters
                }

                HTTP.post(CONFIG.API.createNotification, payload).then(response => {
                    if (response) {
                        Toast.create.positive({
                            html: `Notification Sent.`
                        })
                    }
                    this.isProcessing = false
                }).catch(error => {
                    this.isProcessing = false
                })
            }
        },
        isTagsValid() {
            const usedTags = this.tags.filter(t => t.used);

            if (usedTags && usedTags.length > 0) {

                usedTags.forEach(ut => {
                    if (ut.key === 'clinicId') {
                        if (ut.used) {
                            this.clinicTagHasError = this.checkValue(ut.value)

                            if (!this.clinicTagHasError) {
                                this.addToFilters(ut)
                            }
                        } else {
                            this.clinicTagHasError = false
                        }
                    } else if (ut.key === 'affilliationId') {
                        if (ut.used) {
                            this.affiliateTagHasError = this.checkValue(ut.value)

                            if (!this.affiliateTagHasError) {
                                this.addToFilters(ut)
                            }
                        } else {
                            this.affiliateTagHasError = false
                        }
                    } else if (ut.key === 'role') {
                        if (ut.used) {
                            this.roleTagHasError = this.checkValue(ut.value)

                            if (!this.roleTagHasError) {
                                this.addToFilters(ut)
                            }
                        } else {
                            this.roleTagHasError = false
                        }
                    }
                })

                return !this.clinicTagHasError && !this.affiliateTagHasError && !this.roleTagHasError
            } else {
                return true
            }
        },
        checkValue(value) {
            return value && value !== '' ? false : true
        },
        addToFilters(tag) {
            this.filters.push({
                field: tag.field,
                key: tag.key,
                relation: tag.relation,
                value: String(tag.value)
            })
        }
    }
}
</script>
