import { auth } from '~/services/firebase'

export default (context) => {
  const { store } = context

  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        return resolve(store.commit('users/SET_USER', user))
      }
      return resolve()
    })
  })
}
