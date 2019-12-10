<template>
  <div class="r-userinfo">
    <!-- 就诊记录 -->
    <div>
      <div class="patient-record">就诊记录</div>
      <!-- <div class="patient-img"> -->
        <!-- <img id="id" :src="form.imgsrc" alt /> -->
      <!-- </div> -->
      <div class="parient-flex">
        <div>记录编号：{{newDoctor.inquiryNumber}}</div>
        <!-- <div>科室：{{newDoctor.departmentName}}</div> -->
      </div>
      <div class="parient-flex">
        <div>患者：{{newDoctor.patientName}}</div>
        <div>年龄：{{newDoctor.patientAge}}</div>
      </div>
      <div class="parient-flex">
        <div>性别：{{newDoctor.patientSex | conplateSex}}</div>
        <div>就诊时间：{{newDoctor.inquiryTime}}</div>
      </div>

      <el-collapse v-model="activeNames" accordion>
        <div class="axisLine"></div>
        <el-collapse-item title="添加诊断" name="1">
          <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="newDoctor.diagnosis"></el-input>
        </el-collapse-item>
        <div class="axisLine"></div>
        <el-collapse-item title="添加主诉" name="2">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="newDoctor.chiefComplaint"
          ></el-input>
        </el-collapse-item>
        <div class="axisLine"></div>
        <el-collapse-item title="添加现病史" name="3">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="newDoctor.currentMedicalHistory"
          ></el-input>
        </el-collapse-item>
        <div class="axisLine"></div>
        <el-collapse-item title="添加既往史" name="4">
          <el-input
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
            v-model="newDoctor.pastMedicalHistory"
          ></el-input>
        </el-collapse-item>
        <div class="axisLine"></div>
      </el-collapse>
      <div class="parient-flex">
        <div>处方</div>
        <el-button
          size="mini"
          @click="createChufang"
          v-show="user.roleIdStr!='f458a20b767e42ba97816983423c9fd7'"
        >创建处方</el-button>
      </div>
      <div class="axisLine"></div>

      <div class="parient-btn">
        <fieldset>
          <el-button size="mini" @click="createClinic">创建就诊记录</el-button>
          <el-button size="mini">预览</el-button>
          <el-button size="mini" @click="saveClinic">保存草稿</el-button>
        </fieldset>
      </div>
    </div>
    <!-- 电子处方 -->
    <el-dialog
      :before-close="closeDialog"
      class="allDialog"
      title="电子处方"
      :visible.sync="doctorVisible"
      :append-to-body="true"
      width="60%"
      style="height:90vh;"
    >
      <el-row class="PrescriptionHead" id="electronicPrescription">
        <el-col :md="16" :sm="16" :xs="16" class="electronicPrescription">
          <div>
            <h3>河南省第三人民医院</h3>
            <p style="letter-spacing: 19px;padding-left: 21px;border-bottom: 1px dashed #ccc;">电子处方筏</p>
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
              <el-input type="text" class="inputstle" v-model="patientSex"></el-input>
            </div>
            <div>
              <span>年龄:</span>
              <el-input type="text" class="inputstle" v-model="newDoctor.bsPrescription.patientAge"></el-input>
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
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </div>
          </div>
          <div class="primaryDiagnosis">
            <label>临床诊断</label>
            <span>{{newDoctor.bsPrescription.diagnosis}}【初步诊断】</span>
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
                <el-col :md="8" :sm="8" :xs="8" class="counter">
                  <div style="padding-top:7px">
                    ×
                    <el-input-number
                      v-model="item.drugsAmount"
                      :min="1"
                      :max="30"
                      label="描述文字"
                      size="mini"
                      @change="addAllPrice"
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
                    @change="handleChange(i)"
                    label="描述文字"
                    size="mini"
                  ></el-input-number>日
                  <el-input-number
                    v-model="item.dosageTime"
                    :min="1"
                    @change="handleChange(i)"
                    :max="30"
                    label="描述文字"
                    size="mini"
                  ></el-input-number>次
                </el-col>
                <el-col :md="6" :sm="6" :xs="6" class="Medication_compliance">
                  <span>
                    每次
                    <el-input size="mini" v-model="item.dosageMini" @blur="handleChange(i)"></el-input>
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
            <el-button size="medium" @click="affirm">确认</el-button>
            <el-button size="medium" @click="doctorVisible=false">取消</el-button>
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
            <div>
              <b class="padding">{{item.drugsName}}</b>
              <p class="font_size padding">
                规格
                <b style="margin-left:5px">{{item.drugsSpec}}</b>
              </p>
              <p class="font_size padding">
                零售单位
                <b style="margin-left:5px">{{item.drugsRetailUnit}}</b>
              </p>
            </div>
            <div class="font_size padding">
              <el-button size="mini" @click="addDrugToLeft(i)">添加</el-button>
              <p class="instructions" @click="checkInstructions(i)">查看说明</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog
      class="instructionsUrl"
      title="药品说明书"
      :append-to-body="true"
      :visible.sync="drugInstructions"
    >
      <iframe :src="instructionsUrl" frameborder="0" style="width:100%;height:100%;"></iframe>
    </el-dialog>
  </div>
