import { getUserFromCookie } from '~/helpers'

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    console.log('hola')
    const user = getUserFromCookie(req)
    if (user) {
      console.log('[DISPATCH] SET_USER')
      await dispatch('users/set_user', {
        uid: user.user_id,
        email: user.email
      })
    }
  }
}
