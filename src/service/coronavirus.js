import { http } from './config'

export default {
  getOne: (id) => {
    return http.get(`/coronavirus/${id}`)
  },
  getQuery: (query) => {
    return http.get(`/coronavirus`, { params: query })
  }
}
