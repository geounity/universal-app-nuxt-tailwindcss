export default function({ store, route, redirect }) {
  const user = store.state.users.user
  const blockRoute = /\/user\/*/g

  if (!user && route.path.match(blockRoute)) {
    redirect('/')
  }
}
