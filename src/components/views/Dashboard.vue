<template>
    <page-content :centerAligned="false">
        <div class="sm-width-4of5 md-width-3of5 gt-md-width-3of5">
            <card-panel sectionHeader="Users Statistics" :showSpinner="!isUserStatLoaded">
                <chartjs-doughnut :width="150" :height="250" :option="userStatOption" :labels="usersStatlabels" :datasets="usersStatDatasets"></chartjs-doughnut>
            </card-panel>
    
            <card-panel sectionHeader="Affiliates Statistics" :showSpinner="!isAffiliateStatLoaded">
                <chartjs-doughnut :width="150" :height="250" :option="affiliateStatOption" :labels="affiliatesStatlabels" :datasets="affiliatesStatDatasets"></chartjs-doughnut>
            </card-panel>
        </div>
    </page-content>
</template>

<script>
import axios from 'axios'
import cardPanel from '../components/CardPanel.vue'
import pageContent from '../components/PageContent.vue'

import CONFIG from '../../config/config'
import HTTP from '../../utils/http'

export default {
    created() {
        axios.all([
            HTTP.get(CONFIG.API.getActiveUserCount, []),
            HTTP.get(CONFIG.API.getIncompleteUserCount, []),
            HTTP.get(CONFIG.API.getInactiveUserCount, []),
            HTTP.get(CONFIG.API.getUserCount, [])
        ]).then(response => {
            if (response) {
                const userCounts = []
                const activeUsersResp = response[0]
                const incompleteUsersResp = response[1]
                const inactiveUsersResp = response[2]
                const usersResp = response[3]

                userCounts.push(activeUsersResp ? activeUsersResp.result : 0)
                userCounts.push(incompleteUsersResp ? incompleteUsersResp.result : 0)
                userCounts.push(inactiveUsersResp ? inactiveUsersResp.result : 0)

                this.usersStatDatasets[0].data = userCounts
                this.userStatOption.title.text = `Total Number of Users: ${usersResp ? usersResp.result : 0}`
            }

            this.isUserStatLoaded = true
        }).catch(error => {
            this.userStatOption.title.text = `Total Number of Users: 0`
            this.isUserStatLoaded = true
        })

        axios.all([
            HTTP.get(CONFIG.API.getCountLinkedAffiliates, []),
            HTTP.get(CONFIG.API.getCountNoLinkAffiliates, []),
            HTTP.get(CONFIG.API.getCountAllAffiliates, [])
        ]).then(response => {
            if (response) {
                const affiliateCounts = []
                const linkedAffiliateResp = response[0]
                const noLinkedAffiliateResp = response[1]
                const affiliatesResp = response[2]

                affiliateCounts.push(linkedAffiliateResp ? linkedAffiliateResp.result : 0)
                affiliateCounts.push(noLinkedAffiliateResp ? noLinkedAffiliateResp.result : 0)

                this.affiliatesStatDatasets[0].data = affiliateCounts
                this.affiliateStatOption.title.text = `Total Number of Affiliates: ${affiliatesResp ? affiliatesResp.result : 0}`
            }

            this.isAffiliateStatLoaded = true
        }).catch(error => {
            this.affiliateStatOption.title.text = `Total Number of Affiliates: 0`
            this.isAffiliateStatLoaded = true
        })
    },
    data() {
        return {
            userStatOption: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    position: 'bottom',
                    text: 'Total Number of Users: 0'
                }
            },
            affiliateStatOption: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    position: 'bottom',
                    text: 'Total Number of Affiliates: 0'
                }
            },
            usersStatlabels: ["Active", "Registration", "Inactive"],
            usersStatDatasets: [{
                data: [0, 0, 0],
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
            affiliatesStatlabels: ["Linked", "Not Linked"],
            affiliatesStatDatasets: [{
                data: [0, 0],
                backgroundColor: [
                    "#027be3",
                    "#333"
                ],
                hoverBackgroundColor: [
                    "#027be3",
                    "#333"
                ]
            }],
            isUserStatLoaded: false,
            isAffiliateStatLoaded: false
        }
    },
    components: {
        cardPanel,
        pageContent
    }
}
</script>
