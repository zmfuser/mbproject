<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" @click="getListData({page:1,limit:10})" type="primary" icon="el-icon-search">查询
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="dialogFormVisible=true">新增</el-button>
    </div>
    <br>
    <br>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;">
      <el-table-column label="编码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="API模块描述" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.apiModelDesc }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="API文档地址" align="center">-->
      <!--<template slot-scope="scope">-->
      <!--<span>{{ scope.row.apiUrl }}</span>-->
      <!--</template>-->
      <!--</el-table-column>-->


      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toEdit(scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" :loading="scope.row.loading" @click="deleteObj(scope.row)">
            删除
          </el-button>
          <el-button size="mini" type="danger" :loading="scope.row.loading" @click="rederAPI(scope.row.apiUrl)">
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="pageQuery.total>0" :total="pageQuery.total" :page.sync="pageQuery.page"
                :limit.sync="pageQuery.limit" @pagination="getListData"/>


    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="obj" label-position="left">
        <el-form-item label="API模块描述" prop="apiModelDesc">
          <el-input v-model="obj.apiModelDesc" placeholder="请输入API模块描述"/>
        </el-form-item>
        <el-form-item label="API文档地址" prop="apiUrl">
          <el-input v-model="obj.apiUrl" placeholder="请输入API文档地址"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" :loading="btnLoading" @click="editData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { deleteObjs, getList, saveOrUpdate } from '@/api/sys/SysApiUrl'

  export default {
    data() {
      return {
        list: [],
        listLoading: false,
        dialogFormVisible: false,
        btnLoading: false,
        obj: {
          id: '',
          code: '',
          apiModelDesc: '',
          apiUrl: ''
        },
        rules: {
          id: [{ required: true, message: '请填写', trigger: 'change' }],
          code: [{ required: true, message: '请填写编码', trigger: 'change' }],
          apiModelDesc: [{ required: true, message: '请填写API模块描述', trigger: 'change' }],
          apiUrl: [{ required: true, message: '请填写API文档地址', trigger: 'change' }]
        },
        pageQuery: {
          total: 0,
          page: 1,
          limit: 10
        }
      }
    },
    watch: {
      dialogFormVisible(val) {
        if (!val) {
          this.obj = {
            id: '',
            code: '',
            apiModelDesc: '',
            apiUrl: ''
          }
          this.$refs['dataForm'].resetFields()
        }
      }
    },
    mounted() {
      this.getListData(this.pageQuery)
    },
    methods: {
      deleteObj(row) {
        var array = []
        array.push(row.id)
        row.loading = true
        deleteObjs(array).then(res => {
          row.loading = false
          if (res.code == 0) {
            this.getListData({ page: 1, limit: 10 })
          }
        })
      },
      getListData(pageParam) {
        this.listLoading = true
        getList(pageParam).then(res => {
          this.listLoading = false
          if (res.code == 0) {
            this.list = res.value.records
            this.pageQuery.total = res.value.total
            this.pageQuery.page = res.value.current
            this.pageQuery.limit = res.value.size
          }
        })
      },
      toEdit(row) {
        this.dialogFormVisible = true
        this.obj = JSON.parse(JSON.stringify(row))
      },
      editData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.btnLoading = true
            saveOrUpdate(this.obj).then((res) => {
              this.btnLoading = false
              if (res.code == 0) {
                this.dialogFormVisible = false
                this.$message({
                  message: '编辑成功',
                  type: 'success'
                })
                this.getListData({ page: 1, limit: 10 })
              }
            })
          }
        })
      },
      rederAPI(url) {
        window.location.href = url;
      }
    }
  }
</script>

<style>
</style>
