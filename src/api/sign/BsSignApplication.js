import request from '@/utils/request'
// 查询获取列表数据
export function getList(params) {
  return request({
    url: '/sign/bs-sign-application/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function saveOrUpdate(obj) {
  return request({
    url: '/sign/bs-sign-application/save-or-update',
    method: 'post',
    data:JSON.stringify(obj)
  })
}

export function deleteObjs(list) {
  return request({
    url: '/sign/bs-sign-application/delete',
    method: 'post',
    data:JSON.stringify(list)
  })
}
// 签约详情
export function getOne(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/sign/bs-sign-application/getOne/'+params,
    method: 'post',
    // data:JSON.stringify(params)
  })
}
// 审核sign/bs-sign-application/checkSing
//同意签约
export function checkSing(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: "/sign/bs-sign-application/checkSing",
    method: 'post',
    data:JSON.stringify(params)
  })
}
