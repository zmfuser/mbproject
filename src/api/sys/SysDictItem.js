import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/sys/sys-dict-item/list',
    method: 'post',
    data: JSON.stringify(params)
  })
}

export function saveOrUpdate(obj) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/sys/sys-dict-item/save-or-update',
    method: 'post',
    data: JSON.stringify(obj)
  })
}

export function deleteObjs(list) {
  return request({
    url: '/sys/sys-dict-item/delete',
    method: 'post',
    data: JSON.stringify(list)
  })
}

// 基于字典项查询数据字典值
export function getDictValuelist(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/utils/dict/getDictValuelist',
    method: 'post',
    data:JSON.stringify(params)
  })
}
// 基于字典项更改数据字典值
export function updateDictValue(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/utils/dict/updateDictValue',
    method: 'post',
    data:JSON.stringify(params)
  })
}
// 基于字典项更改数据字典值
export function saveDictValue(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/utils/dict/saveDictValue',
    method: 'post',
    data:JSON.stringify(params)
  })
}
// 基于字典项删除数据字典值
export function deleteDictValue(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/utils/dict/deleteDictValue/'+params,
    method: 'post',
    data:JSON.stringify(params)
  })
}
