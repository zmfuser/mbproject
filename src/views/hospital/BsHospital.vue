<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        style="width: 200px;"
        placeholder="医院名称"
        v-model="hospitalName"
        clearable
        @clear="getListData({page:1,limit:10})"
        class="filter-item"
      />
      <el-button
        class="filter-item"
        @click="getListData({page:1,limit:10})"
        type="primary"
        icon="el-icon-search"
      >查询</el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="addhosptial">新增</el-button>
    </div>
    <br />
    <br />
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
      <el-table-column label="医院编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hospitalName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院地址" align="center">
        <template slot-scope="scope">
          <span class="textMore" :title="scope.row.hospitalAddr">{{ scope.row.hospitalAddr }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院级别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hospitalLevel|hostpitalLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院电话" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hospitalTel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医院商标" align="center">
        <template slot-scope="scope">
          <div class="doctorImg">
            <img :src="scope.row.hospitalLog" alt />
          </div>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            :loading="scope.row.loading"
            @click="deleteObj(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加医院 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="operation"
      @close="deleteData"
      :visible.sync="dialogonedepVisible"
      style="height: 90vh"
    >
      <div class="hospitalLog">
        <div>
          <b>医院LOG：</b>
        </div>
        <div>
          <el-upload
            class="avatar-uploader"
            action
            :auto-upload="false"
            :show-file-list="false"
            :on-change="beforeAvatarUpload"
            multiple
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <div class="hospitalData">
        <div style="width:290px">
          <label>医院名称：</label>
          <el-input style="width:203px" v-model="hospitalData.hospitalName"></el-input>
          <label>医院级别：</label>
          <el-select
            v-model="hospitalData.hospitalLevel"
            filterable
            style="width:203px"
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
          <label>医院地址:</label>

          <el-input style="width:350px" v-model="hospitalData.hospitalAddr"></el-input>
          <label>医院电话:</label>
          <el-input style="width:350px"  v-model="hospitalData.hospitalTel"></el-input>
        </div>
      </div>
      <div>
        <div>
          <b>医院简介</b>
          <el-input
            type="textarea"
            maxlength="500"
            placeholder="500字以内"
            v-model="hospitalData.hospitalDescribe"
            rows="3"
          ></el-input>
        </div>
      </div>
      <div style="padding-top:20px">
        <b>医院相册</b>
        <div class="pictuer">
          <el-upload
            action
            multiple
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
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </div>
      </div>
      <div class="save_cancel">
        <el-button type="success" @click="uploadData">保存</el-button>
        <el-button  type="warning"  @click="dialogonedepVisible=false;deleteData()">取消</el-button>
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
import { Checkcard, validateMobile } from '@/utils/validate'
import {
  deleteObjs,
  getList,
  saveOrUpdate,
  getOneHospital,
  saveOrUpdateHospital
} from "@/api/hospital/BsHospital";
import { uploadFile } from "@/api/sys/client.js";
export default {
  data() {
    return {
      list: [],
      filses: [],
      datatype: 0,
      hospitalcode: "",
      textarear: "",
      operation: "",
      hospitaltClass: "",
      imageUrl: "",
      imageUrlHead: "",
      dialogImageUrl: "",

      hospitalName: "",
      ImageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false,
      dialogonedepVisible: false,
      listLoading: false,
      dialogFormVisible: false,
      btnLoading: false,
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
      obj: {
        id: "",
        code: "",

        hospitalName: "",
        hospitalAddr: "",
        hospitalLevel: "",
        hospitalDescribe: "",
        createBy: "",
        createIp: "",
        createTime: "",
        modifyBy: "",
        modifyIp: "",
        modifyTime: "",
        isDeleted: "",
        hospitalTel: "",
        hospitalLog: ""
      },
      hospitalData: {
        hospitalName: "",
        hospitalAddr: "",
        hospitalLevel: "",
        hospitalDescribe: "  ",
        hospitalTel: "",
        hospitalLog: "",
        hospitalImagesList: []
      },
      rules: {
        id: [{ required: true, message: "请填写流水号", trigger: "change" }],
        code: [{ required: true, message: "请填写唯一ID", trigger: "change" }],
        hospitalName: [
          { required: true, message: "请填写医院名", trigger: "change" }
        ],
        hospitalAddr: [
          { required: true, message: "请填写医院地址", trigger: "change" }
        ],
        hospitalLevel: [
          { required: true, message: "请填写医院级别", trigger: "change" }
        ],
        hospitalDescribe: [
          { required: true, message: "请填写医院描述", trigger: "change" }
        ],
        createBy: [
          { required: true, message: "请填写创建人", trigger: "change" }
        ],
        createIp: [
          { required: true, message: "请填写创建IP", trigger: "change" }
        ],
        createTime: [
          { required: true, message: "请填写创建时间", trigger: "change" }
        ],
        modifyBy: [
          { required: true, message: "请填写修改人", trigger: "change" }
        ],
        modifyIp: [
          { required: true, message: "请填写修改IP", trigger: "change" }
        ],
        modifyTime: [
          { required: true, message: "请填写修改时间", trigger: "change" }
        ],
        isDeleted: [
          {
            required: true,
            message: "请填写状态 0-有效 1-失效",
            trigger: "change"
          }
        ],
        hospitalTel: [
          { required: true, message: "请填写医院电话", trigger: "change" }
        ],
        hospitalLog: [
          { required: true, message: "请填写医院商标", trigger: "change" }
        ]
      },
      pageQuery: {
        total: 0,
        page: 1,
        limit: 10
      }
    };
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.obj = {
          id: "",
          code: "",
          hospitalName: "",
          hospitalAddr: "",
          hospitalLevel: "",
          hospitalDescribe: "",
          createBy: "",
          createIp: "",
          createTime: "",
          modifyBy: "",
          modifyIp: "",
          modifyTime: "",
          isDeleted: "",
          hospitalTel: "",
          hospitalLog: ""
        };
        this.$refs["dataForm"].resetFields();
      }
    }
  },
  mounted() {
    this.getListData(this.pageQuery);
  },
  methods: {
    
    addhosptial() {
      this.datatype = 0;
      this.dialogonedepVisible = true;
      this.operation = "新增医院";
    },
    // 清空内容
    deleteData() {
      let _this = this;
      _this.imageUrl="";
      _this.hospitalData.hospitalName = "";
      _this.hospitalData.hospitalAddr = "";
      _this.hospitalData.hospitalLevel = "";
      _this.hospitalData.hospitalDescribe = "";
      _this.hospitalData.hospitalTel = "";
      _this.hospitalData.hospitalLog = "";
      _this.hospitalData.hospitalImagesList = [];
      _this.dialogonedepVisible = false;
      _this.filses = [];

    },
    // 添加医院
    uploadData() {
      let _this = this;
      if (_this.datatype == 0) {
        this.$confirm("此操作将新增一个医院信息,是否继续?", "确认", {
          confirmButtonText: "继续",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (
              _this.hospitalData.hospitalName &&
              _this.hospitalData.hospitalAddr &&
              _this.hospitalData.hospitalLevel
            ) {
              saveOrUpdateHospital(_this.hospitalData).then(res => {
                if (res.code == 0) {
                  this.$message({
                    type: "success",
                    message: res.msg
                  });

                  this.getListData({ page: 1, limit: 10 });
                  this.deleteData();
                }
              });
            } else {
              _this.$message.warning("请完善(医院名称、地址、等级)基本信息");
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消提交"
            });
          });
      } else {
        this.$confirm("此操作将更新一个医院信息,是否继续?", "确认", {
          confirmButtonText: "继续",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            if (
              _this.hospitalData.hospitalName &&
              _this.hospitalData.hospitalAddr &&
              _this.hospitalData.hospitalLevel
            ) {
              _this.hospitalData.code = _this.hospitalcode;
              saveOrUpdateHospital(_this.hospitalData).then(res => {
                if (res.code == 0) {
                  this.$message({
                    type: "success",
                    message: res.msg
                  });
                  this.getListData({ page: 1, limit: 10 });
                  this.deleteData();
                }
              });
            } else {
              _this.$message.warning("请完善(医院名称、地址、等级)基本信息");
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消提交"
            });
          });
      }
    },
    // 上传头像接口
    beforeAvatarUpload(file) {
      var formData = new FormData();
      formData.append("file", file.raw);
      uploadFile(formData).then(res => {
        this.imageUrl = res.value;
        this.hospitalData.hospitalLog = res.value;
      });
    },
    // 添加头像
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    // beforeAvatarUpload(file) {},
    

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
   
    deleteObj(row) {
      this.$confirm("您正在删除一个医院信息,是否继续?", "删除确认", {
        confirmButtonText: "继续",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteObjs(row.code).then(res => {
            row.loading = false;
            if (res.code == 0) {
              this.$message({
                type: "success",
                message: res.msg
              });
              this.getListData({ page: 1, limit: 10 });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getListData(pageParam) {
      this.listLoading = true;
      pageParam.hospitalName = this.hospitalName;
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
    
    // 添加图片
    onloadImg(file) {
      let _this = this;
      var formData = new FormData();
      formData.append("file", file.raw);
      uploadFile(formData).then(res => {
       
        if (res.code==0) {
            _this.hospitalData.hospitalImagesList.push({ imagesUrl: res.value });
        }
        
      });
    },
    // 删除图片
     handleRemove(file, fileList) {
       
      for (var item in fileList) {
        if (fileList[item].uid == file.uid) {
       this.filses=fileList.splice(item, 1);
        }
      }

      // this.filses;
      this.hospitalData.hospitalImagesList=[];
      for (var item of fileList) {
        var imglist = {};
        imglist.imagesUrl = item.url;
        this.hospitalData.hospitalImagesList.push(imglist);
      }
    },
    // 编辑
    toEdit(row) {
      let _this = this;
      this.datatype = 1;
      this.hospitalcode = row.code;
      this.operation = "编辑医院";
      this.dialogonedepVisible = true;
      this.obj = JSON.parse(JSON.stringify(row));
      if (row.code) {
        getOneHospital(row.code).then(res => {
          if (res.code == 0) {
            _this.hospitalData.hospitalName = res.value.hospitalName;
            _this.hospitalData.hospitalAddr = res.value.hospitalAddr;
            _this.hospitalData.hospitalLevel = res.value.hospitalLevel;
            _this.hospitalData.hospitalDescribe = res.value.hospitalDescribe;
            _this.hospitalData.hospitalTel = res.value.hospitalTel;
            _this.hospitalData.hospitalLog = res.value.hospitalLog;
            _this.imageUrl = res.value.hospitalLog;
            var arr = [],
              arr1 = [];
            for (const item of res.value.hospitalImagesList) {
              arr.push({
                url: item.imagesUrl
              });
              arr1.push({
                imagesUrl: item.imagesUrl
              });
            }
            _this.filses = [];
            _this.$set(_this, "filses", arr);
            _this.$set(_this.hospitalData, "hospitalImagesList", arr1);
          }
          console.log(_this.filses, "1");
          console.log(_this.hospitalData.hospitalImagesList);
        });
      }
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

<style>
.doctorImg {
  width: 60px;
  height: 60px;
  margin: 0 auto;
}

.doctorImg img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}

.hospitalData .el-input {
  margin-bottom: 25px;
}
.hospitalLog {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
  /* line-height: 148px; */
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.textMore{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
