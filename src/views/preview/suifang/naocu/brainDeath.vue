<template>
  <div class="base">
    <div class="allhightbp">
      <div class="center1">
        <h3>脑卒中管理随访表</h3>
      </div>
      <el-form ref="form" label-position="left" class="base padd">
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
        </el-row> -->
        <el-row :gutter="20">
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>Esson脑卒中风险评分分级</div>
            </el-col>
            <el-col :md="10" :sm="12" :xs="24">
              <el-radio-group  :disabled="true"   v-model="form.riskLevel">
                <el-radio :label="1">低危</el-radio>
                <el-radio :label="2">中危</el-radio>
                <el-radio :label="3">高危</el-radio>
              </el-radio-group>
            </el-col>
            <el-col :md="10" :sm="12" :xs="24">
              <el-form-item label="评分">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.riskDeuce"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-col :md="1" :sm="1" :xs="24">
              <div>体征</div>
            </el-col>
            <el-col :md="2" :sm="2" :xs="24">
              <div>肌力</div>
              <div>语言</div>
              <div>吞咽</div>
            </el-col>
            <el-col :md="10" :sm="10" :xs="24">
              <el-form-item label="上肢">
                <el-input  :disabled="true"   v-model="form.upperLimb" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="10" :sm="10" :xs="24">
              <el-form-item label="下肢">
                <el-input  :disabled="true"   v-model="form.theLegs" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-radio-group  :disabled="true"   v-model="form.answer">
              <el-radio :label="1" name="type">运动性失语</el-radio>
              <el-radio :label="2" name="type">感觉性失语</el-radio>
              <el-radio :label="3" name="type">混合性失语</el-radio>
              <el-form-item></el-form-item>
              <el-input  :disabled="true"   v-model="form.swallow"></el-input>
            </el-radio-group>
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

              <el-form-item label="日饮酒量">
                <el-input  :disabled="true"   type="text" v-model="form.drinkVolume" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
            <el-col :md="10" :sm="12" :xs="24">
              <el-form-item label="运动:当前">
                <el-input  :disabled="true"   type="text" v-model="form.motion" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-form-item>
        </el-row>

        <el-row :gutter="20">
          <el-col :md="3">
            <div style="opacity: 0;">1</div>
          </el-col>
          <el-col :md="10" :sm="24" :xs="24">
            <el-form-item label="心理:目前">
              <el-radio-group  :disabled="true"   v-model="form.psychology">
                <el-radio :label="1">良好</el-radio>
                <el-radio :label="2">一般</el-radio>
                <el-radio :label="3">差</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="10" :sm="24" :xs="24">
            <el-form-item label="遵医行为：目前">
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
            <el-col :md="3" :sm="3" :xs="24">
              <div>辅助检查</div>
            </el-col>
            <el-col :md="20" :sm="20" :xs="24">
              <el-input  :disabled="true"   type="text" v-model="form.checking" placeholder="请输入内容"></el-input>
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
                    :data="form.bsFlupStrokeDose"
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
              <span style="padding-left:8px">
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
            <el-col :md="21" :sm="24" :xs="24">
              <el-radio-group  :disabled="true"   v-model="form.flupGroup">
                <el-radio label="1">控制满意</el-radio>
                <el-radio label="2">控制不满意</el-radio>
                <el-radio label="3">不良反应</el-radio>
                <el-radio label="4">并发症</el-radio>
              </el-radio-group>
            </el-col>
          </el-form-item>
        </el-row>

        <el-row :gutter="20">
          <el-form-item>
            <el-col :md="3" :sm="24" :xs="24">
              <div>转诊</div>
            </el-col>
            <el-col :md="10" :sm="24" :xs="24">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.referralReason">
                <template slot="prepend">原因：</template>
              </el-input>
              
            </el-col>
            <el-col :md="10" :sm="24" :xs="24">
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.institutionDivision">
                <template slot="prepend">机构及科别</template>
              </el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item>
            <el-col :md="3" :sm="12" :xs="24">
              <div>下次随访日期</div>
            </el-col>
            <el-col :md="13" :sm="13" :xs="24" class="suiFangDay">
              <el-form-item  >
                <el-date-picker v-model="form.nextFlupDate" type="date"></el-date-picker>
              </el-form-item>
              
            </el-col>
          </el-form-item>
        </el-row>
        <!-- <el-row>
          <el-form-item>
            <el-col :md="4" :sm="24" :xs="24">
              <div>随访医师及健康助理签名</div>
            </el-col>
            <el-col :md="20" :sm="24" :xs="24">
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.doctorSignatureUrl">
                <template slot="prepend">医师</template>
              </el-input>
              <el-input  :disabled="true"   placeholder健康医师="请输入内容" v-model="form.assistantSignatureUrl">
                <template slot="prepend"></template>
              </el-input>
            </el-col>
          </el-form-item>
        </el-row> -->
        <el-row>
          <el-form-item label="备注">
            <el-col :md="24" :sm="24" :xs="24">
              <el-input  :disabled="true"   type="textarea" :rows="4" placeholder="请输入内容" v-model="form.ramk"></el-input>
            </el-col>
          </el-form-item>
        </el-row>
        <el-row :gutter="20">
          <el-form-item >
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
</template>
<script>
export default {
  props:["Naocu"],
  data() {
    return {
      options: [
        { value: "1", label: "规律" },
        { value: "2", label: "间断" },
        { value: "3", label: "不服药" }
      ],
      form: {
        assistantSignatureUrl: "",
        doctorSignatureUrl: "",
        flupDate: "",
        ramk: "",
        checking: "",
        theLegs: "",
        upperLimb: "",
        riskLevel: "",
        riskDeuce: "",
        bsFlupStrokeDose: [{}]
      }
    };
  },
  mounted(){
    // this.form=this.Naocu
    this.$set(this,'form',this.Naocu)

  },
  methods: {}
};
</script>
<style scoped>
.el-form-item__content > .el-input {
  width: 60% !important;
}

.el-form-item > .el-form-item__content {
  width: 220px !important;
}
.suiFangDay >>> .el-date-editor{
  width: 300px !important;
}
.allhightbp >>> .el-input-group__prepend {
  background-color: transparent !important;
  border: none !important;
}
.allhightbp >>> .el-input__inner {
  border: none !important;
  border-radius: 0px !important;
  border-bottom: 1px solid #ddd !important;
}
.allhightbp >>> .el-input-group__append {
  background-color: transparent !important;
  border: none !important;
}
</style>