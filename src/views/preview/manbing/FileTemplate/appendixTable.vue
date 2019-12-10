<template>
  <div class="base">
    <div class="center1">
      <h2>慢病档案附表</h2>
      <h3>现病史及检查结果</h3>
    </div>
    <el-form class="padd form" label-position="top">
      <el-row>
        <el-col>
          <el-form-item label="1、近一个月的血压情况(高血压病)">
            <el-radio-group  :disabled="true" v-model="form.bloodPressure">
              <el-radio :label="1">≤120/80mmHg(此血压状态占比≥90%）</el-radio>
              <el-radio :label="2">121-139/81-89mmHg(此血压状态占比≥90%）</el-radio>
              <el-radio :label="3">140-159/90-99mmHg(此血压状态占比≥10%）</el-radio>
              <el-radio :label="4">160-179/100-109mmHg(此血压状态占比≥10%）</el-radio>
              <el-radio :label="5">≥180/110mmHg(此血压状态占比≥90%）</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <div>
        <el-row>
          <el-form-item label="2.近48小时的胸痛情况（冠心病）">
            <el-radio-group  :disabled="true" v-model="form.chestPain">
              <el-radio :label="1">近48小时内未发作</el-radio>
              <el-radio :label="0">近48小时内发作</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <div v-if="form.chestPain!=1">
          <el-row>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="胸痛发作次数：">
                <el-radio-group  :disabled="true" v-model="form.chestPainQuit">
                  <el-radio :label="1" name="type">1次</el-radio>
                  <el-radio :label="2" name="type">2次</el-radio>
                  <el-radio :label="3" name="type">3次</el-radio>
                  <el-radio :label="4" name="type">4次</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :md="12" :sm="12" :xs="24">
              <el-form-item label="胸痛伴随症状：" >
                <el-checkbox-group :disabled="true"  v-model="chestPainSymptom">
                  <el-checkbox label="1" name="type">心慌</el-checkbox>
                  <el-checkbox label="2" name="type">出汗</el-checkbox>
                  <el-checkbox label="3" name="type">濒死感</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </el-col>

            <el-col :md="24" :sm="24" :xs="24">
              <el-form-item label="胸痛持续时间：">
                <el-radio-group  :disabled="true" v-model="form.chestPainTime">
                  <el-radio :label="1" name="type">3-5min</el-radio>
                  <el-radio :label="2" name="type">5-10min</el-radio>
                  <el-radio :label="3" name="type">10-15min</el-radio>
                  <el-radio :label="4" name="type">>15min</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col>
              <el-form-item label="胸痛诱因：">
                <el-row>
                  <el-col :md="12" :sm="12" :xs="24">
                    <el-form-item label="运动">
                      <el-checkbox-group :disabled="true"  v-model="chestPainIncentive">
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
                </el-row>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
      </div>
      <el-row>
        <el-col :md="24" :sm="12" :xs="24">
          <el-form-item label="3、低血糖发作情况(糖尿病)">
            <el-radio-group  :disabled="true" v-model="showOrDiabetes">
              <el-radio label="0">最近1个月内未发作</el-radio>
              <el-radio label="1">最近一个月内发作</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="showOrDiabetes!= 0">
        <el-row>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item>
              <el-radio-group  :disabled="true" v-model="diabetesRadio">
                <el-radio label="2" name="type">1次</el-radio>
                <el-radio label="3" name="type">2次</el-radio>
                <el-radio label="4" name="type">3次</el-radio>
                <el-radio label="5" name="type">4次及以上</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item>
              <el-checkbox-group :disabled="true"  v-model="diabetes">
                <el-checkbox label="6" name="type">症状性低血糖：心慌、出汗、饥饿感</el-checkbox>
                <el-checkbox label="7" name="type">诊断性低血糖：血糖低于3.9mmol/l</el-checkbox>
                <el-checkbox label="8" name="type">严重低血糖:(需要借助他人帮助才能纠正的低血糖，一般合并程度不同的意识障碍)</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row>
        <div>4、并发症</div>
        <el-form-item>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="高血压病：">
              <el-checkbox-group :disabled="true"  v-model="hypertensionComplicated">
                <el-checkbox label="1" name="type">心肌肥厚或扩大</el-checkbox>
                <el-checkbox label="2" name="type">心力衰竭</el-checkbox>
                <el-checkbox label="3" name="type">脑出血后遗症或缺血性脑卒中</el-checkbox>
                <el-checkbox label="4" name="type">肾功能不全</el-checkbox>
                <el-checkbox label="5" name="type">眼底视网膜病变</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="冠心病：">
              <el-checkbox-group :disabled="true"  v-model="coronaryHeartComplicated">
                <el-checkbox label="1" name="type">心脏扩大</el-checkbox>
                <el-checkbox label="2" name="type">心力衰竭</el-checkbox>
                <el-checkbox label="3" name="type">心律失常</el-checkbox>
                <el-checkbox label="4" name="type">附壁血栓</el-checkbox>
                <el-checkbox label="5" name="type">心脏破裂</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
          <el-col :md="24" :sm="24" :xs="24">
            <el-form-item label="糖尿病：">
              <el-checkbox-group :disabled="true"  v-model="diabetesComplicated">
                <el-checkbox label="1" name="type">眼底病变</el-checkbox>
                <el-checkbox label="2" name="type">周围神经病变</el-checkbox>
                <el-checkbox label="3" name="type">糖尿病足</el-checkbox>
                <el-checkbox label="4" name="type">酮症</el-checkbox>
                <el-checkbox label="5" name="type">高渗性昏迷</el-checkbox>
                <el-checkbox label="6" name="type">糖尿病肾病</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :md="24" :sm="12" :xs="24">
          <el-form-item label="5、现存危险因素">
            <el-checkbox-group :disabled="true"  v-model="riskFactor">
              <el-checkbox label="1" name="type">男性>=55岁,女性>=65岁</el-checkbox>
              <el-checkbox label="2" name="type">少运动(每周少于3天大于7000步的走路)</el-checkbox>
              <el-checkbox label="3" name="type">吸烟</el-checkbox>
              <el-checkbox label="4" name="type">高尿酸血症</el-checkbox>
              <el-checkbox label="5" name="type">微量白蛋白尿</el-checkbox>
              <el-checkbox label="6" name="type">高同型半胱氨酸血症</el-checkbox>
              <el-checkbox label="7" name="type">腹型肥胖：(腰围：男性>=90cm；女性>=85cm)或肥胖（BMI≥28kg/m2）</el-checkbox>
              <el-checkbox label="8" name="type">糖耐量受损：(2小时血糖7.8-11.0mmol/l)或者空腹血糖异常(6.1-6.9mmol/l)</el-checkbox>
              <el-checkbox
                label="9"
                name="type"
              >血脂异常：总胆固醇>=5.17mmol/l或低密度蛋白大于3.3mmol/l或高密度蛋白小于1mmool/l</el-checkbox>
              <el-checkbox label="10" name="type">一级亲属早发心血管疾病：(男小于45；女小于55岁时确诊高血压病或冠心病)</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="6、伴发疾病">
            <el-checkbox-group :disabled="true"  v-model="accomDisease">
              <el-checkbox label="1" name="type">高血压病</el-checkbox>
              <el-checkbox label="2" name="type">冠心病</el-checkbox>
              <el-checkbox label="3" name="type">缺血性心力衰竭</el-checkbox>
              <el-checkbox label="4" name="type">出血性脑卒中</el-checkbox>
              <el-checkbox label="5" name="type">骨质疏松</el-checkbox>
              <el-checkbox label="6" name="type">冠状动脉支架植入术或冠脉搭桥术</el-checkbox>
              <el-checkbox label="7" name="type">缺血性脑卒中</el-checkbox>
              <el-checkbox label="8" name="type">糖尿病</el-checkbox>
              <el-checkbox label="9" name="type">肾功能受损</el-checkbox>
              <el-checkbox label="10" name="type">外周血管疾病</el-checkbox>
              <el-checkbox label="11" name="type">睡眠呼吸暂停综合征</el-checkbox>
              <el-checkbox label="12" name="type">多囊卵巢综合征</el-checkbox>
              <el-checkbox label="13" name="type">高尿酸血症或痛风性关节炎</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="7、服药情况">
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
        <el-form-item label="8、辅助检查(近一年最近一次资料)">
          <el-col :md="12" :sm="12" :xs="24">
            <el-form-item label="血常规">
              <div>
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.hemoglobin">
                  <template slot="prepend">血红蛋白</template>
                  <template slot="append">g/l</template>
                </el-input>
              </div>
              <div style="margin-top: 15px;">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.leukocyte">
                  <template slot="prepend">白细胞</template>
                  <template slot="append">
                    x10
                    <sup>9</sup>/l
                  </template>
                </el-input>
              </div>
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
            <el-form-item label="尿常规">
              <div>
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.urineProtein">
                  <template slot="prepend">尿蛋白</template>
                </el-input>
              </div>
              <div style="margin-top: 15px;">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.urineSugar">
                  <template slot="prepend">尿糖</template>
                </el-input>
              </div>
              <div style="margin-top: 15px;">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.ketoneBodies">
                  <template slot="prepend">尿酮体</template>
                </el-input>
              </div>
              <div style="margin-top: 15px;">
                <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.bid">
                  <template slot="prepend">尿潜血</template>
                </el-input>
              </div>
            </el-form-item>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="尿微量白蛋白">
            <div>
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.urinaryMicroalbumin">
                <template slot="append">mg/g</template>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="血尿酸">
            <div>
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.homocysteine">
                <template slot="prepend">血同型半胱氨酸</template>
                <template slot="append">umol/l</template>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="空腹血糖">
            <div>
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.eatBloodSugar">
                <template slot="prepend">餐后2小时血糖</template>
                <template slot="append">mmol/l</template>
              </el-input>
            </div>
            <div style="margin-top: 15px;">
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.glycosyHemoglobin">
                <template slot="prepend">糖化血红蛋白</template>
                <template slot="append">%</template>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="肾功能">
            <div>
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.scr">
                <template slot="prepend">血清肌酐</template>
                <template slot="append">umol/l</template>
              </el-input>
            </div>
            <div style="margin-top: 15px;">
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.bun">
                <template slot="prepend">血尿素氮</template>
                <template slot="append">umol/l</template>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="肝功能">
            <div>
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.serumAst">
                <template slot="prepend">血清谷丙转氨酶</template>
                <template slot="append">u/l</template>
              </el-input>
            </div>
            <div style="margin-top: 15px;">
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.serumAmino">
                <template slot="prepend">血清谷草转氨酶</template>
                <template slot="append">u/l</template>
              </el-input>
            </div>
            <div style="margin-top: 15px;">
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.albumin">
                <template slot="prepend">白蛋白</template>
                <template slot="append">g/l</template>
              </el-input>
            </div>
            <div style="margin-top: 15px;">
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.bilirubin">
                <template slot="prepend">总胆红素</template>
                <template slot="append">umol/l</template>
              </el-input>
            </div>
            <div style="margin-top: 15px;">
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.bindingBilirubin">
                <template slot="prepend">结合胆红素</template>
                <template slot="append">umol/l</template>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="血脂">
            <div>
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.cholesterol">
                <template slot="prepend">总胆固醇</template>
                <template slot="append">mmol/l</template>
              </el-input>
            </div>
            <div style="margin-top: 15px;">
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.triglyceride">
                <template slot="prepend">甘油三酯</template>
                <template slot="append">mmol/l</template>
              </el-input>
            </div>
            <div style="margin-top: 15px;">
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.cholesterolLdl">
                <template slot="prepend">低密度脂蛋白胆固醇</template>
                <template slot="append">mmol/l</template>
              </el-input>
            </div>
            <div style="margin-top: 15px;">
              <el-input  :disabled="true"   placeholder="请输入内容" v-model="form.cholesterolHdl">
                <template slot="prepend">高密度蛋白胆固醇</template>
                <template slot="append">mmol/l</template>
              </el-input>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row class="inputNborder">
        <el-col :md="24" :sm="12" :xs="24">
          <el-form-item>
            <label>心电图：</label>
            <el-radio-group  :disabled="true" v-model="form.electrocardiogram">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">异常</el-radio>
            </el-radio-group>
            <span style="padding-left:8px" v-if="form.electrocardiogram == 1">
              异常描述:
              <el-input  :disabled="true"   class="miniWBIG" v-model="form.electrocardiogramDesc"></el-input>
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
            <span style="padding-left:8px" v-if="form.chestXray == 1">
              异常描述:
              <el-input  :disabled="true"   class="miniWBIG" v-model="form.chestXrayDesc"></el-input>
            </span>
          </el-form-item>
        </el-col>

        <el-col :md="24" :sm="12" :xs="24">
          <el-form-item>
            <label for>劲动脉彩超：</label>
            <el-radio-group  :disabled="true" v-model="form.carotidArter">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">异常</el-radio>
            </el-radio-group>
            <span style="padding-left:8px" v-if="form.carotidArter == 1">
              异常描述:
              <el-input  :disabled="true"   class="miniWBIG" v-model="form.carotidArterDesc"></el-input>
            </span>
          </el-form-item>
        </el-col>

        <el-col :md="24" :sm="12" :xs="24">
          <el-form-item>
            <label for>眼底检查(糖尿病,高血压)：</label>
            <el-radio-group  :disabled="true" v-model="form.fundusExamination">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">异常</el-radio>
            </el-radio-group>
            <span style="padding-left:8px" v-if="form.fundusExamination == 1">
              异常描述:
              <el-input  :disabled="true"   class="miniWBIG" v-model="form.fundusExaminationDesc"></el-input>
            </span>
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="12" :xs="24">
          <el-form-item>
            <label for>超声心电图(心力衰竭)：</label>
            <el-radio-group  :disabled="true"  v-model="form.uitrasound">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">异常</el-radio>
            </el-radio-group>
            <span style="padding-left:8px" v-if="form.uitrasound == 1">
              异常描述:
              <el-input  :disabled="true"   class="miniWBIG" v-model="form.uitrasoundDesc"></el-input>
            </span>
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="12" :xs="24">
          <el-form-item>
            <label for>冠脉造影(冠心病)：</label>
            <el-radio-group  :disabled="true"  v-model="form.cag">
              <el-radio :label="0">正常</el-radio>
              <el-radio :label="1">异常</el-radio>
            </el-radio-group>
            <span style="padding-left:8px" v-if="form.cag == 1">
              异常描述:
              <el-input  :disabled="true"   class="miniWBIG" v-model="form.cagDesc"></el-input>
            </span>
          </el-form-item>
        </el-col>
        <el-col :md="24" :sm="12" :xs="24">
          <el-form-item>
            <label for>其他：</label>

            <span style="padding-left:8px">
              异常描述:
              <el-input  :disabled="true"   class="miniWBIG" v-model="form.other"></el-input>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="手术史：">
            <el-radio-group  :disabled="true" v-model="form.scheduleOperation">
              <el-radio :label="1">无</el-radio>
              <el-radio :label="0">有</el-radio>
            </el-radio-group>
            <div v-show="form.scheduleOperation == 0">
              <template>
                <!-- <el-table border :data="form.bsArchivesPastHistories" style="width:100%">
                  <el-table-column
                    prop="historyName"
                    label="手术名称"
                    align="center"
                  >
                    <template slot-scope="scope">
                      <span>{{scope.row.historyName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="historyDate" label="手术时间" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.historyDate}}</span>
                    </template>
                  </el-table-column>
                </el-table>-->
                <el-table border :data="form.bsArchivesPastHistories" style="width: 100%">
                  <el-table-column prop="opsname" label="手术名称" style="width:6vw;" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.historyName}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="opstime" label="手术时间" align="center">
                    <template slot-scope="scope">
                      <span>{{scope.row.historyDate}}</span>
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
  props: ["appendixTable"],
  data() {
    return {
      dayAnight: "",
      diabetesRadio: "",
      showOrDiabetes: "",
      accomDisease: [],
      chestPainSymptom: [],
      chestPainIncentive: [],
      hypertensionComplicated: [],
      coronaryHeartComplicated: [],
      diabetesComplicated: [],
      riskFactor: [],
      diabetes: [],
      form: {}
    };
  },
  created() {},
  mounted() {
    this.$set(this, "form", this.appendixTable);
    this.chansform(); //解析复选框数组
    this.pushToDiabetes(); //低血糖发作情况解析数组
    this.radiopushToDiabetes(); //低血糖发作情况解析数组
    this.daynight(); //静息选择
  },
  methods: {
    // 解析复选框数组
    chansform() {
      let _this = this;
      let formvalue = {};
      formvalue.accomDisease = _this.form.accomDisease;
      formvalue.chestPainSymptom = _this.form.chestPainSymptom;
      formvalue.chestPainIncentive = _this.form.chestPainIncentive;
      formvalue.hypertensionComplicated = _this.form.hypertensionComplicated;
      formvalue.diabetes = _this.form.diabetes;
      formvalue.coronaryHeartComplicated = _this.form.coronaryHeartComplicated;
      formvalue.diabetesComplicated = _this.form.diabetesComplicated;
      formvalue.riskFactor = _this.form.riskFactor;
      for (const item in formvalue) {
        if (formvalue[item] != null) {
          this[item] = formvalue[item].split("/");
        }
      }
    },
    // 低血糖发作情况
    pushToDiabetes() {
      if (this.diabetes != null) {
        for (let index = 0; index < this.diabetes.length; index++) {
          if (this.diabetes[index] == 0 || this.diabetes[index] == 1) {
            this.$set(this, "showOrDiabetes", this.diabetes[index]);
          }
        }
      }
    },
    // 低血糖发作情况
    radiopushToDiabetes() {
      if (this.diabetes != null) {
        for (let index = 0; index < this.diabetes.length; index++) {
          if (this.diabetes[index] == 2) {
            this.diabetesRadio = this.diabetes[index];
          } else if (this.diabetes[index] == 3) {
            this.diabetesRadio = this.diabetes[index];
          } else if (this.diabetes[index] == 4) {
            this.diabetesRadio = this.diabetes[index];
          } else if (this.diabetes[index] == 5) {
            // this.diabetesRadio=this.diabetes[index];
            this.$set(this, "diabetesRadio", this.diabetes[index]);
          }
        }
      }
    },
    // 静息
    daynight() {
      if (this.form.chestPainIncentive != null) {
        for (
          let index = 0;
          index < this.form.chestPainIncentive.length;
          index++
        ) {
          if (
            this.form.chestPainIncentive[index] == 7 ||
            this.form.chestPainIncentive[index] == 8
          ) {
            this.$set(this, "dayAnight", this.form.chestPainIncentive[index]);
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.form >>> h4 {
  font-size: 16px;
}
.inputNborder >>> label {
  color: #606266;
}
.form >>> .el-input-group__prepend {
  background-color: transparent !important;
  border: none !important;
  color: black
}
.form >>> .el-input__inner {
  border: none !important;
  border-radius: 0px !important;
  border-bottom: 1px solid #ddd !important;
   color: black
}
.form >>> .el-input-group__append {
  background-color: transparent !important;
  border: none !important;
   color: black
}
</style>
