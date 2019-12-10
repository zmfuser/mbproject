<template>
  <div>
    
    <div class="fitTable base padd" id="div_print">
      <div class="fitPlan">
            <el-form >
              <el-form-item label="模板名称:" style="padding-top:10px;">
              <el-row>
                <el-col :md="6" :sm="12" :xs="24">
                <el-input    v-model="templateName" type="text"></el-input>
                </el-col>
              </el-row>
              </el-form-item>
              <el-form-item label="模板描述:">
              <el-row>
                <el-col :md="6" :sm="12" :xs="24">
                <el-input  v-model="templateName" type="textarea" :rows="4"></el-input>
                </el-col>
              </el-row>
              </el-form-item>
              <el-form-item label="所属病种:">
              <el-row>
                <el-col :md="6" :sm="12" :xs="24">
                <el-input    v-model="templateName" type="text"></el-input>
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
                  {{form.conditionDesc}}
                </div>
              </div>

              <div class="case">
                <div>个性化饮食指导</div>
                <div class="formDiv">
                  {{form.diet}}
                </div>
              </div>

              <div class="case">
                <div>个性化运动指导处方</div>
                <div class="formDiv">
                  {{form.motion}}
                </div>
              </div>

              <div class="case">
                <div>心理与情绪指导处方</div>
                <div class="formDiv">
                  {{form.psychological}}
                </div>
              </div>

              <div class="case">
                <div>日常自我护理</div>
                <div class="formDiv">
                  {{form.nursing}}
                </div>
              </div>

              <div class="case">
                <div>跟踪随访建议</div>
                <div class="formDiv">

                  {{form.suggest}}
                </div>
              </div>
            </div>
          </div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hide:true,
      templateName:"",
      form: {
        code: "",
        archivesCode: "",
        doctorName: "",
        doctorCode: "",
        dataStatus: "",
        healthAssistant: "",
        phone: "",
        userName: "",
        sex: "",
        age: "",
        cardId: "",
        baseCount: "",
        conditionDesc: "",
        diet: "",
        motion: "",
        psychological: "",
        nursing: "",
        suggest: ""
      }
    };
  },
  mounted() {
    let _this = this;
    // 接受慢病处方列表的json
    _this.form = JSON.parse(sessionStorage.getItem("YRow"));
  },
  methods: {
  }
};
</script>

<style scoped>
.formDiv {
  height: 300px;
  border: 1px solid #ddd;
  padding: 5px 5px;
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

</style>
