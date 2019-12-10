<template>
  <div class="form-group">
    <div class="control-form">
      <p class="help-block">(建议图片格式为：JPEG/BMP/PNG/GIF，大小不超过5M)</p>
      <ul class="upload-imgs">
        <li>
          <input
            type="file"
            class="upload"
            @change="addImg"
            ref="inputer"
            multiple
            accept="image/png, image/jpeg, image/gif, image/jpg"
          >
          <a class="add" @click="handleUpload">
            <i class="el-icon-plus"></i>
            <p>点击上传</p>
          </a>
        </li>
        <!-- 展示默认图片 -->
        <li v-for="(value, key) in setImgs" :key="value.code">
          <p class="img">
            <img :src="value">
            <a class="close" @click="delSImg(key)">×</a>
          </p>
        </li>
        <li v-for="(value, key) in imgs" :key="value.code">
          <p class="img">
            <img :src="getObjectURL(value)">
            <a class="close" @click="delImg(key)">×</a>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import {uploadFile} from "@/api/sys/client.js"
export default {
  data() {
    return {
      uploadimg:[],
      // api: {
      //   uploadUrl : "https://api.huaqueyun.com:1443/admin/setting/uploadFile"
      //   // uploadUrl : "http://192.168.1.238:13203/admin/setting/uploadFile"
      // },
      formData: new FormData(),
      setImgs:{},
      imgs: {},
      imgLen: 0
    };
  },
  // props: ["pSetImgUrl"],
  methods: {
    // setImgUrl(){
    //   //设置图片
    //   let _this = this;
    //   if (!_this.com.isNull(_this.pSetImgUrl)) {
    //     _this.setImgs = _this.pSetImgUrl;
    //   }
    // },
    handleUpload(){
      document.getElementsByClassName('upload')[0].click();
    },
    addImg(event) {
      let inputDOM = this.$refs.inputer;
      // 通过DOM取文件数据
      this.fil = inputDOM.files;
      let oldLen = this.imgLen;
      let len = this.fil.length + oldLen;
      // if(len>4){
      //   alert('最多可上传4张，您还可以上传'+(4-oldLen)+'张');
      //   return false;
      // }
      for (let i = 0; i < this.fil.length; i++) {
        let size = Math.floor(this.fil[i].size / 1024);
        if (size > 5 * 1024 * 1024) {
          alert("请选择5M以内的图片！");
          return false;
        }
        this.imgLen++;
        this.$set(
          this.imgs,
          this.fil[i].name + "?" + new Date().getTime() + i,
          this.fil[i]
        );
      }
    },
    getObjectURL(file) {
      var url = null;

      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }

      return url;
    },
    delImg(key) {
      this.$delete(this.imgs, key);
    },
    delSImg(key) {
      this.$delete(this.setImgs, key);
    },
    submit() {
      let _this = this;
      for (let key in this.imgs) {
        let name = key.split("?")[0];
        let formData = new FormData()
        formData.append("file", this.imgs[key], name);
        _this.fileUpload(formData)
      }

    },
    fileUpload(formData){
      let _this = this;
      uploadFile(formData).then(res=>{
        _this.uploadimg.push({imagesUrl:res.value})
        StFlookimg(_this.uploadimg)
      })
      // $.ajax({
      //   url: _this.api.uploadUrl,
      //   type: 'POST',
      //   cache: false,
      //   async:false,
      //   data: formData,
      //   processData: false,
      //   contentType: false,
      //   headers: _this.com.httpHeader(_this.$store.state)
      // }).done(function(data) {
      //   if (_this.com.isNull(data.data)) {
      //     return false;
      //   }
      //   // _this.imageUrl = data.httpUrl;
      //   //返回图片地址
      //   //用法：[图片名,src地址]
      //   _this.$emit("getAlbumUrl", [data.data, data.remark]);
      //   // _this.$emit("getImgUrl", [data.name, _this.imageUrl]);
      // }).fail(function(data) {});
    },
    StFlookimg(value){
      this.$emit("orpushfile",value)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.help-block{
  font-size: 14px
}
.upload-imgs {
  margin: 10px 0 30px 0;
  overflow: hidden;
  font-size: 0;
}
.upload-imgs li {
  position: relative;
  width: 118px;
  height: 118px;
  font-size: 14px;
  display: inline-block;
  padding: 10px;
  margin-bottom: 25px;
  margin-right: 25px;
  border: 2px dashed #ccc;
  text-align: center;
  vertical-align: middle;
}
/* .upload-imgs li:hover {
  border-color: $them-color;
} */
.upload-imgs .add {
  display: block;
  background-color: #ccc;
  color: #ffffff;
  height: 94px;
  padding: 8px 0;
  cursor: pointer;
}
.upload-imgs .add .iconfont {
  padding: 10px 0;
  font-size: 40px;
}
/* .upload-imgs li:hover .add {
  background-color: $them-color;
} */
.upload-imgs li .upload {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 118px;
  height: 118px;
  display:none;
}
.upload-imgs .img {
  position: relative;
  width: 118px;
  height: 118px;
  line-height: 118px;
}
.upload-imgs .img img {
  vertical-align: middle;
  width: 118px;
  height: 118px;
}
.upload-imgs .img .close {
  display: none;
}
.upload-imgs li:hover .img .close {
  cursor: pointer;
  display: block;
  position: absolute;
  right: -6px;
  top: -10px;
  line-height: 1;
  font-size: 22px;
  color: #aaa;
}

@media only screen and (max-width: 768px) {
  /* 手机端 */
}
</style>
