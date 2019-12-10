<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="user" label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="user.username"/>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="user.name"/>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="user.mobile"/>
      </el-form-item>
      <!-- <el-form-item label="性别" prop="gender">
        <el-radio v-for="item in genderList" v-model="user.gender" :label="item.value" :key="item">{{item.name}}</el-radio>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" :loading="submitLoading" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {saveUpdateEmployee} from "@/api/sys/employee";
  import {getList } from '@/api/sys/dict'
  import {validateMobile} from "@/utils/validate";
  export default {
    data() {
      return {
        user: this.$store.state.user.dataUser,
        genderList: [],
        submitLoading: false,
        rules: {
          username: [
            {required: true, message: '请输入账号'}
          ],
          name: [
            {required: true, message: '请输入姓名'}
          ],
          gender: [
            {required: true, message: '请选择性别'}
          ],
          mobile: [
            {required: true, message: '请输入手机号码'},
            {validator: validateMobile}
          ],
          email: [
            {required: true, message: '请输入邮箱'},
            {type: 'email', message: '请输入正确的邮箱'}
          ],
        },
      }
    },
    mounted(){
      getList({page: 1, limit: 10}).then(res => {
        // if (res.code == 0) {
        //   this.genderList = res.value;
        // }
      })
    },
    methods: {
      onSubmit() {
        var that = this;
        that.user.password=null;
        this.$refs.form.validate((valid) => {
          if (valid) {
            that.submitLoading = true;
            saveUpdateEmployee(that.user).then((res) => {
              that.submitLoading = false;
              if (res.code == 0) {
                that.$message.success("保存成功");
                //重新加载，更新store中user相关属性
                setTimeout(function(){
                  location.reload();
                },1500);
              } else {
                that.$message.error(res.msg);
              }
            })
          } else {
            return false;
          }
        });

      },
    }
  }
</script>

<style scoped>
  .line {
    text-align: center;
  }
</style>
