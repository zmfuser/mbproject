<template>
  <div class="suifang app-container">
    <div style="color:rgba(63, 81, 181, 1)">基础信息:</div>
    <el-form ref="form"  :model="newDoctor" label-width="87px">
      <el-row>
        <el-col :offset="2" :md="10" :sm="24" :xs="24">
          <el-form-item label="就诊人姓名:" >
            <!-- value-key="userName" -->
            <el-col :span="12">
              <el-autocomplete
                v-model="newDoctor.patientName"
                value-key="userName"
                :trigger-on-focus="false"
                :hide-loading="false"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输姓名"
                @select="handleSelect"
                style="width:100%"
              ></el-autocomplete>
            </el-col>

            <!-- <el-col :span="12">
              <el-input type="text" v-model="newDoctor.archivesNumber"></el-input>
            </el-col>-->
          </el-form-item>
        </el-col>
        <el-col :md="10" :sm="24" :xs="24">
          <el-form-item label="记录类型:" >
            <el-col :span="12">
              <el-select v-model="newDoctor.inquiryType" placeholder="请选择" style="width:100%">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-col>
          </el-form-item>
        </el-col>

        <el-col :offset="2" :md="10" :sm="24" :xs="24">
          <el-form-item label="接诊医生:" >
            <el-col :span="12">
              <!-- <span>{{newDoctor.bsPrescription.doctorName}}</span> -->
              <el-input v-model="newDoctor.bsPrescription.doctorName" placeholder="请输姓名"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :md="10" :sm="24" :xs="24">
          <el-form-item label="就诊科室:" >
            <el-col :span="12">
              <el-input placeholder="请输入就诊科室" v-model="newDoctor.bsPrescription.departementName"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2" :md="10" :sm="24" :xs="24">
          <el-form-item label="接诊日期:" >
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="newDoctor.bsPrescription.issueTime"
              style="width: 50%;"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :md="10" :sm="24" :xs="24">
          <el-form-item label="档案编号:" >
            <el-col :span="12">
              <el-input type="text" placeholder="请输入档案编号" v-model="newDoctor.archivesNumber"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2" :md="10" :sm="24" :xs="24">
          <el-form-item label="年龄:" >
            <el-col :span="12">
              <el-input type="text" v-model="newDoctor.patientAge"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :md="10" :sm="24" :xs="24">
          <el-form-item label="性别:" >
            <el-radio-group v-model="newDoctor.patientSex">
              <el-radio :label="0" name="type">男</el-radio>
              <el-radio :label="1" name="type">女</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2" :span="12" :md="10" :sm="24" :xs="24">
          <el-form-item label="身份证号:">
            <el-col :span="12">
              <el-input type="text" v-model="newDoctor.patientCode" placeholder="请输入身份证号"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="color:rgba(63, 81, 181, 1)">就诊详情:</div>
      <el-row>
        <el-col :offset="2" :md="16" :sm="24" :xs="24">
          <el-form-item label="诊断:">
            <el-col :span="24">
              <el-input type="text" v-model="newDoctor.diagnosis"></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2" :md="16" :sm="24" :xs="24">
          <el-form-item label="主诉:">
            <el-col :span="24">
              <el-input
                type="textarea"
                v-model="newDoctor.chiefComplaint"
                rows="6"
                maxlength="1000"
                show-word-limit
                placeholder="请输入少于1000字"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2" :md="16" :sm="24" :xs="24">
          <el-form-item label="现病史:">
            <el-col :span="24">
              <el-input
                type="textarea"
                v-model="newDoctor.currentMedicalHistory"
                rows="6"
                maxlength="1000"
                show-word-limit
                placeholder="请输入少于1000字"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2" :md="16" :sm="24" :xs="24">
          <el-form-item label="既往史:">
            <el-col :span="24">
              <el-input
                type="textarea"
                v-model="newDoctor.pastMedicalHistory"
                rows="6"
                maxlength="1000"
                show-word-limit
                placeholder="请输入少于1000字"
              ></el-input>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="2" :md="16" :sm="24" :xs="24">
          <el-form-item label="电子处方:">
            <el-col :span="24">
              <el-button size="mini" @click="addPrescription">编辑处方</el-button>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :offset="13" :md="16" :sm="24" :xs="24" id="signature">
          <label>医生(签章)：</label>
          <img :src="newDoctor.bsPrescription.doctorSignatureUrl" alt />
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="20" :sm="24" :xs="24" id="signature">
          <div class="comfimButton">
            <el-button type="warning" @click="saveData(3)">保存草稿</el-button>
            <el-button type="success" @click="saveData(0)">确认</el-button>
          </div>
        </el-col>
      </el-row>

      <el-dialog class="allDialog" title="电子处方" :visible.sync="dialogVisible1" style="height:90vh;">
        <el-row class="PrescriptionHead" id="electronicPrescription">
          <el-col :md="16" :sm="16" :xs="16" class="electronicPrescription">
            <div>
              <h3>河南省第三人民医院</h3>
              <p
                style="letter-spacing: 19px;padding-left: 21px;border-bottom: 1px dashed #ccc;"
              >电子处方筏</p>
            </div>

            <div class="baseData">
              <div>
                <span>姓名:</span>
                <el-input
                  type="text"
                  class="inputstle"
                  v-model="newDoctor.bsPrescription.patientName"
                ></el-input>
              </div>
              <div>
                <span>性别:</span>
                <el-input type="text" class="inputstle" v-model="Sex"></el-input>
              </div>
              <div>
                <span>年龄:</span>
                <el-input
                  type="text"
                  class="inputstle"
                  v-model="newDoctor.bsPrescription.patientAge"
                ></el-input>
              </div>
            </div>
            <div class="baseData">
              <div>
                <span>科室/病区:</span>
                <el-input
                  type="text"
                  class="inputstle"
                  v-model="newDoctor.bsPrescription.departementName"
                ></el-input>
              </div>
              <div>
                <span>开具日期:</span>
                <el-date-picker
                  v-model="newDoctor.bsPrescription.issueTime  "
                  type="date"
                  class="inputstle"
                ></el-date-picker>
              </div>
            </div>
            <div class="primaryDiagnosis">
              <label>临床诊断</label>
              <span>{{newDoctor.bsPrescription.diagnosis}}病毒性感冒【初步诊断】</span>
            </div>
            <b>R:</b>
            <div>
              <div
                v-for="(item, i) in newDoctor.bsPrescription.bsPrescriptionSchedules"
                :key="i"
                style="border-bottom: 1px dashed #ccc;padding:10px;"
              >
                <el-row>
                  <el-col :md="6" :sm="8" :xs="8" class="drug">
                    <span :title="item.drugsName">{{item.drugsName}}</span>
                  </el-col>
                  <el-col :md="10" :sm="8" :xs="8" class="counter">
                    <div style="padding-top:7px">
                      ×
                      <el-input-number
                        v-model="item.drugsAmount"
                        :min="1"
                        :max="30"
                        label="描述文字"
                        size="mini"
                      ></el-input-number>
                      <span>{{item.drugsRetailUnit}}</span>
                    </div>
                  </el-col>
                  <el-col :md="5" :sm="8" :xs="8">
                    <p style="text-align:center">{{item.drugsPrice}}元</p>
                  </el-col>
                  <el-col :md="3" :sm="8" :xs="8">
                    <i
                      class="el-icon-delete-solid"
                      title="删除当前行药品"
                      style=" ;padding-left: 40px;"
                      @click="deleteDrug(i)"
                    ></i>
                  </el-col>
                </el-row>
                <el-row class="counter">
                  <el-col :md="18" :sm="18" :xs="18">
                    <span>用量：</span>
                    每
                    <el-input-number
                      v-model="item.dosageDay"
                      :min="1"
                      :max="30"
                      label="描述文字"
                      size="mini"
                    ></el-input-number>日
                    <el-input-number
                      v-model="item.dosageTime"
                      :min="1"
                      :max="30"
                      label="描述文字"
                      size="mini"
                    ></el-input-number>次
                  </el-col>
                  <el-col :md="6" :sm="6" :xs="6" class="Medication_compliance">
                    <span>
                      每次
                      <el-input size="mini" v-model="item.dosageMini"></el-input>
                    </span>
                  </el-col>
                </el-row>
                <el-row style="line-height:42px">
                  <el-col :md="12" :sm="6" :xs="6" class="Medication_compliance">
                    <span>
                      用法
                      <el-input size="mini" placeholder="口服" v-model="item.drugsUsage"></el-input>
                    </span>
                  </el-col>
                </el-row>
              </div>
            </div>

            <div style="padding-top:10px;">
              备注
              <el-input
                type="textarea"
                v-model="newDoctor.bsPrescription.remark"
                rows="4"
                maxlength="50"
                placeholder="请输入少于50个字"
              ></el-input>
            </div>
            <div class="doctor">
              <el-row>
                <el-col :offset="13" :md="11" :sm="6" :xs="6" id="signature">
                  <label>医生(签章)：</label>
                  <img :src="newDoctor.bsPrescription.doctorSignatureUrl" alt />
                </el-col>
              </el-row>
              <el-row>
                <el-col :offset="15" :md="9" :sm="6" :xs="6" id="signature">
                  <b>
                    金额：
                    <span>{{newDoctor.bsPrescription.totalAmount}}</span>元
                  </b>
                </el-col>
              </el-row>
            </div>
            <div class="comfirm">
              <el-button size="medium" type="success" @click="dialogVisible1=false">确认</el-button>
              <el-button size="medium" type="warning" @click="dialogVisible1=false">取消</el-button>
            </div>
          </el-col>
          <el-col :md="8" :sm="8" :xs="8" class="choiceDrug" id="add">
            <b>选择药品</b>
            <div class="choiceDrg">
              <el-input
                placeholder="药品名称"
                clearable
                @clear="clearCondition"
                size="mini"
                v-model="fineDrugName"
              ></el-input>
              <el-button size="mini" style="margin-left:5px;" @click="handleFineDrug">搜索</el-button>
            </div>
            <div
              class="choiceDrg"
              style="border-bottom:1px solid #ccc"
              v-for="(item,i) of druglish"
              :key="i"
            >
              <div style="width:100%">
                <b>{{item.drugsName}}</b>
                <p class="font_size">
                  规格
                  <b style="margin-left:5px">{{item.drugsSpec}}</b>
                </p>
                <p class="font_size">
                  零售单位
                  <b style="margin-left:5px">{{item.drugsRetailUnit}}</b>
                </p>
              </div>
              <div class="font_size text_align_right">
                <el-button type="success" size="mini" @click="addDrugToLeft(i)" style="margin-bottom:5px ;width: 80px;">添加</el-button>
                <el-button type="success" size="mini" class="instructions" @click="checkInstructions(i)">查看说明</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-dialog>
      <el-dialog class="instructionsUrl" title="药品说明书" :visible.sync="drugInstructions">
        <iframe :src="newDoctor.bsPrescription.doctorSignatureUrl" frameborder="0" style="width:100%;height:100%;"></iframe>
      </el-dialog>
    </el-form>
  </div>
