import Cookie from 'js-cookie'
import { auth } from '@/services/firebase'

export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER: (state, form) => {
    state.user = form
  }
}

export const actions = {
  async login({ commit }, form) {
    try {
      // Login the user
      await auth.signInWithEmailAndPassword(form.email, form.password)
      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken()
      const { email, uid } = auth.currentUser
      // Set JWT to the cookie
      Cookie.set('access_token', token)
      // Set the user locally
      commit('SET_USER', { email, uid })
    } catch (error) {
      throw error
    }
  },
  register({ commit }, form) {
    // Por ahora nada
  }
}
