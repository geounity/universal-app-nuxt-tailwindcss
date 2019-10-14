import api from '~/services/apiMongo'

export const state = () => ({
  debate: null,
  debates: []
})

export const mutations = {
  SET_DEBATE: (state, debate) => {
    state.debate = debate
  }
}

export const actions = {
  async get_debates({ commit }) {
    try {
      const debates = await api.get('/debate')
      commit('SET_DEBATES', debates)
    } catch (error) {
      throw error
    }
  },
  async open_debate({ commit, rootGetters }, form) {
    const idUser = rootGetters['users/idPostgres']
    const payload = {
      idUser,
      debate: {
        ...form,
        type: 'geopolitics' // bussines or ideologics
      }
    }
    try {
      await api.post('/debate', payload)
      commit('SET_DEBATE', payload)
    } catch (error) {
      throw error
    }
  }
}
