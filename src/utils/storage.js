import { LocalStorage } from 'quasar'

export default {
    get(key) {
        return LocalStorage.get.item(key)
    },
    has(key) {
        return LocalStorage.has(key)
    },
    put(key, value) {
        LocalStorage.set(key, value)
    },
    clear() {
        LocalStorage.clear()
    }
}
