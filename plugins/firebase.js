import { auth } from '~/services/firebase'

export default ({ store, router }) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      store.commit('users/SET_USER', user)
    }
  })
}
