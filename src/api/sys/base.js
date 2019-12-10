import request from '@/utils/request'

// 添加慢病基础表
export function insertBsArchives(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/archive/bs-archives/insertBsArchives',
    method: 'post',
    data:JSON.stringify(params)
  })
}

// 基于code查询所有表格数据
export function getCode(code) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/archive/bs-archives/findUserAllData/'+code,
    method: 'get'
    // data:JSON.stringify(params)
  })
}

// 添加附表档案表
export function insertBsAS(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/archive/bs-archives-schedule/insertBsArchivesSchedule',
    method: 'post',
    data:JSON.stringify(params)
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

// 基于档案code查询随访记录表
export function queryAllBsFlupInfo(code) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: "/archive/bs-flup/queryAllBsFlupInfo/"+code,
    method: 'get',
    // data:JSON.stringify(params)
  })
}

// 科室查询接口
export function getClinic(params){
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"/sys/department/list",
    method:"post",
    data:JSON.stringify(params)
  })
}

// 条件查询医生接口
export function getDoctor(params){
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"/doctor/doctorManager/findDoctor",
    method:"post",
    data:JSON.stringify(params)
  })
}

// 医生指派接口
export function getAssign(params){
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"archive/bs-archives/appointDoctor",
    method:"post",
    data:JSON.stringify(params)
  })
}

// 向糖尿病周随访添加数据
export function getTangWeek(params){
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"archive/bs-weed-flup-diabetes/insertBsWeedFlupDiabetes",
    method:"post",
    data:JSON.stringify(params)
  })
}

// 修改慢病档案基础表数据
export function updateBsArchives(params){
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"archive/bs-archives/updateBsArchives",
    method:"post",
    data:JSON.stringify(params)
  })
}

// 添加慢病处方接口
export function savefitPlan(params){
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"archive/bs-health-plan/save",
    method:"post",
    data:JSON.stringify(params)
  })
}
// 健康计划模板 - 2.我的健康计划模板--模板列表
export function queryTemplateList(params){
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"healthPlanTemplate/bs-health-plan-template/queryTemplateList",
    method:"post",
    data:JSON.stringify(params)
  })
}
// 健康计划模板 - 3.我的健康计划模板--模板预览

export function queryTemplateInfo(params){
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"healthPlanTemplate/bs-health-plan-template/queryTemplateInfo/"+params,
    method:"get",
    // data:JSON.stringify(params)
  })
}
