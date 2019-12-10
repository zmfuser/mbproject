import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sys/sys-permission/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function saveOrUpdate(obj) {
  return request({
    url: '/sys/sys-permission/save-or-update',
    method: 'post',
    data:JSON.stringify(obj)
  })
}

export function deleteObjs(list) {
  return request({
    url: '/sys/sys-permission/delete',
    method: 'post',
    data:JSON.stringify(list)
  })
}


