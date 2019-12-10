<template>
  <div class="suifang app-container">
    <!-- 搜索按钮 -->
    <div>
      <el-input
        placeholder="健康团队名称"
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
        @click="addhospital"
        v-if="hasPermission('department:addlevel1')"
        icon="el-icon-circle-plus-outline"
      >添加健康团队</el-button>
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
          <span>{{ scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="健康团队名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="健康团队LOG" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属医院" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="260px" align="center">
        <template slot-scope="scope">
          <div class="icon-sizeWidth">
            <el-button size="mini" @click="addtwodeparm(scope.row)" type="success">编辑</el-button>
            <el-button size="mini" @click="deleteone(scope.row)" type="success">删除</el-button>
            <el-button size="mini" @click="healthManagement(scope.row)" type="danger">团队队员管理</el-button>
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
    <!-- 添加健康团队 -->
    <el-dialog
      :close-on-click-modal="false"
      title="添加健康团队"
      :visible.sync="dialogonedepVisible"
      style="height: 90vh"
    >
      <div class="hospitalLog">
        <div>
          <b>团队头像：</b>
        </div>
        <div>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-change="onloadImgOne"
            :auto-upload="false"
            :show-file-list="true"
            :file-list="filses"
            :limit="1"
            :on-preview="handlePictureCardPreviewOne"
            :on-remove="handleRemoveOne"
            accept=".png, .jpg, .jpeg"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-button @click="handleload">提交</el-button> -->
          <el-dialog :visible.sync="dialogVisibleOne">
            <img width="100%" :src="dialogImageUrlOne" alt>
          </el-dialog>
        </div>
      </div>
      <div class="hospitalData">
        <div style="width:290px">
          <label>团队名称：</label>
          <el-input style="width:203px"></el-input>

          <!-- <el-input style="width:203px"></el-input> -->
        </div>
        <div style="width:425px">
          <label>所属医院：</label>
          <el-select v-model="hospitaltClass" filterable style="width:280px" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div>
          <b>健康团队描述</b>
          <el-input
            type="textarea"
            maxlength="500"
            placeholder="500字以内"
            v-model="textarear"
            rows="7"
          ></el-input>
        </div>
      </div>

      <div class="save_cancel">
        <el-button type="success">保存</el-button>
        <el-button type="warning">取消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑医院 -->
    <el-dialog
      :close-on-click-modal="false"
      title="编辑健康团队"
      :visible.sync="editorDialog"
      style="height: 90vh"
    >
      <div class="hospitalLog">
        <div>
          <b>健康团队LOG：</b>
        </div>
        <div>
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-change="onloadImgOne"
            :auto-upload="false"
            :show-file-list="true"
            :file-list="filses"
            :limit="1"
            :on-preview="handlePictureCardPreviewOne"
            :on-remove="handleRemoveOne"
            accept=".png, .jpg, .jpeg"
          >
            <i class="el-icon-plus" v-show="plus"></i>
          </el-upload>
          <!-- <el-button @click="handleload">提交</el-button> -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </div>
      </div>
      <div class="hospitalData">
        <div style="width:330px">
          <label>健康团队名称：</label>
          <el-input style="width:203px"></el-input>

          <!-- <el-input style="width:203px"></el-input> -->
        </div>
        <div style="width:425px">
          <label>所属医院：</label>

          <el-select v-model="hospitaltClass" filterable style="width:280px" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div>
        <div>
          <b>健康团队描述</b>
          <el-input
            type="textarea"
            maxlength="500"
            placeholder="500字以内"
            v-model="textarear"
            rows="7"
          ></el-input>
        </div>
      </div>

      <div class="save_cancel">
        <el-button type="success">保存</el-button>
        <el-button type="warning">取消</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogtransfer">
      <div style="text-align: center " class="transform">
        <el-transfer
          style="text-align: left; display: inline-block ;"
          v-model="chansform"
          filterable
          :left-default-checked="[2, 3]"
          :right-default-checked="[1]"
          :titles="['Source', 'Target']"
          :button-texts="['到左边', '到右边']"
          :format="{
            noChecked: '${total}',
            hasChecked: '${checked}/${total}'
          }"
          :props="{
            key: 'value',
            label: 'desc'
          }"
          @change="handleChange"
          :data="chansformdata"
        >
          <span slot-scope="{ option }">{{ option.value }} - {{ option.desc }}</span>
        </el-transfer>
      </div>
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
      dialogonedepVisible: false,
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
      recivechansformdata: [
        {
          key: 1,
          name: "jon",
          oneClass: "内科",
          role: "医生",
          twoClass: "普通内科"
        },
        {
          key: 2,
          name: "教师2",
          oneClass: "语文",
          role: "医生",
          twoClass: "文言文"
        },
        {
          key: 3,
          name: "教师3",
          oneClass: "物理",
          role: "健康助理",
          twoClass: "动量定律"
        }
      ],
      chansformdata: [],
      chansform: [1],
      team: {
        teamName: "健康团队3",
        teamDesc: "描述",
        hospitalCode: "1127044659508543488",
        telPhone: "电话",
        titleImages: "头像"
      },
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
    // 添加医院
    addhospital() {
      this.dialogonedepVisible = true;
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
      this.$confirm(
        "健康团队删除后，签约人将无法找到对应的签约团队, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          if (condition) {
            this.$alert("该健康团队存在签约用户，不允许删除", "删除健康团队", {
              confirmButtonText: "确定",
              callback: action => {
                this.$message({
                  type: "info"
                });
              }
            });
          } else {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
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
  width: 287px;
}
</style>

