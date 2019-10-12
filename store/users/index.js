import Cookie from 'js-cookie'
import { auth, firestore } from '@/services/firebase'
import api from '~/services/apiMongo'

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
      const { email, uid, displayName } = auth.currentUser
      // Set JWT to the cookie
      Cookie.set('access_token', token)
      // Set the user locally
      commit('SET_USER', { email, uid, username: displayName })
    } catch (error) {
      throw error
    }
  },
  async register({ commit }, form) {
    try {
      // Register the user
      await auth.createUserWithEmailAndPassword(form.email, form.password)
      const user = auth.currentUser
      if (user) {
        user.updateProfile({
          displayName: form.username
        })
      }
      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken()
      // Set JWT to the cookie
      Cookie.set('access_token', token)
      // Set the user locally
      const newUser = {
        username: form.username,
        email: auth.currentUser.email,
        uid: auth.currentUser.uid
      }
      const doc = await firestore.collection('users').add(newUser)
      await api.post('/user', { ...newUser, id_doc_firestore: doc.id })
      commit('SET_USER', newUser)
    } catch (error) {
      throw error
    }
  }
}
