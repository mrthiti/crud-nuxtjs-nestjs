import axios from 'axios'

export default {
  async findAll () {
    try {
      const { data } = await axios.get('/api/user')
      return { data }
    } catch ({ response }) {
      return { error: response }
    }
  },

  async findUser (uuid) {
    try {
      const { data } = await axios.get(`/api/user/${uuid}`)
      return { data }
    } catch ({ response }) {
      return { error: response }
    }
  },

  async addUser (user) {
    try {
      const { data } = await axios.post('/api/user', user)
      return { data }
    } catch ({ response }) {
      return { error: response }
    }
  },

  async updateUser (uuid, user) {
    try {
      const { data } = await axios.put(`/api/user/${uuid}`, user)
      return { data }
    } catch ({ response }) {
      return { error: response }
    }
  },

  async deleteUser (uuid, user) {
    try {
      const { data } = await axios.delete(`/api/user/${uuid}`)
      return { data }
    } catch ({ response }) {
      return { error: response }
    }
  }
}
