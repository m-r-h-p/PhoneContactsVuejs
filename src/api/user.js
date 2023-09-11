import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/Account/login',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data
  })
}

export function getInfo(id) {
  return request({
    url: `/User/${id}`,
    method: 'get'
    // params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function Register(data) {
  // console.log(data)
  return request({
    url: '/Account/register',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    data
  })
}

export function Isactive(email, code) {
  // console.log(data)
  console.log(email)
  console.log(code)

  return request({
    url: `/Account/UserVerify/${email}/${code}`,
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
}

