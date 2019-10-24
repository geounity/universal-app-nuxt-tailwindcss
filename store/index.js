import { getUserFromCookie } from '~/helpers'
import { auth } from '~/services/firebase'

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const user = getUserFromCookie(req)
    if (user) {
      await commit('users/SET_USER', {
        uid: user.user_id,
        email: user.email
      })
    }
    auth.onAuthStateChanged((user) => {
      if (user) {
        const newUser = {
          username: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL,
          uid: user.uid
        }
        commit('users/SET_USER', newUser)
      }
    })
  }
}
