<template>
    <q-modal ref="modal" class="minimized">
        <div class="row modal-header">
            <div v-if="modalHeader">
                {{ modalHeader }}
            </div>
            <div class="modal-close" @click="$refs.modal.close()">
                <i>clear</i>
            </div>
        </div>
        <slot>
        </slot>
    </q-modal>
</template>

<style scoped lang="stylus">
@import '~src/themes/app.variables.styl';

.modal-close {
    cursor: pointer;
}

.modal-header {
    justify-content:space-between;
}
</style>

<script>
export default {
    name: 'modal',
    props: {
        modalHeader: {
            type: String
        }
    },
    methods: {
        open() {
            this.$refs.modal.open()
        },
        close() {
            this.$refs.modal.close()
        }
    }
}
</script>