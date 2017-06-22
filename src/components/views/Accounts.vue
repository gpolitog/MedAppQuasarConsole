<template>
    <page-content>
        <page-card-panel>
            <div class="row page-header">
                <i>group</i>
                <span>Accounts</span>
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
    }
}
</script>

<style lang="stylus">
@import '~src/themes/app.variables.styl';

.page-header {
    border-bottom: 1px solid black;
}

i {
    font-size: $page-card-panel-header;
}

span {
    font-size: $page-card-panel-header;
    margin-left: 10px;
}
</style>
