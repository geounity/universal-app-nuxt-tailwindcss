import { getUserFromCookie } from '~/helpers'

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    const user = getUserFromCookie(req)
    if (user) {
      await dispatch('users/set_user', {
        uid: user.user_id,
        email: user.email
      })
    }
  }
}
