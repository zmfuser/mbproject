<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入用户名" v-model="querys.username" style="width: 200px;" class="filter-item"/>
      <el-input placeholder="请输入真实姓名" v-model="querys.name" style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" @click="getListData({page:1,limit:10})" type="primary" icon="el-icon-search">查询
      </el-button>
      <el-button v-if="hasPermission('employee:edit')" class="filter-item" type="primary" icon="el-icon-edit" @click="dialogFormVisible=true">新增</el-button>
      <el-button v-if="hasPermission('employee:export')" :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                 @click="handleDownload">页面导出(当前页数据)
      </el-button>
      <el-button v-if="hasPermission('employee:export')" :loading="apiDownloadLoading" class="filter-item" type="primary" icon="el-icon-download"
                 @click="apiHandleDownload">api导出(所有数据)
      </el-button>
      <el-button class="filter-item" v-if="hasPermission('employee:useStatus')" @click="useStatus(1)" type="primary">启用</el-button>
      <el-button class="filter-item" v-if="hasPermission('employee:useStatus')" @click="useStatus(2)" type="primary">禁用</el-button>
      <br>
      <br>
      <el-upload
        class="upload-demo"
        :action="baseUrl+'/sys/sys-user/import'"
        :on-success="handleUploadSuccess"
        v-if="hasPermission('employee:import')"
      >
        <el-button class="filter-item"  type="primary">导入excel</el-button>
      </el-upload>

    </div>
    <br>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange" :header-cell-style="{background:tableHead}"
      style="width: 100%;"> 
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column label="用户名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="启用禁用" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.statusValue }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mobile }}</span>
        </template>
      </el-table-column>
       <el-table-column label="邮箱" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
    <!--  <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.genderValue }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime  }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <div style="float: left">
            <el-button type="primary" v-if="hasPermission('employee:edit')" @click="toEdit(scope.row,1)" size="mini">
              编辑
            </el-button>
            <el-button type="info" size="small" v-if="hasPermission('employee:reset')"  @click="toEdit(scope.row,2)">重置密码</el-button>
            <el-button type="success" size="small" v-if="hasPermission('employee:assign')"  @click="toEdit(scope.row,3)">分配角色</el-button>
          </div>
          <div style="float: left">
              <el-button type="warning" size="small" v-if="hasPermission('employee:log')"  @click="getLog(scope.row.id)">日志</el-button>
          </div>


        </template>
      </el-table-column>
    </el-table>


    <pagination class="page" v-show="pageQuery.total>0" :total="pageQuery.total" :page.sync="pageQuery.page"
                :limit.sync="pageQuery.limit" @pagination="getListData"/>


    <el-dialog title="人员编辑(新增初始化密码为123456)"  :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form :model="employee" ref="ruleForm" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="employee.username"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="employee.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="employee.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="employee.email"></el-input>
        </el-form-item>
        <!-- <el-form-item label="性别" prop="gender">
          <el-radio v-for="(item,index) in genderList" v-model="employee.gender" :label="item.value" :key="index">{{item.name}}</el-radio>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm(1)">取 消</el-button>
        <el-button type="primary" @click="submitEmployee()" :loading="submitLoading">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="重置密码"  :close-on-click-modal="false" :visible.sync="resetDialogFormVisible">
      <el-input type="password" placeholder="请输入密码" v-model="resetpassword"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm(2)">取 消</el-button>
        <el-button type="primary" @click="resetPass()" :loading="submitLoading">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="分配角色"  :close-on-click-modal="false" width="40%" :visible.sync="roleDialogFormVisible">

      <el-transfer v-model="employee.roleIds" :titles="titles" :data="roleList">

      </el-transfer>

      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm(3)">取 消</el-button>
        <el-button type="primary" @click="assignRole" :loading="submitLoading">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改日志"  :close-on-click-modal="false" :visible.sync="dialogLogFormVisible">
      <el-table :data="logData">
        <el-table-column width="150" property="operateTime" label="操作时间"></el-table-column>
        <el-table-column width="100" property="operatePerson" label="操作人"></el-table-column>
        <el-table-column width="500" property="operateContent" label="修改内容"></el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <pagination v-show="pageQueryLog.total>0" :total="pageQueryLog.total" :page.sync="pageQueryLog.page"
                    :limit.sync="pageQueryLog.limit" @pagination="loadLogData"/>
      </div>
    </el-dialog>


  </div>
</template>

