import api from '~/services/apiMongo'

export const state = () => ({
  debate: null,
  debates: []
})

export const mutations = {
  SET_DEBATE: (state, debate) => {
    state.debates = debate
  },
  SET_DEBATES: (state, debates) => {
    state.debates = debates
  }
}

export const actions = {
  async get_debates({ commit }) {
    try {
      const { data } = await api.get('/debate')
      const debates = data.body
      // const dataUser = api.get(`/user/${item.userId}`)
      // const user = dataUser.data.body
      commit('SET_DEBATES', debates)
    } catch (error) {
      throw error
    }
  },
  async open_debate({ commit, rootGetters }, form) {
    const username = rootGetters['users/username']
    const payload = {
      username,
      community: form.geopolitic_uuid,
      debate: {
        ...form,
        images: form.fileName,
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
