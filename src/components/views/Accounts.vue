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
                ON GOING DEVELOPMENT
                <!--<q-data-table :data="accounts" :config="config" :columns="columns" @refresh="refresh">
                    <template slot="selection" scope="selection">
                        <button class="primary clear" @click.prevent="editAccount(selection)">
                            <i>edit</i>
                        </button>
                    </template>
                </q-data-table>-->
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
                { id: 0, username: 'doc0', password: 'doc0', role: 1, status: 0 },
                { id: 1, username: 'doc1', password: 'doc1', role: 2, status: 1 },
                { id: 2, username: 'doc2', password: 'doc2', role: 3, status: 2 },
                { id: 3, username: 'doc3', password: 'doc3', role: 4, status: 3 },
                { id: 4, username: 'doc4', password: 'doc4', role: 5, status: 4 },
                { id: 5, username: 'doc5', password: 'doc5', role: 1, status: 0 },
                { id: 6, username: 'doc6', password: 'doc6', role: 2, status: 1 },
                { id: 7, username: 'doc7', password: 'doc7', role: 3, status: 2 },
                { id: 8, username: 'doc8', password: 'doc8', role: 4, status: 3 },
                { id: 9, username: 'doc9', password: 'doc9', role: 5, status: 4 }
            ],
            config: {
                rowHeight: '50px',
                refresh: true,
                leftStickyColumns: 1,
                bodyStyle: {
                    minHeight: '30vh',
                    maxHeight: '30vh'
                },
                responsive: true,
                pagination: {
                    rowsPerPage: 5,
                    options: [5, 10]
                },
                selection: 'single'
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
                    field: 'role'
                },
                {
                    label: 'Status',
                    field: 'status'
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
        refresh(done) {
            console.log('refresh table')
            done()
        }
    }
}
</script>
