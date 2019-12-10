<template>
  <div class="suifang app-container">
    <!-- 搜索按钮 -->
    <div>
      <el-input
        placeholder="模板名称"
        v-model="drugName"
        style="width: 200px;padding-bottom:15px"
        class="filter-item"
      />
      <el-button class="filter-item" @click="getListData()" type="primary" icon="el-icon-search">查询</el-button>
      <el-button
        class="buildFile createBase"
        type="primary"
        @click="addhospital"
        v-if="hasPermission('department:addlevel1')"
        icon="el-icon-circle-plus-outline"
      >添加模板</el-button>
      <el-button class="filter-item" @click="downloadTempelate()" type="primary" >下载模板
      </el-button>
      <el-button class="filter-item" @click="addTempelate()" type="primary">导入模板</el-button>
    </div>
    <div></div>
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
      <el-table-column label="模板名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.templateName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板说明" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.templateDescription }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属病种" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.diseaseType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dataStatus |healthStates }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" width="220">
        <template slot-scope="scope">
          <div class="icon-sizeWidth">
            <el-button
              v-if="scope.row.dataStatus==0"
              size="mini"
              @click="addtwodeparm(scope.row)"
              type="success"
            >查看详情</el-button>
            <el-button
              v-if="scope.row.dataStatus==2"
              size="mini"
              @click="edit(scope.row)"
              type="success"
            >编辑模板</el-button>
            <el-button
              v-if="scope.row.dataStatus==0"
              size="mini"
              @click="healthManagement(scope.row,1)"
              type="danger"
            >禁用</el-button>
            <el-button
              v-if="scope.row.dataStatus==1"
              size="mini"
              @click="healthManagement(scope.row,0)"
              type="danger"
            >启用</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :close-on-click-modal="false"
      title="导入模板"
      :visible.sync="dialogonedepVisible"
      @close="getListData"
      style="height:90vh"
    >
      <el-upload
        class="upload-demo"
        ref="upload"
        action=""
        :limit=1
        :on-change="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false"
        accept=".xlsx"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <div slot="tip" class="el-upload__tip">请上传下载的模板</div>
      </el-upload>
      <div class="page" style="margin-top:50px;">
        <el-button type="success" @click="uploadFile">确定</el-button>
        <el-button type="warning" @click="dialogonedepVisible=false">取消</el-button>
     
      </div>
      </el-dialog>
    <!-- 页码 -->
    <pagination
      class="page"
      :total="total"
      :page.sync="pageQuery.page"
      :limit.sync="pageQuery.limit"
    />
  </div>
</template>

<script>
import axios from "axios";
import {
  savefitPlan,
  queryTemplateList,
  
  queryTemplateInfo
} from "@/api/sys/base.js";
import { healthTemplateUpload,saveOrUpdate } from "@/api/healthplan/healthplan";
export default {
  data() {
    return {
      dialogtransfer: false,
      editorDialog: false,
      dialogVisibleOne: false,
      dialogVisible: false,
      listLoading: false,
      dialogonedepVisible: false,
      fileList: [],

      hospitaltClass: "",

      total: 0,
      pageQuery: {
        page: 1,
        limit: 10
      },
      labelPosition: "left",
      drugName: "",
      changeDrugName: "",
      departmentName: "",
      form: {
        parentCode: "0",
        departementDesc: "",
        departmentName: ""
      },

      row: {},
      tableData: [],
      file_obj:{}
    };
  },
  created() {},
  mounted() {
    this.getListData();
  },
  methods: {
    // 获取模板列表数据
    getListData() {
      let _this = this;
      queryTemplateList(this.pageQuery).then(res => {
        if (res.code == 0) {
          _this.$set(_this, "tableData", res.value.records);
          _this.pageQuery.total = res.value.total;
          _this.pageQuery.page = res.value.current;
          _this.pageQuery.limit = res.value.size;
        }
        console.log(res);
      });
    },

    // 添加模板
    addhospital() {
      this.$router.push("/healthTemplate");
    },
    // 更改表头颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:rgba(228,248,245,1)";
      } else {
        return "";
      }
    },
    // 编辑数据
    edit(scope) {
      sessionStorage.setItem("editHealthTemplate", JSON.stringify(scope));
      this.$router.push("/healthTemplate");
    },
    // 更改状态
    healthManagement(scope, value) {
      let obj = scope,
        _this = this;
      this.$confirm("此操作将更改使用状态,是否继续?", "删除确认", {
        confirmButtonText: "继续",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        obj.dataStatus = value;
          saveOrUpdate(obj).then(res => {
            if (res.code == 0) {
              _this.$message.success(res.msg);
              _this.getListData();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    // 查看详情
    addtwodeparm(scope) {
      sessionStorage.setItem("editHealthTemplate", JSON.stringify(scope));
      this.$router.push("/healthTemplate-update");
    },
    // 
    downloadTempelate(){
      window.location.href= "http://192.168.1.221/group1/M00/00/0A/wKgB3V1Ho4yAb01vAAAivXBFT4s94.xlsx"
    },
    // 导入模板
    addTempelate() {
      let _this = this;
      _this.dialogonedepVisible = true;
    },
    // 移除文件
    handleRemove(file, fileList){
    },
    // 添加文件
    handlePreview(file, fileList){
      let _this = this;
      _this.$set(_this,"file_obj",file.raw)
      
      // var formData = new FormData();
      // formData.append("file", file.raw);
     
      // healthTemplateUpload(formData).then(res=>{
      //     if (res.code==0) {
      //     _this.$message.success(res.msg)
            
      //     }
          
      //   })
    },
    // 上传文件
    uploadFile(){
      let _this=this
      if (_this.file_obj.uid) {
        this.$confirm('此操作将上传该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var formData = new FormData();
          formData.append("file", _this.file_obj);
          let obj={
            file:_this.file_obj
          };
        healthTemplateUpload(formData).then(res=>{
          if (res.code==0) {
          _this.$message.success(res.msg)
            
          }
          
        })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消上传'
          });          
        });
        

      }else{
        _this.$message.warning("请选择文件")
      }
    },
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

.hospitalData {
  display: flex;
  /* justify-content: space-around; */
}
.hospitalData .el-input {
  margin-bottom: 25px;
}
.pictuer {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 15px;
}
.save_cancel {
  padding-top: 20px;
  text-align: center;
}
.displayeidt {
  display: flex;
  justify-content: space-around;
}
</style>

