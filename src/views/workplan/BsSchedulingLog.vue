<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" placeholder="排班表名称" v-model="fileName" @clear="getListData({page:1,limit:10})" clearable class="filter-item"/>
      <el-button class="filter-item" @click="getListData({page:1,limit:10,fileName:null,})" type="primary" icon="el-icon-search">查询
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="addTable">新增</el-button>
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
      <el-table-column label="记录编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排班表名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排班科室" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.departmentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createByName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dataStatus|SchedulingLogStatus }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.dataStatus==1"  size="mini" @click="toEdit(scope.row)">
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
  </div>
</template>

<script>
  import { deleteObjs, getList, saveOrUpdate,deletepaiban } from '@/api/workplan/BsSchedulingLog'

  export default {
    data() {
      return {
        list: [],
        fileName:"",
        listLoading: false,
        btnLoading: false,
        obj: {
          id: '',
          code: '',
          isDeleted: '',
          createBy: '',
          createTime: '',
          modifyBy: '',
          modifyTime: '',
          modifyIp: '',
          createIp: '',
          title: '',
          dataStatus: '',
          departmentCode: '',
          departmentName: '',
          createByName: ''
        },
        pageQuery: {
          total: 0,
          page: 1,
          limit: 10
        }
      }
    },
    mounted() {
      this.getListData(this.pageQuery)
    },
    methods: {
      // 新增排班
      addTable(){
        this.$router.push("/hospitalSheduling")
      },
      // 编辑排班
      toEdit(scope){
        let _this=this;
        _this.$router.push("/hospitalShedulingUpdate")
        sessionStorage.setItem('hospitalShedulingData',JSON.stringify(scope))
      },
      // 删除排班
      deleteObj(scope){
        let _this=this;
        _this.$confirm("此操作将删除数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            deletepaiban(scope.code).then(res => {
              if (res.code==0) {
                _this.$message.success(res.msg)
                 _this.getListData(this.pageQuery)
              }
            });
          })
          .catch(() => {
            _this.$message({
              type: "info",
              message: "已取消"
            });
          });
      },
      getListData(pageParam) {
        let _this=this
        pageParam.fileName = _this.fileName
        _this.listLoading = true
        getList(pageParam).then(res => {
          _this.listLoading = false
          if (res.code == 0) {
            _this.list = res.value.records
            _this.pageQuery.total = res.value.total
            _this.pageQuery.page = res.value.current
            _this.pageQuery.limit = res.value.size
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
