<template>
  <div>
   <div class="center"><h2>依从性评估</h2></div>
    <el-form>
      <el-row :gutter="20">
        <el-form-item>
          <div class="padL">戒烟及生活习惯依从性</div>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第一季度</div><el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第二季度</div><el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第三季度</div><el-input></el-input>
          </el-col>
        </el-form-item>
      </el-row>

            <el-row :gutter="20">
        <el-form-item>
          <div class="padL">咳痰喘症状检测依从性</div>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第一季度</div>
            <el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第二季度</div>
            <el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第三季度</div>
            <el-input></el-input>
          </el-col>
        </el-form-item>
      </el-row>


      <el-row :gutter="20">
        <el-form-item>
          <div class="padL">服药依从性</div>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第一季度</div>
            <el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第二季度</div>
            <el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第三季度</div>
            <el-input></el-input>
          </el-col>
        </el-form-item>
      </el-row>


      <el-row :gutter="20">
        <el-form-item>
          <div class="padL">血氧饱和度及肺功能检测依从性</div>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第一季度</div>
            <el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第二季度</div>
            <el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第三季度</div>
            <el-input></el-input>
          </el-col>
        </el-form-item>
      </el-row>


      <el-row :gutter="20">
        <el-form-item>
          <div class="padL">肺康复锻炼依从性</div>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第一季度</div>
            <el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第二季度</div>
            <el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第三季度</div>
            <el-input></el-input>
          </el-col>
        </el-form-item>
      </el-row>


      <el-row :gutter="20">
        <el-form-item>
          <div class="padL">家庭氧疗依从性</div>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第一季度</div>
            <el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第二季度</div>
            <el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第三季度</div>
            <el-input></el-input>
          </el-col>
        </el-form-item>
      </el-row>


      <el-row :gutter="20">
        <el-form-item>
          <div class="padL">其他</div>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第一季度</div>
            <el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第二季度</div>
            <el-input></el-input>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <div>第三季度</div>
            <el-input></el-input>
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item>
        <div>评价标准：</div>
        <el-col :md="6" :sm="12" :xs="24">
          <div>好：</div>
          <div>严格按照规定要求及医嘱执行</div>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <div>较好：</div>
          <div>70%以上按照规定要求及医嘱执行</div>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <div>一般：</div>
          <div>50%-70%按照规定要求及医嘱执行</div>
        </el-col>
        <el-col :md="6" :sm="12" :xs="24">
          <div>差：</div>
          <div>50%以下按照规定要求及医嘱执行</div>
        </el-col>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      myRules:rules
    };
  }
};
</script>

<style>
</style>
