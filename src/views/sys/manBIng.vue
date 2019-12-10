<template>
  <div class="app-container">
    <div class="filter-container">
      <!-- 条件搜索 -->
        <div class="div-flex">
          <el-row>
            <el-col :md="6" :sm="12" :xs="24">
              <div  class="marginTop">
                <label for>档案编号：</label>
                <el-input
                  placeholder="请输入档案号"
                  @keyup.enter.native="getListData({page:1,limit:10})"
                  v-model="querys.archivesCode"
                  style="width: 200px;"
                />
              </div>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <div  class="marginTop">
                <label for>建档助理：</label>
                <el-input
                  placeholder="请输入建档助理"
                  v-model="querys.healthAssistantName"
                  style="width: 200px;"
                  class="filter-item"
                  @keyup.enter.native="getListData({page:1,limit:10})"
                ></el-input>
              </div>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <div class="marginTop">
                <label for>档案所属人：</label>
                <el-input
                  placeholder="请输入真实姓名"
                  v-model="querys.userName"
                  style="width: 200px;"
                  class="filter-item"
                  @keyup.enter.native="getListData({page:1,limit:10})"
                />
              </div>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <div class="marginTop">
                <label for>建档医生：</label>
                <el-input
                  placeholder="请输入建档医生"
                  v-model="querys.doctorName"
                  style="width: 200px;"
                  class="filter-item"
                  @keyup.enter.native="getListData({page:1,limit:10})"
                ></el-input>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :md="6" :sm="12" :xs="24">
              <div class="marginTop">
                <label for>身份证号：</label>
                <el-input
                  placeholder="请输入身份证号"
                  v-model="querys.userCard"
                  style="width: 200px;"
                  class="filter-item"
                  @keyup.enter.native="getListData({page:1,limit:10})"
                ></el-input>
              </div>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <div class="marginTop">
                <label for>档案状态：</label>
                <el-select v-model="querys.dataStatus" placeholder="请选择">
                  <el-option label="建档完成" value="2"></el-option>
                  <el-option label="待医生建档" value="1"></el-option>
                  <el-option label="档案草稿" value="3"></el-option>
                  <el-option label="待指派医生" value="0"></el-option>
                </el-select>
              </div>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <div class="marginTop">
                <label for>建档日期：</label>
                <el-date-picker
                  v-model="querys.createTime"
                  type="date"
                  placeholder="选择日期"
                  value-format="yyyy-MM-dd"
                  lass="filter-item"
                ></el-date-picker>
              </div>
            </el-col>
            <el-col :md="6" :sm="12" :xs="24">
              <div  class="marginTop" style="opacity:0"></div>
            </el-col>
          </el-row>
        </div>
    </div>
    <!-- 搜索按钮 -->
    <div class="button-seach-regi marginTop">
      <el-button
        plain
        icon="el-icon-search"
        class="search"
        @click="getListData({page:1,limit:10})"
      >搜索</el-button>
      <el-button class="register" @click="IndexBtnReset({page:1,limit:10})">
        <img src="../../../static/png/manbin_icon_chongzhi.png">重置
      </el-button>
    </div>
    <!-- 档案建立 -->
    <!--<div class="createBase">-->
      <!--<el-button-->
        <!--v-if="hasPermission('manbing:edit')"-->
        <!--class="buildFile"-->
        <!--plain-->
        <!--icon="el-icon-circle-plus-outline"-->
        <!--@click="toBaseFile"-->
      <!--&gt;建立用户档案</el-button>-->
    <!--</div>-->
    <!-- 档案列表 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      class="marginTop"
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="getRowClass"
    >
      <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
      <el-table-column label="档案编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.archivesCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="档案所属人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userCard }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建档时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime}}</span>
        </template>
      </el-table-column>
      <el-table-column label="建档助理" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.healthAssistantName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建档医生" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.doctorName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="档案状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dataStatus | complateState}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="390px" align="center">
        <template slot-scope="scope">
          <div class="icon-sizeWidth">
             <el-button
              @click="toSuifang(scope.$index, scope.row)"
              type="primary"
              icon="el-icon-thumb"
              size="mini"
              v-if="hasPermission('manbing:visit')"
            >一键随访</el-button>
            <el-button
              @click="toEdit(scope.$index, scope.row)"
              
              v-if="hasPermission('manbing:edit')"
              type="warning"
              icon="el-icon-edit-outline"
              size="mini"
            >编辑</el-button>
            <el-button
              @click="toDoctor(scope.$index, scope.row)"
              v-show="baseLBTN2(scope.row.dataStatus,scope.row.healthAssistantName)"
              v-if="hasPermission('manbing:pront')"
              type="success"
              icon="el-icon-user-solid
