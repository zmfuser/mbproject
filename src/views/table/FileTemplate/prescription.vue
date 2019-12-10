<template>
  <div class="fitTable base padd">
    <div class="fitPlan">
      <div class="Center">健康管理计划</div>
      <div class="title">
        <div class="titleLeft">
          <div>
            指导医师：
            <span>{{fitRow.doctorName}}</span>
          </div>
          <div>
            健康助理：
            <span>{{fitRow.healthAssistantName}}</span>
          </div>
        </div>
        <div class="titleRight">
          <div>
            手机号码：
            <span>{{form.phone}}</span>
          </div>
          <div>
            日期：
            <span>{{getDate | time}}</span>
          </div>
        </div>
      </div>
      <div class="subTitle">
        <div class="basetile">
          <div>
            姓名：
            <span>{{fitRow.userName}}</span>
          </div>
          <div>
            性别：
            <span>{{fitRow.userSex | conplateSex}}</span>
          </div>
          <div>
            年龄：
            <span>{{fitRow.userAge}}</span>
          </div>
          <div>
            身份证号：
            <span>{{fitRow.userCard}}</span>
          </div>
          <div>
            慢病档案号：
            <span>{{fitRow.archivesCode}}</span>
          </div>
        </div>
        <div class="believe">
          <p>
            尊敬的
            <span>{{fitUame}}</span>老师，感谢您对我中心的信任，目前对您的健康风险评估结果分析后，为您量身定制一套逐渐完善的慢病管理计划。
          </p>
          <p>为了您的健康，降低您的其他疾病的风险，我们携手共同努力，主要从饮食、运动、睡眠与心理三个方面循环渐进、全程全面进行慢病管理。</p>
        </div>
      </div>
      <div>
        <el-button type="warning" @click="dialogVisible=true" size="mini">使用模板</el-button>
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
              maxlength="1000"
              show-word-limit
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
              maxlength="1000"
              show-word-limit
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
              maxlength="1000"
              show-word-limit
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
              maxlength="1000"
              show-word-limit
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
              maxlength="1000"
              show-word-limit
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
              maxlength="1000"
              show-word-limit
            ></el-input>
          </div>
        </div>
      </div>
      <div class="bigBTN">
        <el-button class="createBG" @click="Create(0)">创建处方</el-button>
        <el-button class="saveBG" @click="save(1)">保存草稿</el-button>
      </div>
      <el-dialog :visible.sync="dialogVisible" title="选择模板">
        <el-input size="mini" v-model="pageQuery.templateName"  clearable style="width:200px" placeholder="模板名称" @clear="getListData"></el-input>
        <el-button type="success" size="mini" @click="getListData">查询</el-button>
        <el-table
          :data="list"
          border
          fit
          size="mini"
          highlight-current-row
          style="width: 100%; margin-top:15px"
        >
          <el-table-column label="序号" type="index" align="center"></el-table-column>
          <el-table-column label="模板名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.templateName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="模板说明" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.templateDescription }}</span>
            </template>
          </el-table-column>
          <el-table-column label="所属病种" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.diseaseType }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="toEdit(scope.row)">使用该模板</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="text-align:center;">
          <pagination
            :total="pageQuery.total"
            :page.sync="pageQuery.page"
            :limit.sync="pageQuery.limit"
            @pagination="getListData"
          />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import html2canvas from "html2canvas";
import { savefitPlan, queryTemplateList,queryTemplateInfo } from "@/api/sys/base.js";
export default {
  data() {
    return {
      list: [],
      pageQuery: {
        total: 0,
        page: 1,
        limit: 10,
        templateName: "",
        
      },
      dialogVisible: false,
      form: {
        archivesCode: "",
        doctorName: "",
        archivesNumber: "",
        doctorCode: "",
        dataStatus: "",
        healthAssistant: "",
        healthAssistantCode: "",
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
      fitRow: {},
      fitUame: "",
      getDate: new Date(),
      user: this.$store.state.user.dataUser
    };
  },
  mounted() {
    let _this = this;
    // 接受主表参数
    _this.fitRow = JSON.parse(sessionStorage.getItem("fitRow"));
    _this.fitUame = _this.fitRow.userName.slice(0, 1);
    // 接受医生的手机号
    _this.form.phone = _this.user.mobile;
    _this.getListData();
  },
  methods: {
    //  存储基本信息到form中
    createMsg() {
      let _this = this;
      _this.form.archivesNumber = _this.fitRow.archivesCode;
      _this.form.sex = _this.fitRow.userSex;
      _this.form.age = _this.fitRow.userAge;
      _this.form.doctorName = _this.fitRow.doctorName;
      _this.form.healthAssistant = _this.fitRow.healthAssistantName;
      _this.form.healthAssistantCode = _this.fitRow.healthAssistantCode;
      _this.form.cardId = _this.fitRow.userCard;
      _this.form.userName = _this.fitRow.userName;
      _this.form.archivesCode = _this.fitRow.code;
      _this.form.doctorCode = _this.fitRow.doctorCode;
      _this.form.baseCount = `尊敬${_this.fitUame}老师，感谢您对我中心的信任，目前对您的健康风险评估结果分析后，为您量身定制一套逐渐完善的慢病管理计划。
    为了您的健康，降低您的其他疾病的风险，我们携手共同努力，主要从饮食、运动、睡眠与心理三个方面循环渐进、全程全面进行慢病管理。`;
    },
    // 创建慢病处方
    Create(val) {
      this.createMsg();
      this.form.dataStatus = val;
      let fitPlan = this.form;
      savefitPlan(fitPlan).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.$router.push("/healthplan");
        } else if (res.code == -1) {
          this.$message.error(res.meg);
        }
      });
    },
    // 获取模板列表数据
    getListData() {
      let _this = this;
      queryTemplateList(this.pageQuery).then(res => {
        if (res.code == 0) {
          _this.$set(_this, "list", res.value.records);
          _this.pageQuery.total = res.value.total;
          _this.pageQuery.page = res.value.current;
          _this.pageQuery.limit = res.value.size;
        }
        console.log(res);
      });
    },
    // 保存慢病处方
    save(val) {
      this.createMsg();
      this.form.dataStatus = val;
      let fitPlan = this.form;
      savefitPlan(fitPlan).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.$router.push("/manB/healthplan");
        } else if (res.code == -1) {
          this.$message.error(res.meg);
        }
      });
    },
    // 使用模板
    toEdit(scope) {
      let _this=this
      if (scope.code) {
         queryTemplateInfo(scope.code).then(res=>{
           if (res.code==0) {
             _this.form.conditionDesc=res.value.conditionDesc;
             _this.form.diet=res.value.diet;
             _this.form.motion=res.value.motion;
             _this.form.psychological=res.value.psychological;
             _this.form.nursing=res.value.nursing;
             _this.form.suggest=res.value.suggest;
             _this.dialogVisible=false;
           }
      })
      }
     
    }
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
.case {
  position: relative;
}
.fontFloat {
  position: absolute;
  bottom: 0;
  right: 16px;
  color: #a6a6a6;
}
</style>
