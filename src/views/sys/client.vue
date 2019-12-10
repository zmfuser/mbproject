<template>
  <div class="suifang app-container">
    <div class="div-flex">
      <div>
        <div class="marginTop">
          <label for>一级科室名称：</label>
          <el-select
            v-model="oneName"
            filterable
            placeholder="请选择一级科室名称"
            @change="yiSelect(oneName)"
          >
            <el-option
              v-for="item in options1Name"
              :key="item.id"
              :label="item.departmentName"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>
        <div class="marginTop">
          <label for>医生姓名：</label>
          <el-input
            placeholder="请输入医生姓名"
            v-model="querys.doctorName"
            style="width: 200px;margin-left:30px"
            class="filter-item"
          ></el-input>
        </div>
      </div>
      <div>
        <div class="marginTop">
          <label for>二级科室名称：</label>
          <el-select v-model="twoName" filterable placeholder="请选择二级科室名称">
            <el-option
              v-for="item in options2Name"
              :key="item.id"
              :label="item.departmentName"
              :value="item.code"
            ></el-option>
          </el-select>
        </div>
        <div class="marginTop">
          <label for>手机号码：</label>
          <el-input
            placeholder="请输入手机号码"
            v-model="querys.phone"
            style="width: 200px;margin-left:30px"
            class="filter-item"
          ></el-input>
        </div>
      </div>
    </div>
    <!-- 搜索按钮 -->
    <div class="button-seach-regi">
      <el-button
        plain
        icon="el-icon-search"
        class="search"
        @click="getListDoctor({page:1,limit:10})"
      >搜索</el-button>
      <el-button class="reset" @click="resetBtn({page:1,limit:10})">
        <img src="../../../static/png/manbin_icon_chongzhi.png">重置
      </el-button>
    </div>
    <!-- 添加医生-->
    <div>
      <el-button
        class="buildFile createBase"
        plain
        icon="el-icon-circle-plus-outline"
        @click="addDoctor"
         v-if="hasPermission('selectdoctor:edit')"
      >添加医生</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :data="doctorList"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="getRowClass"
    >
      <el-table-column label="头像" align="center">
        <template slot-scope="scope">
          <div class="doctorImg">
            <img :src="scope.row.originalImgUrl" alt>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="医生编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="医生姓名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.doctorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属医院" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.hospitalName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作电话" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.workerTelNo}}</span>
        </template>
      </el-table-column>
      <!-- workerTelNo -->
      <el-table-column label="角色" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName}}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sex | changeSex }}</span>
        </template>
      </el-table-column>
      <el-table-column label="一级科室" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.departmentLevel1Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="二级科室" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.departmentLevel2Name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.positionName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号码" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
       <el-table-column label="禁用/启用" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isDeleted |Usedtodisable }}</span>
        </template>
      </el-table-column>     
      <el-table-column label="操作" width="210px" align="center">
        <template slot-scope="scope">
          <div class="icon-sizeWidth">
            <el-button
            v-if="hasPermission('selectdoctor:edit')"
            type="warning"
            @click="toEdit(scope.$index, scope.row)"
            icon="el-icon-edit-outline"
            size="mini"
          >编辑</el-button>

          <el-button
            type="success"
            v-if="hasPermission('selectdoctor:resetpwd')"
            @click="toResetpwd(scope.$index, scope.row)"
            size="mini"
          >重置密码</el-button>
          <el-button
            type="danger"
            v-if="hasPermission('selectdoctor:delete')"
            v-show="scope.row.isDeleted==0"
            @click="toDelete(scope.row)"
            icon="el-icon-delete"
            size="mini"
          >禁用</el-button>
           <el-button
            type="primary"
            v-if="hasPermission('selectdoctor:delete')"
            v-show="scope.row.isDeleted==1"
            @click="toUse(scope.row)"
            icon="el-icon-delete"
            size="mini"
          >启用</el-button>
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
    <el-dialog
      title="修改密码"
      :visible.sync="dialogPwdsVisible"
      class="addDdoc"
      :close-on-click-modal="false"
      :before-close="closeDialog"
    >
      <el-input v-model="pwd" placeholder="请输入需要更新的密码" show-password></el-input>
      <div class="updataPwd">
        <el-button size="mini" type="primary" @click="updataPassword">确定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹窗 -->
     <el-dialog
      :before-close="closeDialog"
      title="编辑医生信息"
      :visible.sync="dialogeditVisible"
      class="addDdoc"
      :close-on-click-modal="false">
      <div class="postionImg">
        <label for class="addImg">添加头像</label>
        <el-upload
          class="avatar-uploader"
          action
          :auto-upload="false"
          :show-file-list="false"
          :on-change="beforeAvatarUpload"
          multiple
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <div>
        <el-form ref="edit" :model="edit">
          <el-row>
            <el-col :md="12">
              <el-form-item label="医生姓名：">
                <el-input
                  v-model="edit.doctorName"
                  style="width: 200px"
                  :required="true"
                  placeholder="请输入医生姓名"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="手机号码：">
                <el-input
                  v-model="edit.phone"
                  style="width: 200px"
                  :required="true"
                  placeholder="请输入手机号码"
                  maxlength="11"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="密码：">
                <el-input
                  v-model="mima"
                  style="width: 200px;margin-left:7%"
                  placeholder="请设置密码"
                  show-password :disabled="true"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="身份证号：">
                <el-input
                  v-model="edit.cardId"
                  style="width: 200px"
                  :required="true"
                  placeholder="请输入身份证号"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="一级科室：">
                <el-select
                  v-model="addoneName"
                  filterable
                  placeholder="请选择一级科室"
                  @change="yiSelect(addoneName)"
                >
                  <el-option
                    v-for="item in options1Name"
                    :key="item.id"
                    :label="item.departmentName"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="二级科室：">
                <el-select
                  v-model="addtwoName"
                  filterable
                  placeholder="请选择二级科室名称"
                  @change="getTwoCode"
                >
                  <el-option
                    v-for="item in options2Name"
                    :key="item.id"
                    :label="item.departmentName"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="性别：">
                <el-select
                  v-model="gender"
                  placeholder="请选择性别"
                  style="margin-left:7%"
                  @change="changeSex"
                >
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                  <el-option label="保密" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="角色：">
                <el-select
                  v-model="role"
                  filterable
                  placeholder="请设置角色名称"
                  style="margin-left:7%"
                  @change="changeRole"
                >
                  <el-option
                    v-for="item in roleOptions"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="医院名称：">
                <el-select
                  v-model="hospital"
                  filterable
                  placeholder="请选择医院名称"
                  @change="changeHospital"
                >
                  <!-- <el-option
                    v-for="item in positionOptions"
                    :key="item.id"
                    :label="item.displayValue"
                    :value="item.value"
                  ></el-option>-->
                  <el-option label="河南省直第三人民医院" value="1127044659508543488"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="职称：">
                <el-select
                  v-model="prior"
                  filterable
                  placeholder="请选择职称"
                  style="margin-left:7%"
                  @change="changePostion"
                >
                  <el-option
                    v-for="item in positionOptions"
                    :key="item.id"
                    :label="item.displayValue"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="工作电话：">
                <el-input v-model="edit.workerTelNo" style="width: 200px" placeholder="请输入工作电话"></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="24">
              <el-form-item label="擅长：">
                <el-input
                  type="textarea"
                  v-model="edit.advantage"
                  style="width:60%"
                  placeholder="请输入内容"
                  maxlength="500"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="24">
              <el-form-item label="简介：">
                <el-input
                  type="textarea"
                  v-model="edit.summary"
                  style="width:60%"
                  placeholder="请简要介绍一下自己"
                  maxlength="500"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="addDoctorBtn">
            <el-button type="primary" @click="updataDoc()" size="medium">确认</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <!-- 添加医生弹窗 -->
    <el-dialog
      :before-close="closeDialog"
      title="添加医生"
      :visible.sync="dialogDoctorVisible"
      class="addDdoc"
      :close-on-click-modal="false">
      <div class="postionImg">
        <label for class="addImg">添加头像</label>
        <el-upload
          class="avatar-uploader"
          action
          :auto-upload="false"
          :show-file-list="false"
          :on-change="beforeAvatarUpload"
          multiple
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>

      <div>
        <el-form ref="form" :model="form" :rules="rules">
          <el-row>
            <el-col :md="12">
              <el-form-item label="医生姓名：" prop="doctorName">
                <el-input
                  v-model="form.doctorName"
                  style="width: 200px"
                  :required="true"
                  placeholder="请输入医生姓名"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="手机号码：" prop="phone">
                <el-input
                  v-model="form.phone"
                  style="width: 200px"
                  :required="true"
                  placeholder="请输入手机号码"
                  maxlength="11"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="密码：" prop="password">
                <el-input
                  v-model="form.password"
                  :required="true"
                  style="width: 200px;margin-left:7%"
                  placeholder="请设置密码"
                  show-password
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="身份证号：" prop="cardId">
                <el-input
                  v-model="form.cardId"
                  style="width: 200px"
                  :required="true"
                  placeholder="请输入身份证号"
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="一级科室：" prop="addoneName">
                <el-select
                  v-model="form.addoneName"
                  filterable
                  :required="true"
                  placeholder="请选择一级科室"
                  @change="yiSelect(form.addoneName)"
                >
                  <el-option
                    v-for="item in options1Name"
                    :key="item.id"
                    :label="item.departmentName"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="二级科室：" prop="addtwoName">
                <el-select
                  v-model="form.addtwoName"
                  filterable
                  :required="true"
                  placeholder="请选择二级科室名称"
                  @change="getTwoCode"
                >
                  <el-option
                    v-for="item in options2Name"
                    :key="item.id"
                    :label="item.departmentName"
                    :value="item.code"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="性别：">
                <el-select
                  v-model="gender"
                  placeholder="请选择性别"
                  style="margin-left:7%"
                  @change="changeSex"
                >
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="2"></el-option>
                  <el-option label="保密" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="角色：" prop="role">
                <el-select
                  v-model="form.role"
                  filterable
                  :required="true"
                  placeholder="请设置角色名称"
                  style="margin-left:7%"
                  @change="changeRole"
                >
                  <el-option
                    v-for="item in roleOptions"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="医院名称：">
                <el-select
                  v-model="hospital"
                  filterable
                  placeholder="请选择医院名称"
                  @change="changeHospital"
                >
                  <!-- <el-option
                    v-for="item in positionOptions"
                    :key="item.id"
                    :label="item.displayValue"
                    :value="item.value"
                  ></el-option>-->
                  <el-option label="河南省直第三人民医院" value="1127044659508543488"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="职称：">
                <el-select
                  v-model="prior"
                  filterable
                  placeholder="请选择职称"
                  style="margin-left:7%"
                  @change="changePostion"
                >
                  <el-option
                    v-for="item in positionOptions"
                    :key="item.id"
                    :label="item.displayValue"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :md="12">
              <el-form-item label="工作电话：">
                <el-input v-model="form.workerTelNo" style="width: 200px" placeholder="请输入工作电话"></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="24">
              <el-form-item label="擅长：">
                <el-input
                  type="textarea"
                  v-model="form.advantage"
                  style="width:60%"
                  placeholder="请输入内容"
                  maxlength="500"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :md="24">
              <el-form-item label="简介：">
                <el-input
                  type="textarea"
                  v-model="form.summary"
                  style="width:60%"
                  placeholder="请简要介绍一下自己"
                  maxlength="500"
                  show-word-limit
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div class="addDoctorBtn">
            <el-button type="primary" @click="cteateDoctor('form')" size="medium">确认</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import { getDoctor, getClinic } from "@/api/sys/base.js";
