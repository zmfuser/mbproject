<template>
  <div class="components-container">
    <pan-thumb :image="image"/>
    <el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 40px;"
               @click="imagecropperShow=true">更换头像
    </el-button>

    <my-upload field="file"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-show="imagecropperShow"
               :width="300"
               :height="300"
               :url="baseUrl+'/index/upload-file'"
               img-format="png"></my-upload>
    <br>
    <br>
    <br>
  </div>
</template>

<script>
  import ImageCropper from '@/components/ImageCropper'
  import PanThumb from '@/components/PanThumb'
  import myUpload from 'vue-image-crop-upload'

  export default {
    name: 'AvatarUploadDemo',
    components: {myUpload, PanThumb},
    data() {
      return {
        imagecropperShow: false,
        baseUrl: process.env.BASE_API,
        imagecropperKey: 0,
        image: this.$store.state.user.avatar
      }
    },
    methods: {
      close() {
        this.imagecropperShow = false
      },
      cropSuccess(imgDataUrl, field) {
        console.log('-------- crop success --------');
        // this.image = imgDataUrl;
        // this.imagecropperShow = false
      },
      /**
       * upload success
       *
       * [param] jsonData   服务器返回数据，已进行json转码
       * [param] field
       */
      cropUploadSuccess(jsonData, field) {
        if (jsonData.code == 0) {
          this.imagecropperShow = false
          this.image = jsonData.value;
          //重新加载，更新store中user相关属性
          setTimeout(function(){
            location.reload();
          },1500);
        } else {
          this.$message.error(jsonData.msg);
        }
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field) {
        console.log('-------- upload fail --------');
        console.log(status);
        console.log('field: ' + field);
      }
    }
  }
</script>

<style scoped>
  .avatar {
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }

  .pan-thumb {
    width: 100%;
    height: 100%;
    background-size: 100%;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    transform-origin: 95% 40%;
    transition: all 0.3s ease-in-out;
  }
</style>

