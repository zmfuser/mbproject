<template>
  <div class="base padd">
    <div class="center1">
      <h3>冠心病检查结果</h3>
    </div>
    <el-form class="padd form">
      <el-row>
        <el-col :md="24" :sm="24" :xs="24">
          <div>1、相关检查结果：</div>
          <table class="commerTable">
            <thead>
              <th>项目</th>
              <th>诊断结果</th>
              <th>备注</th>
              <th>目标值</th>
            </thead>
            <tbody>
              <tr>
                <td>血浆葡萄糖</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.plasmaGlucose">
                      <template slot="append">mmol/l</template>
                    </el-input>
                  </div>
                </td>
                <td>
                  <div>空腹</div>
                </td>
                <td>
                  <div>(3.9-6.1)</div>
                </td>
              </tr>
              <tr>
                <td>糖化血红蛋白(HbAlc)</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.hba1c">
                      <template slot="append">%</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td>6.5</td>
              </tr>
              <tr>
                <td>血压</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.bloodPressure">
                      <template slot="append">mmHg</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td>＜130/80</td>
              </tr>
              <tr>
                <td>腰围</td>
                <td>
                  <div>
                   <el-input  :disabled="true"   placeholder="请输入内容" type="number" v-model="form.waist" min="0" @keyup.native="proving($event)">
                      <template slot="append">cm</template>
                    </el-input>
                  </div>
                </td>
                <td>
                  <div>男</div>
                  <div>女</div>
                </td>
                <td>
                  <div>＜90</div>
                  <div>＜85</div>
                </td>
              </tr>
              <tr>
                <td>体重指数</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.bodyMassIndex">
                      <template slot="append">kg/m²</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td>18.5-24.9</td>
              </tr>
              <tr>
                <td>高密度脂蛋白(HDL-C)</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.hdlC">
                      <template slot="append">mmol/l</template>
                    </el-input>
                  </div>
                </td>
                <td>
                  <div>男</div>
                  <div>女</div>
                </td>
                <td>
                  <div>＞1.0</div>
                  <div>＞1.3</div>
                </td>
              </tr>
              <tr>
                <td>甘油三酯(TG)</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.tg">
                      <template slot="append">mmol/l</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td>
                  <div>＜1.7</div>
                </td>
              </tr>
              <tr>
                <td>低密度脂蛋白</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.ldlC">
                      <template slot="append">mmol/l</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td>
                  <div>＜1.8</div>
                </td>
              </tr>
              <tr>
                <td>肝功能</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.liverFunction">
                      <template slot="append">mmol/l</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>心肌酶</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.myocardialEnzyme">
                      <template slot="append">mmol/l</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>心电图</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.electrocardiogram">
                      <template slot="append">mmol/l</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>胸片</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.rabat">
                      <template slot="append">mmol/l</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>心脏彩超</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.echocardiography">
                      <template slot="append">mmol/l</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>冠脉CTA</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.coronaryCta">
                      <template slot="append">mmol/l</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>冠脉造影</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.cag">
                      <template slot="append">mmol/l</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>主要有氧活动</td>
                <td>
                  <div>
                    <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.mAerobic">
                      <template slot="append">分钟/周</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td>依患者心肺情况而定</td>
              </tr>
            </tbody>
          </table>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="不稳定型心绞痛危险分层结果：">
            <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.chestPainResults">
              <template slot="append">①②③④⑤⑥⑦</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="急性冠脉综合征患者短期内死亡或非致死性心肌梗死的风险：">
            <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.chestPainRisk"></el-input>
          </el-form-item>
        </el-col>
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
                >
                  <el-table-column prop="drugName" label="药品名称" style="width:6vw;" align="center">
                    <template slot-scope="scope">
                      <!-- <el-input  :disabled="true"   v-model="scope.row.drugName"></el-input> -->
                      <span>{{scope.row.drugName}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column prop="dosageAndFrequency" label="用量及频率" align="center">
                    <template slot-scope="scope">
                      <!-- <el-input  :disabled="true"   v-model="scope.row.dosageAndFrequency"></el-input> -->
                      <span>{{scope.row.dosageAndFrequency}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="duration" label="持续时间" align="center">
                    <template slot-scope="scope">
                      <!-- <el-input  :disabled="true"   v-model="scope.row.duration"></el-input> -->
                      <span>{{scope.row.duration}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="drugSideEffects" label="药物副作用" align="center">
                    <template slot-scope="scope">
                      <!-- <el-input  :disabled="true"   v-model="scope.row.drugSideEffects" type="textarea"></el-input> -->
                      <span>{{scope.row.drugSideEffects}}</span>
                    </template>
                  </el-table-column>
                   <el-table-column
                    prop="illDate"
                    label="服药依从性"
                    width="270"
                    align="center"
                  >
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
    </el-form>
  </div>
</template>
<script>
export default {
  props:["chd"],
  data() {
    return {
      form: {},
    };
  },
  mounted() {
    this.$set(this,"form",this.chd)
  },
  methods: {
  }
};
</script>

<style scoped>
td{
  width:400px;
  height:90px
}
  .form>>> .el-input-group__prepend{
        background-color: transparent !important;
        border: none !important;
        color: black
    }
.form>>>.el-input__inner{
  border:none !important;
  border-radius: 0px !important;
  border-bottom:1px solid #ddd !important;
  color: black
}
.form>>>.el-input-group__append{
     background-color: transparent !important;
    border: none !important;
    color: black
}
</style>

