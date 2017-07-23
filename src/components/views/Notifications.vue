<template>
    <page-content :centerAligned="false">
        <div class="sm-width-4of5 md-width-4of5 gt-md-width-3of5">
            <card-panel>
                ON GOING DEVELOPMENT
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
    }
}
</script>