<script>
  import {getList, saveUpdateEmployee, employeeAssignRole, changeUseStatus,getLogData} from "../../api/sys/employee";
  import {getList as getRoleList} from "../../api/sys/role";
  import forEach from 'lodash/forEach'
  import {validateMobile} from "../../utils/validate";
  import {getList as getDictList} from '../../api/sys/dict'

  export default {
    data() {
      return {
        tableHead: "rgba(228,248,245,1)",
        baseUrl: process.env.BASE_API,
        dialogLogFormVisible:false,
        logData: [],
        listLoading: false,
        list: [],
        titles: ['系统角色', '已选角色'],
        dialogFormVisible: false,
        resetDialogFormVisible: false,
        roleDialogFormVisible: false,
        submitLoading: false,
        employee: {
          username: "",
          name: "",
          id: "",
          password: "",
          mobile: "",
          email: "",
          gender: "",
          roleIds: []
        },
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
        pageQuery: {
          total: 0,
          page: 1,
          limit: 10
        },
        roleList: [],
        resetpassword: "",
        querys: {
          username: "",
          name: ""
        },
        downloadLoading: false,
        apiDownloadLoading: false,
        genderList: [],
        multipleSelection: [],
        pageQueryLog: {
          total: 0,
          page: 1,
          limit: 10
        },
        currentId:""
      }
    },
    watch:{
      dialogFormVisible(val){
          if(!val){
            this.$refs.ruleForm.resetFields();
            this.employee = Object.assign({}, {
              username: "",
              name: "",
              id: "",
              password: "",
              mobile: "",
              email: "",
              gender: "",
              roleIds: []
            });
          }
      } ,

    },
    mounted() {
      this.getListData(this.pageQuery);
      this.querySelect();
    },
    methods: {

      assignRole() {
        this.submitLoading = true;
        var that = this;
        employeeAssignRole(this.employee).then((res) => {
          that.submitLoading = false;
          if (res.code == 0) {
            that.resetForm(3);
            that.getListData({
              page: 1,
              limit: 10
            });
          } else {
            that.$message.error(res.msg);
          }
        })
      },
      querySelect() {
        var that = this;
        getRoleList({}).then((res) => {
          if (res.code == 0) {
            forEach(res.value, (n) => {
              that.roleList.push({
                key: n.id,
                label: n.roleName
              });
            })
          }
        })
      },
      getListData(pageQueryParam) {
        pageQueryParam.username = this.querys.username;
        pageQueryParam.name = this.querys.name;
        this.listLoading = true;
        getList(pageQueryParam).then(response => {
          this.listLoading = false;
          if (response.code == 0) {
            let value = response.value;
            this.list = value.records;
            this.pageQuery.total = value.total;
            this.pageQuery.page = value.current;
            this.pageQuery.limit = value.size;
          }
        })
      },
      toEdit(obj, type) {
        this.employee = JSON.parse(JSON.stringify(obj));
        if (type == 1) {
          //修改
          this.dialogFormVisible = true;
        } else if (type == 2) {
          //重置密码
          this.resetDialogFormVisible = true;
        } else {
          //分配角色
          this.roleDialogFormVisible = true;
        }
      },
      resetForm(type) {
        if (type == 1) {
          this.dialogFormVisible = false;
          this.$refs.ruleForm.resetFields();
        } else if (type == 2) {
          this.resetpassword = "";
          this.resetDialogFormVisible = false;
        } else {
          this.roleDialogFormVisible = false;
        }
        this.employee = Object.assign({}, {
          username: "",
          name: "",
          id: "",
          password: "",
          mobile: "",
          email: "",
          gender: "",
          roleIds: []
        });
      },
      resetPass() {
        if (this.isEmpty(this.resetpassword)) {
          this.$message.error("请输入密码");
          return;
        }
        this.employee.password = this.resetpassword;
        this.confirmEmp(2);
      },
      submitEmployee() {
        var that = this;
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            that.confirmEmp(1);
          } else {
            return false;
          }
        });
      },
      confirmEmp(type) {
        var that = this;
        if (!this.isEmpty(that.employee.id) && type == 1) {
          that.employee.password = null;
        }
        that.submitLoading = true;
        saveUpdateEmployee(that.employee).then((res) => {
          that.submitLoading = false;
          if (res.code == 0) {
            that.resetForm(type);
            that.getListData({
              page: 1,
              limit: 10
            });
          } else {
            that.$message.error(res.msg);
          }
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['用户名', '姓名', '启用禁用', '手机号', '邮箱', '性别', '创建时间', '修改时间']
          const filterVal = ['username', 'name', 'statusValue', 'mobile', 'email', 'genderValue', 'createTime', 'updateTime']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: '系统用户列表'
          })
          this.downloadLoading = false
        })
      },
      apiHandleDownload() {
        this.apiDownloadLoading = true;
        var json = JSON.stringify(this.querys);
        this.apiExportExcel("/sys/sys-user/export", "系统用户", json, (flag) => {
          this.apiDownloadLoading = false;
          if (!flag) {
            this.$message.error("系统异常");
          }
        });
      },
      handleUploadSuccess(response) {
        if (response.code == 0) {
          this.getListData({page: 1, limit: 10});
        } else {
          this.$message.error(response.msg);
        }

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      useStatus(type) {
        if (this.multipleSelection.length == 0) {
          this.$message.error("请选择记录");
        }
        changeUseStatus(this.multipleSelection, type).then(res => {
          if (res.code == 0) {
            this.getListData({
              page: 1,
              limit: 10
            });
          }
        })
      },
      getLog(id) {
        this.currentId=id;
        this.dialogLogFormVisible=true;
        this.loadLogData({page: 1, limit: 10});
      },
      loadLogData(pageParam) {
        this.logData=[];
        getLogData(pageParam,this.currentId).then(res=>{
          if(res.code==0){
            var value=res.value;
            this.logData = value.records;
            this.pageQueryLog.total = value.total;
            this.pageQueryLog.page = value.current;
            this.pageQueryLog.limit = value.size;
          }
        })
      }
    }
  }
</script>

<style>
</style>
