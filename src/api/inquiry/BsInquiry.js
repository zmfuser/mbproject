import request from '@/utils/request'

export function getList(params) {
  params.uCode = sessionStorage.getItem('ucode');
  return request({
    url: '/inquiry/bs-inquiry/list',
    method: 'post',
    data: JSON.stringify(params)
  })
}

export function saveOrUpdate(obj) {
  return request({
    url: '/inquiry/bs-inquiry/save-or-update',
    method: 'post',
    data: JSON.stringify(obj)
  })
}

export function deleteObjs(list) {
  return request({
    url: '/inquiry/bs-inquiry/delete',
    method: 'post',
    data: JSON.stringify(list)
  })
}
// 就诊记录相关 - 2.新增线下就诊记录
// http://192.168.1.220:9528/base/inquiry/bs-inquiry/saveUpInquiry
export function saveUpInquiry(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/inquiry/bs-inquiry/saveUpInquiry',
    method: 'post',
    data:JSON.stringify(params)
  })
}
//就诊记录相关 - 4.基于就诊编号查询就诊编号详情
// getOnInquiry/{inquiryNum}
export function getOnInquiry(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/inquiry/bs-inquiry/getOnInquiry/'+params,
    method: 'get',
    // data:JSON.stringify(params)
  })
}
// 根据一个或多个条件分页查询档案列表
export function getPagelist(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/archive/bs-archives/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}
// 药品相关接口 - 1.药品获取相关接口
export function drugsList(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/drugs/bs-drugs/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}
