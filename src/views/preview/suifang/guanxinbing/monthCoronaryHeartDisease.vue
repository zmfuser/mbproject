<template>
  <div class="base">
    <div class="allhightbp">
      <div class="center1">
        <h3>冠心病患者管理随访记录表(月随访)</h3>
      </div>
      <el-form label-position="left" class="padd">
        <!-- <el-row :gutter="20">
          <el-form-item>
            <el-col :md="3">
              <div style="opacity: 0;">1</div>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="随访日期">
                <el-date-picker v-model="form.createTime  " type="date"></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :md="4" :sm="12" :xs="24">
              <el-form-item label="随访医生">
                <el-input  :disabled="true"   v-model="form.doctorSignatureUrl" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="4" :sm="12" :xs="24">
              <el-form-item label="随访助理">
                <el-input  :disabled="true"   v-model="form.assistantSignatureUrl" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="12" :xs="24">
              <el-form-item label="随访方式">
                <el-radio-group  :disabled="true"   v-model="form.flupType">
                  <el-radio label="1">门诊</el-radio>
                  <el-radio label="2">远程</el-radio>
                  <el-radio label="3">上门</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>-->
        <el-row>
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>症状</div>
            </el-col>

            <el-col :md="4" :sm="12" :xs="24">
              <el-radio-group  :disabled="true"   v-model="form.symptom">
                <el-radio :label="1">无症状</el-radio>
                <el-radio :label="2">有症状</el-radio>
              </el-radio-group>
            </el-col>
            <div v-if="form.symptom==2">
              <el-col :md="4" :sm="12" :xs="24">
                <el-form-item label="心慌:">
                  <el-radio-group  :disabled="true"   v-model="symptomType1" @change="radioBox(symptomType1,1,2)">
                    <el-radio label="1" name="type">加重</el-radio>
                    <el-radio label="2" name="type">减轻</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="4" :sm="12" :xs="24">
                <el-form-item label="胸闷:">
                  <el-radio-group  :disabled="true"   v-model="symptomType2" @change="radioBox(symptomType2,3,4)">
                    <el-radio label="3" name="type">加重</el-radio>
                    <el-radio label="4" name="type">减轻</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="4" :sm="12" :xs="24">
                <el-form-item label="胸痛:">
                  <el-radio-group  :disabled="true"   v-model="symptomType3" @change="radioBox(symptomType3,5,6)">
                    <el-radio label="5" name="type">加重</el-radio>
                    <el-radio label="6" name="type">减轻</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="5" :sm="12" :xs="24">
                <el-form-item label="胸背痛:">
                  <el-radio-group  :disabled="true"   v-model="symptomType4" @change="radioBox(symptomType4,7,8)">
                    <el-radio label="7" name="type">加重</el-radio>
                    <el-radio label="8" name="type">减轻</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </div>
          </el-form-item>
        </el-row>
        <el-row :gutter="20" v-if="form.symptom==2">
          <el-col :md="3">
            <div style="opacity: 0;">1</div>
          </el-col>
          <el-col :md="7" :sm="12" :xs="24">
            <el-form-item label="左上肢、左小指痛:">
              <el-radio-group  :disabled="true"   v-model="symptomType5" @change="radioBox(symptomType5,9,10)">
                <el-radio label="9" name="type">加重</el-radio>
                <el-radio label="10" name="type">减轻</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="5" :sm="12" :xs="24">
            <el-form-item label="牙周痛:">
              <el-radio-group  :disabled="true"   v-model="symptomType6" @change="radioBox(symptomType6,11,12)">
                <el-radio label="11" name="type">加重</el-radio>
                <el-radio label="12" name="type">减轻</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <el-form-item label="其他:">
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.symptomOther"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>危险因素及分层</div>
            </el-col>
            <el-col :md="21" :sm="24" :xs="24">
             <el-checkbox-group  :disabled="true"   v-model="riskFactors" @change="checkboxChange(riskFactors,1)">
                <el-checkbox label="1">年龄(男性>55岁女性大于65岁)</el-checkbox>
                <el-checkbox label="2">血糖异常血脂异常</el-checkbox>
                <el-checkbox label="3">高血压</el-checkbox>
                <el-checkbox label="4">家族史</el-checkbox>
                <el-checkbox label="5">吸烟</el-checkbox>
                <el-checkbox label="6">肥胖</el-checkbox>
                <el-checkbox label="7">高脂饮食</el-checkbox>
                <el-checkbox label="8">运动少</el-checkbox>
                <el-checkbox label="9">高膀胱氨酸</el-checkbox>
                <el-checkbox label="10">其他</el-checkbox>
              </el-checkbox-group>
              <el-form-item label="不稳定型心绞痛危险分层">
                <el-input  :disabled="true"   type="text" v-model="form.colicRisk"></el-input>
              </el-form-item>
              <el-form-item label="急性冠脉综合症患者短期内死亡或非致死性心机梗死的风险">
                <el-input  :disabled="true"   type="text" v-model="form.miRisk"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>伴随临床疾病</div>
            </el-col>
            <el-col :md="21" :sm="24" :xs="24">
             <el-checkbox-group  :disabled="true"  
                v-model="clinicalDisease"
                @change="checkboxChange(clinicalDisease,3)"
              >
                <el-checkbox label="1" name="type">脑出血</el-checkbox>
                <el-checkbox label="2" name="type">缺血性脑卒中</el-checkbox>
                <el-checkbox label="3" name="type">心肌梗塞</el-checkbox>
                <el-checkbox label="4" name="type">心绞痛</el-checkbox>
                <el-checkbox label="5" name="type">慢性心衰</el-checkbox>
                <el-checkbox label="6" name="type">冠状动脉血运重建</el-checkbox>
                <el-checkbox label="7" name="type">高血压</el-checkbox>
                <el-checkbox label="8" name="type">高脂血症</el-checkbox>
                <el-checkbox label="9" name="type">糖尿病</el-checkbox>
                <el-checkbox label="10" name="type">其他
                  其他
                  <el-input  :disabled="true"   v-model="form.clinicalDiseaseOther"></el-input>
                </el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>生活方式指导</div>
            </el-col>
            <el-col :md="10" :sm="12" :xs="24">
              <el-form-item label="日吸烟量">
                <el-input  :disabled="true"   type="text" v-model="form.smokingVolume" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-form-item label="日饮酒量">
                <el-input  :disabled="true"   type="text" v-model="form.drinkVolume" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="摄盐情况:当前:">
                <el-radio-group  :disabled="true"   v-model="form.saltVolume">
                  <el-radio :label="1">轻(6g)</el-radio>
                  <el-radio :label="2">中(6-12g)</el-radio>
                  <el-radio :label="3">重(>12g)</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="睡眠:目前">
                <el-radio-group  :disabled="true"   v-model="form.sleep">
                  :
                  <el-radio :label="1">入眠困难</el-radio>
                  <el-radio :label="2">夜间易醒</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :md="10" :sm="12" :xs="24">
              <el-form-item label="运动:当前">
                <el-input  :disabled="true"   type="text" v-model="form.motionNow" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-form-item label="下次目标:">
                <el-input  :disabled="true"   type="text" v-model="form.motionNext" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="心理:目前">
                <el-radio-group  :disabled="true"   v-model="form.psychology">
                  <el-radio :label="1">良好</el-radio>
                  <el-radio :label="2">一般</el-radio>
                  <el-radio :label="3">差</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="遵医行为：目前">
                <el-radio-group  :disabled="true"   v-model="form.complianceBehavior">
                  <el-radio :label="1">良好</el-radio>
                  <el-radio :label="2">一般</el-radio>
                  <el-radio :label="3">差</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>辅助检查</div>
            </el-col>
            <el-col :md="21" :sm="12" :xs="24">
              <el-radio-group  :disabled="true"   v-model="form.auxiliaryExamination">
                <el-radio :label="1">有</el-radio>
                <el-radio :label="2">无</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>药物不良反应</div>
            </el-col>
            <el-col :md="21" :sm="24" :xs="24">
              目前：
              <el-radio-group  :disabled="true"   v-model="form.medicalSide">
                <el-radio :label="1">有</el-radio>
                <el-radio :label="2">无</el-radio>
              </el-radio-group>
              <span style="padding-left:8px" v-if="form.medicalSide==1">
                不良反应药物:
                <el-input  :disabled="true"   class="miniWBIG" v-model="form.drugsName"></el-input>
              </span>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>此次随访分类</div>
            </el-col>
            <el-col :md="20" :sm="24" :xs="24">
              <el-radio-group  :disabled="true"   v-model="form.flupGroup">
                <el-radio :label="1" name="type">控制满意</el-radio>
                <el-radio :label="2" name="type">控制不满意</el-radio>
                <el-radio :label="3" name="type">不良反应</el-radio>
                <el-radio :label="4" name="type">并发症</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="服药情况">
              <div>
                <template>
                  <el-table
                    border
                    :data="form.bsMonthFlupCoronaryDose"
                    style="width: 100%"
                  >
                    <el-table-column prop="drugName" label="药品名称" style="width:6vw;" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.drugName}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="dosageAndFrequency" label="用量及频率" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.dosageAndFrequency}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duration" label="持续时间" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.duration}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="drugSideEffects" label="药物副作用" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.drugSideEffects}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="illDate"
                      label="服药依从性(1·规律 2·间断 3·不服药)"
                      width="260"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <el-radio-group  :disabled="true"   v-model="scope.row.medicationCompliance">
                          <el-radio :label="1">规律</el-radio>
                          <el-radio :label="2">间断</el-radio>
                          <el-radio :label="3">不服药</el-radio>
                        </el-radio-group>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="住院病史">
              <div>
                <template>
                  <el-table
                    border
                    :data="form.bsMonthFlupCoronaryInHospital"
                    style="width: 100%"
                  >
                    <el-table-column
                      prop="inHospitalDate"
                      label="住院日期"
                      style="width:6vw;"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <span>{{scope.row.inHospitalDate}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="diagnosis" label="诊断" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.diagnosis}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="hospitalName" label="医疗机构名称" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.hospitalName}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="medicalNo" label="病案号" align="center">
                      <template slot-scope="scope">
                        <span>{{scope.row.medicalNo}}</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="备注">
            <el-col :md="24" :sm="24" :xs="24">
              <el-input  :disabled="true"   type="textarea" :rows="4" placeholder="请输入内容" v-model="form.ramk"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-col :md="4" :sm="4" :xs="4" :offset="16">
              <el-form-item label="随访医生">
                <el-input  :disabled="true"   v-model="form.doctorSignatureUrl" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="4" :sm="4" :xs="4">
              <el-form-item label="随访助理">
                <el-input  :disabled="true"   v-model="form.assistantSignatureUrl" type="text"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template><script>
