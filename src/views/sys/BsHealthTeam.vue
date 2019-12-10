<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        style="width: 200px;"
        clearable
        @clear="getListData({page:1,limit:10})"
        v-model="teamName"
        placeholder="请输入团队名称"
        class="filter-item"
      />
      <el-button
        class="filter-item"
        @click="getListData({page:1,limit:10})"
        type="primary"
        icon="el-icon-search"
      >查询</el-button>
      <!-- <el-button class="filter-item" type="primary" icon="el-icon-edit" @click="dialogFormVisible=true">新增</el-button> -->
      <el-button
        class="buildFile createBase"
        type="primary"
        @click="tianJiaTeam"
        icon="el-icon-circle-plus-outline"
      >添加健康团队</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
      <el-table-column label="唯一标识" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="健康团队名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.teamName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="健康团队描述" align="center">
        <template slot-scope="scope">
          <span class="textMore" :title="scope.row.teamDesc">{{ scope.row.teamDesc }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属医院" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hospitalName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="电话" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.telPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="健康团队头像" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.originalImgUrl" alt />
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
        width="250px"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="toEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="primary"
            :loading="scope.row.loading"
            @click="Members(scope.row)"
          >成员管理</el-button>
          <el-button
            size="mini"
            type="danger"
            :loading="scope.row.loading"
            @click="deleteObj(scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="pageQuery.total>0"
      :total="pageQuery.total"
      :page.sync="pageQuery.page"
      :limit.sync="pageQuery.limit"
      @pagination="getListData"
    />

    <!-- 添加健康团队 -->
    <el-dialog
      :close-on-click-modal="false"
      :title="teamtitle"
      :visible.sync="dialogFormVisible"
      style="height: 90vh"
    >
      <el-form :rules="rules" :model="team">
        <div class="hospitalLog">
          <div>
            <b>团队头像：</b>
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
              <div class="avatar">
                <img v-if="team.titleImages" :src="team.titleImages" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </div>
            </el-upload>
            <!-- <el-button @click="handleload">提交</el-button> -->
            <el-dialog :visible.sync="dialogVisibleOne">
              <img width="100%" :src="dialogImageUrlOne" alt />
            </el-dialog>
          </div>
        </div>
        <div class="hospitalData">
          <div style="width:290px">
            <el-form-item label="团队名称:" prop="teamName">
              <el-input style="width:203px" placeholder="请输入团队名称" v-model="team.teamName"></el-input>
            </el-form-item>
          </div>
          <div style="width:425px">
            <el-form-item label="所属医院:" prop="hospitalCode">
              <el-select v-model="team.hospitalCode" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <!-- <el-input style="width:203px" placeholder="请输入团队名称" v-model="team.hospitalCode"></el-input> -->
            </el-form-item>
          </div>
          <div style="width:290px">
            <el-form-item label="电话:" prop="telPhone">
              <el-input
                class="teamPhone"
                v-model="team.telPhone"
                placeholder="请输入电话号码"
              ></el-input>
            </el-form-item>
          </div>
        </div>
        <div>
          <el-form-item label="健康团队描述:" prop="teamDesc">
            <el-input
              type="textarea"
              maxlength="500"
              placeholder="500字以内"
              v-model="team.teamDesc"
              rows="7"
            ></el-input>
          </el-form-item>
        </div>

        <div class="save_cancel">
          <el-button type="success" @click="keepTeam">保存</el-button>
          <el-button type="warning" @click="dialogFormVisible=false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 穿梭框 -->
    <el-dialog
      :visible.sync="dialogtransfer"
      width="65%"
      style=" height:85vh;
    overflow-y: auto;"
      title="成员管理(左侧为可添加人员，右侧为当前健康团队)"
    >
      <div class="membersManagement">
        <div class="leftBorder">
          <el-input
            v-model="leftName"
            clearable
            size="mini"
            placeholder="请输入姓名"
            @clear="getTeamdata"
            round
            class="search"
          ></el-input>
          <el-button size="mini" @click="fineLeftName">查询</el-button>
          <el-table
            @row-dblclick="leftRowDblclick"
            border
            size="mini"
            ref="multipleTable"
            :data="addtableData"
            tooltip-effect="dark"
            style="height: 95% ;margin-top:10px; overflow-y: auto; "
            @selection-change="handleSelectionChangeLeft"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column width="70">
              <template slot-scope="scope">
                <img :src="scope.row.originalImgUrl" style="width:100%" alt />
              </template>
            </el-table-column>
            <el-table-column prop="doctorName" label="姓名">
              <template slot-scope="scope">{{scope.row.doctorName}}</template>
            </el-table-column>
            <el-table-column prop="departmentLevel1" label="一级科室">
              <template slot-scope="scope">{{scope.row.departmentLevel1Name}}</template>
            </el-table-column>
            <el-table-column prop="departmentLevel2" label="二级科室">
              <template slot-scope="scope">{{scope.row.departmentLevel2Name}}</template>
            </el-table-column>
            <el-table-column prop="roleName" label="角色" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.roleName}}</template>
            </el-table-column>
          </el-table>
        </div>
        <div class="leftOright">
          <div style="margin-bottom:10px">
            <el-button class="el-icon-arrow-left" @click="deleteTeamMember"></el-button>
          </div>
          <div>
            <el-button class="el-icon-arrow-right" @click="addteam"></el-button>
          </div>
        </div>
        <div class="rightBorder">
          <el-input
            v-model="rightName"
            clearable
            placeholder="请输入姓名"
            @clear="getTeamdata"
            size="mini"
            class="search"
          ></el-input>
          <el-button size="mini" @click="fineRightName">查询</el-button>
          <el-table
            @row-dblclick="rightDblclick"
            size="mini"
            border
            ref="multipleTable"
            :data="teamTableData"
            tooltip-effect="dark"
            style="height: 95% ;margin-top:10px; overflow-y: auto; "
            @selection-change="handleSelectionChangeRight"
          >
            <el-table-column type="selection"></el-table-column>
            <el-table-column width="70">
              <template slot-scope="scope">
                <img :src="scope.row.originalImgUrl" style="width:100%" alt />
              </template>
            </el-table-column>
            <el-table-column prop="doctorName" label="姓名">
              <template slot-scope="scope">{{scope.row.doctorName}}</template>
            </el-table-column>
            <el-table-column prop="departmentLevel1" label="一级科室">
              <template slot-scope="scope">{{scope.row.departmentLevel1}}</template>
            </el-table-column>
            <el-table-column prop="departmentLevel2" label="二级科室">
              <template slot-scope="scope">{{scope.row.departmentLevel2}}</template>
            </el-table-column>
            <el-table-column prop="roleName" label="角色" show-overflow-tooltip>
              <template slot-scope="scope">{{scope.row.roleName}}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  deleteObjs,
  getList,
  saveOrUpdate,
  saveteam,
  updateTeam,
  teamlist,
  getNotInTeamDoctor,
  batchAddMember,
  deleteMember,
  batchDeleteMember,
  getHospitalList
} from "@/api/sys/BsHealthTeam";
import { uploadFile } from "@/api/sys/client.js";
import {
  Checkcard,
  isvalidUsername,
  validateMobile,
  validatePhoneTwo
} from "@/utils/validate";
export default {
  data() {
    return {
      deleteTeamMear: [],
      addTeamArr: [],
      teamRow: {},
      leftName: "",
      rightName: "",
      teamCode: "",
      addtableData: [],
      teamTableData: [],
      editState: 1,
      teamtitle: "添加健康团队",
      imageUrl: "",
      options: [{ value: "1", label: "一级甲等" }],
      list: [],
      filses: [],
      textarear: "",
      hospitaltClass: "",

      dialogtransfer: false,
      dialogImageUrlOne: "",
      dialogVisibleOne: false,
      dialogonedepVisible: false,
      listLoading: false,
      dialogFormVisible: false,
      btnLoading: false,
      teamName: "",
      team: {
        teamName: "",
        teamDesc: "",
        hospitalCode: "",
        telPhone: "",
        titleImages: ""
      },
      obj: {
        id: "",
        code: "",
        teamName: "",
        teamDesc: "",
        hospitalCode: "",
        isDeleted: "",
        createBy: "",
        createIp: "",
        createTime: "",
        modifyBy: "",
        modifyIp: "",
        modifyTime: "",
        telPhone: "",
        titleImages: "",
        hospitalName: ""
      },
      options: [],
      rules: {
        id: [{ required: true, message: "请填写流水号", trigger: "change" }],
        code: [
          { required: true, message: "请填写唯一Code", trigger: "change" }
        ],
        telPhone: [
          { required: true, message: "请输入手机号码" },
          { validator: validatePhoneTwo }
        ],
        teamName: [
          { required: true, message: "请填写健康团队名称", trigger: "change" }
        ],
        teamDesc: [
          { required: true, message: "请填写健康团队描述", trigger: "change" }
        ],
        hospitalCode: [
          { required: true, message: "请填写所属医院", trigger: "change" }
        ],
        isDeleted: [
          {
            required: true,
            message: "请填写状态 0-有效 1-失效",
            trigger: "change"
          }
        ],
        createBy: [
          { required: true, message: "请填写创建人", trigger: "change" }
        ],
        createIp: [
          { required: true, message: "请填写创建Ip", trigger: "change" }
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
        titleImages: [
          { required: true, message: "请填写健康团队头像", trigger: "change" }
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
          teamName: "",
          teamDesc: "",
          hospitalCode: "",
          isDeleted: "",
          createBy: "",
          createIp: "",
          createTime: "",
          modifyBy: "",
          modifyIp: "",
          modifyTime: "",
          telPhone: "",
          titleImages: ""
        };
        // this.$refs["dataForm"].resetFields();
      }
    }
  },
  mounted() {
    this.getListData(this.pageQuery);
    this.getHospital();
  },
  methods: {
    // 获取医院数据
    getHospital() {
      let _this=this,
       pageQuery= {
        total: 0,
        page: 1,
        limit: 50
      };
      getHospitalList(pageQuery).then(res=>{
        if (res.code==0) {
          for (const item of res.value.records) {
            _this.options.push({
             value: item.code,
             label: item.hospitalName
            })
          }
        }
      })
    },
    // 成员管理
    Members(row) {
      this.teamCode = row.code;
      this.$set(this, "teamRow", row);
      this.getTeamdata();
    },
    // 获取成员数据
    getTeamdata() {
      let objteam = {
          teamCode: this.teamRow.code
        },
        objOnly = {
          teamCode: this.teamRow.code
        };
      getNotInTeamDoctor(objOnly).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.$set(this, "addtableData", res.value);
        }
      });

      this.dialogtransfer = true;
      teamlist(objteam).then(res => {
        if (res.code == 0) {
        }
        console.log(res);

        this.$set(this, "teamTableData", res.value);
      });
    },
    // 添加健康团队
    tianJiaTeam() {
      this.dialogFormVisible = true;
      this.teamtitle = "添加健康团队";
      this.editState = 1;
    },
    // 创建健康团对
    keepTeam() {
      let _this = this;
      var teamToF = true;
      for (const key in _this.team) {
        if (_this.team[key] == "") {
          teamToF = false;
        }
      }
      if (teamToF) {
        if (_this.editState == 1) {
          saveteam(_this.team).then(res => {
            if (res.code == 0) {
              _this.$message.success(res.msg);
              _this.dialogFormVisible = false;
            } else {
              _this.$message.warning(res.msg);
            }
          });
        } else if (_this.editState == 2) {
          updateTeam(_this.team).then(res => {
            if (res.code == 0) {
              _this.$message.success(res.msg);
              _this.dialogFormVisible = false;
              _this.getListData(_this.pageQuery);
            } else {
              _this.$message.warning(res.msg);
            }
          });
        }
      } else {
        _this.$message.warning("所有选项均为必填");
      }
    },
    // 查询数据
    getListData() {},
    // 选择删除成员
    handleSelectionChangeRight(value) {
      let _this = this;
      var teamArr = [];
      for (const iterator of value) {
        teamArr.push(iterator.code);
      }
      _this.deleteTeamMear = teamArr;
    },
    // 双击添加成员
    leftRowDblclick(row) {
      let _this = this;
      var teamArr = [];
      teamArr.push({
        healthTeamCode: _this.teamCode,
        doctorCode: row.code
      });
      _this.addTeamArr = teamArr;
      _this.addteam();
    },
    // 双击删除成员
    rightDblclick(row) {
      let _this = this;
      var teamArr = [];
      teamArr.push(row.code);
      _this.deleteTeamMear = teamArr;
      _this.deleteTeamMember();
    },
    // 选择添加成员
    handleSelectionChangeLeft(value) {
      let _this = this;
      var teamArr = [];
      value.forEach(element => {
        teamArr.push({
          healthTeamCode: _this.teamCode,
          doctorCode: element.code
        });
      });
      _this.addTeamArr = teamArr;
    },

    // 添加成员
    addteam() {
      let _this = this;
      if (_this.addTeamArr.length > 0) {
        batchAddMember(_this.addTeamArr).then(res => {
          if (res.code == 0) {
            _this.$message.success(res.msg);
            _this.getTeamdata();
          }
        });
      } else {
        this.$message.warning("请在左边选择要添加的团队成员");
      }
    },
    // 删除健康团队成员
    deleteTeamMember() {
      let _this = this;
      if (_this.deleteTeamMear.length > 0) {
        _this
          .$confirm("此操作将删除成员, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            batchDeleteMember(_this.deleteTeamMear).then(res => {
              if (res.code == 0) {
                _this.$message.success(res.msg);
                _this.getTeamdata();
              }
            });
          })
          .catch(() => {
            _this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      } else {
        _this.$message.warning("请选择要删除的成员");
      }
    },
    // 左查询可添加成员
    fineLeftName() {
      let objOnly = {
        teamCode: this.teamRow.code,
        doctorName: this.leftName
      };
      if (objOnly.doctorName != "") {
        getNotInTeamDoctor(objOnly).then(res => {
          if (res.code == 0) {
            this.addtableData = res.value;
          }
        });
      } else {
        this.$message.warning("请先添加需要查询的姓名");
      }
    },
    // 右查询团队成员
    fineRightName() {
      let rightObjOnly = {
        teamCode: this.teamRow.code,
        doctorName: this.rightName
      };
      if (rightObjOnly.doctorName != "") {
        teamlist(rightObjOnly).then(res => {
          if (res.code == 0) {
            this.teamTableData = res.value;
            this.$message.success(res.msg);
          }
        });
      } else {
        this.$message.warning("请先添加需要查询的姓名");
      }
    },
    // 上传图片
    beforeAvatarUpload(file) {
      var formData = new FormData();
      formData.append("file", file.raw);
      uploadFile(formData).then(res => {
        this.team.titleImages = res.value;
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

    // 删除健康团队
    deleteObj(row) {
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
          row.loading = true;
          deleteObjs(row.code).then(res => {
            row.loading = false;
            if (res.code == 0) {
              this.$message.success(res.msg);
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
    // 获取列表数据
    getListData(pageParam) {
      pageParam.teamName = this.teamName;
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
    //
    toEdit(row) {
      this.teamtitle = "编辑健康团队";
      this.editState = 2;
      this.dialogFormVisible = true;
      this.obj = JSON.parse(JSON.stringify(row));
      this.team = row;
    }
  }
};
</script>

<style>
.leftBorder {
  border: 1px solid #ccc;
  padding: 30px 20px;
  height: 600px;
  width: 46%;
}
.rightBorder {
  border: 1px solid #ccc;
  padding: 30px 20px;
  height: 600px;
  width: 46%;
}
.leftOright {
  width: 6%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.search {
  width: 150px;
  margin-right: 15px;
}
.membersManagement {
  /* height: 100%; */
  display: flex;
  justify-content: space-around;
}
.createBase {
  margin-top: 10px;
}
.hospitalData {
  margin: 15px 0;
  display: flex;
  flex-wrap: wrap;
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
  width: 152px;
  height: 152px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 146px;
  height: 146px;
  display: block;
}
.avatar img {
  width: 146px;
  height: 146px;
}
.teamPhone {
  width: 203px;
  margin: 0 0 0 28px;
}
</style>
