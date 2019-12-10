<template>
  <div class="app-container">
    <div style="width:100%;height:350px;text-align:center" v-show="showCanvas">
      <canvas
        id="canvas"
        width="1100"
        height="350"
        style="border:1px solid #ccc;"
        @mousedown="canvasDown($event)"
        @mousemove="canvasMove($event)"
        @mouseup="canvasUp($event)"
        @mouseleave="canvasLeave($event)"
        ref="canvas"
      >抱歉，您的浏览器不支持canvas元素</canvas>
    </div>
    <div v-if="ImgSrcShow"  style="width:100%;height:350px;text-align:center;margin-top:15px">
      <img title="上传的图片" id="previewImg" :src="priveImgSrc" alt style="width:1100px ;height:100%" />
    </div>
    <div class="center" v-if="showCanvas">
      <el-button @click="pictureConfire" type="success">上传签名</el-button>
      <el-button @click="clear" type="warning">清空</el-button>
    </div>
    <div class="center" >
      <el-button v-if="updateButton" @click="changImg" type="warning">修改签名</el-button>
    </div>
  </div>
</template>

<script>
import html2canvas from "html2canvas";
import { getInfo } from '@/api/login'
import { uploadFile, updateDoctorAutograph } from "@/api/sys/client.js";
export default {
  data() {
    return {
      canvasMoveUse: false,
      ImgSrc: "",
      priveImgSrc: "",
      showCanvas: true,
      ImgSrcShow: true,
      updateButton: true
    };
  },
  mounted() {
    this.showOrhide();
    this.show();
  },
  methods: {
    // 修改签名
    changImg() {
      let _this = this;
      _this.showCanvas = true;
      _this.updateButton = false;
      _this.ImgSrcShow = false;
     this.show();
    },
    // 是否有图片
    showOrhide() {
      let _this = this;
      if (_this.$store.state.user.dataUser.doctorAutographUrl) {
        _this.priveImgSrc = _this.$store.state.user.dataUser.doctorAutographUrl;
        _this.showCanvas = false;
      }else{
        _this.updateButton = false;
        _this.ImgSrcShow = false;
      }
    },
    show() {
      this.canvas = this.$refs.canvas; //指定canvas
      this.ctx = this.canvas.getContext("2d"); //设置2D渲染区域
      this.ctx.lineWidth = 5; //设置线的宽度
    },
    canvasDown(e) {
      this.canvasMoveUse = true;
      const beginx = e.offsetX;
      const beginy = e.offsetY;
      // const canvasX = e.clientX - e.target.offsetLeft;
      // const canvasY = e.clientY - e.target.offsetTop + document.documentElement.scrollTop;
      // this.ctx.beginPath(beginx,beginy);  // 移动的起点
      // this.ctx.moveTo(canvasX, canvasY);
      this.ctx.beginPath(beginx, beginy); // 移动的起点
      // this.ctx.moveTo(beginx, beginy);
    },
    canvasMove(e) {
      if (this.canvasMoveUse) {
        // 只有允许移动时调用
        const t = e.target;
        let canvasX;
        let canvasY;
        const beginx = e.offsetX;
        const beginy = e.offsetY;
        // canvasX = e.clientX - t.offsetLeft;
        // canvasY = e.clientY - t.offsetTop + document.documentElement.scrollTop;
        // this.ctx.beginPath(beginx,beginy)
        this.ctx.lineTo(beginx, beginy);
        this.ctx.stroke();
      }
    },
    canvasUp(e) {
      this.canvasMoveUse = false;
    },
    canvasLeave(e) {
      this.canvasMoveUse = false;
    },
    // 确认签名
    pictureConfire() {
      let _this = this;
    
      let canvasID = document.getElementById("canvas");
      // let img = document.createElement("img");
      html2canvas(canvasID).then(canvas => {
        var ImgSrc = canvas.toDataURL("image/png");
        var a = this.dataURLtoFile(ImgSrc);
        var formData = new FormData();
        formData.append("file", a);
        uploadFile(formData).then(res => {
          if (res.code == 0) {
            let obj = {
              singUrl: `${res.value}`
            };
            _this.priveImgSrc=res.value;
            updateDoctorAutograph(obj).then(res => {
              if (res.code == 0) {
                _this.$message.success(res.msg);
                _this.showCanvas=false;
                _this.ImgSrcShow=true;
                _this.updateButton=true;
                _this.changeIMgUrl();
              }
            });
          }
        });
      });
    },
    // 跟新签名url
    changeIMgUrl(){
      let _this=this;
      getInfo().then(res=>{
        if (res.code==0) {
          _this.priveImgSrc=res.value.doctorAutographUrl
        }
      })
    },
    // 转文件流
    dataURLtoFile(dataurl, filename = "file") {
      let arr = dataurl.split(",");
      let mime = arr[0].match(/:(.*?);/)[1];
      let suffix = mime.split("/")[1];
      let bstr = atob(arr[1]);
      let n = bstr.length;
      let u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], `${filename}.${suffix}`, { type: mime });
    },

    // 清空
    clear() {
    
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }
};
</script>

<style scoped>
.line {
  text-align: center;
}
.center {
  text-align: center;
}
</style>
