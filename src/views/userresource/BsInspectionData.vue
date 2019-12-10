<template>
  <div class="app-container">
    <div class="div-flex">
      <div class="marginTop">
        <label for>资料上传人：</label>
        <el-input
          placeholder="请输入资料上传人"
          v-model="dataUploadMan"
          style="width: 200px;"
          class="filter-item"
        />
      </div>
      <div class="marginTop">
        <label for>档案编号：</label>
        <el-input style="width: 200px;" v-model="achivecode" placeholder="请输入档案编号"></el-input>
      </div>
      <div class="marginTop">
        <label for>处理状态：</label>
        <el-select v-model="choice" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>

    <div class="button-seach-regi" style="margin:10px 0;">
      <el-button
        plain
        icon="el-icon-search"
        class="search"
        @click="getListData({page:1,limit:10})"
      >搜索</el-button>
      <el-button class="reset" @click="resetBtn({page:1,limit:10})">
        <img src="../../../static/png/manbin_icon_chongzhi.png" />重置
      </el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="getRowClass"
    >
      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="编号" align="center" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="患者档案号" align="center" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.archiveNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="患者姓名" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="性别" align="center" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.userSex |conplateSex}}</span>
        </template>
      </el-table-column>

      <el-table-column label="年龄" align="center" width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="资料说明" align="center" width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.dataDesc }}</span>
        </template>
      </el-table-column>

      <el-table-column label="检查医院" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.inspectionHospital }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检查日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.inspectionDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上传日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime |time}}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理状态" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.dataStatus |dataStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="处理医生" align="center" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.doctorName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
        <template slot-scope="scope">
          <el-button
            v-if="hasPermission('resident:query')"
            type="primary"
            size="mini"
            @click="check(scope)"
          >查阅资料</el-button>
          <el-button
            v-if="hasPermission('resident:relation')"
            v-show="scope.row.dataStatus==0&&scope.row.doctorCode==this.nowUser"
            size="mini"
            type="danger"
            :loading="scope.row.loading"
            @click="ContactPatients(scope.$index, scope.row)"
          >联系患者</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :close-on-click-modal="false"
      title="患者资料"
      :visible.sync="dialogonedepVisible"
      @close="getListData"
      style="height: 90vh"
    >
      <div>
        <div class="patient_data">
          <div>
            <div>
              <b>姓名：</b>
              {{obj.userName}}
            </div>
            <div>
              <b>年龄：</b>
              {{obj.age}}
            </div>
            <div>
              <b>资料说明：</b>
              {{obj.dataDesc}}
            </div>
          </div>
          <div>
            <div>
              <b>性别：</b>
              {{obj.userSex |conplateSex}}
            </div>
            <div>
              <b>检查时间：</b>
              {{obj.inspectionDate}}
            </div>
            <div>
              <b>检查医院：</b>
              {{obj.inspectionHospital}}
            </div>
          </div>
        </div>
        <div>
          <div style="margin-bottom:15px">
            <b>资料详情：</b>
          </div>
          <div class="patient_img">
            <div v-for="(item,i) in obj.images" :key="i">
              <img :src="item.imagesUrl" alt />
            </div>
          </div>
          <div class="contact_patients">
            <el-button>联系患者</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
    <pagination
      v-show="pageQuery.total>0"
      :total="pageQuery.total"
      :page.sync="pageQuery.page"
      :limit.sync="pageQuery.limit"
      @pagination="getListData"
    />
  </div>
</template>

<script>
import {
  getList,
  getImagesByCode,
  doctorRead
} from "@/api/userresource/BsInspectionData";

export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "已读"
        },
        {
          value: "1",
          label: "医生未读"
        }
      ],
      achivecode: "",
      total: "",
      dataUploadMan: "",
      choice: "",
      nowUser: "",
      list: [],
      listLoading: false,
      dialogonedepVisible: false,
      btnLoading: false,
      obj: {
        id: "",
        code: "",
        userCode: "",
        userName: "",
        age: "",
        dataDesc: "",
        inspectionDate: "",
        createTime: "",
        createBy: "",
        createIp: "",
        modifyBy: "",
        modifyTime: "",
        modifyIp: "",
        dataStatus: "",
        readDoctorCode: "",
        isDeleted: "",
        inspectionHospital: "",
        userSex: "",
        doctorName: "",
        archiveNo: ""
      },
      pageQuery: {
        total: 0,
        page: 1,
        limit: 10
      }
    };
  },
  mounted() {
    this.nowUser = sessionStorage.getItem("ucode");
    this.getListData(this.pageQuery);
  },
  methods: {
    // 联系患者
    ContactPatients(index, row) {
      if (index == true) {
        this.dialogonedepVisible = false;
      }
      let _this = this;
      _this.$bus.emit("sendTip", row);
    },
    // 查看资料
    check(scoped) {
      this.dialogonedepVisible = true;
      if (scoped.row.code) {
        getImagesByCode(scoped.row.code).then(res => {
          if (res.code == 0) {
            this.obj = res.value;
            doctorRead(scoped.row.code).then(res => {
              console.log(res);
            });
          }
        });
      }
    },
    // 重置
    resetBtn(param) {
      (this.achivecode = ""),
        (this.choice = ""),
        (this.achivecode = ""),
        getList(param).then(res => {
          this.listLoading = false;
          if (res.code == 0) {
            this.list = res.value.records;
            this.pageQuery.total = res.value.total;
            this.pageQuery.page = res.value.current;
            this.pageQuery.limit = res.value.size;
          }
        });
    },
    // 获取列表数据
    getListData(pageParam) {
      pageParam.userName = this.dataUploadMan;
      pageParam.dataStatus = this.choice;
      pageParam.archivesNo = this.achivecode;
      this.listLoading = true;
      getList(pageParam).then(res => {
        this.listLoading = false;
        if (res.code == 0) {
          this.list = res.value.records;
          this.pageQuery.total = res.value.total;
          this.pageQuery.page = res.value.current;
          this.pageQuery.limit = res.value.size;
        }
      });
    },
    // 更改表头颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:rgba(228,248,245,1)";
      } else {
        return "";
      }
    }
  }
};
</script>

<style scoped>
.dataInput {
  /* margin-bottom: 30px; */
}
.dataInput > span {
  display: flex;
  justify-content: space-around;
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
.contact_patients {
  text-align: right;
  margin: 20px;
}
.patient_img {
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
}
.patient_img div {
  /* border: 1px solid red ; */
  line-height: 100%;
  /* vertical-align: middle; */
  text-align: center;
  width: 33.3%;
  margin-bottom: 5px;
}
.patient_img > div > img {
  width: 50%;
  height: 100px;
}
</style>

