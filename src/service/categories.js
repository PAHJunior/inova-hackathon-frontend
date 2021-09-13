import { http } from './config'

export default {
  getOne: (id) => {
    return http.get(`/categories/${id}`)
  },
  getQuery: (query) => {
    return http.get(`/categories`, { params: query })
  }
}
