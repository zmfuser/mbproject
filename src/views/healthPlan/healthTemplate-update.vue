<template>
  <div>
    <div class="fitTable base padd" id="div_print">
      <div class="fitPlan">
        <el-form>
          <el-form-item label="模板名称:" style="padding-top:10px;">
            <el-row>
              <el-col :md="6" :sm="12" :xs="24">
                <el-input  placeholder="请输入模板名称" v-model="form.templateName" type="text"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="模板描述:">
            <el-row>
              <el-col :md="6" :sm="12" :xs="24">
                <el-input
                  placeholder="模板描述"
                  v-model="form.templateDescription"
                  type="textarea"
                  :rows="4"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="所属病种:">
            <el-row>
              <el-col :md="6" :sm="12" :xs="24">
                <el-input placeholder="所属病种" v-model="form.diseaseType" type="text"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
        <div class="state">
          <div class="case">
            <div>
              <span>*</span>病情概述
            </div>
            <div class="formDiv">
              <el-input type="textarea" placeholder="请输入内容" v-model="form.conditionDesc"></el-input>
            </div>
          </div>

          <div class="case">
            <div>个性化饮食指导</div>
            <div class="formDiv">
              <el-input type="textarea" placeholder="请输入内容" v-model="form.diet"></el-input>
            </div>
          </div>

          <div class="case">
            <div>个性化运动指导处方</div>
            <div class="formDiv">
              <el-input type="textarea" placeholder="请输入内容" v-model="form.motion"></el-input>
            </div>
          </div>

          <div class="case">
            <div>心理与情绪指导处方</div>
            <div class="formDiv">
              <el-input type="textarea" placeholder="请输入内容" v-model="form.psychological"></el-input>
            </div>
          </div>

          <div class="case">
            <div>日常自我护理</div>
            <div class="formDiv">
              <el-input type="textarea" placeholder="请输入内容" v-model="form.nursing"></el-input>
            </div>
          </div>

          <div class="case">
            <div>跟踪随访建议</div>
            <div class="formDiv">
              <el-input type="textarea" placeholder="请输入内容" v-model="form.suggest"></el-input>
            </div>
          </div>
          <!-- <div class="subTitle textaligncenter">
            <el-button type="success" @click="saveTempelate(0)">创建模板</el-button>
            <el-button type="warning" @click="saveTempelate(2)">保存草稿</el-button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveOrUpdate, queryTemplateInfo } from "@/api/healthplan/healthplan";

export default {
  data() {
    return {
      hide: true,
      editHealthTemplate: {},
      templateName: "",
      form: {
        dataStatus: "",
        conditionDesc: "",
        diet: "",
        motion: "",
        psychological: "",
        nursing: "",
        suggest: "",
        templateName: "",
        templateDescription: "",
        diseaseType: "",
        diseaseCode: ""
      }
    };
  },
  mounted() {
    let _this = this;
    this.$set(
      this,
      "editHealthTemplate",
      JSON.parse(sessionStorage.getItem("editHealthTemplate"))
    );
    this.getEditData();
  },
  methods: {
   
    // 编辑获取数据
    getEditData() {
      let _this = this;
      if (_this.editHealthTemplate.code) {
        queryTemplateInfo(_this.editHealthTemplate.code).then(res => {
          if (res.code == 0) {
            _this.$set(_this, "form", res.value);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.textaligncenter {
  text-align: center;
  padding-bottom: 12px;
}
.formDiv {
}
.fitTable {
  font-size: 14px;
  margin-top: 12px;
}
.title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  width: 98%;
  margin: 0 auto;
}
.titleLeft > div {
  padding-bottom: 12px;
}
.titleRight > div {
  padding-bottom: 12px;
}
.Center {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 15px;
}
.subTitle {
  padding-top: 12px;
}
.subTitle > .basetile {
  display: flex;
  justify-content: space-around;
}
.subTitle > .believe {
  text-align: center;
  padding: 15px;
  max-width: 1000px;
  margin: 0 auto;
  line-height: 1.5;
}
.case > div:first-child {
  border: 1px solid #ddd;
  font-size: 18px;
  color: #373737;
  text-align: center;
  padding: 5px 15px;
  background-color: #e4f8f5;
}

.case >>> .el-textarea__inner {
  min-height: 220px !important;
  outline: none !important;
}
.formDiv >>> .el-textarea {
  height: 100% !important;
}
</style>
