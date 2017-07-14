import CONFIG from '../config/config'
import STORAGE from './storage'

export default {
    isLoggedIn() {
        return STORAGE.has(CONFIG.STORAGE.token)
    }
}
