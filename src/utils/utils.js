import config from '../config/config'
import storage from './storage'

export default {
    isLoggedIn() {
        return storage.has(config.STORAGE.token)
    }
}