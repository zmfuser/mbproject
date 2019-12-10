<template>
  <div>
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
                    <el-input placeholder="请输入内容" v-model="form.plasmaGlucose">
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
                    <el-input placeholder="请输入内容" v-model="form.hba1c">
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
                    <el-input placeholder="请输入内容" v-model="form.bloodPressure">
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
                   <el-input placeholder="请输入内容" type="number" v-model="form.waist" min="0" @keyup.native="proving($event)">
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
                    <el-input placeholder="请输入内容" v-model="form.bodyMassIndex">
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
                    <el-input placeholder="请输入内容" v-model="form.hdlC">
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
                    <el-input placeholder="请输入内容" v-model="form.tg">
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
                    <el-input placeholder="请输入内容" v-model="form.ldlC">
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
                    <el-input placeholder="请输入内容" v-model="form.liverFunction">
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
                    <el-input placeholder="请输入内容" v-model="form.myocardialEnzyme">
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
                    <el-input placeholder="请输入内容" v-model="form.electrocardiogram">
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
                    <el-input placeholder="请输入内容" v-model="form.rabat">
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
                    <el-input placeholder="请输入内容" v-model="form.echocardiography">
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
                    <el-input placeholder="请输入内容" v-model="form.coronaryCta">
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
                    <el-input placeholder="请输入内容" v-model="form.cag">
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
                    <el-input placeholder="请输入内容" v-model="form.mAerobic">
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
            <el-input placeholder="请输入内容" v-model="form.chestPainResults">
              <template slot="append">①②③④⑤⑥⑦</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12" :sm="12" :xs="24">
          <el-form-item label="急性冠脉综合征患者短期内死亡或非致死性心肌梗死的风险：">
            <el-input placeholder="请输入内容" v-model="form.chestPainRisk"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      
      <el-row>
         <el-col :md="24" :sm="24" :xs="24">
          <el-form-item label="7、服药情况">
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
                      <el-input v-model="scope.row.drugSideEffects"   ></el-input>
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
                       @click="addrow(form.bsArchivesDoses,{ historyType: 0, dataType:3 })"
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
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableHead: "rgba(228,248,245,1)",
      form: {
        plasmaGlucose: "",
        hba1c: "",
        bloodPressure: "",
        bodyMassIndex: "",
        waist: "",
        hdlC: "",
        tg: "",
        ldlC: "",
        mAerobic: "",
        chestPainResults: "",
        chestPainRisk: "",
        liverFunction: "",
        myocardialEnzyme: "",
        electrocardiogram: "",
        rabat: "",
        echocardiography: "",
        coronaryCta: "",
        cag: "",
        bsArchivesDoses: [{dataType:3,historyType:0}],
      },
      options: [
        { value: "1", label: "规律" },
        { value: "2", label: "间断" },
        { value: "3", label: "不服药" }
      ]
    };
  },
  methods: {
   
    //服药情况
    deleteRow1(index, rows) {
      //删除改行
      rows.splice(index, 1);
    },
  //增加行
    addrow(table, type) {
      let _this = this;
      _this.usual.addRow(table, type);
    },
  }
};
</script>


<style scoped>
.form>>> .el-input-group__prepend{
        background-color: transparent !important;
        border: none !important;
    }
.form>>>.el-input__inner{
  border:none !important;
  border-radius: 0px !important;
  border-bottom:1px solid #ddd !important;
}
.form>>>.el-input-group__append{
     background-color: transparent !important;
    border: none !important;
}
td{
  width:400px;
  height:90px
}
</style>


