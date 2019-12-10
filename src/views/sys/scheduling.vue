<template>
  <div class="suifang app-container">
    <!-- 搜索按钮 -->
    <div>
      <el-input
        placeholder="排班表名"
        v-model="hospitaltName"
        style="width: 200px;padding-bottom:15px"
        class="filter-item"
      />
      <el-button class="filter-item" @click="getListData()" type="primary" icon="el-icon-search">查询</el-button>
    </div>
    <div>
      <el-button
        class="buildFile createBase"
        type="primary"
        @click="addscheduling"
        v-if="hasPermission('department:addlevel1')"
        icon="el-icon-circle-plus-outline"
      >创建排班</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      row-key="id"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="getRowClass"
    >
      <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
      <el-table-column label="记录编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="排班表名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="260px" align="center">
        <template slot-scope="scope">
          <div class="icon-sizeWidth">
            <el-button size="mini" @click="addtwodeparm(scope.row)" type="success">编辑</el-button>
            <el-button size="mini" @click="deleteone(scope.row)" type="success">删除</el-button>
            <el-button size="mini" @click="healthManagement(scope.row)" type="danger">详情</el-button>
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
    
    <!-- 编辑排班 -->
    <el-dialog
      :close-on-click-modal="false"
      title="编辑排班"
      :visible.sync="editorDialog"
      style="height: 90vh"
    >
      

      <div class="save_cancel">
        <el-button type="success">保存</el-button>
        <el-button type="warning">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogtransfer">
      
      <div class="save_cancel">
        <el-button type="success">保存</el-button>
        <el-button type="warning">取消</el-button>
      </div>
    </el-dialog>
    
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
  data() {
    return {
      plus: true,
      dialogtransfer: false,
      editorDialog: false,
      dialogVisibleOne: false,
      dialogVisible: false,
      listLoading: false,
      filses: [],
      
    
      chansformdata: [
      ],
      chansform: [1],
      textarear: "",
      hospitaltClass: "",
      imageUrl: "",
      imageUrlHead: "",
      dialogImageUrl: "",
      dialogImageUrlOne: "",

      total: 0,
      pageQuery: {
        page: 1,
        limit: 10
      },

      doctorList: [],
      hospitaltName: "",
      departmentName: "",
      form: {
        parentCode: "0",
        departementDesc: "",
        departmentName: ""
      },
      parentName: "",

      row: {},
      listData: [
      ]
    };
  },
  created() {},
  mounted() {
    this.changgeChansformData();
  },
  methods: {
     queryData() {
      //查询操作
      this.listData = [
        {
          id: 0,
          name: "张三",
          group: "东区",
          time: "上午"
        },
        {
          id: 1,
          name: "张三",
          group: "东区",
          time: "下午"
        },
        {
          id: 2,
          name: "张三",
          group: "西区",
          time: "上午"
        },
        {
          id: 3,
          name: "张三",
          group: "西区",
          time: "下午"
        },
        {
          id: 0,
          name: "李四",
          group: "东区",
          time: "上午"
        },
        {
          id: 1,
          name: "李四",
          group: "东区",
          time: "下午"
        },
        {
          id: 2,
          name: "李四",
          group: "西区",
          time: "上午"
        },
        {
          id: 3,
          name: "李四",
          group: "西区",
          time: "下午"
        }
      ];
      this.rowspan();
    },
    
   
    // 查询数据
    getListData(){

    },
    // 更改数据格式
    changgeChansformData(){
      let _this=this;
      for (const key in _this.recivechansformdata) {
        var value=` ${_this.recivechansformdata[key].name} ${_this.recivechansformdata[key].oneClass}  
          ${_this.recivechansformdata[key].twoClass} ${_this.recivechansformdata[key].role}`
          
          this.chansformdata.push({
            value: parseInt(key)+1,
            desc: value,
          })
      }
    },
   
    // 创建排班
    addscheduling() {
      this.$router.push("/hospitalSheduling")
    },
    // 更改表头颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:rgba(228,248,245,1)";
      } else {
        return "";
      }
    },
    // 删除数据
    deleteone() {
      this.$confirm('健康团队删除后，签约人将无法找到对应的签约团队, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (condition) {
            this.$alert('该健康团队存在签约用户，不允许删除', '删除健康团队', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
            });
          }
        });
          }else{
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }
          
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 管理团体
    healthManagement() {
      this.dialogtransfer = true;
    },
    // 编辑弹框
    addtwodeparm() {
      this.editorDialog = true;
    },
    addtwodeparment() {},
    // 添加图片
    onloadImgOne(file) {
      let _this = this;
      _this.plus = false;
      // document.getElementsByName(".el-icon-plus").style.display="none"
      var formData = new FormData();
      formData.append("file", file.raw);
    },
    onloadImg(file) {
      let _this = this;
      var formData = new FormData();
      formData.append("file", file.raw);
      // uploadFile(formData).then(res => {
      //   for (var item of _this.filses) {
      //     var imglist = {};
      //     imglist.imagesUrl = item.url;
      //     _this.form.bsFlupImages.push(imglist);
      //   }
      //   _this.form.bsFlupImages.push({ imagesUrl: res.value });
      // });
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
.hospitalLog {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
  line-height: 148px;
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
.transform >>> .el-transfer-panel {
  width:287px;
}
</style>

