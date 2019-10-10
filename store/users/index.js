import Cookie from 'js-cookie'
import { auth } from '@/services/firebase'

export const state = () => ({
  user: null
})

export const getters = {
  auth: (state) => !!state.user && !!state.user.uid,
  username: (state) => {
    if (state.user && state.user.username) return state.user.username
    else return null
  }
}

export const mutations = {
  SET_USER: (state, account) => {
    state.user = account
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
  async register({ commit }, form) {
    try {
      // Register the user
      await auth.createUserWithEmailAndPassword(form.email, form.password)
      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken()
      const { email, uid } = auth.currentUser
      // Set JWT to the cookie
      Cookie.set('access_token', token)
      // Set the user locally
      const { username } = form
      commit('SET_USER', { username, email, uid })
    } catch (error) {
      throw error
    }
  }
}
