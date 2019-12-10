<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" placeholder="疾病分类/疾病科室/疾病名称" v-model="param" class="filter-item"/>
      <el-button class="filter-item" @click="getListData({page:1,limit:10})" type="primary" icon="el-icon-search">查询
      </el-button>
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
      <el-table-column label="code" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="疾病分类" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.level1Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="疾病科室" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.level2Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="疾病名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="疾病说明" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.url }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="hasPermission('illness:query')" type="primary" size="mini" @click="toEdit(scope.row)">
            查看说明
          </el-button>
          <el-button v-if="hasPermission('illness:del')" size="mini" type="danger" :loading="scope.row.loading" @click="deleteObj(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog  title="查看说明" :visible.sync="diseaseDialogVisible" class="eldialog">
      <iframe :src="diseaseUrl" frameborder="0" style="width:100%;height:100%"></iframe>
    </el-dialog>
    <pagination v-show="pageQuery.total>0" :total="pageQuery.total" :page.sync="pageQuery.page"
                :limit.sync="pageQuery.limit" @pagination="getListData"/>
  </div>
</template>

<script>
  import { deleteObjs, getList, saveOrUpdate } from '@/api/disease/BsDisease'

  export default {
    data() {
      return {
        list: [],
        param: '',
        diseaseUrl:"",
        listLoading: false,
        diseaseDialogVisible: false,
        btnLoading: false,
        obj: {
          id: '',
          code: '',
          level1Name: '',
          level2Name: '',
          title: '',
          url: '',
          absolutelyUrl: '',
          createBy: '',
          createIp: '',
          createTime: '',
          modifyBy: '',
          modifyIp: '',
          modifyTime: '',
          isDeleted: ''
        },
        rules: {
          id: [{ required: true, message: '请填写流水ID', trigger: 'change' }],
          code: [{ required: true, message: '请填写code', trigger: 'change' }],
          level1Name: [{ required: true, message: '请填写一级疾病名称', trigger: 'change' }],
          level2Name: [{ required: true, message: '请填写二级疾病名称', trigger: 'change' }],
          title: [{ required: true, message: '请填写三级疾病名称', trigger: 'change' }],
          url: [{ required: true, message: '请填写三级疾病http路径', trigger: 'change' }],
          absolutelyUrl: [{ required: true, message: '请填写三级疾病存储路径', trigger: 'change' }],
          createBy: [{ required: true, message: '请填写创建人', trigger: 'change' }],
          createIp: [{ required: true, message: '请填写创建Ip', trigger: 'change' }],
          createTime: [{ required: true, message: '请填写创建时间', trigger: 'change' }],
          modifyBy: [{ required: true, message: '请填写修改人', trigger: 'change' }],
          modifyIp: [{ required: true, message: '请填写修改IP', trigger: 'change' }],
          modifyTime: [{ required: true, message: '请填写修改时间', trigger: 'change' }],
          isDeleted: [{ required: true, message: '请填写状态0-有效 1-失效', trigger: 'change' }]
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
            level1Name: '',
            level2Name: '',
            title: '',
            url: '',
            absolutelyUrl: '',
            createBy: '',
            createIp: '',
            createTime: '',
            modifyBy: '',
            modifyIp: '',
            modifyTime: '',
            isDeleted: ''
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
        this.listLoading = true;
        pageParam.param=this.param;
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
      toEdit(scope) {
       
        this.diseaseDialogVisible = true
        // this.obj = JSON.parse(JSON.stringify(row))
       this.diseaseUrl=scope.url
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
<style scoped>
.eldialog >>> .el-dialog__body{
  height: 70vh;
}
</style>

