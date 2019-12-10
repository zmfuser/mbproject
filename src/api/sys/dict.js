import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sys/sys-dict/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function saveOrUpdate(params) {
  return request({
    url: '/sys/sys-dict/save-or-update',
    method: 'post',
    data:JSON.stringify(params)
  })
}
export function getTypes() {
  return request({
    url: '/sys/sys-dict/get-types',
    method: 'get',
  })
}


