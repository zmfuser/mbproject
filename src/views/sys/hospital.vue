<template>
  <div class="suifang app-container">
    <!-- 搜索按钮 -->
    <div>
      <el-input
        placeholder="医院名称"
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
      >添加医院</el-button>
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
      <el-table-column label="医院编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code}}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院LOG" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院级别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院地址" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系电话" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.parentCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="210px" align="center">
        <template slot-scope="scope">
          <div>
            <el-button size="mini" @click="addtwodeparm(scope.row)" type="success">编辑</el-button>
            <el-button size="mini" @click="deleteone(scope.row)" type="danger">删除</el-button>
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
    <!-- 添加医院 -->
    <el-dialog
      :close-on-click-modal="false"
      title="添加医院"
      :visible.sync="dialogonedepVisible"
      style="height: 90vh"
    >
      <div class="hospitalLog">
        <div>
          <b>医院LOG：</b>
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
            <i class="el-icon-plus" ></i>
          </el-upload>
          <!-- <el-button @click="handleload">提交</el-button> -->
          <!-- <el-dialog :visible.sync="dialogVisibleOne">
            <img width="100%" :src="dialogImageUrlOne" alt>
          </el-dialog> -->
        </div>
      </div>
      <div class="hospitalData">
        <div style="width:290px">
          <label>医院名称：</label>
          <el-input style="width:203px"></el-input>
          <label>医院级别：</label>
          <el-select
                  v-model="hospitaltClass"
                  filterable
                  style="width:180px"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
          <!-- <el-input style="width:203px"></el-input> -->
        </div>
        <div style="width:425px">
          <label>医院地址</label>

          <el-input style="width:350px"></el-input>
          <label>医院电话</label>
          <el-input style="width:350px"></el-input>
        </div>
      </div>
      <div>
        <div>
          <b>医院简介</b>
          <el-input
            type="textarea"
            maxlength="500"
            placeholder="500字以内"
            v-model="textarear"
            rows="3"
          ></el-input>
        </div>
      </div>
      <div style="padding-top:20px">
        <b>医院相册</b>
        <div class="pictuer">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-change="onloadImg"
            :auto-upload="false"
            :show-file-list="true"
            :file-list="filses"
            :limit="10"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            accept=".png, .jpg, .jpeg"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-button @click="handleload">提交</el-button> -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
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
      title="添加医院"
      :visible.sync="editorDialog"
      style="height: 90vh"
    >
      <div class="hospitalLog">
        <div>
          <b>医院LOG：</b>
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
        <div style="width:290px">
          <label>医院名称：</label>
          <el-input style="width:203px"></el-input>
          <label>医院级别：</label>
          
           <el-select
                  v-model="hospitaltClass"
                  filterable
                  style="width:180px"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
          <!-- <el-input style="width:203px"></el-input> -->
        </div>
        <div style="width:425px">
          <label>医院地址</label>

          <el-input style="width:350px"></el-input>
          <label>医院电话</label>
          <el-input style="width:350px"></el-input>
        </div>
      </div>
      <div>
        <div>
          <b>医院简介</b>
          <el-input
            type="textarea"
            maxlength="500"
            placeholder="500字以内"
            v-model="textarear"
            rows="3"
          ></el-input>
        </div>
      </div>
      <div style="padding-top:20px">
        <b>医院相册</b>
        <div class="pictuer">
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-change="onloadImg"
            :auto-upload="false"
            :show-file-list="true"
            :file-list="filses"
            :limit="10"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            accept=".png, .jpg, .jpeg"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <!-- <el-button @click="handleload">提交</el-button> -->
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </div>
      </div>
      <div class="save_cancel">
        <el-button type="success">保存</el-button>
        <el-button type="warning">取消</el-button>
      </div>
    </el-dialog>
    <!-- 添加二级科室 -->
    <el-dialog :close-on-click-modal="false" title="添加二级科室" :visible.sync="dialogtwodepVisible">
      <div>
        <label for>上级科室：</label>
        <el-input style="width:200px;" v-model="parentName"></el-input>
      </div>
      <div class="paddingTop">
        <label for>科室名称：</label>
        <el-input style="width:200px;" placeholder="请输入科室名称" v-model="subForm.departmentName"></el-input>
      </div>
      <div class="paddingTop">
        <label for>科室描述：</label>
        <el-input
          type="textarea"
          class="paddingTop"
          placeholder="请输入科室描述"
          :rows="5"
          v-model="subForm.departementDesc"
        ></el-input>
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
import {
  selectDepartment,
  adddepartment,
  deleteAll
} from "@/api/sys/department.js";
export default {
  data() {
    return {
      plus: true,
      editorDialog: false,
      dialogVisibleOne: false,
      dialogVisible: false,
      dialogonedepVisible: false,
      dialogtwodepVisible: false,
      listLoading: false,
      filses: [],
      options: [
        {value:"1",label:"一级甲等"},
        {value:"2",label:"一级乙等"},
        {value:"3",label:"一级丙等"},
        {value:"4",label:"二级甲等"},
        {value:"5",label:"二级乙等"},
        {value:"6",label:"二级丙等"},
        {value:"7",label:"三级甲等"},
        {value:"8",label:"三级乙等"},
        {value:"9",label:"三级丙等"},
      ],
      textarear: "",
      hospitaltClass: "",
      imageUrl: "",
      imageUrlHead: "",
      dialogImageUrl: "",
      dialogImageUrlOne: "",
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
      hospitaltName: "",
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
    // 编辑弹框
    addtwodeparm() {
      this.editorDialog=true;
    },
    addtwodeparment() {
    },
    // 添加图片
    onloadImgOne(value, file) {
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
</style>

