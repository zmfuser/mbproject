<template>
  <div class="app-container">
    <el-form ref="form" :rules="rules" :model="pwd" label-width="120px">
      <el-form-item label="新密码" prop="password">
        <el-input type="password" v-model="pwd.password"/>
      </el-form-item>
        <el-form-item label="再次输入密码" prop="otherPassword">
        <el-input type="password" v-model="pwd.otherPassword"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="submitLoading" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {saveUpdateEmployee} from "@/api/sys/employee";

  export default {
    data() {
      return {
        submitLoading: false,
        pwd: {
          password: "",
          otherPassword: ""
        },
        rules: {
          password: [
            {required: true, message: '请输入密码'}
          ],
          otherPassword: [
            {required: true, message: '请再次输入密码'},
            {
              validator: (rule, value, callback) => {
                if (this.pwd.password!==this.pwd.otherPassword) {
                  callback(new Error("两次密码不一致"));
                } else {
                  callback();
                }
              }
            }
          ],
        },
      }
    },
    methods: {
      onSubmit() {
        var user=this.$store.state.user.dataUser;
        var that = this;
        this.$refs.form.validate((valid) => {
          if (valid) {
            user.password=this.pwd.password;
            that.submitLoading = true;
            saveUpdateEmployee(user).then((res) => {
              that.submitLoading = false;
              if (res.code == 0) {
                that.$message.success("保存成功");
                //重新加载，更新store中user相关属性
                setTimeout(function () {
                  location.reload();
                }, 1500);
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
