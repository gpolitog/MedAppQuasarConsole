<template>
    <div>
        <div class="section-header">
            {{ sectionHeader }}
        </div>
        <div class="card">
            <div class="card-title bg-primary text-white" v-if="cardTitle">
                {{ cardTitle }}
            </div>
            <div class="card-content">
                <div>
                    <div class="card-content-spinner" v-if="showSpinner">
                        <spinner color="#027BE3" :size="40"></spinner>
                    </div>
                    <slot v-if="!showSpinner"></slot>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="stylus">
@import '~src/themes/app.variables.styl';

.card-content {
    background-color: white;
}

.section-header {
    padding-bottom: 20px;
    font-size: $page-header;
}
</style>

<script>
export default {
    name: 'cardPanel',
    props: {
        cardTitle: {
            type: String
        },
        sectionHeader: {
            type: String
        },
        showSpinner: {
            default: false,
            type: Boolean
        }
    }
}
</script>
