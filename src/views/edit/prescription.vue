<template>
  <div class="fitTable base padd">
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
        <div class="believe">
          {{form.baseCount}}
        </div>
      </div>
      <div class="state">
        <div class="case">
          <div>
            <span>*</span>病情概述
          </div>
          <div>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.conditionDesc"
              maxlength="1000" show-word-limit
            ></el-input>
          </div>
        </div>

        <div class="case">
          <div>个性化饮食指导</div>
          <div>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.diet"
              maxlength="1000" show-word-limit
            ></el-input>
          </div>
        </div>

        <div class="case">
          <div>个性化运动指导处方</div>
          <div>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.motion"
              maxlength="1000" show-word-limit
            ></el-input>
          </div>
        </div>

        <div class="case">
          <div>心理与情绪指导处方</div>
          <div>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.psychological"
              maxlength="1000" show-word-limit
            ></el-input>
          </div>
        </div>

        <div class="case">
          <div>日常自我护理</div>
          <div>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.nursing"
              maxlength="1000" show-word-limit
            ></el-input>
          </div>
        </div>

        <div class="case">
          <div>跟踪随访建议</div>
          <div>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.suggest"
              maxlength="1000" show-word-limit
            ></el-input>
          </div>
        </div>
      </div>
      <div class="bigBTN">
        <el-button class="createBG" @click="Create(0)">创建处方</el-button>
        <el-button class="saveBG" @click="save(1)">保存草稿</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import html2canvas from "html2canvas";
import { savefitPlan } from "@/api/sys/base.js";
export default {
  data() {
    return {
      user: this.$store.state.user.dataUser,
      form: {
        code:"",
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
      },
    };
  },
  mounted() {
    let _this = this;
    // 接受慢病处方列表的json
    _this.form =JSON.parse(sessionStorage.getItem("planRow")) ;
    // 接受医生的手机号
    _this.form.phone =_this.user.mobile
  },
  methods: {
    // 创建慢病处方
    Create(val) {
      // this.createMsg()
      this.form.dataStatus = val;
      let fitPlan = this.form;
      savefitPlan(fitPlan).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.$router.push("/manB/healthplan")
        } else if (res.code == -1) {
          this.$message.error(res.meg);
        }
      });
    },
    // 保存慢病处方
    save(val) {
      this.form.dataStatus = val;
      let fitPlan = this.form;
      savefitPlan(fitPlan).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.$router.push("/manB/healthplan")
        } else if (res.code == -1) {
          this.$message.error(res.meg);
        }
      });
    },
  }
};
</script>

<style scoped>
.fitTable {
  font-size: 14px;
  margin-top: 12px;
}
.bigBTN {
  text-align: center;
  padding: 30px;
}
.createBG {
  background: #56c8ac;
  color: white;
  margin-right: 15px;
}
.saveBG {
  background-color: #f1c264;
  color: white;
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
  max-width:1000px;
  margin:0 auto;
  line-height: 1.5
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
