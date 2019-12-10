import { MessageBox } from 'element-ui';
import { Message } from 'element-ui';
export default{
  install (Vue, opt) {
    Vue.prototype.usual = {
      // 删除行
      delRow:function(index, rows){      
        if(rows.length==1){
          Message({
            type: 'warning',
            message: "最后一个不可删除",
          });
        }else{
          rows.splice(index, 1);
        }
      },
      // 添加行
      addRow:function(table,type){
        table.push({dataType:type.dataType,historyType:type.historyType});
      },
      // 提示弹窗
      popUP:function(title,type,msgS,msgI){
        MessageBox.confirm(title, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: type,
          }).then((val) => {
            Message({
              type: 'success',
              message: msgS,
            });
          }).catch(() => {
            Message({
              type: 'info',
              message: msgI,
            });         
          });
      },
      //将数组转成字符串形式 
      changeString:function(val){
        let family=""
        family=val.join("/");
        return {family}
      },
  }
}
}