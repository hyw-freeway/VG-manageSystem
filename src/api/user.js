import request from '@/utils/request'

export function login(password, username) {
  return request({
    url: '/login',
    method: 'post',
    params: { password, username }
  })
}

export function register(data) {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/article/selectAllUser',
    method: 'get'

  })
}
export function getSession() {
  return request({
    url: '/getSessionId',
    method: 'get'

  })
}
export function getUsers() {
  return request({
    url: '/selectAllUsers',
    method: 'get'

  })
}

