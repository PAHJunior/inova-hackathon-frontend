import { http } from './config'

export default {
  getOne: (id) => {
    return http.get(`/proposals/${id}`)
  },
  getQuery: (query) => {
    return http.get(`/proposals`, { params: query })
  }
}
