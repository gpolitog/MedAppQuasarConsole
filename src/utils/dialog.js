import { Dialog } from 'quasar'

export class DialogService {

    constructor(msg) {
        Dialog.create({
            message: msg,
            buttons: [
                'OK'
            ],
            noBackdropDismiss: true,
            noEscDismiss: true
        })
    }
}
