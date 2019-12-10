import request from '@/utils/request'

// 添加慢病基础表
export function queryPrescriptionList(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/prescription/bs-prescription/queryPrescriptionList',
    method: 'post',
    data:JSON.stringify(params)
  })
}
// 添加慢病基础表
export function queryPrescriptionScheduleByCode(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/prescription/bs-prescription/queryPrescriptionScheduleByCode/'+params,
    method: 'get',
    // data:JSON.stringify(params)
  })
}
