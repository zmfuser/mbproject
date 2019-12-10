import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/hospital/bs-hospital/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function saveOrUpdate(obj) {
  return request({
    url: '/hospital/bs-hospital/save-or-update',
    method: 'post',
    data:JSON.stringify(obj)
  })
}

export function deleteObjs(hostpitalCode) {
  return request({
    url: '/hospital/bs-hospital/delete/'+hostpitalCode,
    method: 'post'
  })
}

// hospital/bs-hospital/saveOrUpdateHospital 医院相关 - 1.保存或怎修改医院
export function saveOrUpdateHospital(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/hospital/bs-hospital/saveOrUpdateHospital',
    method: 'post',
    data:JSON.stringify(params)
  })
}
// hospital/bs-hospital/getOneHospital/{code}医院相关 - 3.获取医院详情
export function getOneHospital(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/hospital/bs-hospital/getOneHospital/'+params,
    method: 'get',
    // data:JSON.stringify(params)
  })
}
