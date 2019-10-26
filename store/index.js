import { getUserFromCookie } from '~/helpers'

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const user = getUserFromCookie(req)
    if (user) {
      commit('users/SET_USER', {
        email: user.email,
        email_verified: user.email_verified
      })
    }
  }
}
