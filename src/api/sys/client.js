import request from '@/utils/request'

// 上传文件/图片
export function uploadFile(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url: '/sys/file/uploadFile',
    method: 'post',
    processData: false,// 告诉axios不要去处理发送的数据(重要参数)
    contentType: false,   // 告诉axios不要去设置Content-Type请求头
    data:params
  })
}

// 创建医生接口
export function createDoctor(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"/doctor/doctorManager/createDoctor",
    method: 'post',
    data:JSON.stringify(params)
  })
}

// 查询职称(所有)
export function selectPositionList(itemKey) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"utils/dict/getListByKey/"+itemKey,
    method: 'get',
  })
}


// 更新医生的密码
export function updataPwd(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"/doctor/doctorManager/updateDoctorPwd",
    method: 'post',
    data:JSON.stringify(params)
  })
}

// 修改医生信息
export function updataDoctor(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"/doctor/doctorManager/updateDoctor",
    method: 'post',
    data:JSON.stringify(params)
  })
}
// 修改医生信息doctor/doctorManager/updateDoctorAutograph
export function updateDoctorAutograph(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"/doctor/doctorManager/updateDoctorAutograph",
    method: 'post',
    data:JSON.stringify(params)
  })
}

// 删除医生
export function deleteDoctor(params) {
  return request({
    headers: {uCode: sessionStorage.getItem("ucode")},
    url:"/doctor/doctorManager/changeDoctorStatus",
    method: 'post',
    data:JSON.stringify(params)
  })
}

