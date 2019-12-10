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
      <div>
        <div class="case">
          <div>
            <span>*</span>病情概述
          </div>
          <div class="formDiv">
            <!-- <el-input  :disabled="true"  
              type="textarea"
              placeholder="请输入内容"
              v-model="form.conditionDesc"
              maxlength="1000" show-word-limit
            ></el-input> -->
            {{form.conditionDesc}}
          </div>
        </div>

        <div class="case">
          <div>个性化饮食指导</div>
          <div  class="formDiv">
            <!-- <el-input  :disabled="true"  
              type="textarea"
              placeholder="请输入内容"
              v-model="form.diet"
              maxlength="1000" show-word-limit
            ></el-input> -->
            {{form.diet}}
          </div>
        </div>

        <div class="case">
          <div>个性化运动指导处方</div>
          <div  class="formDiv">
            <!-- <el-input  :disabled="true"  
              type="textarea"
              placeholder="请输入内容"
              v-model="form.motion"
              maxlength="1000" show-word-limit
            ></el-input> -->
            {{form.motion}}
          </div>
        </div>

        <div class="case">
          <div>心理与情绪指导处方</div>
          <div class="formDiv">
            <!-- <el-input  :disabled="true"  
              type="textarea"
              placeholder="请输入内容"
              v-model="form.psychological"
              maxlength="1000" show-word-limit
            ></el-input> -->
            {{form.psychological}}
          </div>
        </div>

        <div class="case">
          <div>日常自我护理</div>
          <div class="formDiv">
            <!-- <el-input  :disabled="true"  
              type="textarea"
              placeholder="请输入内容"
              v-model="form.nursing"
              maxlength="1000" show-word-limit
            ></el-input> -->
            {{form.nursing}}
          </div>
        </div>

        <div class="case">
          <div>跟踪随访建议</div>
          <div class="formDiv">
            <!-- <el-input  :disabled="true"  
              type="textarea"
              placeholder="请输入内容"
              v-model="form.suggest"
              maxlength="1000"  show-word-limit
            ></el-input> -->
            {{form.suggest}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:["myfitplan"],
  data() {
    return {
      form: {},
    };
  },
  mounted() {
    this.$set(this,"form",this.myfitplan)
    },
  methods: {
      // printOut(name) {
      //     // 个人观察只是截取可见范围以及以下的区域，所以先将滚动条置顶
      //     $(window).scrollTop(0);  // jQuery 的方法
      //     document.body.scrollTop = 0; // IE的
      //     document.documentElement.scrollTop = 0; // 其他
      //     this.downloadResult(name)
      // },
  }
};
</script>

<style scoped>
.formDiv{
  height:300px;
  border:1px solid #ddd;
  padding:5px 5px
}
.fitTable {
  font-size: 16px;
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
  max-width:1000px;
  margin:0 auto;
  line-height: 2
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
.port{
  display: flex;
  width:1300px;
  margin:20px auto;
  justify-content: flex-end
}
.port>div{
  margin-right: 15px;
  cursor: pointer;
}
.port img{
  vertical-align: middle;
  margin-right:8px;
}
</style>
