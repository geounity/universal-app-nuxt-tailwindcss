export default function({ store, route, redirect }) {
  if (!store.getters['users/username']) {
    const blockedRoute = /\/create\/*/g
    if (route.path.match(blockedRoute)) {
      redirect('/user/profile')
    }
  } else {
    const blockedRoute = /\/auth\/*/g
    if (route.path.match(blockedRoute)) {
      redirect('/user/profile')
    }
  }
  if (!store.getters['users/isAuth']) {
    const blockedRoute = /\/user\/*/g
    if (route.path.match(blockedRoute)) {
      redirect('/auth/signup')
    }
  } else {
    const blockedRoute = /\/auth\/*/g
    if (route.path.match(blockedRoute)) {
      redirect('/user/profile')
    }
  }
}
