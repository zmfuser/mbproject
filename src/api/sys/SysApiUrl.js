import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sys/sys-api-url/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function saveOrUpdate(obj) {
  return request({
    url: '/sys/sys-api-url/save-or-update',
    method: 'post',
    data:JSON.stringify(obj)
  })
}

export function deleteObjs(list) {
  return request({
    url: '/sys/sys-api-url/delete',
    method: 'post',
    data:JSON.stringify(list)
  })
}