"
              size="mini"
            >指派医生</el-button>
            <el-button
              @click="toAttached(scope.$index, scope.row)"
              v-show="baseLBTN3(scope.row.dataStatus)"
              type="danger"
              v-if="hasPermission('manbing:addfb')"
              icon="el-icon-folder-add"
              size="mini"
            >添加附表</el-button>
            <el-button
              @click="toPreview(scope.$index, scope.row)"
              v-if="hasPermission('manbing:query')"
              type="primary"
              icon="el-icon-view"
              size="mini"
            >预览</el-button>
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
      title=" 请选择你要添加的附表"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="clearData"
    >
      <div class="allTable">
        <div class="tableButton" @click="addFile">
          <div>
            <el-button class="tableType" :disabled="disabledFu" v-if="hasPermission('manbing:baseFB')">
              <img
                data-filenum="1"
                class="absoluteImg"
                src="../../../static/png/manbintc_button_mbdafb.png"
                alt
              >
              <img
                data-filenum="1"
                v-show="addFileObj.selectionbase"
                class="selection"
                src="../../../static/png/manbintc_button_selection.png"
                alt
              >
              <img
                data-filenum="1"
                class="buttomImg"
                src="../../../static/png/manbintc_button_normal.png"
              >
              <i class="el-icon-success table_icon" v-show="addFileObj.selectionbase"></i>
              <p class="bingBiao">慢病档案基础附表</p>
            </el-button>
            <el-button class="tableType" :disabled="disabledFu"  v-if="hasPermission('manbing:coronary')">
              <img
                data-filenum="2"
                class="absoluteImg"
                src="../../../static/png/manbintc_button_guanxinb.png"
                alt
              >
              <img
                data-filenum="2"
                v-show="addFileObj.selectionGuanXin"
                class="selection"
                src="../../../static/png/manbintc_button_selection.png"
                alt
              >
              <img
                data-filenum="2"
                class="buttomImg"
                src="../../../static/png/manbintc_button_normal.png"
                alt
              >
              <i class="el-icon-success table_icon" v-show="addFileObj.selectionGuanXin"></i>
              <p class="bingBiao">冠心病随访表</p>
            </el-button>
          </div>
          <div>
            <el-button class="tableType" v-if="hasPermission('manbing:diabetes')" :disabled="disabledFu">
              <img
                data-filenum="3"
                class="absoluteImg"
                src="../../../static/png/manbintc_button_tlb.png"
                alt
              >
              <img
                data-filenum="3"
                v-show="addFileObj.selectionTangNiao"
                class="selection"
                src="../../../static/png/manbintc_button_selection.png"
                alt
              >
              <img
                data-filenum="3"
                class="buttomImg"
                src="../../../static/png/manbintc_button_normal.png"
                alt
              >
              <i class="el-icon-success table_icon" v-show="addFileObj.selectionTangNiao"></i>
              <p class="bingBiao">糖尿病附表</p>
            </el-button>
            <el-button
              class="tableType"
              :disabled="disabledChu"
              @click="fitPlans(1)"
              v-if="hasPermission('manbing:recipe')"
            >
              <img
                data-filenum="4"
                class="absoluteImg"
                src="../../../static/png/manbintc_button_mbcf.png"
                alt
              >
              <img
                data-filenum="4"
                v-show="addFileObj.selectionChuFang"
                class="selection"
                src="../../../static/png/manbintc_button_selection.png"
                alt
              >
              <img
                data-filenum="4"
                class="buttomImg"
                src="../../../static/png/manbintc_button_normal.png"
                alt
              >
              <i class="el-icon-success table_icon" v-show="addFileObj.selectionChuFang"></i>

              <p class="bingBiao">慢病处方</p>
            </el-button>
          </div>
          <div>
            <el-button class="tableType" :disabled="disabledFu"  v-if="hasPermission('manbing:chronic')">
              <img
                data-filenum="5"
                class="absoluteImg"
                src="../../../static/png/manbintc_button_mzf.png"
                alt
              >
              <img
                data-filenum="5"
                v-show="addFileObj.selectionManZF"
                class="selection"
                src="../../../static/png/manbintc_button_selection.png"
                alt
              >
              <img
                data-filenum="5"
                class="buttomImg"
                src="../../../static/png/manbintc_button_normal.png"
                alt
              >
              <i class="el-icon-success table_icon" v-show="addFileObj.selectionManZF"></i>

              <p class="bingBiao">慢阻肺附表</p>
            </el-button>
          </div>
        </div>
        <div class="confirm">
          <el-button @click="addFileToBase" class="confirmButton">确认</el-button>
        </div>
      </div>
    </el-dialog>
    <!-- 指派医生 -->
    <el-dialog
      :visible.sync="dialogDoctorVisible"
      :before-close="closeDialog"
      :close-on-click-modal="false"
      title=" 请选择医生"
    >
      <div>
        <div class="doctorDialog">
          <div>
            <div class="keshichoic">一级科室名称：</div>
            <el-select
              v-model="oneClinic"
              filterable
              placeholder="请选择一级科室名称"
              @change="yiSelect(oneClinic)"
            >
              <el-option
                v-for="item in oneOptions"
                :key="item.id"
                :label="item.departmentName"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div>
            <div class="keshichoic">二级科室名称：</div>
            <el-select
              v-model="twoClinic"
              placeholder="请选择二级科室名称"
              filterable
              @change="erSelect(twoClinic)"
            >
              <el-option
                v-for="item in twoOptions"
                :key="item.id"
                :label="item.departmentName"
                :value="item.code"
              ></el-option>
            </el-select>
          </div>
          <div>
            <div class="keshichoic">医生姓名：</div>
            <el-select
              v-model="doctorNameClinic"
              placeholder="请选择医生姓名"
              filterable
              @change="doctorPage(doctorNameClinic)"
            >
              <el-option
                v-for="(item,index) in doctorOptions"
                :key="index"
                :label="item.doctorName"
                :value="item.doctorName"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="dsearchRige">
          <el-button size="mini" class="doctorSearch" @click="getListDoctor()">查询</el-button>
          <el-button size="mini" class="doctorRegiste" @click="doctorReset()">重置</el-button>
        </div>
        <div class="doctor">
          <div class="doctorAll" v-for="(item,index) in doctorArr" :key="index">
            <el-button size="mini" class="zhipai" @click="assign(item.code,item.doctorName)">指派</el-button>
            <div>
              <img :src="item.originalImgUrl" alt>
              <div class="doctorName">
                <h4>{{item.doctorName}}</h4>
                <div class="career">
                  <div>{{item.positionName}}</div>
                  <div>{{item.departmentLevel1Name}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <pagination
          v-show="dtotal>0"
          :total="dtotal"
          :page.sync="dpageQuery.dpage"
          :limit.sync="dpageQuery.dlimit"
          @pagination="getAllDoctor"
        />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { validateMobile } from "../../utils/validate";
import {
  getPagelist,
  getClinic,
  getDoctor,
  getAssign,
  getCode
} from "@/api/sys/base.js";
export default {
  inject: ["reload"],
  data() {
    return {
      defaultProps1: {
        childern: "childern",
        label: "comName"
      },
      _baseUrl: process.env.BASE_API,
      get baseUrl() {
        return this._baseUrl;
      },
      set baseUrl(value) {
        this._baseUrl = value;
      },
      listLoading: false,
      list: [],
      user: this.$store.state.user.dataUser,
      fitness: "",
      disabledChu: false,
      disabledFu: false,
      None: true,
      doctorArr: [],
      oneOptions: [],
      twoOptions: [],
      doctorOptions: [],
      twoSelect: "",
      addfuNum:0,
      doctorNameClinic: "",
      dialogFormVisible: false,
      oneClinic: "",
      twoClinic: "",
      oneCode: "",
      twoCode: "",
      userCode: "",
      responseList:[],
      querys: {
        archivesCode: "",
        userName: "",
        userCard: "",
        createTime: "",
        healthAssistantName: "",
        doctorName: "",
        dataStatus: ""
      },
      total: 0,
      pageQuery: {
        page: 1,
        limit: 10
      },
      dtotal: 0,
      dpageQuery: {
        dpage: 1,
        dlimit: 10
      },
      dialogDoctorVisible: false,
      multipleSelection: [],
      addFileObj: {
        selectionbase: false,
        selectionGuanXin: false,
        selectionTangNiao: false,
        selectionChuFang: false,
        selectionManZF: false
      },
      row: {}
    };
  },
  watch: {},
  mounted() {
    this.getListData(this.pageQuery);
    this.getListClinic({ parentCode: 0, isDeleted: 0 });
    this.getAllDoctor({ page: 1, limit: 10, isManage: 1 });
  },
  created() {},
  methods: {
    closeDialog(done) {
      done();
      this.reload();
    },
    // 状态控制按钮
    baseLBTN1(value) {
      if (value == 3 ||value == 4) {
        return true;
      } else {
        return false;
      }
    },
    baseLBTN2(value,name) {
        if ((value == 0||value==1)&&name==this.user.name) {
        return true;
      } else if(value==4){
        return false;
      }
    },
    baseLBTN3(value) {
      if (value != 3) {
        return true;
      } else {
        return false;
      }
    },
    // 自动获取所有医生列表查询
    getAllDoctor(val) {
      let _this = this;
      getDoctor(val).then(res => {
        var value = res.value;
        _this.doctorArr = value.records;
        _this.$set(_this, "doctorOptions", value.records);
        _this.dtotal = value.total;
        _this.dpageQuery.dpage = value.current;
        _this.dpageQuery.dlimit = value.size;
      });
    },
    // 一级科室查询接口
    getListClinic(clinic) {
      let _this = this;
      getClinic(clinic).then(res => {
        _this.oneOptions = res.value;
      });
    },
    // 二级科室查询接口
    yiSelect(val) {
      let _this = this;
      _this.oneCode = val;
      this.addtwoName = "";
      var parentCode = { parentCode: _this.oneCode };
      getClinic(parentCode).then(res => {
        _this.twoOptions = res.value;
      });
    },
    // 医生姓名接口查询
    erSelect(val) {
      let _this = this;
      _this.twoCode = val;
      var doctorNameCheck = {
        leave1Code: _this.oneCode,
        leave2Code: _this.twoCode,
        isManage: "1"
      };
      getDoctor(doctorNameCheck).then(res => {
        _this.doctorOptions = res.value;
      });
    },
    // 获取医生姓名
    doctorPage(val) {
      let _this = this;
      _this.doctorNameClinic = val;
    },
    // 点击查询——医生分页查询
    getListDoctor() {
      let _this = this;
      let doctorPage = {
        leave1Code: _this.oneCode,
        leave2Code: _this.twoCode,
        isManage: 1,
        page: 1,
        limit: 10,
        doctorName: _this.doctorNameClinic
      };
      getDoctor(doctorPage).then(res => {
        _this.doctorArr = res.value.records;
        _this.dtotal = res.value.total;
        _this.dpageQuery.dpage = res.value.current;
        _this.dpageQuery.dlimit = res.value.size;
      });
    },
    // 医生查询接口重置
    doctorReset() {
      let _this = this;
      _this.oneClinic = "";
      _this.twoClinic = "";
      _this.twoOptions = [];
      _this.doctorNameClinic = "";
      _this.oneCode = "";
      (_this.twoCode = ""),
        _this.getAllDoctor({ page: 1, limit: 10, isManage: 1 });
    },
    // 医生指派接口
    assign(Dcode, name) {
      let _this = this;
      let point = {
        doctorCode: Dcode,
        doctorName: name,
        code: _this.userCode
      };
      getAssign(point).then(res => {
        if (res.code == 0) {
          this.$message.success(res.msg);
          this.dialogDoctorVisible = false;
          this.getListData(this.pageQuery);
        }
      });
    },
    // 分页列表查询接口
    getListData(pageQueryParam) {
      let _this = this;
      pageQueryParam.userName = _this.querys.userName;
      pageQueryParam.userCard = _this.querys.userCard;
      pageQueryParam.doctorName = _this.querys.doctorName;
      pageQueryParam.createTime = _this.querys.createTime;
      pageQueryParam.archivesCode = _this.querys.archivesCode;
      pageQueryParam.healthAssistantName = _this.querys.healthAssistantName;
      pageQueryParam.dataStatus = _this.querys.dataStatus;
      _this.listLoading = true;
      _this.list.length = 0;
      getPagelist(pageQueryParam).then(response => {
        _this.listLoading = false;
        if (response.code == 0) {
          let value = response.value;
          //this.list = value.records;
          _this.$set(_this, "list", value.records);
          _this.$nextTick(function() {});
          _this.total = value.total;
          _this.pageQuery.page = value.current;
          _this.pageQuery.limit = value.size;
        }
      });
    },
    // 重置搜索内容
    IndexBtnReset(val) {
      let _this = this;
      _this.querys.userName = "";
      _this.querys.userCard = "";
      _this.querys.doctorName = "";
      _this.querys.createTime = "";
      _this.querys.code = "";
      _this.querys.healthAssistantName = "";
      _this.querys.dataStatus = "";
      getPagelist(val).then(response => {
        _this.listLoading = false;
        if (response.code == 0) {
          let value = response.value;
          _this.list = value.records;
          _this.total = value.total;
          _this.pageQuery.page = value.current;
          _this.pageQuery.limit = value.size;
        }
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
    // 指派医生弹窗
    toDoctor(index, val) {
      this.userCode = val.code;
      this.dialogDoctorVisible = true;
    },
    // 跳转到慢病主表档案
    toBaseFile() {
      this.$router.push("/base");
    },
    // 添加附表按钮——带参数
    toAttached(index, row) {
      this.row = row;
      this.dialogFormVisible = true;
    },
    // 一键随访按钮
    toSuifang(index,row){
      let _this=this
      // _this.$bus.emit("suifang",1)
      _this.$bus.emit("contactUsesr", 1);
    },
    // 慢病主表编辑状态
    toEdit(index, row) {
      let _this = this;
      let code = row.code;
      sessionStorage.setItem("code", JSON.stringify(code));
      _this.$router.push("/editBase");
    },
    // 添加用户点击的附表
    addFile(e) {
      if (e.target.nodeName == "IMG") {
        var number = e.target.dataset.filenum;
        if (number == 1 && this.disabledFu == false) {
          this.addFileObj.selectionbase = !this.addFileObj.selectionbase;
          if(this.addFileObj.selectionbase){
            this.addfuNum+=1
          }else{
            this.addfuNum-=1
          }
        } else if (number == 2 && this.disabledFu == false) {
          this.addFileObj.selectionGuanXin = !this.addFileObj.selectionGuanXin;
          if(this.addFileObj.selectionGuanXin){
            this.addfuNum+=1
          }else{
            this.addfuNum-=1
          }
        } else if (number == 3 && this.disabledFu == false) {
          this.addFileObj.selectionTangNiao = !this.addFileObj
            .selectionTangNiao;
            if(this.addFileObj.selectionTangNiao){
            this.addfuNum+=1
          }else{
            this.addfuNum-=1
          }
        } else if (number == 4 && this.disabledChu == false) {
          this.addFileObj.selectionChuFang = !this.addFileObj.selectionChuFang;
          if(this.addFileObj.selectionChuFang){
            this.addfuNum+=1
          }else{
            this.addfuNum-=1
          }
          this.disabledFu = !this.disabledFu;
        } else if (number == 5 && this.disabledFu == false) {
          this.addFileObj.selectionManZF = !this.addFileObj.selectionManZF;
           if(this.addFileObj.selectionManZF){
            this.addfuNum+=1
          }else{
            this.addfuNum-=1
          }
        }
        if (
          this.addFileObj.selectionbase == true ||
          this.addFileObj.selectionGuanXin == true ||
          this.addFileObj.selectionTangNiao == true ||
          this.addFileObj.selectionManZF == true
        ) {
          this.disabledChu = true;
        } else {
          this.disabledChu = false;
        }
      }
    },
    // 清楚选择附表的数据
    clearData() {
      for (const item in this.addFileObj) {
        this.addFileObj[item] = false;
      }
      this.disabledFu = false;
      this.disabledChu = false;
    },
    // 附表确认建档
    addFileToBase(e) {
      for (const item in this.addFileObj) {
        this.confim = this.addFileObj[item] || this.confim;
      }
      if (this.confim) {
        sessionStorage.setItem("data", JSON.stringify(this.addFileObj)); //把data对应的值保存到sessionStorage
        // sessionStorage.setItem("data", this.addFileObj); //把data对应的值保存到sessionStorage
        let baseValue = {};
        baseValue.userAge = this.row.userAge;
        baseValue.code = this.row.code;
        baseValue.archivesCode=this.row.archivesCode
        baseValue.userName = this.row.userName;
        let value = JSON.stringify(baseValue);
        sessionStorage.setItem("baseValue", value); //把data对应的值保存到sessionStorage
        sessionStorage.setItem("num",this.addfuNum)
        // 判断是否选择了慢病处方
        if (this.fitness == 1) {
          this.$router.push("/fitPlan");
          let fitRow = JSON.stringify(this.row);
          sessionStorage.setItem("fitRow", fitRow);
        } else {
          this.$router.push("/tableFile");
        }
      }
    },
    // 若选择了慢病处方则触发此函数--带有参数为1
    fitPlans(val) {
      this.fitness = val;
    },
    // 预览功能
    toPreview(index, row) {
      sessionStorage.setItem("code", JSON.stringify(row));
      this.$router.push("/Ybase");
    }
  }
};
</script>

<style scoped>
.icon-sizeWidth .el-button {
  padding: 5px 5px;
}
.career {
  display: flex;
  justify-content: space-between;
  padding: 5px 5px;
}
.div-flex label {
  font-size: 14px;
  font-weight: normal;
}

.choicTable {
  background: #ccc;
}

.div-flex > div {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
}

.button-seach-regi {
  text-align: center;
}

.button-seach-regi img {
  width: 30%;
}

.search {
  color: #ffffff;
  background-color: #56c8ac;
}

.register {
  color: #56c8ac;
  background-color: #ffffff;
}

.buildFile {
  background: #f1c264;
  color: #ffffff;
}

.allTableType {
  width: 100%;
  height: 100%;
}

.allTable {
  width: 100%;
  text-align: center;
}

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.allTable {
  width: 100%;
  margin: 0 auto;
}

.tableButton > .el-button {
  margin-bottom: 5px;
  width: 25%;
  margin-left: 45px;
}
.tableButton >>> .el-button {
  border: none !important;
  padding: 0;
  display: block;
}
.tableButton >>> .el-button:hover {
  color: none !important;
}
.tableButton {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
}

.marginTop {
  margin-top: 10px;
}

.tableType {
  margin-bottom: 40%;
  position: relative;
}
.table_icon {
  position: absolute;
  bottom: 30px;
  right: 5px;
}
.selection {
  position: absolute;
  width: 75%;
}
.absoluteImg {
  position: absolute;
  left: 23%;
  bottom: 34%;
}

.tableType .buttomImg {
  width: 75%;
}

.confirm {
  width: 30%;
  margin: 0 auto;
}

.confirmButton {
  background: #56c8ac;
  color: #ffffff;
  width: 100%;
}

.el-dialog__header {
  background: #e4f8f5;
}

.el-dialog__body {
  height: 60vh;
  overflow: auto;
}
.el-dialog__title {
  font-size: 17px;
}

/*指派医生  */
.doctorDialog {
  display: flex;
  justify-content: space-between;
}
.doctorDialog > div {
  margin-left: 5%;
}
.keshichoic {
  padding-bottom: 5px;
}
.dsearchRige {
  height: 100%;
  width: 50%;
  margin: 0 auto;
  padding-top: 15px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
}

.dsearchRige .el-button {
  width: 40%;
}

.doctorSearch {
  background-color: #56c8ac;
  color: #ffffff;
}

.doctorRegiste {
  background-color: #f1c264;
  color: #ffffff;
}

.doctor {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.doctorAll {
  width: 18%;
  text-align: center;
  border: 1px solid #ddd;
  position: relative;
  margin: 5px;
  border-radius: 3px;
}
@media screen and (min-width: 1280px) and (max-width: 2000px) {
  .doctorAll {
    width: 23%;
    text-align: center;
    border: 1px solid #ddd;
    position: relative;
    margin: 5px;
    border-radius: 3px;
  }
  .zhipai {
    position: absolute;
    background: #50c0b4;
    left: 44px;
    top: 50%;
    color: #fff;
    opacity: 0;
  }
}
.doctorAll img {
  width: 100%;
  height: 135px;
}

.zhipai {
  position: absolute;
  background: #50c0b4;
  left: 30%;
  top: 50%;
  color: #fff;
  opacity: 0;
}

.doctorAll:hover .zhipai {
  opacity: 1;
}

.doctorName {
  background-color: #50c0b4;
  color: #ffffff;
}

.doctorName h4 {
  padding-top: 10px;
}
.doctorPosition {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
}

.paging {
  width: 50%;
  margin: 0 auto;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background: #56c8ac;
}
</style>
