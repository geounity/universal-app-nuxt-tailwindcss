import Cookie from 'js-cookie'
import { Auth, auth, firestore, storage } from '~/services/firebase'
import api from '~/services/apiMongo'
auth.useDeviceLanguage()

export const state = () => ({
  user: null,
  test: null,
  error: null
})

export const getters = {
  avatar: (state) => {
    if (state.user && state.user.photoURL) return state.user.photoURL
    else return null
  },
  idPostgres: (state) => {
    if (state.user && state.user.id_postgres) return state.user.id_postgres
    else return null
  },
  isAuth: (state) => !!state.user && !!state.user.uid,
  username: (state) => {
    if (state.user && state.user.username) return state.user.username
    else return null
  }
}

export const mutations = {
  ADD_PHOTO: (state, photo) => {
    state.user.photoURL = photo
  },
  DELETE_IMAGE: (state) => {
    state.user.photoURL = ''
  },
  SET_USER: (state, account) => {
    state.user = {
      ...state.user,
      ...account
    }
  },
  SET_TEST: (state, test) => {
    state.test = test
  },
  SET_ERROR: (state, error) => {
    state.error = error
  }
}

export const actions = {
  auth_google({ commit }) {
    const provider = new Auth.GoogleAuthProvider()
    auth
      .signInWithPopup(provider)
      .then((res) => {
        if (res.additionalUserInfo.isNewUser) {
          const token = res.credential.getIdToken
          Cookie.set('access_token', token)
          commit('SET_TEST', res)
        }
        const newUser = {
          name: res.additionalUserInfo.profile.given_name || '',
          lastname: res.additionalUserInfo.profile.family_name || '',
          email: res.additionalUserInfo.profile.email || '',
          verified_email: res.additionalUserInfo.profile.verified_email || '',
          locale: res.additionalUserInfo.profile.locale || '',
          uid: res.additionalUserInfo.profile.id || ''
        }
        firestore
          .collection('users')
          .add(newUser)
          .then((doc) => {
            api.post('/user', {
              ...newUser,
              id_doc_firestore: doc.id
            })
            commit('SET_USER', newUser)
          })
      })
      .catch((error) => {
        commit('SET_ERROR', error)
      })
  },
  auth_facebook({ commit }) {
    // -
  },
  delete_image({ commit }, fileName) {
    storage.ref('images/' + fileName).delete()
    commit('DELETE_IMAGE')
  },
  async login({ commit }, form) {
    try {
      // Login the user
      await auth.signInWithEmailAndPassword(form.email, form.password)
      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken(true)
      const { email, uid, displayName, photoURL } = auth.currentUser
      // Set JWT to the cookie
      Cookie.set('access_token', token)
      // Set the user locally
      commit('SET_USER', { email, uid, photoURL, username: displayName })
    } catch (error) {
      throw error
    }
  },
  async logout() {
    auth.signOut()
    await Cookie.remove('access_token')
    location.href = '/'
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
      const token = await auth.currentUser.getIdToken(true)
      // Set JWT to the cookie
      Cookie.set('access_token', token)
      // Set the user locally
      const newUser = {
        username: form.username,
        email: auth.currentUser.email,
        uid: auth.currentUser.uid
      }
      const doc = await firestore.collection('users').add(newUser)
      await api.post('/user', {
        ...newUser,
        id_doc_firestore: doc.id
      })
      commit('SET_USER', newUser)
    } catch (error) {
      throw error
    }
  },
  async update_info_user({ state, commit, getters }, userInfo) {
    try {
      await api.patch('/user', {
        username: getters.username,
        payload: userInfo
      })
      const user = auth.currentUser
      if (user) {
        user.updateProfile({
          photoURL: state.user.photoURL
        })
      }
      // save in firestore
      commit('SET_USER', { ...state.user, ...userInfo })
    } catch (error) {
      throw error
    }
  }
}
