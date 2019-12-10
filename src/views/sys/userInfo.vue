<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane label="基本信息" key="info" name="info">
        <baseInfo/>
      </el-tab-pane>
      <el-tab-pane label="头像上传" key="upload" name="upload">
        <avatarUpload/>
      </el-tab-pane>
      <el-tab-pane label="重置密码" key="reset" name="reset">
        <resetPwd/>
      </el-tab-pane>
      <el-tab-pane label="签名" key="myName" name="myName">
        <myName/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import baseInfo from './info/base.vue'
  import avatarUpload from './info/avatarUpload.vue'
  import resetPwd from './info/resetPwd.vue'
  import myName from './info/myName.vue'
  export default {
    components: {baseInfo,avatarUpload,resetPwd,myName},
    data() {
      return {
        activeName: 'info',
      }
    },
    methods: {}
  }
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
