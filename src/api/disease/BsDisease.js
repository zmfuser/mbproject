import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/disease/bs-disease/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function saveOrUpdate(obj) {
  return request({
    url: '/disease/bs-disease/save-or-update',
    method: 'post',
    data:JSON.stringify(obj)
  })
}

export function deleteObjs(list) {
  return request({
    url: '/disease/bs-disease/delete',
    method: 'post',
    data:JSON.stringify(list)
  })
}


