import { getUserFromCookie } from '~/helpers'

export const actions = {
  async nuxtServerInit({ commit }, { req, $axios }) {
    const user = getUserFromCookie(req)
    if (user) {
      const data = await $axios.$get(`/user/username/${user.email}`)
      commit('users/SET_USER', {
        username: data.body.username,
        name: data.body.name,
        lastname: data.body.lastname,
        service: data.body.service,
        link: data.body.service,
        id_doc_firestore: data.body.id_doc_firestore,
        photoURL: data.body.photo,
        showAge: data.body.showAge,
        showName: data.body.showName,
        datebirth: data.body.datebirth,
        // From cookie
        email: user.email,
        email_verified: user.email_verified
      })
    }
    commit('users/SET_TEST', user)
  }
}
