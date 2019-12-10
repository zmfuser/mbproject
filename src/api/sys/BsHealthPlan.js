import request from '@/utils/request'

export function getList(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/archive/bs-health-plan/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}