export default {
  props: ["guanMounth"],
  data() {
    return {
      symptomType1: "",
      symptomType2: "",
      symptomType3: "",
      symptomType4: "",
      symptomType5: "",
      symptomType6: "",
      riskFactors: [],
      clinicalDisease: [],
      options: [
        { value: "1", label: "规律" },
        { value: "2", label: "间断" },
        { value: "3", label: "不服药" }
      ],
      form: {
        flupDate: "",
        doctorSignatureUrl: "",
        assistantSignatureUrl: "",
        flupType: "",
        ramk: "",
        drinkVolume: "",
        smokingVolume: "",
        symptom: "",
        symptomOther: "",
        symptomType: "",
        heartRate: "",
        bmi: "",
        weight: "",
        bloodPressure: "",
        clinicalDiseaseOther: "",
        clinicalDisease: "",
        miRisk: "",
        colicRisk: "",
        riskFactors: "",
        sex: "",
        userName: "",
        rDay: "",
        age: "",
        idcardNumber: "",
        fileNumber: "",
        followUpDoctor: "",
        followUpAssistant: "",
        bsMonthFlupCoronaryDose: [{}],
        bsMonthFlupCoronaryInHospital: [{}]
      }
    };
  },
  mounted() {
    // this.form=this.guanMounth
    this.$set(this, "form", this.guanMounth);
    this.redio();
    this.chansformbox();
  },
  methods: {
    addrow(table) {
      let _this = this;
      _this.usual.addRow(table);
    },
    // 删除行
    delrow(index, rows) {
      let _this = this;
      _this
        .$confirm("此操作将永久删除该行记录, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.$message({
            type: "success",
            message: "删除成功!"
          });
          _this.usual.delRow(index, rows);
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 解析单选按钮
    redio() {
      if (this.form.symptomType != null) {
        let value = this.form.symptomType.split("/");
        for (let index = 0; index < value.length; index++) {
          if (value[index] == 1 || value[index] == 2) {
            this.symptomType1 = value[index];
          } else if (value[index] == 3 || value[index] == 4) {
            this.symptomType2 = value[index];
          } else if (value[index] == 5 || value[index] == 6) {
            this.symptomType3 = value[index];
          } else if (value[index] == 7 || value[index] == 8) {
            this.symptomType4 = value[index];
          } else if (value[index] == 9 || value[index] == 10) {
            this.symptomType5 = value[index];
          } else if (value[index] == 11 || value[index] == 12) {
            this.symptomType6 = value[index];
          }
        }
      }
    },
    // 解析复选框数组
    chansformbox() {
      let _this = this;
      let formvalue = {};
      formvalue.riskFactors = _this.form.riskFactors;
      formvalue.clinicalDisease = _this.form.clinicalDisease;
      for (const item in formvalue) {
        if (formvalue[item] != null) {
          this[item] = formvalue[item].split("/");
        }
      }
    }
  }
};
</script>
<style scoped>
.el-form-item__content > .el-input {
  width: 50% !important;
}

.el-form-item > .el-form-item__content {
  width: 220px !important;
}
.allhightbp >>> .el-input__inner {
  border: none;
  border-bottom: 1px solid #ddd !important;
  border-radius: 0px;
}
.allhightbp >>> .el-input-group__append,
.el-input-group__prepend {
  background-color: transparent !important;
  border: none !important;
}
</style>