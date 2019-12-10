<template>
  <div class="suifang app-container">
    <div class="div-flex">
      <div class="marginTop">
        <label for>预约日期：</label>
        <el-date-picker
          v-model="createTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </div>
      <div class="marginTop">
        <label for>预约时段：</label>
        <el-select v-model="appointment" placeholder="请选择">
          <el-option
            v-for="item in optionsAppointment"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="marginTop">
        <label for>状态：</label>
        <el-select v-model="medicationCompliance" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <!-- 搜索按钮 -->
      <div class="button-seach-regi marginTop" style="margin-bottom:15px;">
        <el-button plain icon="el-icon-search" class="search" @click="searchBtn()">搜索</el-button>
      </div>
    </div>

    <!-- 随访表格 -->
    <el-table
      v-loading="listLoading"
      :data="SFlist"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="getRowClass"
    >
      <el-table-column label="排号顺序" type="index" align="center" width="80"></el-table-column>
      <el-table-column label="用户头像" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.archivesCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.archivesUserName }}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.healthAssistantName }}</span>
        </template>
      </el-table-column>
      <!-- dataStatus -->
      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dataStatus | changesfstate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.flupType | selectState}}</span>
        </template>
      </el-table-column>
      <el-table-column label="预约时段" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.flupType | selectState}}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.flupType | selectState}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="160px"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <div>
            <el-button  v-if="hasPermission('booking:inquiry')" @click="audit(scope.$index, scope.row)" size="mini" type="primary">问诊</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <pagination
      class="page"
      v-show="total>0"
      :total="total"
      :page.sync="pagecQuery.page"
      :limit.sync="pagecQuery.limit"
      @pagination="getsuifangList"
    />
    
  </div>
</template>

<script>
import { queryBsFlupList } from "@/api/sys/suifang.js";
export default {
  data() {
    return {
      appointment: "",
      medicationCompliance: "",
      createTime: "",
      number: "545145151515",
      querys: {
        archivesCode: "",
        healthAssistantName: "",
        createTime: ""
      },
      options: [
        { value: "1", label: "待问诊" },
        { value: "2", label: "已问诊" },
      ],
      optionsAppointment: [
        { value: "1", label: "上午" },
        { value: "2", label: "下午" },
      ],
      employee: {
        archivesUserName: "",
        archivesCode: "",
        healthAssistantName: "",
        dataStatus: "",
        createTime: "",
        flupType: ""
      },
      total: 0,
      pagecQuery: {
        page: 1,
        limit: 10
      },
      submitLoading: false,
      SFlist: [],
      listLoading: false,
      dialogaddSFVisible: false,
      addFileObj: {
        gaoxueyaWeek: false,
        gaoxueyaMounth: false,
        guanxinbingWeek: false,
        guanxinbingMounth: false,
        naozuzhong: false,
        tangniaobingWeek: false,
        tangniaobingMounth: false
      }
    };
  },
  mounted() {
    this.getsuifangList(this.pagecQuery);
  },
  methods: {
    baseLBTN1(value) {
      if (value == 1) {
        return false;
      } else {
        return true;
      }
    },
    // 问诊
    audit(){
      this.$router.push('/medicalRecordsDetail')
    },
    // 自动获取随访列表数据
    getsuifangList(value) {
      queryBsFlupList(value).then(res => {
        this.listLoading = true;
        let value = res.value;
        if (res.code == 0) {
          this.listLoading = false;
          this.SFlist = res.value.records;
          this.total = value.total;
          this.pagecQuery.page = value.current;
          this.pagecQuery.limit = value.size;
        }
      });
    },
   
    // 搜索按钮
    searchBtn() {
      let search = {
        archivesCode: this.querys.archivesCode,
        healthAssistantName: this.querys.healthAssistantName,
        createTime: this.querys.createTime,
        page: 1,
        limit: 10
      };
      queryBsFlupList(search).then(res => {
        let value = res.value;
        if (res.code == 0) {
          this.SFlist = res.value.records;
          this.total = value.total;
          this.pagecQuery.page = value.current;
          this.pagecQuery.limit = value.size;
        }
      });
    },
   
    addFileToSF() {
      this.dialogaddSFVisible = true;
    },
    // 更改表头颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:rgba(228,248,245,1)";
      } else {
        return "";
      }
    },
  }
};
</script>


<style scoped>
.marginTop {
  margin: 10px 10px 0 0;
}
.icon-sizeWidth .el-button {
  padding: 5px 5px;
}
.div-flex {
  margin: 15px auto;
  display: flex;
  justify-content: start;
}
.div-flex label {
  font-weight: normal;
  font-size: 14px;
}

.audit >>> .el-dialog__body {
  padding-top: 0px;
}
.allaudiDisplay {
}
.auditPw {
  padding-top: 15px;
  width: 80%;
  margin-left: 10%;
}
.auditDisplay {
  width: 80%;
  margin-left: 10%;
  display: flex;
  justify-content: space-between;
}
.save_cancel {
  padding-top: 20px;
  text-align: center;
}
</style>

