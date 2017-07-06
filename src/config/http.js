import axios from 'axios';
import { Loading, LocalStorage } from 'quasar'

const HTTP = axios.create({
    baseURL: `http://localhost:8080/MedAppWS`
    // baseURL: `https://dqmedapp.herokuapp.com`
})

export class HttpService {

    _token = ''

    get token() {
        if (!this._token) {
            this._token = LocalStorage.get.item('accessToken');
        }
        return this._token;
    }

    setAuthorizationHeader() {
        HTTP.defaults.headers.common['Authorization'] = this.token;
    }

    get(url, parameters) {
        let parameter = ''
        if (Array.isArray(parameters)) {
            for (let _parameter of parameters) {
                parameter += "/" + _parameter;
            }
        } else {
            parameter += "/" + parameters
        }

        this.setAuthorizationHeader()
        Loading.show()

        return new Promise((resolve, reject) => {
            HTTP.get(url + parameter).then(response => {
                resolve(response)
                Loading.hide()
            }).catch(e => {
                reject(Error(e))
                Loading.hide()
            })
        })
    }

    delete(url, parameters) {
        let parameter = ''
        if (Array.isArray(parameters)) {
            for (let _parameter of parameters) {
                parameter += "/" + _parameter;
            }
        } else {
            parameter += "/" + parameters
        }

        this.setAuthorizationHeader()
        Loading.show()

        return new Promise((resolve, reject) => {
            HTTP.delete(url + parameter).then(response => {
                resolve(response)
                Loading.hide()
            }).catch(e => {
                reject(Error(e))
                Loading.hide()
            })
        })
    }

    post(url, parameter) {
        this.setAuthorizationHeader()
        Loading.show()

        return new Promise((resolve, reject) => {
            HTTP.post(url, parameter).then(response => {
                resolve(response)
                Loading.hide()
            }).catch(e => {
                reject(Error(e))
                Loading.hide()
            })
        })
    }

    put(url, parameter) {
        this.setAuthorizationHeader()
        Loading.show()

        return new Promise((resolve, reject) => {
            HTTP.put(url, parameter).then(response => {
                resolve(response)
                Loading.hide()
            }).catch(e => {
                reject(Error(e))
                Loading.hide()
            })
        })
    }
}