import { getList } from "@/api/sys/role.js";
import {
  selectPositionList,
  createDoctor,
  uploadFile,
  updataPwd,
  updataDoctor,
  deleteDoctor
} from "@/api/sys/client.js";
import { Checkcard, isvalidUsername, validateMobile ,validatePhoneTwo} from "@/utils/validate";
export default {
  inject: ["reload"],
  data() {
    return {
      defaultProps1: {
        childern: "childern",
        label: "comName"
      },
      rules: {
        phone: [
          { required: true, message: "请输入手机号码" },
          { validator: validateMobile }
        ],
        doctorName: [{ required: true, message: "请输入您的姓名" }],
        password: [{ required: true, message: "请输入您的密码" }],
        addtwoName: [{ required: true,message: "请输入二级科室" }],
        addoneName: [{ required: true,message: "请输入一级科室"}],
        role: [{ required: true,message: "请输入角色"}],
        hospital: [{ required: true, message: "请输入医院名称" }],
        password: [{ required: true, message: "请输入您的密码" }],
        cardId: [
          { required: true, message: "请输入您的身份证号" },
          { validator: Checkcard }
        ]
      },
      form: {
        summary: "",
        doctorName: "",
        doctorType: "0",
        advantage: "",
        sex: "0",
        hospitalCode: "1127044659508543488",
        password: "",
        cardId: "",
        phone: "",
        roleCode: "",
        departmentLevel1: "",
        departmentLevel2: "",
        position: "",
        originalImgUrl: "",
        workerTelNo: "",
        addtwoName: "",
        addoneName: "",
        role: "",
      },
       edit: {
        summary: "",
        doctorName: "",
        doctorType: "0",
        advantage: "",
        sex: "",
        hospitalCode: "1127044659508543488",
        password: "",
        cardId: "",
        phone: "",
        roleCode: "",
        departmentLevel1: "",
        departmentLevel2: "",
        position: "",
        originalImgUrl: "",
        workerTelNo: "",
      },
      hospital: "河南省直第三人民医院",
      role: "",
      prior:"",
      gender: "",
      addtwoName: "",
      addoneName: "",
      oneName: "",
      twoName: "",
      oneCode: "",
      twoCode: "",
      doctorCode: "",
      dialogDoctorVisible: false,
      dialogeditVisible: false,
      listLoading: false,
      dialogPwdsVisible: false,
      imageUrl: "",
      itemkey: "",
      pwd: "",
      mima:"123123",
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
      partCode: "",
      options1Name: [],
      options2Name: [],
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
      positionOptions: [],
      roleOptions: []
    };
  },
  created() {},
  mounted() {
    this.getListData(this.pageQuery);
    this.fintDesk({ parentCode: 0, isDeleted: 0 });
    this.getJob();
    this.findRole(this.pageQuery);
  },
  methods: {
    closeDialog(done) {
      done();
      this.reload();
    },
    // 更新医生信息接口
    updataDoc() {
      this.edit.departmentLevel1 = this.oneCode;
      this.edit.departmentLevel2 = this.twoCode;
      this.edit.roleCode = this.partCode;
      this.edit.position=this.position
      this.edit.originalImgUrl = this.imageUrl;
      let edit = this.edit;
      edit.doctorCode = this.doctorCode;
      updataDoctor(edit).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.dialogeditVisible = false;
          this.getListData(this.pageQuery);
        } else if (res.code == -1) {
          this.$message.error(res.msg);
        }
      });
    },
    // 启用医生
    toUse(row){
      var code = {
        doctorCode: row.code,
        isDeleted:0
      };
      this.$confirm("此操作将启用此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteDoctor(code).then(res => {
            if (res.code == 0) {
              this.$message.success(res.msg);
              this.getListData(this.pageQuery);
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
    // 禁用医生
    toDelete(row) {
      var code = {
        doctorCode: row.code,
        isDeleted:1
      };
      this.$confirm("此操作将禁用此条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteDoctor(code).then(res => {
            if (res.code == 0) {
              this.$message.success(res.msg);
              this.getListData(this.pageQuery);
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
    // 更新密码
    updataPassword() {
      let pwds = {
        doctorCode: this.doctorCode,
        newPWD: this.pwd
      };
      updataPwd(pwds).then(res => {
        if (res.code == 0) {
          this.dialogPwdsVisible = false;
          this.$message.success(res.msg);
          this.getListData(this.pageQuery);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 更新密码弹窗
    toResetpwd(index, row) {
      this.dialogPwdsVisible = true;
      this.doctorCode = row.code;
    },
    // 调用接口获得角色信息
    findRole(value) {
      getList(value).then(res => {
        var value = res.value.records;
        for (let item in value) {
          if (value[item].roleName == "超级管理员") {
            value.splice(item, 1);
          }
        }
        this.roleOptions = value;
      });
    },
    // 获取select框选中的角色
    changeRole(value) {
      this.form.roleCode = value;
      this.partCode = value;
    },
    // 获取select框选中的医院
    changeHospital(value) {
      this.form.hospitalCode = value;
      this.edit.hospitalCode=value
    },
    // 调用接口获得职称类别
    getJob() {
      // let itemkey="DOCTOR_POSITION_CATEGORY"
      let itemkey = "doctor_position_category";
      selectPositionList(itemkey).then(res => {
        let value = res.value;
        this.positionOptions = value;
      });
    },
    // 创建医生接口
    cteateDoctor() {
      let _this = this;
      _this.form.departmentLevel1 = _this.oneCode;
      _this.form.departmentLevel2 = _this.twoCode;
      if (_this.imageUrl == "") {
        _this.form.originalImgUrl =
          "https://gitee.com/nuo_yi/clientConfig/raw/master/wKgB3VzYulGAeeITAAAY81tooD4990.jpg";
      } else if (_this.imageUrl != "") {
        _this.form.originalImgUrl = _this.imageUrl;
      }
      if (
        _this.form.doctorName == "" ||
        _this.form.password == "" ||
        _this.form.cardId == "" ||
        _this.form.phone == ""||
        _this.form.addoneName==""||
        _this.form.addtwoName==""||
        _this.form.role==""
      ) {
        _this.$message.error("必填数据不能为空");
      } else {
        _this
          .$confirm("此操作将保存该记录, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            _this.dialogDoctorVisible = false;
            createDoctor(_this.form).then(res => {
              if (res.code == 0) {
                _this.$message.success(res.msg);
                _this.getListData(_this.pageQuery);
                _this.reload();
              }
            });
          })
          .catch(() => {
            _this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    // 获得select框选中的职称
    changePostion(value) {
      this.form.position = value;
      this.position=value
    },
    // 获得select框选中的性别
    changeSex(value) {
      this.edit.sex=value
      this.form.sex = value;
    },
    // 上传图片接口
    beforeAvatarUpload(file) {
      var formData = new FormData();
      formData.append("file", file.raw);
      uploadFile(formData).then(res => {
        this.imageUrl = res.value;
      });
    },
    // 搜索按钮——查询医生接口
    getListDoctor(search) {
      let _this = this;
      // if(_this.querys.doctorName!=""){
      //   fountDoctor={  doctorName:_this.querys.doctorName, page:1,limit:10}
      // }
      let fountDoctor = {
        phone: _this.querys.phone,
        doctorName: _this.querys.doctorName,
        leave1Code: _this.oneCode,
        leave2Code: _this.twoCode,
        page: 1,
        limit: 10
      };
      getDoctor(fountDoctor).then(res => {
        _this.$set(_this, "doctorList", res.value.records);
        var value = res.value;
        _this.total = value.total;
        _this.pageQuery.page = value.current;
        _this.pageQuery.limit = value.size;
      });
    },
    // 获取select框二级科室的code
    getTwoCode(value) {
      this.twoCode = value;
    },
    // 二级科室查询接口
    yiSelect(val) {
      let _this = this;
      _this.oneCode = val;
      _this.form.addtwoName = "";
      let parentCode = { parentCode: _this.oneCode };
      getClinic(parentCode).then(res => {
        _this.options2Name = res.value;
      });
    },
    // 查询医生接口
    getListData(pageName) {
      let _this = this;
      getDoctor(pageName).then(res => {
        _this.listLoading = true;
        if (res.code == 0) {
          _this.listLoading = false;
          let value = res.value;
          // this.doctorList = value.records;
          _this.$set(_this, "doctorList", value.records);
          _this.total = value.total;
          _this.pageQuery.page = value.current;
          _this.pageQuery.limit = value.size;
        }
      });
    },
    // 查询医生科室
    fintDesk(val) {
      getClinic(val).then(res => {
        this.options1Name = res.value;
      });
    },
    // 重置按钮
    resetBtn(val) {
      let _this = this;
      _this.oneName = "";
      _this.twoName = "";
      (_this.addtwoName = []), (_this.querys.doctorName = "");
      _this.querys.phone = "";
      getDoctor(val).then(res => {
        // this.doctorList = res.value.records;
        _this.$set(_this, "doctorList", res.value.records);
      });
    },
    // 更改表头颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:rgba(228,248,245,1)";
      } else {
        return "";
      }
    },
    // 编辑弹窗
    toEdit(index, row) {
      let _this = this;
      _this.dialogeditVisible = true;
      _this.edit.workerTelNo=row.workerTelNo
      _this.edit.doctorName=row.doctorName
      _this.edit.phone=row.phone
      _this.edit.cardId=row.cardId
      _this.edit.summary=row.summary
      _this.edit.advantage=row.advantage
      _this.addoneName=row.departmentLevel1Name
      _this.oneCode=row.departmentLevel1
      _this.addtwoName=row.departmentLevel2Name
      _this.twoCode=row.departmentLevel2
      _this.prior=row.positionName
      _this.edit.position=row.position
      _this.role=row.roleName
      _this.partCode=row.roleCode
      if(row.sex==1){
        _this.gender="男"
      }else if(row.sex==2){
        _this.gender="女"
      }else if(row.sex==0){
        _this.gender="保密"
      }
      _this.imageUrl = row.originalImgUrl;
      _this.doctorCode = row.code;
    },
    // 医生弹窗
    addDoctor() {
      this.dialogDoctorVisible = true;
    }
  }
};
</script>


<style scoped>
.icon-sizeWidth .el-button{
  padding:5px 5px
}
.updataPwd {
  text-align: center;
  margin-top: 15px;
}
.postionImg {
  position: relative;
}
.addImg {
  position: absolute;
  top: 20%;
}
.addDoctorBtn {
  text-align: center;
}
.addDdoc >>> .el-textarea__inner {
  height: 120px;
}
.addDdoc >>> .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.addDdoc >>> .avatar-uploader {
  display: inline-block;
  margin-left: 15%;
}
.addDdoc >>> .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.addDdoc >>> .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.addDdoc >>> .avatar {
  width: 150px;
  height: 150px;
  display: block;
}
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
.div-flex {
  width: 85%;
  margin: 0 auto;
  display: flex;
  justify-content: space-around;
}
.div-flex > div > div {
  margin-top: 12px;
}
.div-flex label {
  font-weight: normal;
  font-size: 14px;
}
.buildFile {
  background: #f1c264;
  color: #ffffff;
}
.tableType {
  margin-bottom: 40%;
  position: relative;
}

.tableType .buttomImg {
  width: 75%;
}
.confirm {
  width: 30%;
  margin: 0 auto;
}
</style>

