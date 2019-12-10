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
    </div>
    <div>
      <el-button
        class="buildFile createBase"
        type="primary"
        @click="addhospital"
        v-if="hasPermission('department:addlevel1')"
        icon="el-icon-circle-plus-outline"
      >添加模板</el-button>
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
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
     
      <el-table-column label="操作" width="320px" align="center">
        <template slot-scope="scope">
          <div class="icon-sizeWidth">
            <el-button size="mini" @click="addtwodeparm(scope.row)" type="success">查看详情</el-button>
            <el-button size="mini" @click="deleteone(scope.row)" type="success">编辑模板</el-button>
            <el-button size="mini" @click="healthManagement(scope.row)" type="danger">禁用</el-button>
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
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      dialogtransfer: false,
      editorDialog: false,
      dialogVisibleOne: false,
      dialogVisible: false,
      listLoading: false,
      filses: [],
      options: [
        { value: "1", label: "一级甲等" },
        { value: "2", label: "一级乙等" },
        { value: "3", label: "一级丙等" },
        { value: "4", label: "二级甲等" },
        { value: "5", label: "二级乙等" },
        { value: "6", label: "二级丙等" },
        { value: "7", label: "三级甲等" },
        { value: "8", label: "三级乙等" },
        { value: "9", label: "三级丙等" }
      ],

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
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.changgeChansformData();
  },
  methods: {
    // 查询数据
    getListData() {},
    // 穿梭框
    handleChange() {},
    // 更改数据格式
    changgeChansformData() {
      let _this = this;
      for (const key in _this.recivechansformdata) {
        var value = ` ${_this.recivechansformdata[key].name} ${
          _this.recivechansformdata[key].oneClass
        }  
          ${_this.recivechansformdata[key].twoClass} ${
          _this.recivechansformdata[key].role
        }`;

        this.chansformdata.push({
          value: parseInt(key) + 1,
          desc: value
        });
      }
    },
    // 删除图片
    handleRemoveOne(file, fileList) {
      this.plus = true;
    },
    handlePictureCardPreviewOne(file) {
      this.dialogImageUrlOne = file.url;
      this.dialogVisibleOne = true;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 添加模板
    addhospital() {
      this.$router.push('/healthTemplate')
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
    deleteone() {
      this.$router.push("/editHealthTemplate");
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

