<template>
  <div class="app-container">
    <div class="filter-container">
      <div class="div-flex">
        <div>
          <div class="marginTop">
            <label>就诊编号：</label>
            <el-input
              v-model="Attendance.number"
              clearable
              @clear="getListData({page:1,limit:10})"
              placeholder="请输入就诊编号"
              style="width: 200px;"
              class="filter-item"
            ></el-input>
          </div>
          <div class="marginTop">
            <label for>状态：</label>
            <el-select
              clearable
              @clear="getListData({page:1,limit:10})"
              v-model="Attendance.status"
              filterable
              placeholder="请选择"
              style="margin-left:28px;"
            >
              <el-option
                v-for="item in optionStatus"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div>
          <div class="marginTop">
            <label for>就诊人：</label>
            <el-input
              clearable
              @clear="getListData({page:1,limit:10})"
              v-model="Attendance.peaple"
              style="width: 200px; margin-left:13px;"
              class="filter-item"
              placeholder="请输入就诊人"
            ></el-input>
          </div>
          <div class="marginTop">
            <label for>就诊类型：</label>
            <el-select
              v-model="Attendance.type"
              clearable
              @clear="getListData({page:1,limit:10})"
              filterable
              placeholder="请选择"
            >
              <el-option
                v-for="item in AttendanceSelectType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <!-- 搜索按钮 -->
      <div class="button-seach-regi">
        <el-button
          plain
          icon="el-icon-search"
          class="search"
          @click="getListData({page:1,limit:10})"
        >搜索</el-button>
        <el-button class="reset" @click="resetBtn({page:1,limit:10})">
          <img src="../../../static/png/manbin_icon_chongzhi.png" />重置
        </el-button>
      </div>
      <div>
        <el-button
          class="buildFile"
          plain
          icon="el-icon-circle-plus-outline"
          @click="addrecord"
          type="success"
          style="margin-bottom:10px;"
          v-if="hasPermission('outpatient:add')"
        >新增线下就诊记录</el-button>
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="getRowClass"
    >
      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="档案编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.archivesNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="问诊编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.inquiryNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="患者姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.patientName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.patientSex|conplateSex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.patientAge }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主诉" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.chiefComplaint }}</span>
        </template>
      </el-table-column>
      <el-table-column label="诊断" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.diagnosis }}</span>
        </template>
      </el-table-column>
      <el-table-column label="现病史" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.currentMedicalHistory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="既往病史" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pastMedicalHistory }}</span>
        </template>
      </el-table-column>
      <el-table-column label="问诊类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.inquiryType |InquiryType}}</span>
        </template>
      </el-table-column>

      <el-table-column label="问诊状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.inquiryStatus|inquiryStatus }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="200" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="primary"
            v-show="scope.row.inquiryStatus==0"
            size="mini"
            v-if="hasPermission('outpatient:accomplish')"
            @click="checkDetails(scope.row)"
          >完善病历</el-button>
          <el-button
            size="mini"
            v-show="scope.row.inquiryType==0&&scope.row.inquiryStatus!=0"
            type="danger"
            v-if="hasPermission('outpatient:query')"
            :loading="scope.row.loading"
            @click="lookDetails(scope.row)"
          >查看详情</el-button>
          <el-button
            size="mini"
            v-show="scope.row.inquiryStatus==3"
            type="warning"
            v-if="hasPermission('outpatient:add')"
            :loading="scope.row.loading"
            @click="checkDetails(scope.row)"
          >编辑病历</el-button>
          <el-button
            size="mini"
            v-show="scope.row.inquiryStatus==3"
            type="danger"
            v-if="hasPermission('outpatient:del')"
            :loading="scope.row.loading"
            @click="deleteObj(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="pageQuery.total>0"
      :total="pageQuery.total"
      :page.sync="pageQuery.page"
      :limit.sync="pageQuery.limit"
      @pagination="getListData"
    />
  </div>
</template>

<script>
import { deleteObjs, getList, saveOrUpdate } from "@/api/inquiry/BsInquiry";

