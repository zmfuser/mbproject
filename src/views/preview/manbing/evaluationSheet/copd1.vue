<template>
  <div id="pdfDom">
    <div><h3 ref="title">依从性</h3></div>
    <img class="eye" src="../../../static/browse_fill.png" alt="" ref="srcUrl" @click="allOpen">
    <el-collapse v-model="activeNames"  >
      <el-collapse-item title="戒烟及生活习惯依从性" name="1">
        <div>第一季度</div>
        <el-input></el-input>
        <div>第二季度</div>
        <el-input></el-input>
        <div>第三季度</div>
        <el-input></el-input>
      </el-collapse-item>
      <el-collapse-item title="咳痰喘症状检测依从性" name="2">
        <div>第一季度</div>
        <el-input></el-input>
        <div>第二季度</div>
        <el-input></el-input>
        <div>第三季度</div>
        <el-input></el-input>
      </el-collapse-item>
      <el-collapse-item title="服药依从性" name="3" >
        <div>第一季度</div>
        <el-input></el-input>
        <div>第二季度</div>
        <el-input></el-input>
        <div>第三季度</div>
        <el-input></el-input>
      </el-collapse-item>
      <el-collapse-item title="血氧饱和度及肺功能检测依从性" name="4">
        <div>第一季度</div>
        <el-input></el-input>
        <div>第二季度</div>
        <el-input></el-input>
        <div>第三季度</div>
        <el-input></el-input>
      </el-collapse-item>
      <el-collapse-item title="肺康复锻炼依从性" name="5">
        <div>第一季度</div>
        <el-input></el-input>
        <div>第二季度</div>
        <el-input></el-input>
        <div>第三季度</div>
        <el-input></el-input>
      </el-collapse-item>
      <el-collapse-item title="家庭氧疗依从性" name="6">
        <div>第一季度</div>
        <el-input></el-input>
        <div>第二季度</div>
        <el-input></el-input>
        <div>第三季度</div>
        <el-input></el-input>
      </el-collapse-item>
      <el-collapse-item title="其他" name="7" >
        <div>第一季度</div>
        <el-input></el-input>
        <div>第二季度</div>
        <el-input></el-input>
        <div>第三季度</div>
        <el-input></el-input>
      </el-collapse-item>
    </el-collapse>
    <!-- <el-button class="btn btn-primary" @click="getPdf()">导出pdf</el-button> -->
  </div>
</template>

<script>
export default {
  data(){
    return {
       activeNames: ["1"],
      //  htmlTitle:"pdf页面"
    }
  },
  methods:{
    allOpen(){
      if(this.activeNames!=""){
        this.activeNames=[""];
        this.$refs.srcUrl.src="../../../static/browse_fill.png"
      }else{
        this.activeNames=["1",'2','3',"4",'5','6',"7"]
        this.$refs.srcUrl.src="../../../static/browse.png"
      }
    },
  }
};
</script>

<style>
.eye{
  width:20px;
  cursor: pointer;
}

</style>
