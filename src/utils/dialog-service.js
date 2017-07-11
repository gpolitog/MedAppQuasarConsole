import { Dialog } from 'quasar'

export class DialogService {

    _msg = ''
    _dialog = undefined

    constructor(msg) {
        this._msg = msg
    }

    pop() {
        this._dialog = Dialog.create({
            message: this._msg,
            buttons: [
                'OK'
            ],
            noBackdropDismiss: true,
            noEscDismiss: true
        })
    }

    close() {
        this._dialog.close()
    }
}
