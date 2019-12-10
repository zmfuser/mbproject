<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item"/>
      <el-button class="filter-item" @click="getListData({page:1,limit:10})" type="primary" icon="el-icon-search">查询
      </el-button>
      <!--<el-button class="filter-item" type="primary" icon="el-icon-edit" @click="dialogFormVisible=true">新增</el-button>-->
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
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <div class="doctorImg">
            <img :src="scope.row.headerUrl" alt>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户手机号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" align="center" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.cardId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex | conplateSex}}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生日" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.birthday |time }}</span>
        </template>
      </el-table-column>

      <el-table-column label="地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.address }}</span>
        </template>
      </el-table-column>

      <el-table-column label="用户状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isDeleted |userStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="是否存在签约团队" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isSingtion |SingStatus}}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.isDeleted  == 1" type="primary" size="mini" @click="updateUserStatus(scope.row,0)">
            启用
          </el-button>
          <el-button v-if="scope.row.isDeleted  == 0" size="mini" type="danger" :loading="scope.row.loading"
                     @click="updateUserStatus(scope.row,1)">
            禁用
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="pageQuery.total>0" :total="pageQuery.total" :page.sync="pageQuery.page"
                :limit.sync="pageQuery.limit" @pagination="getListData"/>


  </div>
</template>

<script>
  import { getList,updateUserStatus } from '@/api/usermanager/BsAppUser'

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
          phone: '',
          userName: '',
          sex: '',
          age: '',
          birthday: '',
          cardId: '',
          address: '',
          wangyiUser: '',
          wangyiPassword: '',
          isDeleted: '',
          isSingtion: '',
          headerUrl: '',
          createBy: '',
          createTime: '',
          createIp: '',
          modifyBy: '',
          modifyTime: '',
          modifyIp: '',
          password: '',
          healthTeamCode: ''
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
            phone: '',
            userName: '',
            sex: '',
            age: '',
            birthday: '',
            cardId: '',
            address: '',
            wangyiUser: '',
            wangyiPassword: '',
            isDeleted: '',
            isSingtion: '',
            headerUrl: '',
            createBy: '',
            createTime: '',
            createIp: '',
            modifyBy: '',
            modifyTime: '',
            modifyIp: '',
            password: '',
            healthTeamCode: ''
          }
          this.$refs['dataForm'].resetFields()
        }
      }
    },
    mounted() {
      this.getListData(this.pageQuery)
    },
    methods: {
      updateUserStatus(row, type) {
        var param = {}
        param.userCode = row.code
        param.status = type
        row.loading = true
        updateUserStatus(param).then(res=>{
          row.loading = false
          this.getListData({ page: 1, limit: 10 })
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
  .doctorImg {
    width: 60px;
    height: 60px;
    margin: 0 auto;
  }

  .doctorImg img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
</style>
