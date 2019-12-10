export default{
  install (Vue, options) {
    Vue.prototype.doprint = function () {
      var div_print=document.getElementById("div_print");
      div_print.style.maxWidth="1000px"
      var newstr=div_print.innerHTML;
      var oldstr=document.body.innerHTML;
      document.body.innerHTML=newstr;
      window.print();
      window.location.reload();
      document.body.innerHTML=oldstr;
      return false
    }
  }
}