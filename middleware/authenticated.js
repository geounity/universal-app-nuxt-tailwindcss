export default function({ store, redirect }) {
  if (!store.getters['users/isAuth']) {
    return redirect('/auth/signin')
  }
}
