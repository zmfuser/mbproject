<template>
  <div class="allcontent base">
    <div class="center1">
      <h2>慢阻肺患者病史及检查结果</h2>
      <h3>现病史及检查结果</h3>
    </div>
    <el-form label-position="top" class="padd form">
      <el-row>
        <el-form-item>
          <el-col>
            <el-form-item label="肺功能分级">
              <el-radio-group  :disabled="true" v-model="form.pulmonaryLevel">
                <el-radio :label="1">轻度</el-radio>
                <el-radio :label="2">中度</el-radio>
                <el-radio :label="3">重度</el-radio>
                <el-radio :label="4">极重度</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="1、近1个月急性发作情况">
            <el-radio-group  :disabled="true" v-model="form.isSeizures">
              <!-- change="hander(form.isSeizures) -->
              <el-radio :label="0">近1个月无急性发作</el-radio>
              <el-radio :label="1">近1个月有急性发作</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <div v-if="form.isSeizures == 1">
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item label="咳嗽、咳痰、气喘发作次数：">
              <el-radio-group  :disabled="true" v-model="form.seizuresQuit">
                <el-radio :label="1" name="type">偶有1-3次无夜间发作</el-radio>
                <el-radio :label="2" name="type">白天与夜间发作均有发作1-3次</el-radio>
                <el-radio :label="3" name="type">3次以上的白天与夜间发作</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item label="咳嗽、咳痰、气喘伴随症状：">
              <el-checkbox-group :disabled="true"  v-model="seizuresSymptom">
                <el-checkbox label="1" name="type">心慌</el-checkbox>
                <el-checkbox label="2" name="type">汗出</el-checkbox>
                <el-checkbox label="3" name="type">濒死感</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
      <el-row>
        <el-form-item>
          <div>咳嗽、咳痰、气喘诱因：</div>
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item label="运动">
              <el-checkbox-group :disabled="true"  v-model="seizuresCause">
                <el-checkbox label="1" name="type">爬坡</el-checkbox>
                <el-checkbox label="2" name="type">上楼</el-checkbox>
                <el-checkbox label="3" name="type">快走</el-checkbox>
                <el-checkbox label="4" name="type">情绪激动</el-checkbox>
                <el-checkbox label="5" name="type">其他</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item label="静息">
              <el-radio-group  :disabled="true" v-model="dayAnight">
                <el-radio label="7">白天</el-radio>
                <el-radio label="8">夜间</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-col :md="24" :sm="12" :xs="24">
            <el-form-item label="2、慢性阻塞性肺疾病并发症">
              <el-checkbox-group :disabled="true" 
                v-model="copdComplication"
                @change="checkboxChange(copdComplication,3)"
              >
                <el-checkbox label="1" name="type">右心心肌肥厚或心室肿大</el-checkbox>
                <el-checkbox label="2" name="type">右心心力衰竭</el-checkbox>
                <el-checkbox label="3" name="type">心率失常</el-checkbox>
                <el-checkbox label="4" name="type">呼吸衰竭</el-checkbox>
                <el-checkbox label="5" name="type">肺气肿</el-checkbox>
                <el-checkbox label="6" name="type">肺动脉高压</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="12" :xs="24">
            <el-form-item label="3、慢性阻塞性肺疾病治疗方式">
              <el-checkbox-group :disabled="true" 
                v-model="copdTreatmentMeth"
                @change="checkboxChange(copdTreatmentMeth,4)"
              >
                <el-checkbox label="1" name="type">没有药物 定期随访</el-checkbox>
                <el-checkbox label="2" name="type">单纯药物治疗</el-checkbox>
                <el-checkbox label="3" name="type">药物治疗联合长期家庭氧疗</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-col :md="24" :sm="12" :xs="24">
            <el-form-item label="4、现存危险因素">
              <el-checkbox-group :disabled="true"  v-model="copdRisk">
                <el-checkbox label="1" name="type">吸烟</el-checkbox>
                <el-checkbox label="2" name="type">职业和环境污染</el-checkbox>
                <el-checkbox label="3" name="type">免疫功能低下(上呼吸道感染)</el-checkbox>
                <el-checkbox label="4" name="type">气候剧烈变化</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="12" :xs="24">
            <el-form-item label="5、伴发疾病">
              <el-checkbox-group :disabled="true" 
                v-model="copdConcomitant"
                @change="checkboxChange(copdConcomitant,6)"
              >
                <el-checkbox label="1" name="type">胃肠功能不全、消化道出血</el-checkbox>
                <el-checkbox label="2" name="type">心血管疾病</el-checkbox>
                <el-checkbox label="3" name="type">骨质疏松</el-checkbox>
                <el-checkbox label="4" name="type">肺癌</el-checkbox>
                <el-checkbox label="5" name="type">代谢综合征</el-checkbox>
                <el-checkbox label="6" name="type">糖尿病</el-checkbox>
                <el-checkbox label="7" name="type">焦虑和抑郁</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="6、服药情况：">
            <div>
              <template>
                <el-table border :data="form.bsArchivesDoses" style="width: 100%">
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
                  <el-table-column prop="illDate" label="服药依从性" width="270" align="center">
                    <template slot-scope="scope">
                      <el-radio-group  :disabled="true" v-model="scope.row.medicationCompliance">
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
      <el-row :gutter="20">
        <el-form-item label="7、最近一次辅助检查资料(3个月内)">
          <div class="fontClass">血常规</div>
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item>
              <div style="margin-top: 15px;">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.hemoglobin">
                  <template slot="prepend">血红蛋白</template>
                  <template slot="append">g/l</template>
                </el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item>
              <div style="margin-top: 15px;">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.whiteBlood">
                  <template slot="prepend">白细胞</template>
                  <template slot="append">
                    x10
                    <sup>9</sup>/l
                  </template>
                </el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item>
              <div style="margin-top: 15px;">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.platelet">
                  <template slot="prepend">血小板</template>
                  <template slot="append">
                    x10
                    <sup>9</sup>/l
                  </template>
                </el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item>
              <div style="margin-top: 15px;">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.inspectOther">
                  <template slot="prepend">其他</template>
                </el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item>
            <div>
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.bloodGasAnaly">
                <template slot="prepend">血气分析</template>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item>
            <div>
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.nonInvasive">
                <template slot="prepend">无创血氧饱和度</template>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item>
            <div>
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.lungFunction">
                <template slot="prepend">肺功能</template>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="border_bottom">
        <el-col :md="24" :sm="12" :xs="24">
          <el-form-item>
            <label>心电图：</label>
            <el-radio-group  :disabled="true" v-model="form.ecg">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">异常</el-radio>
            </el-radio-group>

            <span v-if="form.ecg == 1">
              异常描述:
              <el-input  :disabled="true"   class="miniWBIG" v-model="form.ecgDesc"></el-input>
            </span>
          </el-form-item>
        </el-col>

        <el-col :md="24" :sm="12" :xs="24">
          <el-form-item>
            <label for>胸部X线：</label>
            <el-radio-group  :disabled="true" v-model="form.chestXray">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">异常</el-radio>
            </el-radio-group>
            <span v-if="form.chestXray == 1">
              异常描述:
              <el-input  :disabled="true"   class="miniWBIG" v-model="form.chestXrayDesc"></el-input>
            </span>
          </el-form-item>
        </el-col>

        <!-- <el-col :md="12" :sm="12" :xs="24">
          <el-form-item>
            <label for>劲动脉彩超：</label>
            <el-radio-group  :disabled="true" v-model="form.CDU">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">异常</el-radio>
            </el-radio-group>
            <div>
              异常描述:
              <el-input  :disabled="true"   type="textarea" class="miniW" v-model="form.unusual3"></el-input>
            </div>
          </el-form-item>
        </el-col>-->

        <el-col :md="24" :sm="12" :xs="24">
          <el-form-item>
            <label for>超声心动图</label>
            <el-radio-group  :disabled="true" v-model="form.ucg">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">异常</el-radio>
            </el-radio-group>
            <span v-if="form.ucg == 1">
              异常描述:
              <el-input  :disabled="true"   class="miniWBIG" v-model="form.ucgDesc"></el-input>
            </span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item>
            <label for>肺CT</label>
            <el-radio-group  :disabled="true" v-model="form.lungCt">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">异常</el-radio>
            </el-radio-group>
            <span v-if="form.lungCt == 1">
              异常描述:
              <el-input  :disabled="true"   class="miniWBIG" v-model="form.lungCtDesc"></el-input>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="住院史：">
            <template>
              <el-table border :data="form.bsArchivesInHospitals" style="width: 100%">
                <el-table-column
                  prop="inHospitalDate"
                  label="住院日期"
                  style="width:6vw;"
                  align="center"
                >
                  <template slot-scope="scope">
                    <!-- <el-date-picker v-model="scope.row.inHospitalDate" type="date" placeholder="选择日期"></el-date-picker> -->
                    <span>{{scope.row.inHospitalDate}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="diagnosis" label="诊断" align="center">
                  <template slot-scope="scope">
                    <!-- <el-input  :disabled="true"   v-model="scope.row.diagnosis"></el-input> -->
                    <span>{{scope.row.diagnosis}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="hospitalName" label="医疗机构名称" align="center">
                  <template slot-scope="scope">
                    <!-- <el-input  :disabled="true"   v-model="scope.row.hospitalName"></el-input> -->
                    <span>{{scope.row.hospitalName}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="medicalNo" label="病案号" align="center">
                  <template slot-scope="scope">
                    <!-- <el-input  :disabled="true"   v-model="scope.row.medicalNo"></el-input> -->
                    <span>{{scope.row.medicalNo}}</span>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>


<script>
export default {
  props: ["coronaryHeart"],
  data() {
    return {
      dayAnight: "",
      seizuresSymptom: [],
      seizuresCause: [],
      copdComplication: [],
      copdTreatmentMeth: [],
      copdRisk: [],
      copdConcomitant: [],
      form: {}
    };
  },
  created() {
    this.form = this.coronaryHeart;
  },
  mounted() {
    this.$set(this,"form",this.coronaryHeart)
    this.chansformbox();
    this.daynight();
  },
  methods: {
    // 静息
    daynight() {
      if (this.form.seizuresCause != null) {
        for (let index = 0; index < this.form.seizuresCause.length; index++) {
          if (this.form.seizuresCause[index] == 7) {
            this.$set(this, "dayAnight", this.form.seizuresCause[index]);
          } else if (this.form.seizuresCause[index] == 8) {
            this.$set(this, "dayAnight", this.form.seizuresCause[index]);
            // this.dayAnight=this.chestPainIncentive[index];
          }
        }
      }
    },
    // 解析复选框数组
    chansformbox() {
      let _this = this;
      let formvalue = {};
      formvalue.seizuresSymptom = _this.form.seizuresSymptom;
      formvalue.seizuresCause = _this.form.seizuresCause;
      formvalue.copdComplication = _this.form.copdComplication;
      formvalue.copdTreatmentMeth = _this.form.copdTreatmentMeth;
      formvalue.copdRisk = _this.form.copdRisk;
      formvalue.copdConcomitant = _this.form.copdConcomitant;
      for (const item in formvalue) {
        if (formvalue[item] != null) {
          this[item] = formvalue[item].split("/");
        }
      }
    }
  }
};
</script>

<style <style scoped>
.allcontent >>> .el-textarea__inner {
  line-height: 1 !important;
}
.border_bottom >>> .el-input__inner {
  border: none;
  border-bottom: 1px solid #ddd !important;
  border-radius: 0px;
}
.border_bottom >>> label{
  color:#606266
}
.allcontent {
  max-width: 1200px;
  margin: 0 auto;
}
.miniW {
  width: 200px;
}
.fontClass {
  padding-left: 20px;
  color: #606266;
}

</style>