import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/push/bs-push-templete/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function saveOrUpdate(obj) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/push/bs-push-templete/save-or-update',
    method: 'post',
    data:JSON.stringify(obj)
  })
}

export function deleteObjs(list) {
  return request({
    url: '/push/bs-push-templete/delete',
    method: 'post',
    data:JSON.stringify(list)
  })
}


