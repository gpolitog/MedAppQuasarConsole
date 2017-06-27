<template>
    <page-content>
        <page-card-panel>
            <div slot="left-header">
                <i>group</i> Accounts
            </div>
            <div slot="right-header">
                <button class="primary clear" v-on:click.prevent="createAccount()">
                    <i>add_circle_outline</i>
                </button>
            </div>
    
            <div slot="body">
                <div class="row">
                    <div class="sm-width-5of5 md-width-1of3 gt-md-width-1of3">
                        <q-search :debounce="1000" v-model="username" placeholder="Username" @input="search()"></q-search>
                    </div>
                </div>
    
                <div class="row account-list">
                    <div class="sm-width-5of5 md-width-1of3 gt-md-width-1of3">
                        accounts table here
                    </div>
                </div>
            </div>
        </page-card-panel>
    </page-content>
</template>

<style scoped>
.account-list {
    margin-top: 20px;
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
            username: ''
        }
    },
    methods: {
        createAccount() {
            console.log('create account');
        },
        search() {
            console.log('searched => ' + this.username);
        }
    }
}
</script>

