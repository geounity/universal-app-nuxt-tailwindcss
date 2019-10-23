import { getUserFromCookie } from '~/helpers'

export const actions = {
  async nuxtServerInit({ commit }, { req }) {
    const user = getUserFromCookie(req)
    if (user) {
      await commit('users/SET_USER', {
        uid: user.user_id,
        email: user.email
      })
    }
  }
}
