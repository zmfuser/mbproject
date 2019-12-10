<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" placeholder="所属档案/患者姓名" @keyup.enter.native="getListData({page:1,limit:10,query:query})" v-model="query" class="filter-item"/>
      <el-button class="filter-item" @click="getListData({page:1,limit:10,query:query})" type="primary" icon="el-icon-search">查询
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

       <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
      <el-table-column label="处方编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属档案" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.archivesNumber}}</span>
        </template>
      </el-table-column>

      <el-table-column label="患者姓名" align="center"  width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别 " align="center" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.sex | conplateSex}}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center" width="90">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cardId }}</span>
        </template>
      </el-table-column>

      <el-table-column label="健康助理" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.healthAssistant }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医生名称" align="center" width="120">
        <template slot-scope="scope">
          <span>{{ scope.row.doctorName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | time}}</span>
        </template>
      </el-table-column>

      <el-table-column label="数据状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dataStatus | changeState}}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作" align="center" width="170" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <div class="icon-sizeWidth">
          <el-button type="warning" v-show="lookBtn(scope.row.dataStatus)" v-if="hasPermission('fitness:edit')" size="mini" @click="toEdit(scope.row)" icon="el-icon-edit-outline" >
            编辑
          </el-button>
          <el-button size="mini" type="primary" :loading="scope.row.loading" v-if="hasPermission('fitness:query')" icon="el-icon-view" @click="checkfitPlan(scope.row)">
            预览图表
          </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <pagination class="page" v-show="pageQuery.total>0" :total="pageQuery.total" :page.sync="pageQuery.page"
                :limit.sync="pageQuery.limit" @pagination="getListData"/>
  </div>
</template>

<script>
  import {  getList } from '@/api/sys/BsHealthPlan'

  export default {
    data() {
      return {
        edit:false,
        query:'',
        list: [],
        listLoading: false,
        dialogFormVisible: false,
        btnLoading: false,
        obj: {
          id: '',
          code: '',
          archivesCode: '',
          doctorName: '',
          doctorCode: '',
          healthAssistant: '',
          phone: '',
          userName: '',
          sex: '',
          age: '',
          cardId: '',
          baseCount: '',
          conditionDesc: '',
          diet: '',
          motion: '',
          psychological: '',
          nursing: '',
          suggest: '',
          createBy: '',
          createTime: '',
          createIp: '',
          modifyBy: '',
          modifyTime: '',
          modifyIp: '',
          isDeleted: '',
          dataStatus: ''
        },
        rules: {
          id: [{ required: true, message: '请填写流水号', trigger: 'change' }],
          code: [{ required: true, message: '请填写唯一标识', trigger: 'change' }],
          archivesCode: [{ required: true, message: '请填写档案code', trigger: 'change' }],
          doctorName: [{ required: true, message: '请填写医生名称', trigger: 'change' }],
          doctorCode: [{ required: true, message: '请填写医生code', trigger: 'change' }],
          healthAssistant: [{ required: true, message: '请填写健康助理', trigger: 'change' }],
          phone: [{ required: true, message: '请填写电话', trigger: 'change' }],
          userName: [{ required: true, message: '请填写患者姓名', trigger: 'change' }],
          sex: [{ required: true, message: '请填写性别 0-男 1-女', trigger: 'change' }],
          age: [{ required: true, message: '请填写年龄', trigger: 'change' }],
          cardId: [{ required: true, message: '请填写身份证', trigger: 'change' }],
          baseCount: [{ required: true, message: '请填写基础描述', trigger: 'change' }],
          conditionDesc: [{ required: true, message: '请填写病情概述', trigger: 'change' }],
          diet: [{ required: true, message: '请填写个性化饮食指导', trigger: 'change' }],
          motion: [{ required: true, message: '请填写个性化运动指导处方', trigger: 'change' }],
          psychological: [{ required: true, message: '请填写心理与情绪指导处方', trigger: 'change' }],
          nursing: [{ required: true, message: '请填写日常自我护理', trigger: 'change' }],
          suggest: [{ required: true, message: '请填写跟踪随访建议', trigger: 'change' }],
          createBy: [{ required: true, message: '请填写创建人', trigger: 'change' }],
          createTime: [{ required: true, message: '请填写创建时间', trigger: 'change' }],
          createIp: [{ required: true, message: '请填写创建IP', trigger: 'change' }],
          modifyBy: [{ required: true, message: '请填写修改人', trigger: 'change' }],
          modifyTime: [{ required: true, message: '请填写修改时间', trigger: 'change' }],
          modifyIp: [{ required: true, message: '请填写修改IP', trigger: 'change' }],
          isDeleted: [{ required: true, message: '请填写是否有效 0-有效 1-无效', trigger: 'change' }],
          dataStatus: [{ required: true, message: '请填写数据状态 0-已发布 1-草稿', trigger: 'change' }]
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
            archivesCode: '',
            doctorName: '',
            doctorCode: '',
            healthAssistant: '',
            phone: '',
            userName: '',
            sex: '',
            age: '',
            cardId: '',
            baseCount: '',
            conditionDesc: '',
            diet: '',
            motion: '',
            psychological: '',
            nursing: '',
            suggest: '',
            createBy: '',
            createTime: '',
            createIp: '',
            modifyBy: '',
            modifyTime: '',
            modifyIp: '',
            isDeleted: '',
            dataStatus: ''
          }
          this.$refs['dataForm'].resetFields()
        }
      }
    },
    mounted() {
      this.getListData(this.pageQuery)
    },
    methods: {
      lookBtn(value){
        if(value==1){
          return true
        }else{
          return false
        }
      },
      // 更改表头颜色
      getRowClass({ row, column, rowIndex, columnIndex }) {
        if (rowIndex == 0) {
          return "background:rgba(228,248,245,1)";
        } else {
          return "";
        }
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
        // this.obj = JSON.parse(JSON.stringify(row))
        let row1=JSON.stringify(row)
        sessionStorage.setItem("planRow",row1)
        this.$router.push("/editFitPlan")
      },
      checkfitPlan(row){
        this.$router.push("/Yfitplan")
        let row1=JSON.stringify(row)
        sessionStorage.setItem("YRow",row1)
      }
    }
  }
</script>

<style scoped>
.icon-sizeWidth .el-button{
  padding:5px 5px
}
</style>

