import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sys/sys-user/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function saveUpdateEmployee(params) {
  return request({
    url: '/sys/sys-user/save-or-update',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function employeeAssignRole(params) {
  return request({
    url: '/sys/sys-user/assign-role',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function changeUseStatus(params,type) {
  return request({
    url: '/sys/sys-user/use-status/'+type,
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function getLogData(params,id) {
  return request({
    url: '/sys/sys-user/load-log/'+id,
    method: 'post',
    data:JSON.stringify(params)
  })
}
