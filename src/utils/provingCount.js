import { Message } from 'element-ui';
export default{
  install (Vue, options) {
    Vue.prototype.proving1 = function (e,type) {
        var keynum=window.event ? e.keyCode:e.which
        var keychar=String.fromCharCode(keynum)
        if(keynum==189||keynum==190||keynum==109){
          Message.warning("禁止输入负数")
          return e.target.value=""
        }
      }
    }
}