</template>
<script>
import {
  saveUpInquiry,
  getOnInquiry,
  drugsList,
  getPagelist
} from "@/api/inquiry/BsInquiry";
export default {
  data() {
    return {
      // labelPosition:"left",
      drugInstructions: false,
      dialogVisible1: false,
      eventNum: 0,
      arr: [],
      druglish: [],
      restaurants: [],
      obj: "",
      routerCode: "",
      instructionsUrl: "",
      fineDrugName: "",
      options: [
        {
          value: 0,
          label: "线上问诊"
        },
        {
          value: 1,
          label: "线下问诊"
        }
      ],
      Sex: "",
      num: "",
      rowData: "",
      newDoctor: {
        doctorName: "",
        patientCode: "",
        doctorCode: "",
        inquiryType: "",
        healthAssistantCode: "",
        chiefComplaint: "",
        diagnosis: "",
        currentMedicalHistory: "",
        pastMedicalHistory: "",
        inquiryStatus: "",
        patientName: "",
        patientSex: "",
        patientAge: "",
        inquiryNumber: "",
        diseasesCode: "",
        archivesNumber: "",
        bsPrescription: {
          inquiryNumber: "",
          patientName: "",
          patientSex: "",
          issueTime: "",
          departementName: "",
          diagnosis: "",
          archivesNumber: "",
          doctorSignatureUrl: "",
          totalAmount: "",
          doctorCode: "",
          doctorName: "",
          departmentCode: "",
          patientAge: "",
          appUserCode: "",
          bsPrescriptionSchedules: []
        }
      },
    
      form: {
        desc: ""
      },
      time: "",
      total: 0,
      pageQuery: {
        page: 1,
        limit: 10
      }
    };
  },
  watch: {},
  computed: {},
  mounted() {
    this.handleFineDrug();
    this.getCodeInquiryNumber();
    this.getRouter();
  },
  beforeDestroy() {
    if (this.eventNum > 0) {
      document
        .getElementById("add")
        .removeEventListener("scroll", this.handleScroll);
    }
  },
  methods: {
    // 计算总价格
    addAllPrice() {
      var price = 0;
      for (const iterator of this.newDoctor.bsPrescription
        .bsPrescriptionSchedules) {
        price += iterator.drugsPrice;
      }
      this.newDoctor.bsPrescription.totalAmount =price.toFixed(2);
    },
    // 删除处方中的药品
    deleteDrug(index) {
      let _this = this;
      _this.newDoctor.bsPrescription.bsPrescriptionSchedules.splice(index, 1);
      _this.addAllPrice();
      _this.synchronHeight();
    },
    // 清空刷新药品列表
    clearCondition() {
      this.handleFineDrug();
    },
    // 获取药品列表
    handleFineDrug() {
      let _this = this;
      // if (_this.fineDrugName) {
      let pageQuery = {
        page: 1,
        limit: 10
      };
      pageQuery.param = _this.fineDrugName;
      drugsList(pageQuery).then(res => {
        if (res.code == 0) {
          _this.$set(_this, "druglish", res.value.records);
        }
      });
    },
    //添加处方药品
    addDrugToLeft(index) {
      let _this = this,
        drug = _this.druglish[index];
      _this.newDoctor.bsPrescription.bsPrescriptionSchedules.push({
        prescriptionCode: "",
        drugsName: drug.drugsName,
        drugsSpec: drug.drugsSpec,
        drugsPrice: drug.drugsPrice,
        drugsRetailUnit: drug.drugsRetailUnit,
        drugsUsage: 1,
        dosage: "",
        dosageDay: "",
        dosageTime: "",
        dosageMini: "",
        drugsCode: 1,
        drugsAmount: 1
      });
      _this.synchronHeight();
    },
    // 同步高度
    synchronHeight() {
      let _this = this;
      setTimeout(() => {
        var synchronousHeight = document.getElementsByClassName(
          "electronicPrescription"
        )[0].clientHeight;
        document.getElementsByClassName("choiceDrug")[0].style.height =
          synchronousHeight + "px";
        _this.addAllPrice();
      }, 100);
    },
    //  远程搜索
    querySearchAsync(queryString, cb) {
      let _this = this;
      if (queryString) {
        let obj = {
          userName: queryString
        };
        getPagelist(obj).then(res => {
          if (res.value.length > 0) {
            _this.restaurants = [];
            for (const item of res.value) {
              _this.restaurants.push({
                userName: item.userName,
                archivesCode: item.archivesCode,
                userSex: item.userSex,
                // archivesCode
                userCard: item.userCard,
                userAge: item.userAge
              });
            }
            cb(_this.restaurants);
          }
        });
      }
    },
    handleSelect(item) {
      this.newDoctor.archivesNumber = item.archivesCode;
      this.newDoctor.bsPrescription.patientAge = item.userAge;
      this.newDoctor.patientCode = item.userCard;
      this.newDoctor.bsPrescription.patientSex = item.userSex;
    },

    // 获取就诊记录数据
    getRouter() {
      let _this = this;
      if (_this.routerCode != "") {
        getOnInquiry(_this.routerCode).then(res => {
         
          if (res.code == 0) { 
            for (const item in res.value) {
              if (_this.newDoctor.hasOwnProperty(item) && res.value[item]) {
                _this.newDoctor[item]=res.value[item]
              }
            }
            // _this.$set(_this, "newDoctor", res.value);

            _this.$nextTick(function() {
              var arr1 = [],
                arr = [];
              if (_this.newDoctor.bsPrescription) {
                let obj =
                  _this.newDoctor.bsPrescription.bsPrescriptionSchedules;

                for (const drug in _this.newDoctor.bsPrescription
                  .bsPrescriptionSchedules) {
                  if (
                    _this.newDoctor.bsPrescription.bsPrescriptionSchedules !=
                    null
                  ) {
                    arr = _this.newDoctor.bsPrescription.bsPrescriptionSchedules[
                      drug
                    ].dosage.split("/");
                    
                  }
                  arr1.push({
                    prescriptionCode: "",
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
                _this.$set(
                  _this.newDoctor.bsPrescription,
                  "bsPrescriptionSchedules",
                  arr1
                );
              }

              if (_this.newDoctor.patientSex != null) {
                _this.newDoctor.patientSex == 0
                  ? (_this.Sex = "男")
                  : (_this.Sex = "女");
              }
            });

            console.log(_this.newDoctor);
          }
        });
      }
    },
    //  获取code,inquiryNumber
    getCodeInquiryNumber() {
      let obj = JSON.parse(sessionStorage.getItem("inquiryNumber"));
      this.routerCode = obj.inquiryNumber;
      this.code = obj.code;
    },
    // saveDataFunction保存数据方法
    saveDataFunction(value) {
      let _this = this;
      this.newDoctor.inquiryStatus = value;
      this.newDoctor.code = this.code;
      var baseInfo = true;
      let doctorBaseInfo = {
        // issueTime: this.newDoctor.bsPrescription.issueTime,
        departementName: this.newDoctor.bsPrescription.departementName,
        doctorName: this.newDoctor.doctorName,
        archivesNumber: this.newDoctor.archivesNumber,
        patientCode: this.newDoctor.patientCode,
        doctorName: this.newDoctor.bsPrescription.doctorName,
        inquiryType: this.newDoctor.inquiryType
      };

      for (const key in doctorBaseInfo) {
        if (doctorBaseInfo[key] == "" || doctorBaseInfo[key] == null) {
          baseInfo = false;
        }
      }
      if (baseInfo) {
        var obj = _this.newDoctor.bsPrescription.bsPrescriptionSchedules,
          newArr = [];
        for (const key in obj) {
          newArr.push({
            prescriptionCode: "",
            drugsName: obj[key].drugsName,
            drugsSpec: obj[key].drugsSpec,
            drugsPrice: obj[key].drugsPrice,
            drugsRetailUnit: obj[key].drugsRetailUnit,
            drugsUsage: obj[key].drugsUsage,
            dosage: `${obj[key].dosageDay}/${obj[key].dosageTime}/${obj[key].dosageMini}`,

            drugsCode: obj[key].drugsCode,
            drugsAmount: obj[key].drugsAmount
          });
        }
        _this.$set(
          _this.newDoctor.bsPrescription,
          "bsPrescriptionSchedules",
          newArr
        );
        saveUpInquiry(this.newDoctor).then(res => {
          if (res.code == 0) {
            _this.$message.success(res.msg);
             _this.$router.push("/BsInquiry");
          }
          console.log(res);
        });
      } else {
        // this.$message.warning("请先填写完整顶部基础信息")
        this.$message.warning("请先填写完整顶部基础信息");
      }
    },
    // 保存草稿
    saveData(value) {
      if (value == 0) {
        this.$confirm("次操作将不再可编辑数据", "是否继续?", "删除确认", {
          confirmButtonText: "继续",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.saveDataFunction(value);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        this.saveDataFunction(value);
      }
    },
    // 编辑处方
    addPrescription() {
      this.eventNum += 1;
      this.dialogVisible1 = true;
      setTimeout(() => {
        document
          .getElementById("add")
          .addEventListener("scroll", this.handleScroll);
      }, 100);
    },
    /**
     * 滚动加载
     */
    handleScroll() {
      let _this = this;
      let container = document.getElementById("add");
      let bottomPosition =
        container.scrollHeight - container.scrollTop - container.clientHeight;
      if (bottomPosition <= 1) {
        _this.pageQuery.page += 1;
        drugsList(_this.pageQuery).then(res => {
          if (res.code == 0) {
            _this.druglish = _this.druglish.concat(res.value.records);
          }
        });
      }
    },
    checkInstructions(index) {
      this.drugInstructions = true;
      let _this = this;
      this.instructionsUrl = _this.druglish[index].instructionsUrl;
    }
  }
};
</script>
<style scoped>
.suifang >>> .el-form-item__label {
  text-align: left;
}
.suifang >>> .el-dialog__body {
  padding-top: 0;
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
.baseData >>> .el-input__inner {
  border: none;
}
.baseData {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
}
.inputstle {
  width: 50%;
  border-bottom: 1px solid;
}
.primaryDiagnosis {
  padding-bottom: 15px;
  border-bottom: 2px solid black;
}
.drygNumber {
  border-bottom: 1px solid #ccc;
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
.drug {
  line-height: 42px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.Medication_compliance >>> .el-input {
  width: 70%;
}
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
.comfirm {
  text-align: center;
  padding-top: 20px;
}
.doctor {
  border-top: 2px solid black;
  margin-top: 15px;
}
.choiceDrg {
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
}
.font_size {
  font-size: 12px;
}
.instructions {
  /* color: rgb(63, 81, 181); */
}
.comfimButton {
  margin-top: 15px;
  text-align: center;
}
/* .allDialog >>> .el-dialog {
  height: 100%;
  overflow-y: auto  ;
  border: 1px solid red
}
.allDialog >>> .el-dialog__body {
  height: 100%;
  overflow-y: auto
} */
.choiceDrug {
  padding: 50px 10px 10px 10px;
  height: 600px;
  overflow-y: auto;
}
.instructionsUrl >>> .el-dialog__body {
  height: 70vh;
}
.text_align_right {
  text-align: right;
}
</style>
