import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/drugs/bs-drugs/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function saveOrUpdate(obj) {
  return request({
    url: '/drugs/bs-drugs/save-or-update',
    method: 'post',
    data:JSON.stringify(obj)
  })
}

export function deleteObjs(list) {
  return request({
    url: '/drugs/bs-drugs/delete',
    method: 'post',
    data:JSON.stringify(list)
  })
}


