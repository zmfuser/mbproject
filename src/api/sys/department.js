 import request from '@/utils/request'
export function selectDepartment(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"/sys/department/list",
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function adddepartment(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"/sys/department/save-or-update",
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function deleteAll(code) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"/sys/department/delete/"+code,
    method: 'post',
    // data:JSON.stringify(params)
  })
}