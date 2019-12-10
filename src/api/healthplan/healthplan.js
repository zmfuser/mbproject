
import request from '@/utils/request'
// 健康计划模板 - 1.我的健康计划模板--创建模板
// http://192.168.1.220:9528/base/base/healthPlanTemplate/bs-health-plan-template/saveOrUpdate
export function saveOrUpdate(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/healthPlanTemplate/bs-health-plan-template/saveOrUpdate',
    method: 'post',
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
// 健康计划模板 -  4.我的健康计划模板--模板导入
export function healthTemplateUpload(params){
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"healthPlanTemplate/bs-health-plan-template/healthTemplateUpload/",
    method:"post",
    processData: false,// 告诉axios不要去处理发送的数据(重要参数)
    contentType: false,   // 告诉axios不要去设置Content-Type请求头
    data:params
    // data:JSON.stringify(params)
  })
}