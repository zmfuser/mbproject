import request from '@/utils/request'


export function permissionList() {
  return request({
    url: '/sys/sys-permission/permission-list',
    method: 'get',
  })
}

