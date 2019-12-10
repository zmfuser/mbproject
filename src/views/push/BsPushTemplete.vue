<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" v-model="templateCode" placeholder="请输入模板编号" class="filter-item"/>
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
      style="width: 100%;" :header-cell-style="getRowClass">

      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="模板编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.templateCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消息标题" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.msgTitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="消息内容" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.msgContent }}</span>
        </template>
      </el-table-column>
      <el-table-column label="跳转类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.msgContentType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="标签以，分割" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tags }}</span>
        </template>
      </el-table-column>
      <el-table-column label="路径" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参数，Json字符串" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parameterStr }}</span>
        </template>
      </el-table-column>

      <el-table-column label="应用类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.appType |pushType}}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toEdit(scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" :loading="scope.row.loading" @click="deleteObj(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="pageQuery.total>0" :total="pageQuery.total" :page.sync="pageQuery.page"
                :limit.sync="pageQuery.limit" @pagination="getListData"/>


    <el-dialog title="编辑" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :rules="rules" :model="obj" label-position="left">
        <el-form-item label="模板所属应用类型" prop="appType">
          <br/>
          <template>
            <el-select v-model="obj.appType" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="模板编号" prop="templateCode">
          <el-input v-model="obj.templateCode" placeholder="请输入模板编号"/>
        </el-form-item>

        <el-form-item label="消息标题" prop="msgTitle">
          <el-input v-model="obj.msgTitle" placeholder="请输入消息标题"/>
        </el-form-item>
        <el-form-item label="消息内容" prop="msgContent">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入消息内容"
            v-model="obj.msgContent">
          </el-input>
        </el-form-item>
        <el-form-item label="参数，Json字符串" prop="parameterStr">
          <el-input v-model="obj.parameterStr" placeholder="请输入参数，Json字符串"/>
        </el-form-item>
        <el-form-item label="跳转类型" prop="msgContentType">
          <el-input v-model="obj.msgContentType" placeholder="请输入跳转类型"/>
        </el-form-item>
        <el-form-item label="标签以，分割" prop="tags">
          <el-input v-model="obj.tags" placeholder="请输入标签以，分割"/>
        </el-form-item>
        <el-form-item label="路径" prop="url">
          <el-input v-model="obj.url" placeholder="请输入路径"/>
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
  import { deleteObjs, getList, saveOrUpdate } from '@/api/push/BsPushTemplete'

  export default {
    data() {
      return {
        options: [{
          value: 1,
          label: '用户端'
        }, {
          value: 2,
          label: '医生端'
        }, {
          value: 3,
          label: '全部'
        }],
        list: [],
        templateCode: '',
        listLoading: false,
        dialogFormVisible: false,
        btnLoading: false,
        obj: {
          id: '',
          code: '',
          msgTitle: '',
          msgContent: '',
          msgContentType: '',
          tags: '',
          url: '',
          parameterStr: '',
          isDeleted: '',
          isEffective: '',
          templateCode: '',
          createBy: '',
          createTime: '',
          modifyBy: '',
          modifyTime: '',
          createIp: '',
          modifyIp: '',
          appType: 1
        },
        rules: {
          code: [{ required: true, message: '请填写', trigger: 'change' }],
          msgTitle: [{ required: true, message: '请填写消息标题', trigger: 'change' }],
          msgContent: [{ required: true, message: '请填写消息内容', trigger: 'change' }],
          templateCode: [{ required: true, message: '请填写模板编号', trigger: 'change' }],
          appType: [{ required: true, message: '请填写应用类型：1.用户端 2.医生端 3.全部', trigger: 'change' }]
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
            msgTitle: '',
            msgContent: '',
            msgContentType: '',
            tags: '',
            url: '',
            parameterStr: '',
            isDeleted: '',
            isEffective: '',
            templateCode: '',
            createBy: '',
            createTime: '',
            modifyBy: '',
            modifyTime: '',
            createIp: '',
            modifyIp: '',
            appType: ''
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
        pageParam.templateCode = this.templateCode
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
      // 更改表头颜色
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return 'background:rgba(228,248,245,1)'
        } else {
          return ''
        }
      }
    }
  }
</script>

<style>
</style>
