import request from '@/utils/request'

export function getList(params) {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/article/bs-health-guard/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function saveOrUpdate(obj) {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/article/bs-health-guard/save-or-update',
    method: 'post',
    data:JSON.stringify(obj)
  })
}

export function deleteObjs(list) {
  return request({
    url: '/article/bs-health-guard/delete',
    method: 'post',
    data:JSON.stringify(list)
  })
}

// 文章审核article/bs-health-guard/approvalArticle
export function approvalArticle(params){
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url:"/article/bs-health-guard/approvalArticle",
    method:"post",
    data:JSON.stringify(params)
  })
}