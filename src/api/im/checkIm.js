import request from '@/utils/request'

// 基于健康团队获取团队中的医生
export function getDoctor(param) {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/helalthteam/bs-health-team-member/selectTeamDocrotByTeamCode/'+param,
    method: 'get',
    // data: JSON.stringify(param)
  })
}

// 查询用户唯一在进行中的就诊记录
export function getUserIngInquiry(param) {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/inquiry/bs-inquiry/getUserIngInquiry',
    method: 'post',
    data: JSON.stringify(param)
  })
}

// 条件查询医生列表
export function findDoctor(param) {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/doctor/doctorManager/findDoctor',
    method: 'post',
    data: JSON.stringify(param)
  })
}

// 更新就诊记录
export function updateInquiry(param) {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/inquiry/bs-inquiry/updateInquiry',
    method: 'post',
    data: JSON.stringify(param)
  })
}
