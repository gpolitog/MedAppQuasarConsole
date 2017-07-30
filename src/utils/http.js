import axios from 'axios'
import {
  Dialog
} from 'quasar'

import CONFIG from '../config/config'
import STORAGE from './storage'

const HTTP = axios.create({
  // baseURL: `http://localhost:8080/medappws`
  baseURL: `https://dqmedapp.herokuapp.com`
})

let requestSuccessHandler = config => {
  return config
}

let requestErrorHandler = error => {
  return Promise.reject(error)
}

let responseSuccessHandler = response => {
  if (response && response.data && response.data.status) {
    return response.data
  } else {
    dialogHandler(response && response.data ? response.data.errorDescription : `Something went wrong...`)
  }
}

let responseErrorHandler = error => {
  dialogHandler(error.message)
  return Promise.reject(error)
}

let dialogHandler = errorMessage => {
  Dialog.create({
    message: errorMessage,
    buttons: [
      'OK'
    ],
    noBackdropDismiss: true,
    noEscDismiss: true
  })
}

HTTP.interceptors.request.use(requestSuccessHandler, requestErrorHandler)
HTTP.interceptors.response.use(responseSuccessHandler, responseErrorHandler)

class HttpService {

  _token = ''

  get token() {
    if (!this._token) {
      this._token = STORAGE.get(CONFIG.STORAGE.token)
    }
    return this._token;
  }

  setAuthorizationHeader() {
    HTTP.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
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
    return HTTP.get(url + parameter)
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
    return HTTP.delete(url + parameter)
  }

  post(url, parameter) {
    this.setAuthorizationHeader()
    return HTTP.post(url, parameter)
  }

  put(url, parameter) {
    this.setAuthorizationHeader()
    return HTTP.put(url, parameter)
  }
}

export default new HttpService()
