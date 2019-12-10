<template>
  <div>
    <el-form>
      <div class="center">
        <h3>糖尿病年度评估表</h3>
      </div>
      <el-row>
        <el-form-item>
          <el-col :md="6" :sm="12" :xs="24">
            <div class="MarT">时间</div>
          </el-col>
          <el-col :md="18" :sm="12" :xs="24">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-col :md="6" :sm="12" :xs="24">
            <div class="MarT">血糖水平控制情况</div>
          </el-col>
          <el-col :md="18" :sm="12" :xs="24">
            <el-input type="textarea" size="mini" v-model="form.desc"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-col :md="6" :sm="12" :xs="24">
            <div>并发症情况</div>
          </el-col>
          <el-col :md="18" :sm="12" :xs="24">
            <el-row>
              <el-col :md="18" :sm="12" :xs="24">
                <el-row>
                  <el-radio-group v-model="form.resource">
                    <el-radio label="无变化"></el-radio>
                    <el-radio label="有变化"></el-radio>
                  </el-radio-group>
                </el-row>
              </el-col>
              <el-row :gutter="20">
                <el-form-item>
                  <el-col :md="8" :sm="12" :xs="24">
                    <div>吸烟：</div>
                    <el-input v-model="form.desc"></el-input>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <div>饮酒：</div>
                    <el-input v-model="form.desc"></el-input>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <div>BMI：</div>
                    <el-input v-model="form.desc"></el-input>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <div>腹围：</div>
                    <el-input v-model="form.desc"></el-input>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <div>运动：</div>
                    <el-input v-model="form.desc"></el-input>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <div>睡眠：</div>
                    <el-input v-model="form.desc"></el-input>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <div>心理：</div>
                    <el-input v-model="form.desc"></el-input>
                  </el-col>
                </el-form-item>
              </el-row>
            </el-row>
          </el-col>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item>
          <el-col :md="6" :sm="12" :xs="24">
            <div class="MarT">年度内伴随临床疾病</div>
          </el-col>
          <el-col :md="18" :sm="12" :xs="24">
            <el-input type="textarea" size="mini" v-model="form.desc"></el-input>
          </el-col>
        </el-form-item>
      </el-row>
      
      <el-row>
        <el-form-item>
          <el-col :md="6" :sm="12" :xs="24">
            <div>并发症情况</div>
          </el-col>
          <el-col :md="18" :sm="12" :xs="24">
            <el-row>
              <el-col :md="18" :sm="12" :xs="24">
                <el-row>
                  <el-radio-group v-model="form.resource">
                    <el-radio label="无变化"></el-radio>
                    <el-radio label="有变化"></el-radio>
                  </el-radio-group>
                </el-row>
              </el-col>
              <el-row :gutter="20">
                <el-form-item>
                  <el-col :md="8" :sm="12" :xs="24">
                    <div>血脂：</div>
                    <el-input v-model="form.desc"></el-input>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <div>血糖：</div>
                    <el-input v-model="form.desc"></el-input>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <div>糖化血红蛋白：</div>
                    <el-input v-model="form.desc"></el-input>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <div>肝功能：</div>
                    <el-input v-model="form.desc"></el-input>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <div>肾功能：</div>
                    <el-input v-model="form.desc"></el-input>
                  </el-col>
                  <el-col :md="8" :sm="12" :xs="24">
                    <div>其他：</div>
                    <el-input v-model="form.desc"></el-input>
                  </el-col>
                </el-form-item>
              </el-row>
            </el-row>
          </el-col>
        </el-form-item>
      </el-row>

      <el-row>
        <el-form-item>
          <el-col :md="6" :sm="12" :xs="24">
            <div>患者自我评价：</div>
          </el-col>
          <el-col :md="8" :sm="12" :xs="24">
            <el-radio-group v-model="form.resource">
              <el-radio label="良好"></el-radio>
              <el-radio label="一般"></el-radio>
              <el-radio label="差"></el-radio>
            </el-radio-group>
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
      form: {
        desc: "",
        input3: ""
      }
    };
  }
};
</script>

<style>
.MarT {
  margin-top: 10px;
}
</style>
