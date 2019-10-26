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
  isAuth: (state) => !!state.user && !!state.user.email,
  isVerified: (state) => !!state.user && !!state.user.email_verified,
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
  auth_google({ commit }, { router }) {
    const provider = new Auth.GoogleAuthProvider()
    auth
      .signInWithPopup(provider)
      .then((res) => {
        const token = res.credential.idToken
        Cookie.set('access_token', token)
        const newUser = {
          email: res.additionalUserInfo.profile.email || '',
          email_verified: res.additionalUserInfo.profile.verified_email || '',
          name: res.additionalUserInfo.profile.given_name || '',
          lastname: res.additionalUserInfo.profile.family_name || '',
          locale: res.additionalUserInfo.profile.locale || '',
          photoURL: res.additionalUserInfo.profile.photoURL || '',
          providerId: res.additionalUserInfo.providerId
        }
        commit('SET_USER', newUser)
        router.push('/user/profile')
        // firestore
        //   .collection('users')
        //   .add(newUser)
        //   .then((doc) => {
        //     api.post('/user', {
        //       ...newUser,
        //       id_doc_firestore: doc.id
        //     })
        //     commit('SET_USER', newUser)
        //   })
      })
      .catch((error) => {
        commit('SET_ERROR', 'Error: ' + error)
      })
  },
  auth_facebook({ commit }, { router }) {
    const provider = new Auth.FacebookAuthProvider()
    auth
      .signInWithPopup(provider)
      .then((res) => {
        const token = res.credential.accessToken
        Cookie.set('access_token', token)
        const newUser = {
          name: res.additionalUserInfo.profile.first_name || '',
          lastname: res.additionalUserInfo.profile.last_name || '',
          email: res.additionalUserInfo.profile.email,
          photoURL: res.additionalUserInfo.profile.picture.data.url,
          providerId: res.additionalUserInfo.providerId
        }
        commit('SET_USER', newUser)
        router.push('/user/profile')
      })
      .catch((error) => {
        commit('SET_ERROR', 'Error: ' + error)
      })
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
  async register({ dispatch }, form) {
    try {
      // Register the user
      await auth.createUserWithEmailAndPassword(form.email, form.password)
      dispatch('save_user_in_database', {
        username: form.username,
        email: form.email
      })
    } catch (error) {
      throw error
    }
  },
  async save_user_in_database({ commit }, user) {
    try {
      // Get JWT from Firebase
      const token = await auth.currentUser.getIdToken(true)
      // Set JWT to the cookie
      Cookie.set('access_token', token)
      // Set the user locally
      const newUser = {
        username: user.username,
        email: user.email,
        name: user.name || '',
        lastname: user.lastname || '',
        service: user.service || ''
      }
      const doc = await firestore.collection('users').add(newUser)
      await api.post('/user', {
        ...newUser,
        id_doc_firestore: doc.id
      })
      commit('SET_USER', newUser)
    } catch (error) {
      commit('SET_ERROR', error)
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
      commit('SET_USER', userInfo)
    } catch (error) {
      throw error
    }
  },
  verifyAuth({ commit }) {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const dataUser = {
          email: user.email,
          email_verified: user.emailVerified
        }
        api.get(`/user/username/${dataUser.email}`).then((user) => {
          commit('SET_USER', {
            username: user.data.body.username,
            name: user.data.body.name,
            lastname: user.data.body.lastname,
            photoURL: user.data.body.photo,
            service: user.data.body.service,
            id_doc_firestore: user.data.body.id_doc_firestore,
            ...dataUser
          })
        })
        commit('SET_USER', dataUser)
      }
    })
  }
}
