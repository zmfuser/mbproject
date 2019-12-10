<template>
  <div class="app-container">
    <div class="filter-container">
      预约日期：
      <el-date-picker
        v-model="appointmentDate" @change="getListData({page:1,limit:10})"
        align="left"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      &nbsp;&nbsp;&nbsp;预约时段：
      <el-select v-model="appointmentPeriod" @change="getListData({page:1,limit:10})" clearable placeholder="请选择">
        <el-option
          v-for="item in appointmentPeriodOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      &nbsp;&nbsp;&nbsp;状态：
      <el-select v-model="appointmentStatus"  @change="getListData({page:1,limit:10})" clearable placeholder="请选择">
        <el-option
          v-for="item in appointmentStatusOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
      <el-table-column label="用户头像" align="center">
        <template slot-scope="scope">
          <div class="doctorImg">
            <img :src="scope.row.userHeaderImages" alt>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="预约编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.appointmentNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约用户" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex |conplateSex}}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约医院" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hospitalName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院区域" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hospitalRegion |hospitalOrg }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.appointmentDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约时段" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.appointmentPeriod|outTimeType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.appointmentStatus |appointmentStatus}}</span>
        </template>
      </el-table-column>

      <el-table-column label="就诊医生" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.doctorName }}</span>
        </template>
      </el-table-column>


      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.appointmentStatus ==0" size="mini" @click="toEdit(scope.row)">
            问诊
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="pageQuery.total>0" :total="pageQuery.total" :page.sync="pageQuery.page"
                :limit.sync="pageQuery.limit" @pagination="getListData"/>
  </div>
</template>

<script>
  import { getList } from '@/api/inquiry/BsOutpatientAppointment'

  export default {
    data() {
      return {
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }]
        },
        appointmentDate: new Date(),
        appointmentPeriodOptions: [{
          value: '0',
          label: '上午'
        }, {
          value: '1',
          label: '下午'
        }],
        appointmentStatusOptions: [
          {
            value: '0',
            label: '待问诊'
          },
          {
            value: '2',
            label: '医问诊'
          },
          {
            value: '4',
            label: '已取消'
          },
          {
            value: '5',
            label: '已过期'
          }
        ],
        appointmentPeriod: '',
        appointmentStatus: '',
        list: [],
        listLoading: false,
        dialogFormVisible: false,
        btnLoading: false,
        obj: {
          id: '',
          code: '',
          createBy: '',
          createIp: '',
          createTime: '',
          modifyTime: '',
          modifyBy: '',
          modifyIp: '',
          isDeleted: '',
          userCode: '',
          appointmentDate: '',
          appointmentPeriod: '',
          appointmentStatus: '',
          doctorCode: '',
          appointmentNumber: '',
          hospitalCode: '',
          effectiveTime: '',
          cancelReason: '',
          hospitalRegion: '',
          userName: '',
          age: '',
          phone: '',
          sex: '',
          doctorName: '',
          hospitalName: '',
          userHeaderImages: ''
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
      getListData(pageParam) {
        this.listLoading = true
        pageParam.appointmentDate = this.appointmentDate
        pageParam.appointmentPeriod = this.appointmentPeriod
        pageParam.appointmentStatus = this.appointmentStatus
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
      // 问诊
      toEdit(row){
        let _this=this;
        sessionStorage.setItem("yuYueData",JSON.stringify(row))
        _this.$router.push("/toMedicalRecordsDetail")
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
