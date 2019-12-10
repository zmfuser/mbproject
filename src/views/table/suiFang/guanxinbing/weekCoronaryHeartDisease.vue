<template>
  <div id="allHighBP">
    <div class="allhightbp">
      <div class="center">
        <h3>冠心病患者管理随访记录表(周随访)</h3>
      </div>
      <el-form ref="form" label-position="left" class="base padd">
        <!-- <el-row :gutter="20">
          <el-form-item>
            <el-col :md="1">
              <div style="opacity: 0;">1</div>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <el-form-item label="随访日期">
                <el-date-picker v-model="form.flupDate  " type="date"></el-date-picker>
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
            <el-col :md="3" :sm="24" :xs="24">
              <div>症状</div>
            </el-col>

            <el-col :md="4" :sm="12" :xs="24">
              <el-radio-group v-model="form.symptom">
                <el-radio :label="1">无症状</el-radio>
                <el-radio :label="2">有症状</el-radio>
              </el-radio-group>
            </el-col>
            <span v-if="form.symptom==2">
               <el-col :md="4" :sm="12" :xs="24">
              <el-form-item label="心慌:">
                <el-radio-group v-model="symptomType1" @change="checkBox(symptomType1,1,2)">
                  <el-radio label="1" name="type">加重</el-radio>
                  <el-radio label="2" name="type">减轻</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :md="4" :sm="12" :xs="24">
              <el-form-item label="胸闷:">
                <el-radio-group v-model="symptomType2" @change="checkBox(symptomType2,3,4)">
                  <el-radio label="3" name="type">加重</el-radio>
                  <el-radio label="4" name="type">减轻</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :md="4" :sm="12" :xs="24">
              <el-form-item label="胸痛:">
                <el-radio-group v-model="symptomType3" @change="checkBox(symptomType3,5,6)">
                  <el-radio label="5" name="type">加重</el-radio>
                  <el-radio label="6" name="type">减轻</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="12" :xs="24">
              <el-form-item label="胸背痛:">
                <el-radio-group v-model="symptomType4" @change="checkBox(symptomType4,7,8)">
                  <el-radio label="7" name="type">加重</el-radio>
                  <el-radio label="8" name="type">减轻</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            </span>
           
          </el-form-item>
        </el-row>
        <el-row :gutter="20" v-if="form.symptom==2">
          <el-col :md="3">
            <div style="opacity: 0;">1</div>
          </el-col>
          <el-col :md="7" :sm="12" :xs="24">
            <el-form-item label="左上肢、左小指痛:">
              <el-radio-group v-model="symptomType5" @change="checkBox(symptomType5,9,10)">
                <el-radio label="9" name="type">加重</el-radio>
                <el-radio label="10" name="type">减轻</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="5" :sm="12" :xs="24">
            <el-form-item label="牙周痛:">
              <el-radio-group v-model="symptomType6" @change="checkBox(symptomType6,11,12)">
                <el-radio label="11" name="type">加重</el-radio>
                <el-radio label="12" name="type">减轻</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <el-form-item label="其他:">
              <el-input placeholder="请输入内容" v-model="form.symptomOther"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>体征</div>
            </el-col>
            <el-col :md="5" :sm="7" :xs="24">
              <el-form-item label="血压">
                <el-input type="text" v-model="form.bloodPressure"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="7" :xs="24">
              <el-form-item label="血糖">
                <el-input type="text" v-model="form.bloodSugar"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="7" :xs="24">
              <el-form-item label="心率">
                <el-input type="text" v-model="form.heartRate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="5" :sm="7" :xs="24">
              <el-form-item label="其他">
                <el-input type="text" v-model="form.signOther"></el-input>
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
                <el-input type="text" v-model="form.smokingVolume" placeholder="请输入内容"></el-input>
              </el-form-item>

              <el-form-item label="日饮酒量">
                <el-input type="text" v-model="form.drinkVolume" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="摄盐情况:当前:">
                <el-radio-group v-model="form.saltVolume">
                  <el-radio label="1">轻(6g)</el-radio>
                  <el-radio label="2">中(6-12g)</el-radio>
                  <el-radio label="3">重(>12g)</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="睡眠:目前">
                <el-radio-group v-model="form.sleep">
                  <el-radio label="1">入眠困难</el-radio>
                  <el-radio label="2">夜间易醒</el-radio>
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
                  <el-radio label="1">良好</el-radio>
                  <el-radio label="2">一般</el-radio>
                  <el-radio label="3">差</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="遵医行为：目前">
                <el-radio-group v-model="form.complianceBehavior">
                  <el-radio label="1">良好</el-radio>
                  <el-radio label="2">一般</el-radio>
                  <el-radio label="3">差</el-radio>
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
              <el-radio-group v-model="form.auxiliaryExamination">
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
              <el-radio-group v-model="form.medicalSide">
                <el-radio :label="1">有</el-radio>
                <el-radio :label="2">无</el-radio>
              </el-radio-group>
              <span style="padding-left:8px" v-if="form.medicalSide==1">
                不良反应药物:
                <el-input class="miniWBIG" v-model="form.drugsName"></el-input>
              </span>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="此次随访分类：">
            <el-col :md="3" :sm="24" :xs="24">
            </el-col>
            <el-col :md="21" :sm="24" :xs="24">
              <el-radio-group v-model="form.flupGroup">
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
                  <el-table
                    border
                    :data="form.bsWeedFlupCoronaryDose"
                    style="width: 100%"
                    :header-cell-style="{background:tableHead}"
                  >
                    <!-- <el-table-column prop="number" label="序号" style="width:6vw;" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.number"></el-input>
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="drugName" label="药品名称" style="width:6vw;" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.drugName"></el-input>
                      </template>
                    </el-table-column>
                    
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
                          @click="addrow(form.bsWeedFlupCoronaryDose,{ historyType: 0, dataType: 9 })"
                        >
                        <img
                          src="../../../../../static/png/del.png"
                          alt
                          @click.prevent="delrow(scope.$index, form.bsWeedFlupCoronaryDose,{ historyType: 0, dataType: 9 })"
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
                    :data="form.bsWeedFlupCoronaryInHospital"
                    style="width: 100%"
                    :header-cell-style="{background:tableHead}"
                  >
                    <!-- <el-table-column prop="number" label="序号" style="width:6vw;" align="center">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.number"></el-input>
                      </template>
                    </el-table-column> -->
                    <el-table-column
                      prop="inHospitalDate"
                      label="住院日期"
                      style="width:6vw;"
                      align="center"
                    >
                      <template slot-scope="scope">
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
                          @click="addrow(form.bsWeedFlupCoronaryInHospital,{ historyType: 0, dataType: 9 })"
                        >
                        <img
                          src="../../../../../static/png/del.png"
                          alt
                          @click.prevent="delrow(scope.$index, form.bsWeedFlupCoronaryInHospital,{ historyType: 0, dataType: 9 })"
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
          <el-form-item label="备注">
            <el-col :md="24" :sm="24" :xs="24">
              <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="form.ramk"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item >
            <el-col :md="4" :sm="4" :xs="4" :offset="16">
              <el-form-item label="随访医生">
                <el-input v-model="form.doctorSignatureUrl" type="text"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="4" :sm="4" :xs="4">
              <el-form-item label="随访助理">
                <el-input v-model="form.assistantSignatureUrl" type="text"></el-input>
              </el-form-item>
            </el-col>
            
          </el-form-item>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableHead: "rgba(228,248,245,1)",
      options: [
        { value: "1", label: "规律" },
        { value: "2", label: "间断" },
        { value: "3", label: "不服药" }
      ],
      symptomType1: "",
      symptomType2: "",
      symptomType3: "",
      symptomType4: "",
      symptomType5: "",
      symptomType6: "",
      symptomType: [],
      user: this.$store.state.user.dataUser,
      form: {
        symptomType: "",
        flupDate: "",
        ramk: "",
        flupType: "",
        doctorSignatureUrl: "",
        assistantSignatureUrl: "",
        medicationCompliance: "",
        flupGroup: "",
        drugsName: "",
        medicalSide: "",
        auxiliaryExamination: "",
        psychology: "",
        complianceBehavior: "",
        motionNext: "",
        motionNow: "",
        smokingVolume: "",
        drinkVolume: "",
        sleep: "",
        saltVolume: "",
        bloodSugar: "",
        bloodPressure: "",
        heartRate: "",
        signOther: "",
        symptomOther: "",
        symptom: "",
        userName: "",
        idcardNumber: "",
        fileNumber: "",
        bsWeedFlupCoronaryDose: [{ historyType: 0, dataType: 9 }],
        bsWeedFlupCoronaryInHospital: [{ historyType: 0, dataType: 9 }]
      }
    };
  },
  mounted() {
    this.form.assistantSignatureUrl=this.user.name;

  },
  methods: {
   // 添加行
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
    checkBox(value, num1, num2) {
      for (const index in this.symptomType) {
        if (this.symptomType[index]==num1 || this.symptomType[index]==num2 ) {
          this.symptomType.splice(index,1)
        }
      }
      this.symptomType.push(value)
      this.form.symptomType=this.symptomType.join('/');   
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