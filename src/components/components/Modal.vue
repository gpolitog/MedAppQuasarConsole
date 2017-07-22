<template>
    <q-modal ref="modalComponent" class="minimized" :noEscDismiss="closeOnEscape" :noBackdropDismiss="closeOnOutsideClick">
        <div class="content">
            <div class="modal-header" :class="{'header-align-start' : modalHeader && !showCloseButton, 'header-align-end': !modalHeader && showCloseButton, 'header-align-space-between': modalHeader && showCloseButton}">
                <div v-if="modalHeader">
                    <b>{{ modalHeader }}</b>
                </div>
                <div class="pointer" v-if="showCloseButton">
                    <button class="clear modal-close" :disabled="disableButtons" @click="exit()">
                        <i>clear</i>
                    </button>
                </div>
            </div>
            <div class="modal-body">
                <slot>
                </slot>
            </div>
            <div class="row modal-footer">
                <div class="auto">
                    <button class="primary small round clear modal-actions" :disabled="disableButtons" @click.prevent="cancel()">
                        {{ cancelLabel }}
                    </button>
                </div>
                <div class="auto">
                    <button class="primary small round modal-actions" :disabled=" disableButtons " @click.prevent="submit() ">
                        {{ doneLabel }}
                        <spinner class="button-spinner" color="white" :size="20" v-if="showSpinner"></spinner>
                    </button>
                </div>
            </div>
        </div>
    </q-modal>
</template>

<style scoped>
.modal-body {
    padding: 15px 0;
}

/*.body-small {
    min-width: 20vw;
}

.body-medium {
    min-width: 40vw;
}

.body-large {
    min-width: 80vw;
}*/

.modal-actions {
    min-width: 80px;
}

.modal-close {
    padding: 0;
}

.content {
    padding: 20px;
}

.modal-footer {
    text-align: center;
}

.modal-header {
    display: flex;
    align-items: center;
    font-weight: normal;
    font-size: 15px;
    width: 100%;
    padding: 0;
}

.header-align-start {
    justify-content: flex-start;
}

.header-align-end {
    justify-content: flex-end;
}

.header-align-space-between {
    justify-content: space-between;
}

.pointer {
    cursor: pointer;
}
</style>

<script>
export default {
    name: 'modalComponent',
    methods: {
        open() {
            this.$refs.modalComponent.open()
        },
        close() {
            this.$refs.modalComponent.close()
        },
        submit() {
            this.$emit('onSubmit')
        },
        cancel() {
            this.$refs.modalComponent.close()
        },
        exit() {
            this.$refs.modalComponent.close()
        }
    },
    props: {
        cancelLabel: {
            default: 'Cancel',
            type: String
        },
        closeOnEscape: {
            type: Boolean
        },
        closeOnOutsideClick: {
            type: Boolean
        },
        disableButtons: {
            default: false,
            type: Boolean
        },
        doneLabel: {
            default: 'DONE',
            type: String
        },
        modalHeader: {
            type: String
        },
        showCloseButton: {
            type: Boolean
        },
        showSpinner: {
            default: false,
            type: Boolean
        }
    }
}
</script>
