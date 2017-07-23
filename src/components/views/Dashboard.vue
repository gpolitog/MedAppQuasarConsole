<template>
    <page-content :centerAligned="false">
        <div class="sm-width-4of5 md-width-3of5 gt-md-width-2of5">
            <card-panel sectionHeader="Users Statistics">
                <chartjs-doughnut :width="150" :height="250" :option="statOption" :labels="usersStatlabels" :datasets="usersStatDatasets"></chartjs-doughnut>
            </card-panel>
    
            <card-panel sectionHeader="Affiliates Statistics">
                <chartjs-doughnut :width="150" :height="250" :option="statOption" :labels="affiliatesStatlabels" :datasets="affiliatesStatDatasets"></chartjs-doughnut>
            </card-panel>
        </div>
    </page-content>
</template>

<script>
import cardPanel from '../components/CardPanel.vue'
import pageContent from '../components/PageContent.vue'

export default {
    data() {
        return {
            statOption: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            usersStatlabels: ["Active", "Registration", "Inactive"],
            usersStatDatasets: [{
                data: [80, 5, 15],
                backgroundColor: [
                    "#027be3",
                    "#26A69A",
                    "#333"
                ],
                hoverBackgroundColor: [
                    "#027be3",
                    "#26A69A",
                    "#333"
                ]
            }],
            affiliatesStatlabels: ["Used", "Unused"],
            affiliatesStatDatasets: [{
                data: [20, 5],
                backgroundColor: [
                    "#027be3",
                    "#333"
                ],
                hoverBackgroundColor: [
                    "#027be3",
                    "#333"
                ]
            }]
        }
    },
    components: {
        cardPanel,
        pageContent
    }
}
</script>
