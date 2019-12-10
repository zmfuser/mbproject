import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/usermanager/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function updateUserStatus(params) {
  return request({
    url: '/usermanager/updateUserStatus/'+params.userCode+'/'+params.status,
    method: 'post'
  })
}


