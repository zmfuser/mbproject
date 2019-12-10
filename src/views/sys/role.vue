<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input placeholder="请输入角色名" v-model="roleName" style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" @click="getListData({page:1,limit:10})" type="primary" icon="el-icon-search">查询
      </el-button>
      <el-button class="filter-item" v-if="hasPermission('role:edit')" type="primary" icon="el-icon-edit" @click="dialogFormVisible=true">新增</el-button>
    </div>
    <br>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row  :header-cell-style="{background:tableHead}"
      style="width: 100%;">
      <el-table-column label="角色名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini"  v-if="hasPermission('role:edit')" @click="toEdit(scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger"  v-if="hasPermission('role:delete')" :loading="scope.row.loading" @click="deleteRole(scope.row)">
            删除
          </el-button>
          <el-button type="success" size="mini" v-if="hasPermission('role:assign')" @click="toAssign(scope.row)">
            权限分配
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination class="page" v-show="pageQuery.total>0" :total="pageQuery.total" :page.sync="pageQuery.page"
                :limit.sync="pageQuery.limit" @pagination="getListData"/>


    <el-dialog title="编辑"  :close-on-click-modal="false" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="role" label-position="left" label-width="70px"
               style="width: 400px; margin-left:50px;">
        <el-form-item label="角色名" prop="roleName">
          <el-input v-model="role.roleName" placeholder="请输入角色名"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="editData">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="权限分配"  :visible.sync="permDialogFormVisible" :close-on-press-escape="false"
               :close-on-click-modal="false" width="30%">
      <el-tree
        :data="permList"
        show-checkbox
        node-key="id"
        ref="tree"
        :default-expanded-keys="role.pPermIds"
        highlight-current
        :props="defaultProps">
      </el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="permDialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="assignPerms" :loading="btnLoading">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {getList, saveOrUpdate, deleteRoles, assignPerm} from '@/api/sys/role';
  import {permissionList} from '@/api/sys/permission';
  export default{
    data(){
      return {
        tableHead: "rgba(228,248,245,1)",
        list: [],
        permList: [],
        listLoading: false,
        dialogFormVisible: false,
        btnLoading: false,
        permDialogFormVisible: false,
        role: {
          roleName: "",
          pPermIds: [],
          permIds: [],
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        rules: {
          roleName: [{required: true, message: '请填写角色名', trigger: 'change'}],
        },
        pageQuery: {
          total: 0,
          page: 1,
          limit: 10
        },
        roleName:""
      }
    },
    watch: {
      dialogFormVisible(val){
        if (!val) {
          this.role = {
            roleName: "",
            pPermIds: [],
            permIds: [],
          }
          this.$refs["dataForm"].resetFields();
        }
      },
      permDialogFormVisible(val){
        if (!val) {
          this.role = {
            roleName: "",
            pPermIds: [],
            permIds: [],
          }
        }
      }
    },
    mounted(){
      this.getListData(this.pageQuery);
      this.queryPermission();
    },
    methods: {
      queryPermission(){
        permissionList().then((res) => {
          if (res.code == 0) {
            this.permList = res.value;
          }
        })
      },
      toAssign(obj){
        this.role = JSON.parse(JSON.stringify(obj));
        this.permDialogFormVisible = true;
        var that = this;
        this.$nextTick(() => {
          that.$refs.tree.setCheckedKeys(this.role.permIds);
        })
      },
      assignPerms(){
        let checkedKeys = this.$refs.tree.getCheckedKeys();
        this.role.permIds=checkedKeys;
        this.role.permIdStr=null;
        this.btnLoading = true;
        assignPerm(this.role).then(res => {
          this.btnLoading = false;
          if (res.code == 0) {
            this.getListData({page: 1, limit: 10});
            this.$message({
              message: '分配权限成功',
              type: 'success'
            })
            this.permDialogFormVisible = false;
          }
        })
      },
      deleteRole(row){
        var array = [];
        array.push(row);
        row.loading = true;
        deleteRoles(array).then(res => {
          row.loading = false;
          if (res.code == 0) {
            this.getListData({page: 1, limit: 10});
          }
        })
      },
      getListData(pageParam){
        this.listLoading = true;
        pageParam.roleName=this.roleName;
        getList(pageParam).then(res => {
          this.listLoading = false;
          if (res.code == 0) {
            this.list = res.value.records;
            this.pageQuery.total = res.value.total;
            this.pageQuery.page = res.value.current;
            this.pageQuery.limit = res.value.size;
          }
        })
      },
      toEdit(row){
        this.dialogFormVisible = true;
        this.role = JSON.parse(JSON.stringify(row));
      },
      editData(){

        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true;
            saveOrUpdate(this.role).then((res) => {
              this.btnLoading = false;
              if (res.code == 0) {
                this.dialogFormVisible = false
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                })
                this.getListData({page: 1, limit: 10});
              }
            })
          }
        })
      }
    }
  }
</script>

<style>
</style>
