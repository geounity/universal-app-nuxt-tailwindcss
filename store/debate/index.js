import api from '~/services/apiMongo'

export const state = () => ({
  debate: null
})

export const mutations = {
  SET_DEBATE: (state, debate) => {
    state.debate = debate
  }
}

export const actions = {
  async open_debate({ commit }, form) {
    const payload = {
      idUser: '1',
      debate: {
        ...form,
        type: 'geopolitics' // bussines or ideologics
      }
    }
    try {
      await api.post('/debate', payload)
      commit('SET_DEBATE', form)
    } catch (error) {
      throw error
    }
  }
}
