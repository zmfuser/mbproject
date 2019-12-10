<template>
  <div class="base">
    <div class="allhightbp">
      <div class="center1">
        <h3>糖尿病患者管理随访记录表(月随访)</h3>
      </div>
      <el-form ref="form" label-position="left" class="base padd">
        <!-- <el-collapse v-model="form.activeNames">
        <el-collapse-item title="糖尿病(月随访)">-->
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
            <el-col :md="3">
              <div>症状</div>
            </el-col>
            <el-col :md="4" :sm="12" :xs="24">
              <el-radio-group  :disabled="true"   v-model="form.symptom">
                <el-radio :label="1">无症状</el-radio>
                <el-radio :label="2">有症状</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :offset="3" :md="20" :sm="24" :xs="24" v-if="form.symptom==2">
              <el-form-item label="症状">
               <el-checkbox-group  :disabled="true"   v-model="symptomType" @change="checkboxChange(symptomType,1)">
                  <el-checkbox label="1" name="type">三多一少</el-checkbox>
                  <el-checkbox label="2" name="type">视物模糊、视力下降</el-checkbox>
                  <el-checkbox label="3" name="type">泡沫尿</el-checkbox>
                  <el-checkbox label="4" name="type">指端麻、凉、痛灼烧感</el-checkbox>
                  <el-checkbox label="5" name="type">腹泻、便秘</el-checkbox>
                  <el-checkbox label="6" name="type">下肢水肿</el-checkbox>
                  <el-checkbox label="7" name="type">其他</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col :md="3">
              <div>并发症情况</div>
            </el-col>
            <el-col :md="20" :sm="24" :xs="24">
             <el-checkbox-group  :disabled="true"   v-model="neopathy" @change="checkboxChange(neopathy,2)">
                <el-checkbox label="1" name="type">并视网膜病变期</el-checkbox>
                <el-checkbox label="2" name="type">并肾病期</el-checkbox>
                <el-checkbox label="3" name="type">并神经病变</el-checkbox>
                <el-checkbox label="4" name="type">并大血管病变</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>伴随临床疾病</div>
            </el-col>
            <el-col :md="21" :sm="24" :xs="24">
              <!-- clinicalDisease -->
             <el-checkbox-group  :disabled="true"   v-model="accompanying" @change="checkboxChange(accompanying,3)">
                <el-checkbox label="1" name="type">脑出血</el-checkbox>
                <el-checkbox label="2" name="type">缺血性脑卒中</el-checkbox>
                <el-checkbox label="3" name="type">心肌梗塞</el-checkbox>
                <el-checkbox label="4" name="type">心绞痛</el-checkbox>
                <el-checkbox label="5" name="type">慢性心衰</el-checkbox>
                <el-checkbox label="6" name="type">冠状动脉血运重建</el-checkbox>
                <el-checkbox label="7" name="type">高血压</el-checkbox>
                <el-checkbox label="8" name="type">高脂血症</el-checkbox>
                <el-checkbox label="9" name="type">糖尿病</el-checkbox>
                <el-checkbox label="10" name="type">
                  其他
                  <el-input  :disabled="true"   v-model="form.accompanyingOther"></el-input>
                </el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>体征</div>
            </el-col>
            <el-col :md="10" :sm="12" :xs="24">
              <el-form-item label="血压">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.bloodPressure">
                  <template slot="append">mmHg</template>
                </el-input>
              </el-form-item>
              <el-form-item label="体重" class="margin_top">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.weight">
                  <template slot="append">kg</template>
                </el-input>
              </el-form-item>
              <el-form-item label="BMI" class="margin_top">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.bmi">
                  <template slot="append">kg/m2</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :md="10" :sm="12" :xs="24">
              <el-form-item label="双足：">
                <el-radio-group  :disabled="true"   v-model="form.biped">
                  <el-radio :label="1">对称</el-radio>
                  <el-radio :label="2">不对称</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="皮温：">
                <el-radio-group  :disabled="true"   v-model="form.skin">
                  <el-radio :label="1">热</el-radio>
                  <el-radio :label="2">温</el-radio>
                  <el-radio :label="3">凉</el-radio>
                </el-radio-group>
              </el-form-item>
              <!-- <el-form-item label="BMI">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.bmi">
                  <template slot="append">kg/m2</template>
                </el-input>
              </el-form-item>-->
              <el-form-item label="皮肤红肿、溃烂:">
                <el-radio-group  :disabled="true"   v-model="form.sinkRed">
                  <el-radio :label="1">无</el-radio>
                  <el-radio :label="2">有</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="form.sinkRed==2">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.position">
                  <template slot="prepend">部位</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>

        <el-row :gutter="20">
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>生活方式指导</div>
            </el-col>
            <el-col :md="10" :sm="12" :xs="24">
              <el-form-item label="日吸烟量">
                <el-input  :disabled="true"   type="text" v-model="form.smokingVolume" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-form-item label="日饮酒量" class="margin_top">
                <el-input  :disabled="true"   type="text" v-model="form.drinkVolume" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-form-item label="饮食情况" class="margin_top">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.food">
                  <template slot="prepend">主食</template>
                  <template slot="append">g/天</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :md="10" :sm="12" :xs="24">
              <el-form-item label="运动:当前">
                <el-input  :disabled="true"   type="text" v-model="form.motionNow" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-form-item label="下次目标:" class="margin_top">
                <el-input  :disabled="true"   type="text" v-model="form.motionNext" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="10" :sm="12" :xs="24">
              <el-form-item label="饮食情况:" class="margin_top">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.vegetables">
                  <template slot="prepend">蔬菜</template>
                  <template slot="append">l</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>

        <el-row :gutter="20">
          <el-col :md="3">
            <div style="opacity: 0;">1</div>
          </el-col>
          <el-col :md="10" :sm="12" :xs="24">
            <el-form-item label="心理:目前">
              <el-radio-group  :disabled="true"   v-model="form.psychology">
                <el-radio :label="1">良好</el-radio>
                <el-radio :label="2">一般</el-radio>
                <el-radio :label="3">差</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="10" :sm="12" :xs="24">
            <el-form-item label="睡眠:目前">
              <el-radio-group  :disabled="true"   v-model="form.sellp">
                <el-radio :label="1">入眠困难</el-radio>
                <el-radio :label="2">夜间易醒</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="3">
            <div style="opacity: 0;">1</div>
          </el-col>
          <el-col :md="10" :sm="12" :xs="24">
            <el-form-item label="遵:医行为：目前">
              <el-radio-group  :disabled="true"   v-model="form.complianceBehavior">
                <el-radio :label="1">良好</el-radio>
                <el-radio :label="2">一般</el-radio>
                <el-radio :label="3">差</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>辅助检查</div>
            </el-col>
            <el-col :md="20" :sm="12" :xs="24">
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
                <el-input  :disabled="true"   class="miniWBIG" v-model="form.drugsGroup"></el-input>
              </span>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>此次随访分类</div>
            </el-col>
            <el-col :md="21" :sm="24" :xs="24">
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
                    :data="form.bsMonthFlupDiabetesDose"
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
                          <el-radio :label="1" >规律</el-radio>
                          <el-radio :label="2" >间断</el-radio>
                          <el-radio :label="3" >不服药</el-radio>
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
                    :data="form.bsMonthFlupDiabetesInHospital"
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
        <!-- </el-collapse-item>
        </el-collapse>-->
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: ["tangMounth"],
  data() {
    return {
      accompanying: [],
      symptomType: [],
      neopathy: [],
      options: [
        { value: "1", label: "规律" },
        { value: "2", label: "间断" },
        { value: "3", label: "不服药" }
      ],
      form: {
        activeNames: "",
        symptomType: "",
        accompanying: "",
        neopathy: "",
        idcardNumber: "",
        fileNumber: "",
        followUpDoctor: "",
        followUpAssistant: "",
        bsMonthFlupDiabetesInHospital: [{}],
        bsMonthFlupDiabetesDose: [{}]
      }
    };
  },
  mounted() {
    // this.form=this.tangMounth
    this.$set(this, "form", this.tangMounth);
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
    // 解析复选框数组
    chansformbox() {
      let _this = this;
      let formvalue = {};
      formvalue.symptomType = _this.form.symptomType;
      formvalue.riskFactors = _this.form.riskFactors;
      formvalue.clinicalDisease = _this.form.clinicalDisease;
      formvalue.neopathy = _this.form.neopathy;
      formvalue.accompanying = _this.form.accompanying;
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
  width: 60% !important;
}

.el-form-item > .el-form-item__content {
  width: 220px !important;
}
.allhightbp>>> .el-input-group__prepend{
        background-color: transparent !important;
        border: none !important;
    }
.allhightbp>>>.el-input__inner{
  border:none !important;
  border-radius: 0px !important;
  border-bottom:1px solid #ddd !important;
}
.allhightbp>>>.el-input-group__append{
     background-color: transparent !important;
    border: none !important;
}
</style>