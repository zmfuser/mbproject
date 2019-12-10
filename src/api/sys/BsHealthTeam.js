import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/helalthteam/bs-health-team/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}

export function saveOrUpdate(obj) {
  return request({
    url: '/helalthteam/bs-health-team/save-or-update',
    method: 'post',
    data:JSON.stringify(obj)
  })
}
// /helalthteam/bs-health-team/delete/{code}
export function deleteObjs(list) {
  return request({
    url: '/helalthteam/bs-health-team/delete/'+list,
    method: 'post',
    // data:JSON.stringify(list)
  })
}
// 创建健康团队
// /helalthteam/bs-health-team/save
export function saveteam(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/helalthteam/bs-health-team/save',
    method: 'post',
    data:JSON.stringify(params)
  })
}
// 编辑健康团队
// helalthteam/bs-health-team/updateTeam
export function updateTeam(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/helalthteam/bs-health-team/updateTeam',
    method: 'post',
    data:JSON.stringify(params)
  })
}
// 查询健康团队成员

// /helalthteam/bs-health-team-member/list
export function teamlist(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/helalthteam/bs-health-team-member/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}
//健康团队管理 - 6.删除成员
export function deleteMember(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/helalthteam/bs-health-team-member/deleteMember/'+params,
    method: 'post',
    // data:JSON.stringify(params)
  })
}
//健康团队管理 - 6.删除成员
export function batchDeleteMember(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/helalthteam/bs-health-team-member/batchDeleteMember/',
    method: 'post',
    data:JSON.stringify(params)
  })
}
//健康团队管理 - 7.查询可添加成员
export function getNotInTeamDoctor(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/helalthteam/bs-health-team-member/getNotInTeamDoctor',
    method: 'post',
    data:JSON.stringify(params)
  })
}
//健康团队管理 - 8.添加团队成员[支持批量]
export function batchAddMember(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/helalthteam/bs-health-team-member/batchAddMember',
    method: 'post',
    data:JSON.stringify(params)
  })
}
//医院列表
export function getHospitalList(params) {
  return request({
    url: '/hospital/bs-hospital/list',
    method: 'post',
    data:JSON.stringify(params)
  })
}