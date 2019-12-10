import { Message } from 'element-ui';
export default{
  install (Vue, opt) {
    Vue.prototype.rules = {
      isNull:function(val,title,type){
        if ((val == "") || (val == undefined)) {
          Message({
          message: title,
          type: type
        });
        }
      },
      Checkcard:function(val,title,type){
        const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
        if (!val) {
          return Message({
            message: "身份证件号码不能为空",
            type: type
          });
        } else if (!reg.test(val)) {
          return Message({
            message: "身份证件号码不正确'",
            type: type
          });
        } 
      },
      Checkphone:function(val,title,type){
        let isMob =/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[012356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
        if (!isMob.test(val)) {
          return Message({
            message:"手机号码格式不正确",
            type:type
          })
        }
      }
    }
  }
}