import request from '@/utils/request'

// 基于code查询随访表数据
export function getCodeList(code) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/archive/bs-flup/queryBsFlupByCode/'+code,
    method: 'get',
    // data:JSON.stringify(params)
  })
}

//分页查询随访记录列表
export function queryBsFlupList(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/archive/bs-flup/queryBsFlupList',
    method: 'post',
    data:JSON.stringify(params)
  })
}

//分页查询随访记录列表
export function queryListByUcode(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/archive/bs-archives/queryListByUcode',
    method: 'post',
    data:JSON.stringify(params)
  })
}

//添加随访表数据 base/archive/bs-flup/insertBsFlup
export function insertBsFlup(params){
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"/archive/bs-flup/insertBsFlup",
    method:"post",
    data:JSON.stringify(params)
  })
}
//编辑随访表数据base/archive/bs-flup/updateBsFlup
export function updateBsFlup(params){
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"/archive/bs-flup/updateBsFlup",
    method:"post",
    data:JSON.stringify(params)
  })
}
