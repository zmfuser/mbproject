<template>
  <div class="app-container">
    <div class="dataInput">
      <span>
        资料上传人：
        <el-input></el-input>
      </span>
      <span>
        档案编号：
        <el-input></el-input>
      </span>
      <span>
        处理状态：
        <el-select v-model="form.value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </span>
    </div>
    <template>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        fit
        highlight-current-row
        :header-cell-style="header"
      >
        <el-table-column type="index" align="center" label="序号" width="80"></el-table-column>
        <el-table-column align="center" prop="name" label="编号" width="100"></el-table-column>
        <el-table-column align="center" prop="address" label="资料上传人"></el-table-column>
        <el-table-column align="center" prop="name" label="档案编号"></el-table-column>
        <el-table-column align="center" prop="address" label="资料说明"></el-table-column>
        <el-table-column align="center" prop="address" label="检查医院"></el-table-column>
        <el-table-column align="center" prop="address" label="检查时间"></el-table-column>
        <el-table-column align="center" prop="address" label="处理状态"></el-table-column>
        <el-table-column align="center" prop="address" label="处理医生"></el-table-column>
        <el-table-column align="center" prop="address" label="操作" width="180">
          <template slot-scope="scope">
            <div class="icon-sizeWidth">
              <el-button size="mini" @click="looklist(scope.row)" type="success">查阅资料</el-button>
              <el-button size="mini" @click="deletetwo(scope.row)" type="danger">联系患者</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :close-on-click-modal="false" title="患者资料" :visible.sync="dialogonedepVisible" style="height: 90vh">
        <div>
          <div class="patient_data">
            <div>
              <div>
                <b>姓名：</b>
                {{total}}
              </div>
              <div>
                <b>年龄：</b>
                {{total}}
              </div>
              <div>
                <b>资料说明：</b>
                {{total}}
              </div>
            </div>
            <div>
              <div>
                <b>性别：</b>
                {{total}}
              </div>
              <div>
                <b>检查时间：</b>
                {{total}}
              </div>
              <div>
                <b>检查医院：</b>
                {{total}}
              </div>
            </div>
          </div>
          <div >
            <div><b>资料详情：</b> </div>
            <div class="patient_img">
              <img src="../../../static/img/user/app_img.jpg" alt>
            <img src="../../../static/img/user/app_img.jpg" alt>
            <img src="../../../static/img/user/app_img.jpg" alt>
            <img src="../../../static/img/user/app_img.jpg" alt>
            <img src="../../../static/img/user/app_img.jpg" alt>
            <img src="../../../static/img/user/app_img.jpg" alt>
            </div>
            <div class="contact_patients">
                <el-button>联系患者</el-button>
            </div>
          
          </div>
        </div>
      </el-dialog>
      <div class="block">
        <pagination
          class="page"
          :total="total"
          :page.sync="pageQuery.page"
          :limit.sync="pageQuery.limit"
        />
        <!-- <el-pagination layout="prev, pager, next" :total="1000"></el-pagination> -->
      </div>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        value: ""
      },
      total: 1000,
      pageQuery: {
        page: 1,
        limit: 10
      },
      dialogonedepVisible: false,
      header: {
        background: "rgba(228,248,245,1)"
      },
      options: [
        {
          value: "1",
          label: "已读"
        },
        {
          value: "3",
          label: "医生未读"
        }
      ],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    // 查阅资料
    looklist() {
      this.dialogonedepVisible = true;
    },
    deletetwo() {}
  }
};
</script>
<style scoped>
.dataInput {
  margin-bottom: 30px;
}
.dataInput >>> .el-input {
  width: 200px;
  margin-right: 20px;
}
.patient_data {
  display: flex;
  justify-content: space-around;
}
.patient_data div {
  margin-bottom: 10px;
  font-size: 16px;
}
.patient_img {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  
}
.patient_img img{
  border-radius: 5px;
  padding-top: 5px;
}
.contact_patients{
  text-align: right;
  margin: 20px;
}
</style>

