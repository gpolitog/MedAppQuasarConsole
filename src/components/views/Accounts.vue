<template>
    <page-content>
        <page-card-panel>
            <div slot="left-header">
                <i>group</i> Accounts
            </div>
            <div slot="right-header">
                <button class="primary clear" @click.prevent="createAccount()">
                    <i>add_circle_outline</i>
                </button>
            </div>
    
            <div slot="body">
                <q-data-table :data="accounts" :config="config" :columns="columns" @refresh="refresh">
                    <template slot="selection" scope="selection">
                        <button class="primary clear" @click.prevent="editAccount(selection)">
                            <i>edit</i>
                        </button>
                    </template>
                </q-data-table>
            </div>
        </page-card-panel>
    </page-content>
</template>

<style scoped>
.account-list {
    margin-top: 20px;
    height: 500px;
    overflow-y: scroll;
}
</style>

<script>
import pageCardPanel from '../components/PageCardPanel.vue'
import pageContent from '../components/PageContent.vue'

export default {
    components: {
        pageCardPanel,
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
            ]
        }
    },
    methods: {
        createAccount() {
            console.log('create account')
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