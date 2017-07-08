<template>
    <page-content :centerAligned="true" :withBackground="true">
        <div class="sm-width-4of5 md-width-4of5 gt-md-width-4of5">
            <card-panel sectionHeader="Affiliates">
                <br>
            </card-panel>
        </div>
    </page-content>
</template>

<script>
import cardPanel from '../components/CardPanel.vue'
import pageContent from '../components/PageContent.vue'

export default {
    components: {
        cardPanel,
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