</template>


<script>
import {
  getDoctor,
  getUserIngInquiry,
  findDoctor,
  updateInquiry,
  itemKey
} from "@/api/im/checkIm.js";
import { drugsList } from "@/api/inquiry/BsInquiry.js";
export default {
  props: ["medicalrecord"],
  data() {
    return {
      patientSex:"",
      talkVue: null,
      user: this.$store.state.user.dataUser,
      doctorVisible: false,
      activeNames: [],
      pageQuery: {
        page: 1,
        limit: 10
      },
      druglish: [],
      fineDrugName: "",
      form: {},
      instructionsUrl: "",
      drugInstructions: false,
      newDoctor: {
        patientCode: "",
        inquiryType: 0,
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
        bsPrescription: {
          remark: "",
          patientSex: "",
          patientAge: "",
          patientName: "",
          issueTime: "",
          departementName: "",
          archivesNumber: "",
          diagnosis: "",
          doctorSignatureUrl: "",
          doctorCode: "",
          doctorName: "",
          totalAmount: "",
          departmentCode: "",
          bsPrescriptionSchedules: []
        }
      }
    };
  },
  mounted() {
    let _this = this;

    let obj = {
      doctorCode: _this.$store.state.user.dataUser.id
    };
    // 获取科室
    findDoctor(obj).then(res => {
      console.log(res);
      if (res.code == 0) {
        _this.newDoctor.bsPrescription.departmentCode =
          res.value[0].departmentLevel1;
        _this.newDoctor.bsPrescription.departementName =
          res.value[0].departmentLevel1Name;
      }
    });
    // 获取签名
    _this.newDoctor.bsPrescription.doctorSignatureUrl =
      _this.$store.state.user.dataUser.doctorAutographUrl;
    _this.$bus.on("record", res => {
      _this.form = res.value;
      _this.newDoctor.inquiryNumber = res.value.inquiryNumber;
      _this.newDoctor.chiefComplaint = res.value.chiefComplaint;
      _this.newDoctor.currentMedicalHistory = res.value.currentMedicalHistory;
      _this.newDoctor.diagnosis = res.value.diagnosis;
      _this.newDoctor.inquiryTime = res.value.inquiryTime;
      _this.newDoctor.pastMedicalHistory = res.value.pastMedicalHistory;
      _this.newDoctor.patientAge = res.value.patientAge;
      _this.newDoctor.patientCode = res.value.patientCode;
      _this.newDoctor.patientName = res.value.patientName;
      _this.newDoctor.patientSex = res.value.patientSex;

      _this.newDoctor.archivesNumber = res.value.archivesNumber;

      _this.newDoctor.bsPrescription.patientSex = res.value.patientSex;
      _this.newDoctor.bsPrescription.archivesNumber = res.value.archivesNumber;
      _this.newDoctor.bsPrescription.patientName = res.value.patientName;
      _this.newDoctor.bsPrescription.patientAge = res.value.patientAge;

      _this.talkVue = res.Vue;
      // _this.getuserImg(_this.form.patientCode)
    });
    _this.handleFineDrug();
  },
  methods: {
    // 确认
    affirm() {
      let _this = this;
      _this.doctorVisible = false;
      var list = _this.newDoctor;
    },
    //  随访记录
    medicalRecord() {},
    closeDialog(done) {
      let _this = this;
      done();
      _this.newDoctor.bsPrescription.bsPrescriptionSchedules = [];
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
    // 计算总价格
    addAllPrice() {
      let _this = this;
      var price = 0;
      for (let iterator of this.newDoctor.bsPrescription
        .bsPrescriptionSchedules) {
        price += iterator.drugsAmount * iterator.drugsPrice;
      }
      _this.newDoctor.bsPrescription.totalAmount = price.toFixed(2);
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
    //添加处方药品
    addDrugToLeft(index) {
      let _this = this,
        drug = _this.druglish[index];
      _this.newDoctor.bsPrescription.bsPrescriptionSchedules.push({
        prescriptionCode: "", //处方code
        drugsName: drug.drugsName,
        drugsSpec: drug.drugsSpec,
        drugsPrice: drug.drugsPrice,
        drugsRetailUnit: drug.drugsRetailUnit,
        drugsUsage: 1,
        dosage: "",
        dosageDay: "",
        dosageTime: "",
        dosageMini: "",
        drugsCode: drug.code,
        drugsAmount: 1
      });
      _this.synchronHeight();
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
    // 清空刷新药品列表
    clearCondition() {
      let _this = this;
      _this.handleFineDrug();
    },
    // 药品搜索
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
    // 获取用户信息头像
    // getuserImg(valueCode){
      // let _this=this
      // let nim=_this.talkVue.getUserDome(valueCode)
      // debugger
    // },
    clearCondition() {},
    // 创建就诊记录
    createClinic() {
      let _this = this;
      _this.newDoctor.inquiryStatus = 1;
      _this.newDoctor.bsPrescription.doctorCode =
        _this.$store.state.user.dataUser.id;
      _this.newDoctor.bsPrescription.doctorName =
        _this.$store.state.user.dataUser.name;
      if (_this.patientSex== "男") {
        _this.newDoctor.bsPrescription.patientSex =0;
        _this.newDoctor.patientSex=0 ;
      } else if (_this.patientSex == "女") {
        _this.newDoctor.bsPrescription.patientSex = 1;
        _this.newDoctor.patientSex=1;
      }
      _this.newDoctor.bsPrescription.diagnosis=_this.newDoctor.diagnosis
      updateInquiry(_this.newDoctor).then(res => {
        if (res.code == 0) {
          _this.$message.success("创建成功");
          if (_this.talkVue.nim.activeTalker.scene === "p2p") {
            _this.talkVue.successTip();
            _this.talkVue.hide.userinfoContent = false;
            _this.talkVue.hide.Rcontent = false;
            _this.talkVue.$bus.emit("rcontent", 0);
          } else if (_this.talkVue.nim.activeTalker.scene === "team") {
            _this.talkVue.successTip();
            _this.talkVue.dissTeam();
            _this.talkVue.hide.userinfoContent = false;
            _this.talkVue.hide.Rcontent = false;
            _this.talkVue.$bus.emit("rcontent", 0);
          }
        } else {
          _this.$message.error("创建失败");
        }
      });
    },
    // 保存就诊草稿
    saveClinic() {
      let _this = this;
      _this.newDoctor.inquiryStatus = 3;
      if (_this.newDoctor.patientSex == "男") {
        _this.newDoctor.patientSex = 0;
      } else if (_this.newDoctor.patientSex == "女") {
        _this.newDoctor.patientSex = 1;
      }
      updateInquiry(_this.newDoctor).then(res => {
        if (res.code == 0) {
          _this.$message("保存草稿成功");
        } else {
          _this.$message.error("保存草稿失败");
        }
      });
    },
    // 查看说明书
    checkInstructions(index) {
      let _this = this;
      _this.drugInstructions = true;
      _this.instructionsUrl = _this.druglish[index].instructionsUrl;
    },
    // 处方弹窗
    createChufang() {
      let _this = this;
      _this.doctorVisible = true;
      if (_this.newDoctor.patientSex == 0) {
        _this.patientSex = "男";
      } else if (_this.newDoctor.patientSex == 1) {
        _this.patientSex = "女";
      }
      setTimeout(() => {
        document
          .getElementById("add")
          .addEventListener("scroll", _this.handleScroll);
      }, 100);
    },
    //  添加药品数量
    handleChange() {},

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
    }
  }
};
</script>


<style  scoped>
.r-userinfo {
  position: absolute;
  top: 0;
  left: 870px;
  height: 100%;
  /* left: 900px; */
  border: 1px solid #ddd;
  width: 365px;
  background: #f2f2f2;
  z-index: 700;
  /* display: none; */
}
.r-userinfo >>> .el-collapse-item__header {
  background-color: #f2f2f2;
  border: none;
  width: 85%;
  margin: 0 auto;
}
.r-userinfo >>> .el-collapse-item__content {
  border: none;
  background-color: #f2f2f2;
  width: 85%;
  margin: 0 auto;
}
.r-userinfo >>> .el-collapse-item__wrap {
  background-color: #f2f2f2;
}
.patient-img {
  margin-left: 100px;
  width: 64px;
  height: 64px;
}
.patient-img > img {
  border-radius: 50%;
  border: 1px solid #ddd;
  width: 100%;
  height: 100%;
}
.parient-flex {
  width: 85%;
  margin: 5% auto;
  display: flex;
  justify-content: space-between;
}
.parient-flexstart {
  width: 85%;
  margin: 10px auto;
  display: flex;
  justify-content: flex-start;
}
.axisLine {
  width: 85%;
  margin: 6px auto;
  border: 1px solid #ddd;
}
.parient-auto {
  width: 85%;
  margin: 0 auto;
}
.parient-btn {
  text-align: center;
  width: 85%;
  margin: 15px auto;
}
.parient-btn > button {
  margin: 10px 8px;
  padding: 5px 5px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
}
.textarea-p2p {
  width: 100%;
  height: 80px;
}
fieldset {
  border: none !important;
}
.ebook-recipe > .left-recipe {
  width: 60%;
}
.ebook-recipe > .right-recipe {
  width: 40%;
  border-left: 1px solid #888;
}
.ebook-recipe {
  display: flex;
  justify-content: space-between;
  height: 100%;
  font-size: 12px;
}
/* 处方弹窗 */
.left-head {
  text-align: center;
  border-bottom: 1px dashed #888;
}
.left-head > .fontsize16 {
  font-size: 16px;
  font-weight: bold;
}
.left-head > :nth-child(2) {
  padding: 12px;
}
.left-baseinfo {
  width: 90%;
  margin: 0 auto;
}
.left-baseinfo > div {
  display: flex;
  justify-content: space-between;
  margin: 10px 10px;
}
.left-baseinfo > div span {
  display: inline-block;
  border-bottom: 1px solid #ddd;
}
.el-dialog {
  width: 75% !important;
}
.recipe-title {
  width: 90%;
  display: flex;
  justify-content: space-between;
}
.Rmedit {
  position: relative;
  width: 95%;
  margin: 0 auto;
  border: 1px solid red;
  border-bottom: 1px solid #ddd;
}
.Rmedit > div {
  padding: 7px 7px;
}
.Rmedit .el-icon-delete {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 26px;
  vertical-align: middle;
  cursor: pointer;
}
.recipe-count {
  display: inline-block;
  padding-top: 7px;
}
.recipe-record {
  display: flex;
  justify-content: space-around;
  border-bottom: 1px solid #ddd;
  margin: 12px 12px;
}
.record-one > div {
  padding: 3px 3px;
}
.remark {
  margin-left: 12px;
}
.remark > p {
  margin: 5px 5px;
}
.btnlook > a {
  display: block;
  padding: 10px;
  color: #238efa;
}
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
  color: rgb(63, 81, 181);
  cursor: pointer;
}
.comfimButton {
  margin-top: 15px;
  text-align: center;
}
.allDialog >>> .el-dialog {
  /* height: 100%; */
  /* overflow-y: auto  ; */
  /* border: 1px solid red */
}
.allDialog >>> .el-dialog__body {
  /* height: 100%; */
  /* overflow-y: auto */
}
.choiceDrug {
  padding: 50px 10px 10px 10px;
  height: 600px;
  overflow-y: auto;
}
.instructionsUrl >>> .el-dialog__body {
  height: 70vh;
}
</style>
