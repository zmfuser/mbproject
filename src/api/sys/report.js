//报表处理JS
import request from '@/utils/request'

// 基于code查询所有表格数据
export function getReportData() {
  return request({
    url: '/archive/bs-archives/getIndexStatistics/' + sessionStorage.getItem("ucode"),
    method: 'get'
  })
}

export function queryStatistics() {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/statistics/bs-home-statistics/queryStatistics',
    method: 'get'
  })
}
// 根据code查询医生排版列表
export function queryDoctorSchedul() {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/statistics/bs-home-statistics/queryDoctorSchedulingByCode',
    method: 'get'
  })
}

// 曲线统计-统计每天在线问诊、每日签约、新增用户（管理员）
export function queryslist() {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/statistics/bs-home-statistics/queryNewStatistics',
    method: 'get'
  })
}
// 医生随访数（管理员）
export function queryStatisticsFlupDetail(params) {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/statistics/bs-home-statistics/queryStatisticsFlupDetail',
    method: 'post',
    data: JSON.stringify(params)
  })
}
// 医生宣教数（管理员）
export function queryStatisticsGuardDetail(params) {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/statistics/bs-home-statistics/queryStatisticsGuardDetail',
    method: 'post',
    data: JSON.stringify(params)
  })
}
// 医生问诊数（管理员）
export function queryStatisticsInquiryDetail(params) {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/statistics/bs-home-statistics/queryStatisticsInquiryDetail',
    method: 'post',
    data: JSON.stringify(params)
  })
}
// 今日新增数据（管理员）
export function queryTodayNewStatistics() {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/statistics/bs-home-statistics/queryTodayNewStatistics',
    method: 'get',
  })
}
// 疾病分类-饼图（管理员）
export function queryDiseaseSort(){
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url:"/statistics/bs-home-statistics/queryDiseaseSort",
    method: 'get',
  })
}
// 在线问诊率排行榜（管理员）
export function queryInqueryLeaderBoard() {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: "/statistics/bs-home-statistics/queryInqueryLeaderBoard",
    method: 'get',
  })
}

export function getAdCode(params) {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/statistics/getAdCode',
    method: 'post',
    data: JSON.stringify(params)
  })
}

export function getProvinces() {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/statistics/getProvinces',
    method: 'get'
  })
}

export function getCitys(param) {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/statistics/getCitys/'+param,
    method: 'get'
  })
}

export function getDistricts(param) {
  return request({
    headers: { uCode: sessionStorage.getItem("ucode") },
    url: '/statistics/getDistricts/'+param,
    method: 'get'
  })
}
