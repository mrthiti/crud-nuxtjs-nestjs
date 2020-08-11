import { make } from 'vuex-pathify'
import userApi from '../api/user'

const defaultState = () => ({
  users: []
})

export const state = defaultState

export const getters = { }

export const mutations = {
  ...make.mutations(state)
}

export const actions = {
  findAllUser: async ({ commit, state, rootState, rootGetters, dispatch }, payload) => {
    const { data: responseFindAll } = await userApi.findAll()
    commit('SET_USERS', responseFindAll)
  }
}
