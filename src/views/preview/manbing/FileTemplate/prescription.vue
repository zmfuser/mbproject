<template>
  <div>
    <div class="port">
      <!-- <div @click="doprint()">
        <img src="../../../../../static/png/print.png" alt>打印
      </div> -->
      <div @click="getPdf()" title="请导出成pdf在做打印处理">
        <img src="../../../../../static/png/export.png" >导出
      </div>
    </div>
    <div class="fitTable base padd" id="div_print">
      <div class="fitPlan">
            <div class="Center">健康管理计划</div>
            <div class="title">
              <div class="titleLeft">
                <div>
                  指导医师：
                  <span>{{form.doctorName}}</span>
                </div>
                <div>
                  健康助理：
                  <span>{{form.healthAssistant}}</span>
                </div>
              </div>
              <div class="titleRight">
                <div>
                  手机号码：
                  <span>{{form.phone}}</span>
                </div>
                <div>
                  日期：
                  <span>{{form.createTime | time}}</span>
                </div>
              </div>
            </div>
            <div class="subTitle">
              <div class="basetile">
                <div>
                  姓名：
                  <span>{{form.userName}}</span>
                </div>
                <div>
                  性别：
                  <span>{{form.sex | conplateSex}}</span>
                </div>
                <div>
                  年龄：
                  <span>{{form.age}}</span>
                </div>
                <div>
                  身份证号：
                  <span>{{form.cardId}}</span>
                </div>
                <div>
                  慢病档案号：
                  <span>{{form.archivesCode}}</span>
                </div>
              </div>
              <div class="believe">{{form.baseCount}}</div>
            </div>
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
.port {
  display: flex;
  width: 1300px;
  margin: 20px auto;
  justify-content: flex-end;
}
.port > div {
  margin-right: 15px;
  cursor: pointer;
}
.port img {
  vertical-align: middle;
  margin-right: 8px;
}
</style>
