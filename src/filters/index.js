exports.changeState = (n) => {
  switch (n) {
    case 0:
      return '已发布'
    case 1:
      return '草稿'
  }
}
exports.changesfstate = (n) => {
  switch (n) {
    case 0:
      return '草稿'
    case 1:
      return '建档完成'
  }
}
exports.inquiryType = (n) => {
  switch (n) {
    case 0:
      return '线上问诊'
    case 1:
      return '线下问诊'
  }
}

exports.complateState = (val) => {
  let statusName = ''
  switch (val) {
    case 0: {
      statusName = '待指派医生'
      break
    }
    case 1: {
      statusName = '待医生建档'
      break
    }
    case 2: {
      statusName = '建档完成'
      break
    }
    case 3: {
      statusName = '档案草稿'
      break
    }
    case 4: {
      statusName = '待建档'
      break
    }
  }
  return statusName
}

exports.conplateSex = (val) => {
  switch (val) {
    case 0:
      return '男'
    case 1:
      return '女'
  }
}

exports.Usedtodisable = (val) => {
  switch (val) {
    case 0:
      return '已经启用'
    case 1:
      return '被禁用'
  }
}

exports.dataStatus = (val) => {
  switch (val) {
    case 0:
      return '医生已读'
    case 1:
      return '医生未读'
  }
}
exports.hospitalOrg = (val) => {
  switch (val) {
    case 0:
      return '东区'
    case 1:
      return '西区'
  }
}

exports.appointmentStatus = (val) => {
  switch (val) {
    case 0:
      return '待问诊'
    case 2:
      return '已问诊'
    case 3:
      return '已结束'
    case 4:
      return '已取消'
    case 5:
      return '已过期'
  }
}
exports.outTimeType = (val) => {
  switch (val) {
    case 0:
      return '上午'
    case 1:
      return '下午'
  }
}
exports.SchedulingLogStatus = (val) => {
  switch (val) {
    case 0:
      return '已发布'
    case 1:
      return '草稿'
  }
}
exports.hostpitalLevel = (val) => {
  switch (val) {
    case 1:
      return '二级甲等'
    case 2:
      return '三级甲等'
    case 3:
      return '一级甲等'
    case 4:
      return '一级乙等'
    case 5:
      return '二级乙等'
    case 6:
      return '三级乙等'
  }
}

exports.InquiryType = (val) => {
  switch (val) {
    case 0:
      return '线上问诊'
    case 1:
      return '线下问诊'
  }
}
exports.inquiryStatus = (val) => {
  switch (val) {
    case 0:
      return '待医生补充内容'
    case 1:
      return '待评价'
    case 2:
      return '已评价'
    case 3:
      return '草稿'
  }
}

exports.sinType = (val) => {
  switch (val) {
    case 0:
      return '签约'
    case 1:
      return '变更'
  }
}

exports.marriage = (val) => {
  switch (val) {
    case 0:
      return '已婚'
    case 1:
      return '未婚'
  }
}

exports.userStatus = (val) => {
  switch (val) {
    case 0:
      return '有效'
    case 1:
      return '禁用'
  }
}

exports.SingStatus = (val) => {
  switch (val) {
    case 0:
      return '已签约'
    case 1:
      return '未签约'
  }
}
exports.checkStatus = (val) => {
  switch (val) {
    case 0:
      return '待受理'
    case 1:
      return '已受理'
    case 2:
      return '已受理'
  }
}
exports.changeSex = (val) => {
  switch (val) {
    case 0:
      return '保密'
    case 1:
      return '男'
    case 2:
      return '女'
  }
}
exports.selectState = (n) => {
  switch (n) {
    case 1:
      return '门诊'
    case 2:
      return '远程'
    case 3:
      return '上门'
  }
}

exports.changedepam = (n) => {
  if (n == 0) {
    return '一级科室'
  } else {
    return '二级科室'
  }
}

exports.articleStatus = (n) => {
  switch (n) {
    case 0:
      return '草稿'
    case 1:
      return '待审核'
    case 2:
      return '审核通过'
    case 3:
      return '审核失败'
  }
}
exports.articleType = (n) => {
  switch (n) {
    case '0':
      return '其他'
    case '1':
      return '糖尿病'
    case '2':
      return '高血压'
    case '3':
      return '冠心病'
    case '4':
      return '慢阻肺'
  }
}
exports.pushType = (n) => {
  switch (n) {
    case 1:
      return '用户端'
    case 2:
      return '医生端'
    case 3:
      return '所有'
  }
}
exports.healthStates = (n) => {
  switch (n) {
    case 0:
      return '启用'
    case 1:
      return '禁用'
    case 2:
      return '草稿'
  }
}

exports.sentUserType = (n) => {
  switch (n) {
    case '0':
      return '所有人'
    case '1':
      return '糖尿病'
    case '2':
      return '高血压'
    case '3':
      return '冠心病'
    case '4':
      return '慢阻肺'
  }
}
