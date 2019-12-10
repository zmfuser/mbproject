<template>
  <div class="allcontent base">
    <div class="center1">
      <h2>慢阻肺患者病史及检查结果</h2>
      <h3>现病史及检查结果</h3>
    </div>
    <el-form :label-position="form.labelPosition" class="padd form">
      <el-row>
        <el-form-item>
          <el-col>
            <el-form-item label="肺功能分级">
              <el-radio-group v-model="form.pulmonaryLevel">
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
            <el-radio-group v-model="form.isSeizures">
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
              <el-radio-group v-model="form.seizuresQuit">
                <el-radio :label="1" name="type">偶有1-3次无夜间发作</el-radio>
                <el-radio :label="2" name="type">白天与夜间发作均有发作1-3次</el-radio>
                <el-radio :label="3" name="type">3次以上的白天与夜间发作</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item label="咳嗽、咳痰、气喘伴随症状：">
              <el-checkbox-group
                v-model="seizuresSymptom"
                @change="checkboxChange(seizuresSymptom,1)"
              >
                <el-checkbox label="1" name="type">心慌</el-checkbox>
                <el-checkbox label="2" name="type">汗出</el-checkbox>
                <el-checkbox label="3" name="type">濒死感</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </div>
      </el-row>
      <el-row>
        <el-form-item label="咳嗽、咳痰、气喘诱因：">
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item label="运动">
              <el-checkbox-group v-model="seizuresCause" @change="checkboxChange(seizuresCause,2)">
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
               <el-radio-group v-model="dayAnight" @change="dayornight(dayAnight)">
                        <el-radio :label="7" >白天</el-radio>
                        <el-radio :label="8" >夜间</el-radio>
                      </el-radio-group>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="2、慢性阻塞性肺疾病并发症">
              <el-checkbox-group
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
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="3、慢性阻塞性肺疾病治疗方式">
              <el-checkbox-group
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
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="4、现存危险因素">
              <el-checkbox-group v-model="copdRisk" @change="checkboxChange(copdRisk,5)">
                <el-checkbox label="1" name="type">吸烟</el-checkbox>
                <el-checkbox label="2" name="type">职业和环境污染</el-checkbox>
                <el-checkbox label="3" name="type">免疫功能低下(上呼吸道感染)</el-checkbox>
                <el-checkbox label="4" name="type">气候剧烈变化</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="5、伴发疾病">
              <el-checkbox-group
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
                <el-table
                  border
                  :data="form.bsArchivesDoses"
                  style="width: 100%"
                  :header-cell-style="{background:tableHead}"
                >
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
                      <el-input v-model="scope.row.drugSideEffects" type="textarea"></el-input>
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
                        src="../../../../static/png/add.png"
                        alt
                        @click="addrow(form.bsArchivesDoses,{ historyType: 0, dataType: 2 })"
                      >
                      <img
                        src="../../../../static/png/del.png"
                        alt
                        @click.prevent="delrow(scope.$index, form.bsArchivesDoses)"
                      >
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
                <el-input placeholder="请输入内容" v-model="form.hemoglobin">
                  <template slot="prepend">血红蛋白</template>
                  <template slot="append">g/l</template>
                </el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item>
              <div style="margin-top: 15px;">
                <el-input placeholder="请输入内容" v-model="form.whiteBlood">
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
                <el-input placeholder="请输入内容" v-model="form.platelet">
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
                <el-input placeholder="请输入内容" v-model="form.inspectOther">
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
                <el-input placeholder="请输入内容" v-model="form.bloodGasAnaly">
                  <template slot="prepend">血气分析</template>
                </el-input>
              </div>
            </el-form-item>
          </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item>
            <div>
              <el-input placeholder="请输入内容" v-model="form.nonInvasive">
                <template slot="prepend">无创血氧饱和度</template>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item>
            <div>
              <el-input placeholder="请输入内容" v-model="form.lungFunction">
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
            <el-radio-group v-model="form.ecg">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">异常</el-radio>
            </el-radio-group>

            <span v-if="form.ecg == 1">
              异常描述:
              <el-input  class="miniWBIG" v-model="form.ecgDesc"></el-input>
            </span>
          </el-form-item>
        </el-col>

        <el-col :md="24" :sm="12" :xs="24">
          <el-form-item>
            <label for>胸部X线：</label>
            <el-radio-group v-model="form.chestXray">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">异常</el-radio>
            </el-radio-group>
            <span v-if="form.chestXray == 1">
              异常描述:
              <el-input  class="miniWBIG" v-model="form.chestXrayDesc"></el-input>
            </span>
          </el-form-item>
        </el-col>

        <!-- <el-col :md="12" :sm="12" :xs="24">
          <el-form-item>
            <label for>劲动脉彩超：</label>
            <el-radio-group v-model="form.CDU">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">异常</el-radio>
            </el-radio-group>
            <div>
              异常描述:
              <el-input type="textarea" class="miniW" v-model="form.unusual3"></el-input>
            </div>
          </el-form-item>
        </el-col>-->

        <el-col :md="24" :sm="12" :xs="24">
          <el-form-item>
            <label for>超声心动图</label>
            <el-radio-group v-model="form.ucg">
              <el-radio label="0">正常</el-radio>
              <el-radio label="1">异常</el-radio>
            </el-radio-group>
            <span v-if="form.ucg == 1">
              异常描述:
              <el-input  class="miniWBIG" v-model="form.ucgDesc"></el-input>
            </span>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item>
            <label for>肺CT</label>
            <el-radio-group v-model="form.lungCt">
              <el-radio label="0">正常</el-radio>
              <el-radio label="1">异常</el-radio>
            </el-radio-group>
            <span v-if="form.lungCt == 1">
              异常描述:
              <el-input  class="miniWBIG" v-model="form.lungCtDesc"></el-input>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="住院史：">
            <template>
              <el-table
                border
                :data="form.bsArchivesInHospitals"
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
                    <!-- <el-input v-model="scope.row.opsname"></el-input> -->
                    <div class="block">
                      <el-date-picker
                        v-model="scope.row.inHospitalDate"
                        type="date"
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
                      src="../../../../static/png/add.png"
                      alt
                      @click="addrow(form.bsArchivesInHospitals,{ historyType: 0, dataType: 4 })"
                    >
                    <img
                      src="../../../../static/png/del.png"
                      alt
                      @click.prevent="delrow(scope.$index, form.bsArchivesInHospitals)"
                    >
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
  data() {
    return {
      tableHead: "rgba(228,248,245,1)",
      hide: false,
      dayAnight: '',
      seizuresSymptom: [],
      seizuresCause: [],
      copdComplication: [],
      copdTreatmentMeth: [],
      copdRisk: [],
      copdConcomitant: [],
      form: {
        labelPosition: "top",
        bloodGasAnaly: "",
        inspectOther: "",
        nonInvasive: "",
        lungFunction: "",
        pulmonaryLevel: "1",
        isSeizures: "",
        seizuresQuit: "",
        seizuresSymptom: "",
        seizuresCause: "",
        rest: "",
        copdComplication: "",
        copdTreatmentMeth: "",
        copdRisk: "",
        copdConcomitant: "",
        hemoglobin: "",
        whiteBlood: "",
        platelet: "",
        CDU: "",
        checkTH: "",
        chaoxdX: "",
        ecg: "",
        ecgDesc: "",
        chestXray: "",
        chestXrayDesc: "",
        ucg: "",
        unusual3: "",
        ucgDesc: "",
        lungCt: "",
        lungCtDesc: "",
        bsArchivesDoses: [{}],
        // 住院史
        bsArchivesInHospitals: [{ historyType: 0, dataType: 2 }]
      },
      options: [
        { value: "1", label: "规律" },
        { value: "2", label: "间断" },
        { value: "3", label: "不服药" }
      ]
    };
  },
  methods: {
    // 白天黑夜
    dayornight(val){
      for (let index = 0; index < this.seizuresCause.length; index++) {
        if (this.seizuresCause[index] == 7) {
          this.seizuresCause.splice(index, 1);
        }else if (this.seizuresCause[index] == 8) {
          this.seizuresCause.splice(index, 1);
        }
      }
      this.seizuresCause.push(val)
     this.form.seizuresCause=this.usual.changeString(this.seizuresCause).family
    },
    // 复选框值变化
    checkboxChange(value, code) {
      let _this = this;
      let val = _this.usual.changeString(value);
      switch (code) {
        case 1:
          this.form.seizuresSymptom = val.family;
          break;

        case 2:
          this.form.seizuresCause = val.family;
          break;

        case 3:
          this.form.copdComplication = val.family;
          break;
        case 4:
          this.form.copdTreatmentMeth = val.family;
          break;
        case 5:
          this.form.copdRisk = val.family;
          break;
        case 6:
          this.form.copdConcomitant = val.family;
          break;
      }
    },
    //表格-添加行
    // addrow(table) {
    //   let _this = this;
    //   _this.usual.addRow(table);
    // },
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
    }
  }
};
</script>

<style  scoped>
.allcontent >>> .el-textarea__inner {
  line-height: 1 !important;
}
.allcontent {
  max-width: 1200px;
  margin: 0 auto;
}
.fontClass {
  padding-left: 20px;
  color: #606266;
}
.border_bottom>>>.el-input__inner{
  border: none;
  border-bottom: 1px solid #ddd !important;
  border-radius: 0px;
}
.form >>> .el-input-group__prepend {
  background-color: transparent !important;
  border: none !important;
}
.form >>> .el-input__inner {
  border: none !important;
  border-radius: 0px !important;
  border-bottom: 1px solid #ddd !important;
}
.form >>> .el-input-group__append {
  background-color: transparent !important;
  border: none !important;
}
</style>