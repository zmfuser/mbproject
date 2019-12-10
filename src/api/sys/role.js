import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sys/sys-role/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function saveOrUpdate(obj) {
  return request({
    url: '/sys/sys-role/save-or-update',
    method: 'post',
    data:JSON.stringify(obj)
  })
}

export function deleteRoles(list) {
  return request({
    url: '/sys/sys-role/delete',
    method: 'post',
    data:JSON.stringify(list)
  })
}

export function assignPerm(obj) {
  return request({
    url: '/sys/sys-role/assign-perm',
    method: 'post',
    data:JSON.stringify(obj)
  })
}

