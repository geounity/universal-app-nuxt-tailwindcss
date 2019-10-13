import jwtDecode from 'jwt-decode'
import cookieparser from 'cookieparser'

export function getUserFromCookie(req) {
  if (process.server && process.static) return
  if (!req.headers.cookie) return

  const parsed = cookieparser.parse(req.headers.cookie)
  const accessTokenCookie = parsed.access_token
  if (!accessTokenCookie) return

  const decodedToken = jwtDecode(accessTokenCookie)
  if (!decodedToken) return

  return decodedToken
}

export function getUserFromSession(req) {
  return req.session ? req.session.userId : null
}
