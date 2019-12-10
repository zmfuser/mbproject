<template>
  <div class="suifang app-container">
    <!-- 搜索按钮 -->
    <div>
      <el-input
        placeholder="请输入科室名称"
        v-model="departmentName"
        style="width: 200px;padding-bottom:15px"
        class="filter-item"
      />
      <el-button
        class="filter-item"
        @click="getListData({page:1,limit:10},1)"
        type="primary"
        icon="el-icon-search"
      >查询</el-button>
    </div>
    <div>
      <el-button
        class="buildFile createBase"
        type="primary"
        @click="addonedePm"
         v-if="hasPermission('department:addlevel1')"
        icon="el-icon-circle-plus-outline"
      >添加一级科室</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      row-key="id"
      :data="doctorList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="getRowClass"
    >
      <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
      <el-table-column label="科室编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="科室名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.departmentName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="科室级别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parentCode | changedepam}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="210px" align="center">
        <template slot-scope="scope">
          <div class="icon-sizeWidth">
            <el-button  size="mini" @click="addtwodeparm(scope.row)"  v-if="hasPermission('department:addlevel2')" type="success" v-show="scope.row.parentCode==0">添加二级科室</el-button>
             <el-button  size="mini" @click="deleteone(scope.row)" v-if="hasPermission('department:del')" type="danger" v-show="scope.row.parentCode==0">删除</el-button>
            <el-button  size="mini" @click="deletetwo(scope.row)" v-if="hasPermission('department:del')" type="danger" v-show="scope.row.parentCode!=0">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <pagination
      class="page"
      v-show="total>0"
      :total="total"
      :page.sync="pageQuery.page"
      :limit.sync="pageQuery.limit"
      @pagination="getListData"
    />
    <!-- 添加一级科室 -->
    <el-dialog :close-on-click-modal="false" title="添加一级科室" :visible.sync="dialogonedepVisible">
      <div>
        <label for>上级科室：</label>
        <el-input style="width:200px;" :disabled="true" v-model="form.parentCode"></el-input>
      </div>
      <div class="paddingTop">
        <label for>科室名称：</label>
        <el-input style="width:200px;" placeholder="请输入科室名称" v-model="form.departmentName"></el-input>
      </div>
      <div class="paddingTop">
        <label for>科室描述：</label>
        <el-input type="textarea" class="paddingTop" placeholder="请输入科室描述" :rows="5" v-model="form.departementDesc"></el-input>
      </div>
      <div class="btn">
        <div>
          <el-button class="filter-item" @click="addkeshi" type="primary">确认</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 添加二级科室 -->
     <el-dialog :close-on-click-modal="false" title="添加二级科室" :visible.sync="dialogtwodepVisible">
      <div>
        <label for>上级科室：</label>
        <el-input style="width:200px;"  v-model="parentName"></el-input>
      </div>
      <div class="paddingTop">
        <label for>科室名称：</label>
        <el-input style="width:200px;" placeholder="请输入科室名称" v-model="subForm.departmentName"></el-input>
      </div>
      <div class="paddingTop">
        <label for>科室描述：</label>
        <el-input type="textarea" class="paddingTop"  placeholder="请输入科室描述" :rows="5" v-model="subForm.departementDesc"></el-input>
      </div>
      <div class="btn">
        <div>
          <el-button class="filter-item" @click="addtwodeparment" type="primary">确认</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { selectDepartment, adddepartment,deleteAll } from "@/api/sys/department.js";
export default {
  inject: ["reload"],
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
        departmentName: "",
      },
      parentName:"",
      subForm:{
         parentCode: "0",
        departementDesc: "",
        departmentName: "",
      },
      row:{},
    };
  },
  created() {},
  mounted() {
    this.getListData(this.pageQuery, 0);
  },
  methods: {
    closeDialog(done) {
      done();
      this.reload();
    },
    // 删除一级科室
    deleteone(row){
      let code=row.code
      deleteAll(code).then(res=>{
        if(res.code==0){
          this.$message.success(res.msg)
          this.getListData(this.pageQuery, 0);
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    // 删除二级科室
    deletetwo(row){
      let code=row.code
      deleteAll(code).then(res=>{
        if(res.code==0){
          this.$message.success(res.msg)
          this.getListData(this.pageQuery, 0);
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    // 添加二级科室
    addtwodeparment(){
      adddepartment(this.subForm).then(res=>{
        if(res.code==0){
          this.dialogtwodepVisible=false
          this.getListData(this.pageQuery, 0);
          this.$message.success(res.mes)
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    // 添加一级科室
    addkeshi() {
      adddepartment(this.form).then(res => {
        if(res.code==0){
          this.dialogonedepVisible=false
          this.getListData(this.pageQuery, 0);
          this.$message.success(res.mes)
        }else{
          this.$message.error(res.msg)
        }
      });
    },

    // 查询科室接口
    getListData(pageName, type) {
      if (type == 0) {
        pageName.parentCode = 0;
      } else {
        if (this.departmentName != "") {
          pageName.departmentName = this.departmentName;
        }else{
           pageName.parentCode = 0;
        }
      }
      let _this = this;
      selectDepartment(pageName).then(res => {
        _this.listLoading = true;
        if (res.code == 0) {
          _this.listLoading = false;
          let value = res.value;
          var Level1Depament = value.records;
          var listTable = [];
          value.records.forEach(element => {
            var pageName2 = {
              parentCode: element.code
            };
            selectDepartment(pageName2).then(res2 => {
              element.children = res2.value;
              listTable.push(element);
            });
          });
          _this.$set(_this, "doctorList", listTable);
          _this.total = value.total;
          _this.pageQuery.page = value.current;
          _this.pageQuery.limit = value.size;
        }
      });
    },
    // 一级科室弹窗
    addonedePm() {
      this.dialogonedepVisible = true;
    },
    // 二级科室弹窗
    addtwodeparm(row){
      this.row=row
      this.parentName=row.departmentName
      this.subForm.parentCode=row.code
      this.dialogtwodepVisible = true;
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

