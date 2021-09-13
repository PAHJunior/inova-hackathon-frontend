import axios from 'axios'
import { Notify } from 'quasar'

export const http = axios.create({
  baseURL: `${process.env.API}`,
  timeout: 60000
})
http.interceptors.response.use((response) => {
  if (response.data.status === 400) {
    for (let i = 0; i < response.data.errors.length; i++) {
      Notify.create({
        color: 'negative',
        title: 'Alerta',
        message: `${response.data.errors[i].message}`,
        icon: 'warning',
        actions: [{
          color: 'white',
          icon: 'close'
        }]
      })
    }
  }
  return response
}, (error) => {
  const { data, status } = error.response
  const { errors } = data
  if (status === 400 || status === 404) {
    for (let i = 0; i < errors.length; i++) {
      if (errors[i].status === 400) {
        Notify.create({
          color: 'negative',
          title: 'Alerta',
          message: `${errors[i].message}`,
          icon: 'warning',
          actions: [{
            color: 'white',
            icon: 'close'
          }]
        })
      }
    }
  }
  return Promise.reject(error)
})
