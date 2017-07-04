<template>
    <q-modal ref="modal" class="minimized" :noEscDismiss="closeOnEscape" :noBackdropDismiss="closeOnOutsideClick">
        <div class="content">
            <div class="header">
                <div class="float-left" v-if="modalHeader">
                    {{ modalHeader }}
                </div>
                <div class="float-right pointer" v-if="showCloseButton" @click="$refs.modal.close()">
                    <i>clear</i>
                </div>
            </div>
            <div class="body">
                <slot>
                </slot>
            </div>
            <div class="row footer">
                <div class="auto">
                    <button class="primary small clear" @click="$refs.modal.close()">
                        {{ cancelLabel }}
                    </button>
                </div>
                <div class="auto">
                    <button class="primary small">
                        {{ doneLabel }}
                    </button>
                </div>
            </div>
        </div>
    </q-modal>
</template>

<style scoped lang="stylus">
@import '~src/themes/app.variables.styl';

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
    display:inline-block;
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
        }
    },
    props: {
        cancelLabel: {
            type: String,
            default: 'Cancel'
        },
        closeOnEscape: {
            type: Boolean
        },
        closeOnOutsideClick: {
            type: Boolean
        },
        doneLabel: {
            type: String,
            default: 'OK'
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