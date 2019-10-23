export default function({ store, route, redirect }) {
  if (!store.getters['users/isAuth']) {
    //  || /\/create\/*/g
    const blockedRoute = /\/user\/*/g
    const blockedRoute2 = /\/create\/*/g
    if (route.path.match(blockedRoute) || route.path.match(blockedRoute2)) {
      redirect('/auth/signin')
    }
  } else {
    const homeRoute = /\/auth\/*/g
    if (route.path.match(homeRoute)) {
      redirect('/user/profile')
    }
  }
}
