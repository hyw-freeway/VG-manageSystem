import request from '@/utils/request'

export function login(password, username) {
  return request({
    url: '/api/login',
    method: 'post',
    params: { password, username }
  })
}
export function register(data) {
  return request({
    url: '/api/register',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/api/article/selectAllUser',
    method: 'get'

  })
}
export function getSession() {
  return request({
    url: '/api/getSessionId',
    method: 'get'

  })
}
export function getUsers() {
  return request({
    url: '/api/selectAllUsers',
    method: 'get'

  })
}

