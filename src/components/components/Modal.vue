<template>
    <q-modal ref="modal" class="minimized" :noEscDismiss="closeOnEscape" :noBackdropDismiss="closeOnOutsideClick">
        <div class="content">
            <div class="header">
                <div class="float-left" v-if="modalHeader">
                    {{ modalHeader }}
                </div>
                <div class="float-right pointer" :disabled="disableButtons" v-if="showCloseButton" @click="exit()">
                    <i>clear</i>
                </div>
            </div>
            <div class="body">
                <slot>
                </slot>
            </div>
            <div class="row footer">
                <div class="auto">
                    <button class="primary small clear" :disabled="disableButtons" @click="cancel() ">
                        {{ cancelLabel }}
                    </button>
                </div>
                <div class="auto ">
                    <button class="primary small " :disabled="disableButtons" @click="submit() ">
                        {{ doneLabel }}
                    </button>
                </div>
            </div>
        </div>
    </q-modal>
</template>

<style scoped>
button {
    min-width: 80px;
}

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
    name: 'modal',
    methods: {
        open() {
            this.$refs.modal.open()
        },
        close() {
            this.$refs.modal.close()
        },
        submit() {
            this.$emit('onSubmit')
        },
        cancel() {
            this.$emit('onCancel')
            this.$refs.modal.close()
        },
        exit() {
            this.$emit('onExit')
            this.$refs.modal.close()
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
            default: 'OK',
            type: String
        },
        modalHeader: {
            type: String
        },
        showCloseButton: {
            type: Boolean
        }
    }
}
</script>