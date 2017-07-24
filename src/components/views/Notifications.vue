<template>
    <page-content :centerAligned="false">
        <div class="sm-width-4of5 md-width-4of5 gt-md-width-4of5">
            <card-panel sectionHeader="Notifications">
                Here the administrator can manually send notification by inputting the message and notification tags. Notification tags act as a filters. This determine who can receive the notification.
                <br>
                <br> Notification tags consist of the following: clinic, affiliaton, and user role.
                </span>
            </card-panel>
    
            <card-panel sectionHeader="Push Notification">
                Notifications will be sent accordingly based on the notification tags used.
                <br>
                <br>
                <form>
                    <div class="stacked-label">
                        <textarea class="full-width" v-model.trim="msg"></textarea>
                        <label>Message</label>
                    </div>
                </form>
                </span>
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
            ]
        }
    },
    components: {
        cardPanel,
        pageContent
    }
}
</script>
