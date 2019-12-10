import request from '@/utils/request'

export function getList(params) {
  return request({
    headers: { teamCode: JSON.parse(sessionStorage.getItem('User')).teamCode, uCode: sessionStorage.getItem('ucode') },
    url: '/userResource/list',
    method: 'post',
    data: JSON.stringify(params)
  })
}

// userResource/getImagesByCode/{code}普通用户相关接口 - 2.获取用户详细信息
export function getImagesByCode(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/userResource/getImagesByCode/'+params,
    method: 'get',
    // data:JSON.stringify(params)
  })
}
// 用户资料管理 - 3.医生查阅资料
export function doctorRead(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/userResource/doctorRead/'+params,
    method: 'get',
    // data:JSON.stringify(params)
  })
}
