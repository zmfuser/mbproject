import request from '@/utils/request'

export function getList(params) {
  return request({
    headers: { uCode: sessionStorage.getItem('ucode') },
    url: '/workplan/bs-scheduling-log/list',
    method: 'post',
    data: JSON.stringify(params)
  })
}
// 排班相关接口 - 1.创建或者修改排班信息

export function createOrUpdateScheduling(params) {
  return request({
    headers: { uCode: sessionStorage.getItem('ucode') },
    url: '/workplan/bs-scheduling-log/createOrUpdateScheduling',
    method: 'post',
    data: JSON.stringify(params)
  })
}
// 排班相关接口 - 1.创建或者修改排班信息

export function getOneScheduling(params) {
  return request({
    headers: { uCode: sessionStorage.getItem('ucode') },
    url: '/workplan/bs-scheduling-log/getOneScheduling/'+params,
    method: 'get',
    // data: JSON.stringify(params)
  })
}
// 

export function deletepaiban(params) {
  return request({
    headers: { uCode: sessionStorage.getItem('ucode') },
    url: '/workplan/bs-scheduling-log/delete/'+params,
    method: 'post',
    data: JSON.stringify(params)
  })
}
// 

export function keshi(params) {
  return request({
    headers: { uCode: sessionStorage.getItem('ucode') },
    url: '/sys/department/list',
    method: 'post',
    data: JSON.stringify(params)
  })
}
// 医生管理 - 2.条件查询医生列表
export function findDoctor(params) {
  return request({
    headers: { uCode: sessionStorage.getItem('ucode') },
    url: '/doctor/doctorManager/findDoctor',
    method: 'post',
    data: JSON.stringify(params)
  })
}

