<template>
    <page-content :centerAligned="false">
        <div class="sm-width-4of5 md-width-4of5 gt-md-width-4of5">
            <card-panel sectionHeader="Accounts">
                Here What's App Doc accounts are managed. It involves creation of doctor accounts, accounts details modification and resetting of password.
                <br>
                <br> Assistant accounts are created by the doctor using What's App Doc.
                </span>
            </card-panel>
    
            <card-panel sectionHeader="Create Account">
                Email provided is the username of the account. Passwords are pregenerated and sent to the email you have provided.
                <br>
                <br>
                <div class="button-container button-centered">
                    <button class="primary round" @click.prevent="openCreateAccountModal()">
                        Create Account
                    </button>
                </div>
            </card-panel>
    
            <card-panel sectionHeader="Accounts List">
                <q-data-table :data="accounts" :config="config" :columns="columns" @refresh="refresh">
                    <template slot="selection" scope="selection">
                        <button class="primary clear" @click.prevent="editAccount(selection)">
                            <i>edit</i>
                        </button>
                        <button class="primary clear" @click.prevent="resetPassword(selection)">
                            <i>redo</i>
                        </button>
                    </template>
                </q-data-table>
            </card-panel>
        </div>
    
        <modal-component ref="createAccountModal" modalHeader="Create Account" :closeOnEscape="true" :closeOnOutsideClick="true" :showCloseButton="true" @onSubmit="createAccount()" :disableButtons="isProcessing" :showSpinner="isProcessing">
            <form>
                <div class="stacked-label">
                    <input type="email" required class="full-width" :disabled="isProcessing" v-model="newAccount.username">
                    <label class="input-label-error">Username</label>
                    <p class="error-msg" v-if="$v.newAccount.username.$error && !$v.newAccount.username.required">Username is required!</p>
                    <p class="error-msg" v-if="$v.newAccount.username.$error && !$v.newAccount.username.email">Invalid email format!</p>
                </div>
                <div class="stacked-label">
                    <input type="number" required class="full-width" :disabled="isProcessing" v-model="newAccount.noOfClinics">
                    <label>Number Of Clinics</label>
                    <p class="error-msg" v-if="$v.newAccount.noOfClinics.$error && !$v.newAccount.noOfClinics.required">Number Of Clinics is required!</p>
                </div>
            </form>
        </modal-component>
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
import { required, email } from 'vuelidate/lib/validators'
import { Toast } from 'quasar'

import cardPanel from '../components/CardPanel.vue'
import modalComponent from '../components/Modal.vue'
import pageContent from '../components/PageContent.vue'

import CONFIG from '../../config/config'
import CONSTANTS from '../../config/constants'
import HTTP from '../../utils/http'

export default {
    components: {
        cardPanel,
        modalComponent,
        pageContent
    },
    data() {
        return {
            accounts: [
                { id: 0, username: 'test', password: 'test1234', role: 1, status: 1 },
            ],
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
                    noData: '<i>warning</i> No accounts available to show.',
                    noDataAfterFiltering: '<i>warning</i> No accounts found.'
                },
            },
            columns: [
                {
                    label: 'Username',
                    field: 'username',
                    filter: true,
                    sort: true,
                    sort: 'string'
                },
                {
                    label: 'Role',
                    field: 'role',
                    format(value, row) {
                        return CONSTANTS.LOVS.role[value - 1]
                    }
                },
                {
                    label: 'Status',
                    field: 'status',
                    format(value, row) {
                        return CONSTANTS.LOVS.status[value - 1]
                    }
                }
            ],
            isProcessing: false,
            newAccount: {
                username: '',
                role: 2,
                noOfClinics: null
            }
        }
    },
    validations: {
        newAccount: {
            username: { required, email },
            noOfClinics: { required }
        }
    },
    methods: {
        createAccount() {
            this.$v.newAccount.$touch();
            if (!this.$v.newAccount.$error) {
                this.isProcessing = true
                HTTP.post(CONFIG.API.users, this.newAccount).then(response => {
                    this.isProcessing = false
                    if (response) {
                        this.$refs.createAccountModal.close()
                        Toast.create.positive({
                            html: `Account has been successfully created. Pre-generated password has been sent.`
                        })
                    }
                }).catch(e => {
                    this.isProcessing = false
                })
            }
        },
        clearNewAccountObject() {
            this.newAccount = {
                username: '',
                role: 2,
                noOfClinics: null
            }
            this.$v.newAccount.$reset()
        },
        openCreateAccountModal() {
            this.clearNewAccountObject()
            this.$refs.createAccountModal.open()
        },
        editAccount(account) {
            console.log('edit => ' + JSON.stringify(account));
        },
        resetPassword(account) {
            console.log('edit => ' + JSON.stringify(account));
        },
        refresh(done) {
            console.log('refresh table')
            done()
        }
    }
}
</script>
