import store from '../store/index'
import $ from 'jquery'
export function parseTime(time, cFormat) {
  if(isEmpty(time)){
    return "";
  }
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}


export function hasPermission(permission) {
  let myPermissions = store.state.user.permissions;
  return myPermissions.indexOf(permission) > -1;
}
export function formatJson(filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => {
      return v[j]
  }))
}

export function lookBtn(value) {
  if(value==1){
    return true
  }else if(value==0){
    return false
  }
}


export function isEmpty(value){
  if (value == "" || value == null || value == undefined||value=={}||value=="undefined") {
    return true;
  }
  return false;
}

export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function apiExportExcel(url, title, json,callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', process.env.BASE_API+url, true);        // 也可以使用POST方式，根据接口
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.responseType = "blob";    // 返回类型blob
  // 定义请求完成的处理函数，请求前也可以增加加载框/禁用下载按钮逻辑
  xhr.onload = function () {
    // 请求完成

    if (this.status === 200) {
      callback(true);
      // 返回200
      var blob = this.response;
      var reader = new FileReader();
      reader.readAsDataURL(blob);    // 转换为base64，可以直接放入a表情href
      reader.onload = function (e) {
        // 转换完成，创建一个a标签用于下载
        var a = document.createElement('a');
        a.download = title + '.xlsx';
        a.href = e.target.result;
        $("body").append(a);    // 修复firefox中无法触发click
        a.click();
        $(a).remove();
      }
    } else {
      callback(false);
    }
  };
  if (!isEmpty(json)) {
    xhr.send(json);
  } else {
    xhr.send(null)
  }

}
