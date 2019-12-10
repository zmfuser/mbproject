<template>
  <div class="base">
    <div class="center1">
      <h3>糖尿病检查结果</h3>
    </div>
    <el-form class="padd form">
      <el-row>
        <el-form-item >
          <el-col :md="4" :sm="12" :xs="24">
            <div>1、糖尿病并发症情况：</div>
          </el-col>
          <el-col :md="20" :sm="12" :xs="24" class="complications">
            <el-input v-model="form.complications" ></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-col :md="24" :sm="24" :xs="24">
          <div>2、相关检查结果：</div>
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
                  <div>非空腹</div>
                </td>
                <td>
                  <div>(4.4-7.0)</div>
                  <div>(＜10.0)</div>
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
                <td>＜7.0</td>
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
                <td>体重指数</td>
                <td>
                  <div>
                    <el-input placeholder="请输入内容" v-model="form.bodyMassIndex">
                      <template slot="append">kg/m²</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td>＜24.0</td>
              </tr>
              <tr>
                <td>HDL-C</td>
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
                <td>TG</td>
                <td>
                  <div>
                    <el-input placeholder="请输入内容" v-model="form.tg">
                      <template slot="append">mmol/l</template>
                    </el-input>
                  </div>
                </td>
                <td>
                  <div>未合并冠心病</div>
                  <div>合并冠心病</div>
                </td>
                <td>
                  <div>＜2.6</div>
                  <div>＜1.8</div>
                </td>
              </tr>
              <tr>
                <td>尿白蛋白/肌酐</td>
                <td>
                  <div>
                    <el-input placeholder="请输入内容" v-model="form.urinaryAlbumin">
                      <template slot="append">mg/mmol</template>
                    </el-input>
                  </div>
                </td>
                <td>
                  <div>男</div>
                  <div>女</div>
                </td>
                <td>
                  <div>＜2.5</div>
                  <div>＜3.5</div>
                </td>
              </tr>
              <tr>
                <td>尿白蛋白排泄率</td>
                <td>
                  <div>
                    <el-input placeholder="请输入内容" v-model="form.uaer">
                      <template slot="append">ug/min</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td>＜20或30mg/d</td>
              </tr>
              <tr>
                <td>主要有氧活动</td>
                <td>
                  <div>
                    <el-input placeholder="请输入内容" v-model="form.maerobic">
                      <template slot="append">分钟/周</template>
                    </el-input>
                  </div>
                </td>
                <td></td>
                <td>≥150</td>
              </tr>
            </tbody>
          </table>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="8、服药情况(近一年)：">
          <el-col :md="24" :sm="24" :xs="24">
            <div>
              <template>
                <el-table border :data="form.bsArchivesDoses" style="width: 100%"
                  :header-cell-style="{background:tableHead}">
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
                    <el-select v-model="scope.row.medicationCompliance" placeholder="请选择" >
                      <el-option v-for="item in options"  :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                  </template>
                  </el-table-column>
                  <el-table-column fixed="right" label="操作" align="center">
                    <template slot-scope="scope">
                      <img src="../../../../static/png/add.png" alt="" @click="addrow(form.bsArchivesDoses,{ historyType: 0, dataType: 2 })">
                      <img src="../../../../static/png/del.png" alt=""
                        @click.prevent="delrow(scope.$index, form.bsArchivesDoses)">
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
          </el-col>
        </el-form-item>
      </el-row>

    </el-form>


  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableHead: 'rgba(228,248,245,1)',
        form: {
          complications: "",
          plasmaGlucose: "",
          hba1c: "",
          bloodPressure: "",
          bodyMassIndex: "",
          hdlC: "",
          tg: "",
          urinaryAlbumin: "",
          uaer: "",
          maerobic: "",
          bsArchivesDoses: [{}],
        },
        options:[{value:"1",label:"规律"},{value:"2",label:"间断"},{value:"3",label:"不服药"}],
      };
    },
    methods: {
      //表格-添加行
       addrow(table, type) {
      let _this = this;
      _this.usual.addRow(table, type);
    },
      // 删除行
      delrow(index, rows) {
        let _this = this;
        _this.$confirm('此操作将永久删除该行记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.$message({
            type: 'success',
            message: '删除成功!'
          });
          _this.usual.delRow(index, rows)
        }).catch(() => {
          _this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
    }
  };
</script>
<style scoped>
  .complications>>> .el-input__inner{
  border:none;
  border-bottom: 1px solid #ddd !important;
  border-radius: 0px;
}
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
