<template>
    <page-content>
        <page-card-panel>
            <div slot="left-header">
                <i>group</i> Affiliates
            </div>
            <div slot="right-header">
                <button class="primary clear" @click.prevent="createAffiliate()">
                    <i>add_circle_outline</i>
                </button>
            </div>
    
            <div slot="body">
                <q-data-table :data="affiliates" :config="config" :columns="columns" @refresh="refresh">
                    <template slot="selection" scope="selection">
                        <button class="primary clear" @click.prevent="editAffiliate(selection)">
                            <i>edit</i>
                        </button>
                    </template>
                </q-data-table>
            </div>
        </page-card-panel>
    </page-content>
</template>

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
            affiliates: [
                { id: 0, affiliateCode: 'TEST', affiliateName: 'TEST123' }
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
                    label: 'Affiliate',
                    field: 'affiliateName',
                    filter: true,
                    sort: true,
                    sort: 'string'
                },
                {
                    label: 'Code',
                    field: 'affiliateCode',
                    filter: true,
                    sort: true,
                    sort: 'string'
                }
            ]
        }
    },
    methods: {
        createAffiliate() {
            console.log('create affiliate')
        },
        editAffiliate(affiliate) {
            console.log('edit => ' + JSON.stringify(affiliate));
        },
        refresh(done) {
            console.log('refresh table')
            done()
        }
    }
}
</script>