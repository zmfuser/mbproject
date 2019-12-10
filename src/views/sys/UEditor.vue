<template>
  <div class="components-container">
    <div class="suifang app-container" ref="box">
      <el-form class="addDdoc" :model="form" :rules="rules">
        <el-form-item label="标题：" class="title" prop="title">
          <el-input placeholder="请输入标题" :required="true" v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="标题图片：" class="title" prop="titleImage">
          <!-- <div class="postionImg"> -->
          <el-upload
            class="avatar-uploader"
            action
            :auto-upload="false"
            :show-file-list="false"
            :on-change="beforeAvatarUpload"
            multiple
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <!-- </div> -->
        </el-form-item>
        <div style="padding:20px 0; ">
          <!-- <label>所属分类:</label> -->
          <el-form-item label="所属分类：" prop="articleType">
            <el-select v-model="form.articleType" placeholder="请选择">
              <el-option
                v-for="item in optionsArticleType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="padding:20px 0; ">
          <!-- <label>推送人群</label> -->
          <el-form-item label="推送人群：" prop="pushCrowd">
            <el-select v-model="form.pushCrowd" placeholder="请选择">
              <el-option
                v-for="item in optionsPushCrowd"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 文章内容 -->
        <div>
          <div class="editor-container">
            <UEditor :config="config" ref="ueditor"></UEditor>
          </div>
        </div>
        <div style="text-align:center;margin-top:10px;" v-show="tOrfShowPhone">
          <el-button size="medium" type="success" @click="getContent()">创建文章</el-button>
          <el-button size="medium" type="warning" @click="saveDraft">保存草稿</el-button>
          <el-button size="medium" type="info" @click="showPhone()">预览</el-button>
        </div>
      </el-form>
    </div>
    <div class="dialog">
      <el-dialog width="423px" :visible.sync="dialogVisible" close-on-click-modal>
        <div class="view">
          <img src="../../../static/img/shouji_moxin_bai@2x.png" alt />
          <div class="content">
            <div class="article_head">
              <div class="article_img">
                <img :src="phoneView.avatar" alt />
              </div>
              <div class="article_content">
                <div>
                  <span class="name">{{phoneView.doctorName}}</span>
                  <span class="department">{{phoneView.departmentLevel1Name}}</span>
                </div>
                <div>
                  <span class="hospital">{{phoneView.hospitalName}}</span>
                  <span class="team">{{phoneView.hospitalName}}</span>
                </div>
                <div class="adept" title="擅长：医学博士，2010年获取博士学位，擅长培养房价低首付几点上飞机啊">
                  <span>{{phoneView.remark}}</span>
                </div>
              </div>
            </div>
            <div v-html="articleContent"></div>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import UEditor from "@/components/ueditor/ueditor.vue";
