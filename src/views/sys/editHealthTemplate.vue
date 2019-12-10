<template>
  <div>
    <div class="fitTable base padd" id="div_print">
      <div class="fitPlan">
        <div class="Center">健康管理计划</div>
        <div class="title">
          <div class="titleLeft">
            <div>
              指导医师：
              <span>{{form.doctorName}}</span>
            </div>
            <div>
              健康助理：
              <span>{{form.healthAssistant}}</span>
            </div>
          </div>
          <div class="titleRight">
            <div>
              手机号码：
              <span>{{form.phone}}</span>
            </div>
            <div>
              日期：
              <span>{{form.createTime | time}}</span>
            </div>
          </div>
        </div>
        <div class="subTitle">
          <div class="basetile">
            <div>
              姓名：
              <span>{{form.userName}}</span>
            </div>
            <div>
              性别：
              <span>{{form.sex | conplateSex}}</span>
            </div>
            <div>
              年龄：
              <span>{{form.age}}</span>
            </div>
            <div>
              身份证号：
              <span>{{form.cardId}}</span>
            </div>
            <div>
              慢病档案号：
              <span>{{form.archivesCode}}</span>
            </div>
          </div>
          <div class="believe">{{form.baseCount}}</div>
        </div>
        <div style="padding: 10px 0">
          <el-button type="warning" size="mini" @click="useTemplate">使用模板</el-button>
        </div>
        <div class="state">
          <div class="case">
            <div>
              <span>*</span>病情概述
            </div>
            <div class="formDiv">{{form.conditionDesc}}</div>
          </div>

          <div class="case">
            <div>个性化饮食指导</div>
            <div class="formDiv">{{form.diet}}</div>
          </div>

          <div class="case">
            <div>个性化运动指导处方</div>
            <div class="formDiv">{{form.motion}}</div>
          </div>

          <div class="case">
            <div>心理与情绪指导处方</div>
            <div class="formDiv">{{form.psychological}}</div>
          </div>

          <div class="case">
            <div>日常自我护理</div>
            <div class="formDiv">{{form.nursing}}</div>
          </div>

          <div class="case">
            <div>跟踪随访建议</div>
            <div class="formDiv">{{form.suggest}}</div>
          </div>
        </div>
      </div>
      <el-dialog
        :close-on-click-modal="false"
        title="选择模板"
        :visible.sync="editorDialog"
        style="height: 90vh"
        class="template"
      >
        <div>
          <!-- 搜索按钮 -->
          <div >
            <el-input
              placeholder="模板名称"
              v-model="drugName"
              style="width: 200px;padding-bottom:15px"
              class="filter-item"
              size="mini"
            />
            <el-button
              class="filter-item"
              @click="getListData()"
              type="primary"
              icon="el-icon-search"
              size="mini"
            >查询</el-button>
          </div>

          <el-table
            row-key="id"
            :data="tableData"
            border
            fit
            highlight-current-row
            style="width: 100%;"
            size="mini"
          >
            <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
            <el-table-column label="模板名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.code}}</span>
              </template>
            </el-table-column>
            <el-table-column label="模板说明" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="所属病种" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="220px" align="center">
              <template slot-scope="scope">
                <div class="icon-sizeWidth">
                  <el-button size="mini" @click="healthManagement(scope.row)" type="danger">启用</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 页码 -->
          <pagination
            class="page"
            :total="total"
            :page.sync="pageQuery.page"
            :limit.sync="pageQuery.limit"
          />
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editorDialog: false,
      hide: true,
      total: 0,
      tableData: [],
      pageQuery: {
        page: 1,
        limit: 10
      },
      drugName: "",
      form: {
        code: "",
        archivesCode: "",
        doctorName: "",
        doctorCode: "",
        dataStatus: "",
        healthAssistant: "",
        phone: "",
        userName: "",
        sex: "",
        age: "",
        cardId: "",
        baseCount: "",
        conditionDesc: "",
        diet: "",
        motion: "",
        psychological: "",
        nursing: "",
        suggest: ""
      }
    };
  },
  mounted() {
    let _this = this;
    // 接受慢病处方列表的json
    // _this.form = JSON.parse(sessionStorage.getItem("YRow"));
  },
  methods: {
    useTemplate() {
      this.editorDialog = true;
    }
  }
};
</script>

<style scoped>
.formDiv {
  height: 300px;
  border: 1px solid #ddd;
  padding: 5px 5px;
}
.fitTable {
  font-size: 14px;
  margin-top: 12px;
}
.title {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  width: 98%;
  margin: 0 auto;
}
.titleLeft > div {
  padding-bottom: 12px;
}
.titleRight > div {
  padding-bottom: 12px;
}
.Center {
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  padding: 15px;
}
.subTitle {
  padding-top: 12px;
}
.subTitle > .basetile {
  display: flex;
  justify-content: space-around;
}
.subTitle > .believe {
  text-align: center;
  padding: 15px;
  max-width: 1000px;
  margin: 0 auto;
  line-height: 1.5;
}
.case > div:first-child {
  border: 1px solid #ddd;
  font-size: 18px;
  color: #373737;
  text-align: center;
  padding: 5px 15px;
  background-color: #e4f8f5;
}

.case >>> .el-textarea__inner {
  min-height: 220px !important;
  outline: none !important;
}
.template >>> .el-dialog__body {
      padding: 10px 20px;
}
</style>
