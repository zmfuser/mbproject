<template>
  <div class="base">
    <div class="allhightbp">
      <div class="center">
        <h3>高血压患者管理随访记录表(月随访)</h3>
      </div>
      <el-form ref="form" label-position="left" class="padd">
        <!-- <el-collapse v-model="form.activeNames">
        <el-collapse-item title="高血压(月随访)">-->
        <!-- <el-row :gutter="20">
          <el-form-item>
            <el-col :md="1">
              <div style="opacity: 0;">1</div>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="随访日期">
                <el-date-picker v-model="form.flupDate" type="date"></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :md="4" :sm="12" :xs="24">
              <el-form-item label="随访医生">
                <el-input v-model="form.doctorSignatureUrl" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="4" :sm="12" :xs="24">
              <el-form-item label="随访助理">
                <el-input v-model="form.assistantSignatureUrl" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="7" :sm="12" :xs="24">
              <el-form-item label="随访方式">
                <el-radio-group v-model="form.flupType">
                  <el-radio label="1">门诊</el-radio>
                  <el-radio label="2">远程</el-radio>
                  <el-radio label="3">上门</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row> -->
        <el-row>
          <el-form-item>
            <el-col :md="3">
              <div>症状</div>
            </el-col>
            <el-col :md="20" :sm="24" :xs="24">
              <el-form-item label="症状">
                <el-radio-group v-model="symptom1" @change="addToSympom(symptom1)">
                  <el-radio label="1">无症状</el-radio>
                  <el-radio label="2">有症状</el-radio>
                </el-radio-group>

                <div v-if="symptom1==2">
                  <el-checkbox-group v-model="symptom" @change="checkboxChange(symptom,1)">
                    <el-checkbox label="3" name="type">恶心</el-checkbox>
                    <el-checkbox label="4" name="type">呕吐</el-checkbox>
                    <el-checkbox label="5" name="type">鼻出血</el-checkbox>
                    <el-checkbox label="6" name="type">头疼</el-checkbox>
                    <el-checkbox label="7" name="type">头晕</el-checkbox>
                    <el-checkbox label="8" name="type">视物模糊</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>危险因素及分层</div>
            </el-col>
            <el-col :md="21" :sm="24" :xs="24">
              <el-checkbox-group v-model="riskFactors" @change="checkboxChange(riskFactors,4)">
                <el-checkbox label="1">年龄(男性>55岁女性大于65岁)</el-checkbox>
                <el-checkbox label="2">摄盐过多</el-checkbox>
                <el-checkbox label="3">吸烟</el-checkbox>
                <el-checkbox label="4">腹型肥胖</el-checkbox>
                <el-checkbox label="5">血脂异常</el-checkbox>
                <el-checkbox label="6">早发心血管病家族史</el-checkbox>
                <el-checkbox label="7">血同型膀胱氨酸升高</el-checkbox>
              </el-checkbox-group>
              <el-input type="text" v-model="form.riskFactorsOther">
                <template slot="prepend">危险分层</template>
              </el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>伴随临床疾病</div>
            </el-col>
            <el-col :md="21" :sm="24" :xs="24">
              <el-checkbox-group
                v-model="clinicalDisease"
                @change="checkboxChange(clinicalDisease,3)"
              >
                <el-checkbox label="1" name="type">脑出血</el-checkbox>
                <el-checkbox label="2" name="type">缺血性脑卒中</el-checkbox>
                <el-checkbox label="3" name="type">心肌梗塞</el-checkbox>
                <el-checkbox label="4" name="type">心绞痛</el-checkbox>
                <el-checkbox label="5" name="type">慢性心衰</el-checkbox>
                <el-checkbox label="6" name="type">冠状动脉血运重建</el-checkbox>
                <el-checkbox label="7" name="type">肾功能受损</el-checkbox>
                <el-checkbox label="8" name="type">糖尿病肾病</el-checkbox>
                <el-checkbox label="9" name="type">视网膜病变</el-checkbox>
                <el-checkbox label="10" name="type">出血或渗出视盘水肿</el-checkbox>
                <el-checkbox label="11" name="type">糖尿病</el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item class="life">
            <el-col :md="3" :sm="24" :xs="24">
              <div>生活方式指导</div>
            </el-col>
            <el-col :md="10" :sm="12" :xs="24">
              <el-form-item label="日吸烟量">
                <el-input type="text" v-model="form.smokingVolume" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-form-item label="日饮酒量">
                <el-input type="text" v-model="form.drinkVolume" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="摄盐情况:当前:">
                <el-radio-group v-model="form.saltVolume">
                  <el-radio :label="1">轻(6g)</el-radio>
                  <el-radio :label="2">中(6-12g)</el-radio>
                  <el-radio :label="3">重(>12g)</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="睡眠:目前">
                <el-radio-group v-model="form.sleep">
                  <el-radio :label="1">正常</el-radio>
                  <el-radio :label="2">易醒</el-radio>
                  <el-radio :label="3">多梦</el-radio>
                  <el-radio :label="4">入眠困难</el-radio>
                  <el-radio :label="5">药物辅助</el-radio>
                  <el-radio :label="6">其他</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :md="10" :sm="12" :xs="24">
              <el-form-item label="运动:当前">
                <el-input type="text" v-model="form.motionNow" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-form-item label="下次目标:">
                <el-input type="text" v-model="form.motionNext" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="心理:目前">
                <el-radio-group v-model="form.psychology">
                  <el-radio :label="1">良好</el-radio>
                  <el-radio :label="2">一般</el-radio>
                  <el-radio :label="3">差</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="遵医行为：目前">
                <el-radio-group v-model="form.complianceBehavior">
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
            <el-col :md="10" :sm="12" :xs="24">
              <el-form-item>
                <div>肝功能：</div>
                <el-input placeholder="请输入内容" v-model="form.sgpt">
                  <template slot="prepend">血清谷丙转氨酶</template>
                  <template slot="append">u/l</template>
                </el-input>
                <el-input placeholder="请输入内容" v-model="form.sgot">
                  <template slot="prepend">血清谷草转氨酶</template>
                  <template slot="append">u/l</template>
                </el-input>
                <el-input placeholder="请输入内容" v-model="form.bilirubinTotal">
                  <template slot="prepend">总胆红素</template>
                  <template slot="append">ummol/l</template>
                </el-input>
                <el-input placeholder="请输入内容" v-model="form.bilirubinBind">
                  <template slot="prepend">结合胆红素</template>
                  <template slot="append">u/mmol/l</template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :md="10" :sm="12" :xs="24">
              <el-form-item>
                <div>血脂：</div>
                <el-input placeholder="请输入内容" v-model="form.tc">
                  <template slot="prepend">总胆固醇</template>
                  <template slot="append">u/mmol/l</template>
                </el-input>
                <el-input placeholder="请输入内容" v-model="form.trilaurin">
                  <template slot="prepend">甘油三酯</template>
                  <template slot="append">u/mmol/l</template>
                </el-input>
                <el-input placeholder="请输入内容" v-model="form.ldlC">
                  <template slot="prepend">低密度脂蛋白胆固醇</template>
                  <template slot="append">u/mmol/l</template>
                </el-input>
                <el-input placeholder="请输入内容" v-model="form.hdlC">
                  <template slot="prepend">高密度脂蛋白胆固醇</template>
                  <template slot="append">u/mmol/l</template>
                </el-input>
                <el-input placeholder="请输入内容" v-model="form.checkOther">
                  <template slot="prepend">其他</template>
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
            <el-form-item>
              <div>肾功：</div>
              <el-input placeholder="请输入内容" v-model="form.creatinine">
                <template slot="prepend">血肌酐</template>
                <template slot="append">u/mmol/l</template>
              </el-input>
              <el-input placeholder="请输入内容" v-model="form.bloodUrea">
                <template slot="prepend">血尿素氨</template>
                <template slot="append">u/mmol/l</template>
              </el-input>
              <el-input placeholder="请输入内容" v-model="form.bua">
                <template slot="prepend">血尿酸</template>
                <template slot="append">u/mmol/l</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="10" :sm="12" :xs="24">
            <el-form-item>
              <div>其他</div>
              <el-input placeholder="请输入内容" v-model="form.fastGlucose">
                <template slot="prepend">空腹血糖</template>
                <template slot="append">mmol/l</template>
              </el-input>
              <el-input placeholder="请输入内容" v-model="form.fastGlucoseAfter">
                <template slot="prepend">餐后2小时血糖</template>
                <template slot="append">mmol/l</template>
              </el-input>
              <el-input placeholder="请输入内容" v-model="form.hba1c">
                <template slot="prepend">糖化血红蛋白</template>
                <template slot="append">%</template>
              </el-input>
              <el-input placeholder="请输入内容" v-model="form.hcy">
                <template slot="prepend">血同型半胱氨酸</template>
                <template slot="append">u/mmol/l</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>心电图</div>
            </el-col>
            <el-col :md="20" :sm="24" :xs="24">
              <el-form-item label="目前：">
                <el-radio-group v-model="form.ecg" >
                  <el-radio :label="1">正常</el-radio>
                  <el-radio :label="2">异常</el-radio>
                </el-radio-group>
                <span v-if="form.ecg==2">
                  <el-input v-model="form.ecgDesc">
                    <template slot="prepend">异常描述</template>
                  </el-input>
                </span>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>药物不良反应</div>
            </el-col>
            <el-col :md="20" :sm="24" :xs="24">
              <el-form-item label="目前：">
                <el-radio-group v-model="form.medicalSide">
                  <el-radio :label="1">正常</el-radio>
                  <el-radio :label="2">异常</el-radio>
                </el-radio-group>
                <span v-if="form.medicalSide==2">
                  <el-input v-model="form.drugsName">
                    <template slot="prepend">不良反应药物名称</template>
                  </el-input>
                </span>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>此次随访分类</div>
            </el-col>
            <el-col :md="20" :sm="24" :xs="24">
              <el-radio-group v-model="form.flupGrop">
                <el-radio label="1" name="type">控制满意</el-radio>
                <el-radio label="2" name="type">控制不满意</el-radio>
                <el-radio label="3" name="type">不良反应</el-radio>
                <el-radio label="4" name="type">并发症</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="服药情况">
              <div>
                <template>
                  <el-table border :data="form.bsMonthFlupFertinDose" style="width: 100%">
                    <el-table-column prop="drugName" label="药品名称" style="width:6vw;" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.drugName"></el-input>
                      </template>
                    </el-table-column>
                    <!-- <el-table-column prop="result" label="诊断" align="center">
                            <template slot-scope="scope">
                              <el-input v-model="scope.row.result"></el-input>
                            </template>
                    </el-table-column>-->
                    <el-table-column prop="dosageAndFrequency" label="用量及频率" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.dosageAndFrequency"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="duration" label="持续时间" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.duration"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="drugSideEffects" label="药物副作用" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.drugSideEffects" type="textarea" size="mini"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="illDate"
                      label="服药依从性(1·规律 2·间断 3·不服药)"
                      width="180"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.medicationCompliance" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" align="center">
                      <template slot-scope="scope">
                        <img
                          src="../../../../../static/png/add.png"
                          alt
                          @click="addrow(form.bsMonthFlupFertinDose,{ historyType: 0, dataType: 6 })"
                        >
                        <img
                          src="../../../../../static/png/del.png"
                          alt
                          @click.prevent="delrow(scope.$index, form.bsMonthFlupFertinDose,{ historyType: 0, dataType: 6 })"
                        >
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
                    :data="form.bsMonthFlupFertinInHospital"
                    style="width: 100%"
                    :header-cell-style="{background:tableHead}"
                  >
                    
                    <el-table-column
                      prop="inHospitalDate"
                      label="住院日期"
                      style="width:6vw;"
                      align="center"
                    >
                      <template slot-scope="scope">
                        <!-- <el-input v-model="scope.row.inHospitalDate"></el-input> -->
                        <div class="block">
                          <el-date-picker
                            v-model="scope.row.inHospitalDate"
                            type="date"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                          ></el-date-picker>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="diagnosis" label="诊断" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.diagnosis"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="hospitalName" label="医疗机构名称" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.hospitalName"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="medicalNo" label="病案号" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.medicalNo"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" align="center">
                      <template slot-scope="scope">
                        <img
                          src="../../../../../static/png/add.png"
                          alt
                          @click="addrow(form.bsMonthFlupFertinInHospital,{ historyType: 0, dataType: 6 })"
                        >
                        <img
                          src="../../../../../static/png/del.png"
                          alt
                          @click.prevent="delrow(scope.$index, form.bsMonthFlupFertinInHospital,{ historyType: 0, dataType: 6 })"
                        >
                      </template>
                    </el-table-column>
                  </el-table>
                </template>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
           
            <el-col :md="24" :sm="24" :xs="24">
              <el-form-item label="备注">
                <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.ramk"></el-input>
              </el-form-item>
              
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="20" class="doctorOrAssistant">
          <el-form-item >
            <el-col :md="4" :sm="4" :xs="4" :offset="16">
              <el-form-item label="随访医生">
                <el-input v-model="form.doctorSignatureUrl" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="4" :sm="4" :xs="4">
              <el-form-item label="随访助理">
                <el-input v-model="form.assistantSignatureRul" type="text"></el-input>
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
  props: ["gaoMounth"],
  data() {
    return {
      tableHead: "rgba(228,248,245,1)",
      riskFactors: [],
      symptom: [],
      clinicalDisease: [],
      
      sleep: [],
      symptom1: "",
      form: {
        riskFactors: "",
        medicalSide: "",
        symptomType: "",
        sleep: "",
        ramk: "",
        clinicalDisease: "",
        symptom: "",
        riskFactorsOther: "",
        doctorSignatureUrl: "",
        assistantSignatureRul: "",
        bsMonthFlupFertinDose: [{ historyType: 0, dataType: 6 }],
        bsMonthFlupFertinInHospital: [{ historyType: 0, dataType: 6 }]
      },
      options: [
        { value: "1", label: "规律" },
        { value: "2", label: "间断" },
        { value: "3", label: "不服药" }
      ]
    };
  },
  mounted() {
    this.$set(this, "form", this.gaoMounth);
    this.chansformbox();
  },
  methods: {
    // 添加单选框字段到复选里
    addToSympom(val) {
      let _this = this;
      for (const index in _this.symptom) {
        if (_this.symptom[index] == 1 || _this.symptomType[index] == 2) {
          _this.symptom.splice(index, 1);
        }
      }
      _this.symptom.push(val);
      _this.form.symptom = _this.symptom.join("/");
    },
   
    //表格-添加行
    addrow(table, type) {
      let _this = this;
      _this.usual.addRow(table, type);
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
    // 复选框值变字符串
    checkboxChange(value, code) {
      let _this = this;
      let val = _this.usual.changeString(value);
      switch (code) {
        case 1:
          _this.form.symptom = val.family;
          break;

        case 2:
          _this.form.sleep = val.family;
          break;
        case 3:
          _this.form.clinicalDisease = val.family;
          break;
        case 4:
          _this.form.riskFactors = val.family;
          break;
      }
    },
    // 解析复选框数组
    chansformbox() {
      let _this = this;
      let formvalue = {};
      formvalue.symptom = _this.form.symptom;
      formvalue.riskFactors = _this.form.riskFactors;
      formvalue.clinicalDisease = _this.form.clinicalDisease;
      for (const item in formvalue) {
        if (formvalue[item] != null) {
          _this[item] = formvalue[item].split("/");
        }
      }
      for (const item of _this.symptom) {
        if (item == 1 || item == 2) {
          _this.symptom1 = item;
        }
      }
    }
  }
};
</script>
<style scoped>
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
.el-form-item__content > .el-input {
  width: 100% !important;
}
.doctorOrAssistant  >>> .el-input {
  width: 60% !important;
}
.life >>> .el-input{
  width: 78% !important;
}
</style>