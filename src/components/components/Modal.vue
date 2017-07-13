<template>
    <q-modal ref="modalComponent" class="minimized" :noEscDismiss="closeOnEscape" :noBackdropDismiss="closeOnOutsideClick">
        <div class="content">
            <div class="header">
                <div class="float-left" v-if="modalHeader">
                    {{ modalHeader }}
                </div>
                <div class="float-right pointer" v-if="showCloseButton">
                    <button class="clear small " :disabled="disableButtons" @click="exit()">
                        <i>clear</i>
                    </button>
                </div>
            </div>
            <div class="body">
                <slot>
                </slot>
            </div>
            <div class="row footer">
                <div class="auto">
                    <button class="primary small round clear" :disabled="disableButtons" @click="cancel()">
                        {{ cancelLabel }}
                    </button>
                </div>
                <div class="auto">
                    <button class="primary small round modal-actions" :disabled=" disableButtons " @click="submit() ">
                        {{ doneLabel }}
                        <spinner class="button-spinner" color="white" :size="20" v-if="showSpinner"></spinner>
                    </button>
                </div>
            </div>
        </div>
    </q-modal>
</template>

<style scoped>
.body {
    padding: 15px 0;
}

.body-small {
    min-width: 20vw;
}

.body-medium {
    min-width: 40vw;
}

.body-large {
    min-width: 80vw;
}

.modal-actions {
    min-width: 80px;
}


.content {
    padding: 20px;
}

.footer {
    text-align: center;
}

.header {
    display: inline-block;
    font-weight: normal;
    font-size: 15px;
    width: 100%;
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
            this.$emit('onCancel')
            this.$refs.modalComponent.close()
        },
        exit() {
            this.$emit('onExit')
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