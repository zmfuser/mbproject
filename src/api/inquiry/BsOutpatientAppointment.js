import request from '@/utils/request'
//  1.获取个人预约信息

export function getList(params) {
  return request({
    headers: { uCode: sessionStorage.getItem('ucode') },
    url: '/appointment/bs-outpatient-appointment/list',
    method: 'post',
    data: JSON.stringify(params)
  })
}



