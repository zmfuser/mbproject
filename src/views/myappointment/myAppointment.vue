<template>
  <div class="suifang app-container">
    <div class="div-flex">
      <div class="dataInput">
        <span>
          就诊人：
          <el-input
            
            placeholder="就诊人"
            clearable
            @clear="getList({page:1,limit:10})"
            v-model="patientName"
          />
          <!-- <el-input v-model="patientName"></el-input> -->
        </span>
        <span>
          开具日期
          <el-date-picker
            v-model="createTime"
            type="date"
            clearable
            @clear="getList({page:1,limit:10})"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          ></el-date-picker>
        </span>
        <!-- 搜索按钮 -->
        <span class="button-seach-regi marginTop" style="margin-bottom:15px;">
          <el-button plain icon="el-icon-search" class="search" @click="searchBtn()">查询</el-button>
        </span>
      </div>
    </div>

    <!-- 表格 -->
    <el-table
      v-loading="listLoading"
      :data="SFlist"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="getRowClass"
    >
      <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
      <el-table-column label="处方编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="就诊记录编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.inquiryNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="就诊人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.patientName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.patientAge }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.patientSex | time}}</span>
        </template>
      </el-table-column>

      <!-- dataStatus -->
      <el-table-column label="诊断" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.diagnosis }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开具日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.issueTime }}</span>
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
            <el-button v-if="hasPermission('myprescription:query')" @click="preview( scope.row)" size="mini" type="primary">预览</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="电子处方" :visible.sync="dialogVisible" style="height: 90vh">
      <el-row class="PrescriptionHead changesize">
        <el-col :md="24" :sm="24" :xs="24" class="electronicPrescription">
          <div>
            <h3>河南省第三人民医院</h3>
            <p style="letter-spacing: 19px;padding-left: 21px;border-bottom: 1px dashed #ccc;">电子处方筏</p>
          </div>

          <div class="baseData">
            <div>
              <span>姓名:</span>
              <el-input disabled type="text" class="inputstle" v-model="basedrug.doctorName"></el-input>
            </div>
            <div>
              <span>性别:</span>
              <el-input disabled type="text" class="inputstle" v-model="sex"></el-input>
            </div>
            <div>
              <span>年龄:</span>
              <el-input disabled type="text" class="inputstle" v-model="basedrug.patientAge"></el-input>
            </div>
          </div>
          <div class="baseData">
            <div>
              <span>科室/病区:</span>
              <el-input type="text" disabled class="inputstle" v-model="basedrug.departementName"></el-input>
            </div>
            <div>
              <span>开具日期:</span>
              <el-date-picker :disabled="true" v-model="basedrug.issueTime  " type="date" class="inputstle"></el-date-picker>
            </div>
          </div>
          <div class="primaryDiagnosis">
            <label>临床诊断</label>
            <span>{{basedrug.diagnosis}}</span>
          </div>
          <div style="border-bottom: 1px dashed #ccc;padding:10px;" v-if="dialogVisible">
            <b>R:</b>
            <div v-for="(item, i) in drug"
                :key="i">
              <el-row>
                <el-col :md="4" :sm="8" :xs="8" class="drug">
                  <span :title="item.drugsName">{{item.drugsName}}</span>
                </el-col>
                <el-col :md="10" :sm="8" :xs="8" class="counter">
                  <div style="padding-top:7px">
                    ×
                    <el-input-number :disabled="true" v-model="item.drugsAmount" :min="1" :max="30" label="描述文字" size="mini"></el-input-number>{{item.drugsRetailUnit}}
                  </div>
                </el-col>
                <el-col :md="7" :sm="8" :xs="8">
                  <p style="text-align:center">{{item.drugsPrice}}元</p>
                </el-col>
              </el-row>
              <el-row class="counter">
                <el-col :md="4" :sm="24" :xs="24" class="lineHeight28">
                  <span>用量：</span>
                </el-col>
                <el-col :md="10" :sm="24" :xs="24">
                  每
                  <el-input-number :disabled="true" v-model="item.dosageDay" :min="1" :max="30" label="描述文字" size="mini"></el-input-number>日
                  <el-input-number :disabled="true" v-model="item.dosageTime" :min="1" :max="30" label="描述文字" size="mini"></el-input-number>次
                </el-col>
                <el-col :offset="2" :md="8" :sm="24" :xs="24">
                  <span class="Medication_compliance">
                    每次
                    <el-input disabled size="mini" v-model="item.dosageMini"></el-input>
                  </span>
                </el-col>
              </el-row>
            </div>
          </div>
          <div style="padding-top:10px;" class="changesize">
            备注
            <el-input
              disabled
              type="textarea"
              v-model="basedrug.remark"
              rows="4"
              maxlength="50"
              placeholder="请输入少于50个字"
            ></el-input>
          </div>
          <div class="doctor">
            <el-row>
              <el-col :offset="17" :md="11" :sm="6" :xs="6" id="signature">
                <label>医生(签章)：</label>
                <img :src="basedrug.doctorSignatureUrl" alt />
              </el-col>
            </el-row>
            <el-row>
              <el-col :offset="17" :md="9" :sm="6" :xs="6" id="signature">
                <b>
                  金额：
                  <span>{{basedrug.totalAmount}}</span>元
                </b>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <!-- 页码 -->
    <pagination
      class="page"
      v-show="total>0"
      :total="total"
      :page.sync="pagecQuery.page"
      :limit.sync="pagecQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import {
  queryPrescriptionList,
  queryPrescriptionScheduleByCode
} from "@/api/myappointment/myappointment.js";
export default {
  data() {
    return {
      time: "",
      patientName: "",
      num: "",
      appiontmentName: "",
      medicationCompliance: "",
      createTime: "",
      number: "",
      querys: {
        archivesCode: "",
        healthAssistantName: "",
        createTime: ""
      },
      sex: "",
      basedrug: {},
      drug: {
        drugsName: "药品名",
        drugsSpec: "规格",
        drugsPrice: 12,
        drugsRetailUnit: null,
        drugsUsage: null,
        dosage: null,
        drugsCode: null,
        drugsAmount: null
      },
      form: {},

      total: 0,
      pagecQuery: {
        page: 1,
        limit: 10
      },
      dialogVisible: false,
      SFlist: [{}],
      listLoading: false,
      dialogaddSFVisible: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    // 处方预览
    preview(scope) {
      let _this = this;

      scope.patientSex == 0 ? (_this.sex = "男") : (_this.sex = "女");
      _this.$set(_this, "basedrug", scope);
      _this.$nextTick(function() {
       
        if (scope.code) {
          queryPrescriptionScheduleByCode(scope.code).then(res => {
            if (res.code == 0) {
              var arr = [],
                arr1 = [];
              if (res.value) {
                let obj = res.value;

                for (const drug in obj) {
                  if (obj != null) {
                    arr = obj[drug].dosage.split("/");
                  }
                  arr1.push({
                    drugsName: obj[drug].drugsName,
                    drugsSpec: obj[drug].drugsSpec,
                    drugsPrice: obj[drug].drugsPrice,
                    drugsRetailUnit: obj[drug].drugsRetailUnit,
                    drugsUsage: obj[drug].drugsUsage,
                    dosage: "",
                    dosageDay: arr[0],
                    dosageTime: arr[1],
                    dosageMini: arr[2],
                    drugsCode: obj[drug].drugsCode,
                    drugsAmount: obj[drug].drugsAmount
                  });
                }
                _this.$set(_this, "drug", arr1);
                 _this.dialogVisible = true;
              }
            }
          });
        }
      });
    },
    // 自动获取列表数据
    getList() {
      let _this = this;
      // _this.pagecQuery.doctorCode = "1135443614210588672";
      _this.pagecQuery.doctorCode = _this.$store.state.user.dataUser.id;
      queryPrescriptionList(_this.pagecQuery).then(res => {
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
        doctorCode: this.$store.state.user.dataUser.id,
        page: 1,
        limit: 10
      };
      if (this.patientName != "" && this.patientName) {
        search.patientName = this.patientName;
      }
      if (this.createTime != "" && this.createTime) {
        search.issueTime = this.createTime;
      }
      queryPrescriptionList(search).then(res => {
        let value = res.value;
        if (res.code == 0) {
          this.SFlist = res.value.records;
          this.total = value.total;
          this.pagecQuery.page = value.current;
          this.pagecQuery.limit = value.size;
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
#signature {
  padding-top: 10px;
}
#signature img {
  display: inline-block;
  width: 135px;
  vertical-align: middle;
  text-align: right;
  background-color: black;
}
.suifang >>> .el-dialog__body {
  padding-top: 0;
}
.drug {
  line-height: 42px;
}
.lineHeight28 {
  line-height: 28px;
}
.Medication_compliance >>> .el-input {
  width: 60%;
}
.inputstle {
  width: 70%;
  border-bottom: 1px solid;
}
.doctor {
  border-top: 2px solid black;
  margin-top: 15px;
}
.counter >>> .el-input-number__decrease {
  background-color: #ffffff;
}
.counter >>> .el-input-number__increase {
  background-color: #ffffff;
}
.counter >>> .el-input-number {
  width: 120px;
}
.primaryDiagnosis {
  padding-bottom: 15px;
  border-bottom: 2px solid black;
}
.baseData >>> .el-input__inner {
  border: none;
}
.baseData {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 15px;
}
.electronicPrescription > :first-child {
  text-align: center;
}
.electronicPrescription {
  padding-top: 50px;
}
.PrescriptionHead {
  border-top: 1px solid #ccc;
  /* border-bottom: 1px dashed #ccc; */
}

.PrescriptionHead >>> .el-date-editor.el-input {
  width: 145px;
}
.name >>> .el-input {
  width: 70%;
}
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
.dataInput {
  margin-bottom: 30px;
}
.dataInput >>> .el-input {
  width: 200px;
  margin-right: 20px;
}
.changesize>>>.el-input.is-disabled .el-input__inner{
  background-color:transparent;
  color:#000;
  cursor: default;
}
.changesize>>>.el-textarea.is-disabled .el-textarea__inner{
  background-color:transparent;
  color:#000;
  cursor: default;
}
</style>

