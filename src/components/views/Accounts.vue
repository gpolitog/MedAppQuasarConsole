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
    
            <card-panel sectionHeader="Accounts List" :showSpinner="!isAccountListLoaded">
                <q-data-table :data="accounts" :config="config" :columns="columns" @refresh="refresh" v-if="isAccountListLoaded">
                    <template slot="selection" scope="selection">
                        <button class="primary clear" @click.prevent="openEditAccountModal(selection)">
                            <i>edit</i>
                        </button>
                        <button class="primary clear" @click.prevent="openResetPasswordModal(selection)">
                            <i>redo</i>
                        </button>
                    </template>
                </q-data-table>
            </card-panel>
        </div>
    
        <modal-component ref="createAccountModal" modalHeader="Create Account" :closeOnEscape="true" :closeOnOutsideClick="true" :showCloseButton="true" @onSubmit="createAccount()" :disableButtons="isProcessing" :showSpinner="isProcessing">
            <form>
                <div class="stacked-label">
                    <input type="email" class="full-width" :disabled="isProcessing" v-model="newAccount.username">
                    <label class="input-label-error">Username</label>
                    <p class="error-msg" v-if="$v.newAccount.username.$error && !$v.newAccount.username.required">Username is required!</p>
                    <p class="error-msg" v-if="$v.newAccount.username.$error && !$v.newAccount.username.email">Invalid email format!</p>
                </div>
                <div class="stacked-label">
                    <input type="number" class="full-width" :disabled="isProcessing" v-model="newAccount.noOfClinics">
                    <label>Number Of Clinics</label>
                    <p class="error-msg" v-if="$v.newAccount.noOfClinics.$error && !$v.newAccount.noOfClinics.required">Number Of Clinics is required!</p>
                </div>
            </form>
        </modal-component>
    
        <modal-component ref="editAccountModal" modalHeader="Edit Account" :closeOnEscape="true" :closeOnOutsideClick="true" :showCloseButton="true" @onSubmit="editAccount()" :disableButtons="isProcessing" :showSpinner="isProcessing">
            <form>
                <div class="stacked-label">
                    <input type="email" class="full-width" :disabled="true" v-model="account.username">
                    <label class="input-label-error">Username</label>
                </div>
                <q-select type="radio" class="lovs full-width" :disable="true" v-model="account.role" label="Role" :options="role"></q-select>
                <q-select type="radio" class="lovs full-width" :disable="isProcessing" v-model="account.status" label="Status" :options="status"></q-select>
            </form>
        </modal-component>
    
        <modal-component ref="resetPasswordModal" modalHeader="Reset Password" :closeOnEscape="true" :closeOnOutsideClick="true" :showCloseButton="true" @onSubmit="resetPassword()" :disableButtons="isProcessing" :showSpinner="isProcessing">
            <p>Reset Password of {{ account.username }}?</p>
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

.test {
    display:inline-block;
}
</style>

<script>
import { required, email } from 'vuelidate/lib/validators'
import { Toast } from 'quasar'
import { mapGetters } from 'vuex'

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
    created() {
        if (this.getIsAccountsLoaded) {
            this.accounts = this.getAccounts;
            this.isAccountListLoaded = true;
        } else {
            HTTP.get(CONFIG.API.users, []).then(response => {
                if (response) {
                    this.setAccounts(response.result)
                }
                this.isAccountListLoaded = true
            }).catch(error => {
                this.accountList = []
                this.isAccountListLoaded = true
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
                    noData: '<i>warning</i> No accounts available to show.',
                    noDataAfterFiltering: '<i>warning</i> No account(s) found.'
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
                        return CONSTANTS.LOVS.role[value - 1].label
                    }
                },
                {
                    label: 'Status',
                    field: 'status',
                    format(value, row) {
                        return CONSTANTS.LOVS.status[value].label
                    }
                }
            ],
            isProcessing: false,
            newAccount: {
                username: '',
                role: 2,
                noOfClinics: null
            },
            selectedAccount: null,
            account: {
                userId: null,
                username: '',
                role: null,
                status: null
            },
            accounts: [],
            isAccountListLoaded: false,
            role: CONSTANTS.LOVS.role,
            status: CONSTANTS.LOVS.status
        }
    },
    validations: {
        newAccount: {
            username: { required, email },
            noOfClinics: { required }
        }
    },
    computed: {
        ...mapGetters(['getIsAccountsLoaded', 'getAccounts'])
    },
    methods: {
        createAccount() {
            this.$v.newAccount.$touch();
            if (!this.$v.newAccount.$error) {
                this.isProcessing = true
                HTTP.post(CONFIG.API.users, this.newAccount).then(response => {
                    if (response) {
                        this.$refs.createAccountModal.close()
                        this.accounts.push(response.result)
                        this.setAccounts(this.accounts)
                        Toast.create.positive({
                            html: `Account has been successfully created. Pre-generated password has been sent.`
                        })
                    }
                    this.isProcessing = false
                }).catch(error => {
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
        editAccount() {
            this.isProcessing = true
            this.isAccountListLoaded = false
            HTTP.put(CONFIG.API.users, this.account).then(response => {
                if (response) {
                    this.$refs.editAccountModal.close()
                    this.accounts[this.selectedAccount.index] = this.account
                    this.setAccounts(this.accounts)
                    Toast.create.positive({
                        html: `Account has been successfully upated.`
                    })
                }
                this.isProcessing = false
                this.isAccountListLoaded = true
            }).catch(error => {
                this.isProcessing = false
                this.isAccountListLoaded = true
            })
        },
        openEditAccountModal(account) {
            this.getSelectedAccountInfo(account)
            this.$refs.editAccountModal.open()
        },
        resetPassword() {
            this.isProcessing = true
            HTTP.put(CONFIG.API.resetPassword, this.account.username).then(response => {
                if (response) {
                    this.$refs.resetPasswordModal.close()
                    Toast.create.positive({
                        html: `Password has been successfully reset. Pre-generated password has been sent.`
                    })
                }
                this.isProcessing = false
            }).catch(error => {
                this.isProcessing = false
            })
        },
        openResetPasswordModal(account) {
            this.getSelectedAccountInfo(account)
            this.$refs.resetPasswordModal.open()
        },
        refresh(done) {
            HTTP.get(CONFIG.API.users, []).then(response => {
                if (response) {
                    this.setAccounts(response.result)
                }
                done()
                this.isAccountListLoaded = true
            }).catch(error => {
                this.accountList = []
                this.isAccountListLoaded = true
                done()
            })
        },
        setAccounts(accounts) {
            this.accounts = accounts ? accounts : []
            this.$store.dispatch('setAccounts', this.accounts)
            this.$store.dispatch('accountsLoaded', true)
        },
        getSelectedAccountInfo(account) {
            this.selectedAccount = account.rows[0]
            Object.assign(this.account, this.selectedAccount.data)
        }
    }
}
</script>
