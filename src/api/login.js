import request from '@/utils/request'

export function login(username, password,rememberMe,code) {
  return request({
    url: '/sys/sys-user/login',
    method: 'post',
    data: JSON.stringify({
      username,
      password,
      rememberMe,
      code
    })
  })
}

export function getInfo() {
  return request({
    url: '/sys/sys-user/user-info',
    method: 'get'
  })
}


export function logout() {
  return request({
    url: '/sys/sys-user/logout',
    method: 'get'
  })
}
