import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const userId = 'userId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getId() {
  return Cookies.get(userId)
}
export function setId(Id) {
  return Cookies.set(userId, Id)
}