import { uploadFile } from "@/api/sys/client.js";
import { saveOrUpdate } from "@/api/article/BsHealthGuard.js";
import { findDoctor } from "@/api/im/checkIm.js";
export default {
  name: "hello",
  components: { UEditor },
  data() {
    return {
      rules: {
        title: [{ required: true, message: "标题不能为空" }],
        titleImage: [{ required: true, message: "标题图片不能为空" }],
        articleType: [{ required: true, message: "所属分类不能为空" }],
        pushCrowd: [{ required: true, message: "推送人群不能为空" }]
      },
      phoneView: {},
      dialogVisible: false,
      form: {
        pushCrowd: "",
        title: "",
        articleType: ""
      },
      articleContent: "",
      imageUrl: "",
      options: [],
      optionsArticleType: [
        { value: 1, label: "糖尿病 " },
        { value: 3, label: "冠心病 " },
        { value: 2, label: "高血压 " },
        { value: 4, label: "慢阻肺" },
        { value: 0, label: "其他" }
      ],
      optionsPushCrowd: [
        { value: 1, label: "糖尿病 " },
        { value: 3, label: "冠心病 " },
        { value: 2, label: "高血压 " },
        { value: 4, label: "慢阻肺" },
        { value: 0, label: "所有人" }
      ],
      priviewPhone: false,
      medicationCompliance: "",

      config: {
        //可以在此处定义工具栏的内容
        // toolbars: [
        //  ['fullscreen', 'undo', 'redo','|','bold', 'italic', 'underline',
        //  '|','superscript','subscript','|', 'insertorderedlist', 'insertunorderedlist',
        //  '|','fontfamily','fontsize','justifyleft','justifyright','justifycenter','justifyjustify']
        // ],
        autoHeightEnabled: false,
        autoFloatEnabled: true,
        initialContent: "请输入内容", //初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
        autoClearinitialContent: true, //是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
        initialFrameWidth: null,
        initialFrameHeight: 450,
        BaseUrl: "",
        UEDITOR_HOME_URL: "static/ueditor/"
      },
      addFormVisible: false
    };
  },
  created() {},
  methods: {
    beforeAvatarUpload(file) {
      var formData = new FormData();
      formData.append("file", file.raw);
      uploadFile(formData).then(res => {
        this.imageUrl = res.value;
      });
    },
    // 预览
    showPhone() {
      let _this = this;
      let content = _this.$store.state.user.dataUser.id;
      if (content == 1) {
        _this.$set(_this, "phoneView", _this.$store.state.user.dataUser);
        _this.phoneView.doctorName=_this.$store.state.user.dataUser.name
      } else {
        findDoctor({ doctorCode: content }).then(res => {
          _this.$set(_this, "phoneView", res.value[0]);
          _this.$set(
            _this.phoneView,
            "avatar",
            _this.$store.state.user.dataUser.avatar
          );
          console.log(_this.phoneView);
        });
      }

      _this.articleContent = _this.$refs.ueditor.getUEContent();

      _this.dialogVisible = true;
    },
    tOrfShowPhone() {},
    // 保存为草稿
    saveDraft() {
      let _this = this;
      _this.articleContent = _this.$refs.ueditor.getUEContent();
      _this.form.articleContent = _this.articleContent;
      _this.form.dataStatus = 0;
      _this.form.titleImage = _this.imageUrl;
      saveOrUpdate(_this.form).then(res => {
        if (res.code == 0) {
          _this.$message.success(res.msg);
          _this.$router.push("/BsHealthGuard");
        } else {
          _this.$message.error(res.msg);
        }
      });
    },
    //获取文档内容、创建文章
    getContent() {
      let _this = this;
      _this.articleContent = _this.$refs.ueditor.getUEContent();
      _this.form.articleContent = _this.articleContent;
      _this.form.titleImage = _this.imageUrl;
      saveOrUpdate(_this.form).then(res => {
        if (res.code == 0) {
          _this.$message.success(res.msg);
          _this.$router.push("/BsHealthGuard");
        } else {
          _this.$message.error(res.msg);
        }
      });
    }
  }
};
</script>
<style scoped>
.el-dialog__body .view > img {
  width: 100%;
  height: 750px;
}
.dialog >>> .el-dialog {
  background: transparent;
  box-shadow: none;
}
.dialog >>> .el-dialog__header {
  background-color: transparent;
}
.dialog >>> .el-dialog__headerbtn .el-dialog__close {
  color: transparent;
}
.view {
  position: relative;
}
.content {
  width: 337px;
  height: 583px;
  background: #fff;
  position: absolute;
  top: 88px;
  left: 23px;
  overflow-y: auto;
}
.article_head {
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  /* font-size: 1rem; */
}

.article_head > .article_content,
.article_img {
  display: inline-block;
}

.article_head > .article_content {
  width: 75%;
}

.article_head .article_img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 1px solid #ddd;
  text-align: center;
  line-height: 60px;
}

.article_head .article_img > img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.article_content > div {
  margin-top: 10px;
}

.article_head .article_content .name {
  color: #333;
  /* font-size: 16px; */
  padding-right: 12px;
}

.article_head .article_content .department {
  color: #666;
  font-size: 16px;
}

.article_head .article_content .hospital {
  color: #666;
  /* font-size: 16px; */
  padding-right: 12px;
}

.article_head .article_content .team {
  color: #666;
  /* font-size: 16px; */
  padding-left: 12px;
}

.article_head .article_content .adept {
  color: #666;
  /* font-size: 16px; */
  text-overflow: ellipsis;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
.content >>> .video-js {
  max-width: 354px !important;
}
.content >>> img {
  max-width: 337px !important;
}

.title >>> .el-input {
  width: 50%;
  margin-left: 20px;
}

.addDdoc >>> .el-textarea__inner {
  height: 120px;
}

.addDdoc >>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.addDdoc >>> .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.addDdoc >>> .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}

.addDdoc >>> .avatar {
  width: 150px;
  height: 150px;
  display: block;
}

.edit_container {
  margin-top: 11px;
}
.components-container label {
  font-weight: normal;
}
.components-container >>> .edui-default .edui-editor {
  z-index: 100 !important;
}
</style>