export default {
  data() {
    return {
      Attendance: {
        number: "",
        status: "",
        peaple: "",
        type: ""
      },
      AttendanceSelectType: [
        {
          value: "0",
          label: "线上"
        },
        {
          value: "1",
          label: "线下"
        }
      ],
      optionStatus: [
        {
          value: "0",
          label: "待医生补充内容"
        },
        {
          value: "1",
          label: "待用户评价"
        },
        {
          value: "2",
          label: "用户已评价"
        },
        {
          value: "3",
          label: "草稿"
        }
      ],
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      btnLoading: false,
      obj: {
        id: "",
        code: "",
        createBy: "",
        createIp: "",
        createTime: "",
        modifyTime: "",
        modifyBy: "",
        modifyIp: "",
        isDeleted: "",
        patientCode: "",
        doctorCode: "",
        healthAssistantCode: "",
        inquiryType: "",
        chiefComplaint: "",
        diagnosis: "",
        currentMedicalHistory: "",
        pastMedicalHistory: "",
        prescriptionCode: "",
        inquiryTime: "",
        inquiryNumber: "",
        inquiryStatus: "",
        patientName: "",
        patientSex: "",
        patientAge: "",
        diseasesCode: "",
        archivesNumber: ""
      },
      pageQuery: {
        total: 0,
        page: 1,
        limit: 10
      }
    };
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.obj = {
          id: "",
          code: "",
          createBy: "",
          createIp: "",
          createTime: "",
          modifyTime: "",
          modifyBy: "",
          modifyIp: "",
          isDeleted: "",
          patientCode: "",
          doctorCode: "",
          healthAssistantCode: "",
          inquiryType: "",
          chiefComplaint: "",
          diagnosis: "",
          currentMedicalHistory: "",
          pastMedicalHistory: "",
          prescriptionCode: "",
          inquiryTime: "",
          inquiryNumber: "",
          inquiryStatus: "",
          patientName: "",
          patientSex: "",
          patientAge: "",
          diseasesCode: "",
          archivesNumber: ""
        };
        this.$refs["dataForm"].resetFields();
      }
    }
  },
  mounted() {
    this.getListData(this.pageQuery);
  },
  methods: {
    // 搜索按钮
    search() {},
    // 新增就诊记录
    addrecord() {
      this.$router.push("/medicalRecordsDetail");
    },
    // 完善病历//编辑病历
    checkDetails(scope) {
      let obj = {
        inquiryNumber: scope.inquiryNumber,
        code: scope.code
      };
      sessionStorage.setItem("inquiryNumber", JSON.stringify(obj));
      this.$router.push("/medicalRecordsDetail-update");
    },
    // 查看详情
    lookDetails(scope) {
      let obj = {
        inquiryNumber: scope.inquiryNumber,
        code: scope.code
      };
      sessionStorage.setItem("inquiryNumber", JSON.stringify(obj));
      this.$router.push("/medicalRecordsDetail-preview");
    },

    deleteObj(row) {
      this.$confirm("您正在删除一条就诊记录信息,是否继续?", "删除确认", {
        confirmButtonText: "继续",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var array = [];
          array.push(row.id);
          row.loading = true;
          deleteObjs(array).then(res => {
            row.loading = false;
            if (res.code == 0) {
              this.getListData({ page: 1, limit: 10 });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 重置
    resetBtn(param) {
      let _this = this;
      _this.Attendance.number = "";
      (_this.Attendance.status = ""),
        (_this.Attendance.peaple = ""),
        (_this.Attendance.type = ""),
        getList(param).then(res => {
          this.listLoading = false;
          if (res.code == 0) {
            this.list = res.value.records;
            this.pageQuery.total = res.value.total;
            this.pageQuery.page = res.value.current;
            this.pageQuery.limit = res.value.size;
          }
        });
    },
    getListData(pageParam) {
      (pageParam.inquiryNumber = this.Attendance.number),
        (pageParam.patientName = this.Attendance.peaple),
        (pageParam.inquiryStatus = this.Attendance.status),
        (pageParam.inquiryType = this.Attendance.type);
      this.listLoading = true;
      getList(pageParam).then(res => {
        this.listLoading = false;
        if (res.code == 0) {
          this.list = res.value.records;
          this.pageQuery.total = res.value.total;
          this.pageQuery.page = res.value.current;
          this.pageQuery.limit = res.value.size;
        }
      });
    },
    // 更改表头颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:rgba(228,248,245,1)";
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.div-flex {
  width: 85%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.marginTop {
  margin-top: 10px;
}
.button-seach-regi {
  padding-top: 10px;
}
</style>
