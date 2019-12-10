<template>
  <div class="suifang app-container">
    <!-- 搜索按钮 -->
    <div>
      <el-input
        placeholder="疾病分类/疾病科室/疾病名称"
        v-model="departmentName"
        style="width: 215px;padding-bottom:15px"
        class="filter-item"
      />
      <el-button class="filter-item" @click="getListData()" type="primary" icon="el-icon-search">查询</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      row-key="id"
      :data="tableData"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="getRowClass"
    >
      <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
      <el-table-column label="编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="疾病分类" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="疾病科室" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="疾病名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="210px" align="center">
        <template slot-scope="scope">
          <div class="icon-sizeWidth">
            <el-button size="mini" @click="addtwodeparm(scope.row)" type="success">查看说明</el-button>
            <el-button size="mini" @click="deletetwo(scope.row)" type="danger">删除</el-button>
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
      @pagination="getListData"
    />

    <!-- 查看说明 -->
    <el-dialog :close-on-click-modal="false" title="疾病说明" :visible.sync="dialogtwodepVisible">
      <div class="paddingTop">
        <!-- <el-input type="textarea" class="paddingTop"  placeholder="请输入科室描述" :rows="5" v-model="subForm.departementDesc"></el-input> -->
      </div>
    </el-dialog>
    <!-- 删除 -->
    <!-- <el-dialog title="提示" :visible.sync="dialogonedepVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogonedepVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogonedepVisible = false">确 定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
import axios from "axios";
import {
  selectDepartment,
  adddepartment,
  deleteAll
} from "@/api/sys/department.js";
export default {
  // inject: ["reload"],
  data() {
    return {
      dialogonedepVisible: false,
      dialogtwodepVisible: false,
      listLoading: false,
      querys: {
        leave1Code: "",
        leave2Code: "",
        doctorName: "",
        phone: ""
      },
      total: 0,
      pageQuery: {
        page: 1,
        limit: 10
      },
      employee: {
        doctorName: "",
        phone: "",
        sex: "",
        departmentLevel1Name: "",
        departmentLevel2Name: "",
        originalImgUrl: "",
        position: "",
        positionName: ""
      },
      doctorList: [],
      departmentName: "",
      form: {
        parentCode: "0",
        departementDesc: "",
        departmentName: ""
      },
      parentName: "",
      subForm: {
        parentCode: "0",
        departementDesc: "",
        departmentName: ""
      },
      row: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 查看说明书
    addtwodeparm() {
      this.dialogtwodepVisible = true;
    },
    // 删除疾病
    deletetwo(row) {

    },
    // 查询疾病分类/疾病科室/疾病名称
    getListData() {
      
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
.paddingTop {
  padding-top: 15px;
}
.btn {
  padding-top: 30px;
  text-align: center;
}
</style>

