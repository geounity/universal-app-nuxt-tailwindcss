import api from '~/services/apiMongo'

export const state = () => ({
  debate: null,
  debates: []
})

export const mutations = {
  SET_DEBATES: (state, debates) => {
    state.debates = debates
  }
}

export const actions = {
  async get_debates({ commit }) {
    try {
      const { data } = await api.get('/debate')
      const debates = data.body.map((item) => {
        return {
          ...item,
          author: {
            username: 'pepito',
            photoURL:
              'https://firebasestorage.googleapis.com/v0/b/geounity.appspot.com/o/images%2FsebaProfile?alt=media&token=db998bf3-eae7-499c-ace0-1b2d5c6da27b'
          }
        }
      })
      commit('SET_DEBATES', debates)
    } catch (error) {
      throw error
    }
  },
  async open_debate({ commit, rootGetters }, form) {
    const username = rootGetters['users/username']
    const payload = {
      username,
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
