<template>
  <div class="app-container">
    <div class="div-flex">
      <div class="marginTop">
        <label for>申请人：</label>
        <el-input
          placeholder="请输入申请人"
          v-model="querys.userName"
          style="width: 200px;"
          class="filter-item"
        />
      </div>
      <div class="marginTop">
        <label for>申请类型：</label>
        <el-select v-model="querys.type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="marginTop">
        <label for>申请日期：</label>

        <el-date-picker
          v-model="querys.singDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </div>
    </div>
    <!-- 搜索按钮 -->
    <div class="button-seach-regi" style="margin:15px 0;">
      <el-button plain icon="el-icon-search" class="search" @click="getListData(querys)">搜索</el-button>
      <el-button class="reset" @click="resetBtn({page:1,limit:10})">
        <img src="../../../static/png/manbin_icon_chongzhi.png">重置
      </el-button>
    </div>

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
      <el-table-column label="申请类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.singType|sinType}}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="身份证号" align="center" width="170">
        <template slot-scope="scope">
          <span>{{ scope.row.userCharId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userSex|conplateSex}}</span>
        </template>
      </el-table-column>
      <el-table-column label="生日" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userBirthday }}</span>
        </template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userAge }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名族" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.famousRace }}</span>
        </template>
      </el-table-column>
      <el-table-column label="婚姻状况" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.marriage|marriage }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文化程度" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.diploma }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作单位" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userContacts }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职业" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userOccupation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请签约团队" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.singHealthName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="需要更换团队" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.updateHealthName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="申请日期" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime | time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="审核状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dataStatus|checkStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            type="primary"
            v-show="scope.row.dataStatus == 0"
            size="mini"
            @click="Audit(scope)"
            v-if="hasPermission('sigin:audit')"
          >审核</el-button>
          <el-button
            size="mini"
            type="danger"
            :loading="scope.row.loading"
            v-show="scope.row.dataStatus != 0"
            v-if="hasPermission('sign:query')"
            @click="previewDetail(scope)"
          >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="签约申请详情" :visible.sync="dialogsigningDetialVisible" class="audit">
      <div>
        <p>
          审核编号：
          <span>{{auditDetial.code}}</span>
        </p>
        <p>
          状态：
          <span>{{auditDetial.dataStatus | checkStatus}}</span>
        </p>
      </div>
      <div class="allaudiDisplay">
        <div class="auditDisplay">
          <div>
            <p>
              <b>标题：</b>
              <span>{{auditDetial.title}}</span>
            </p>
            <p>
              <b>申请签约团队：</b>
              <span>{{auditDetial.singHealthName}}</span>
            </p>

            <p>
              <b>申请人：</b>
              <span>{{auditDetial.userName}}</span>
            </p>
            <p>
              <b>性别：</b>
              <span>{{auditDetial.userSex | conplateSex}}</span>
            </p>
            <p>
              <b>年龄：</b>
              <span>{{auditDetial.userAge}}</span>
            </p>
            <p>
              <b>婚姻状况：</b>
              <span>{{auditDetial.marriage | marriage}}</span>
            </p>
            <p>
              <b>工作单位：</b>
              <span>{{auditDetial.userContacts}}</span>
            </p>
            <p>
              <b>常住地址：</b>
              <span>{{auditDetial.address}}</span>
            </p>
            <p>
              <b>紧急联系人：</b>
              <span>{{auditDetial.contacts}}</span>
            </p>
          </div>
          <div>
            <p>
              <b>申请类型：</b>
              <span>{{auditDetial.singType | sinType}}</span>
            </p>
            <p>
              <b>所属医院：</b>
              <span>{{auditDetial.hospitalName}}</span>
            </p>
            <p>
              <b>手机号：</b>
              <span>{{auditDetial.userPhone}}</span>
            </p>
            <p>
              <b>生日：</b>
              <span>{{auditDetial.userBirthday}}</span>
            </p>
            <p>
              <b>身份证号：</b>
              <span>{{auditDetial.userCharId}}</span>
            </p>
            <p>
              <b>民族：</b>
              <span>{{auditDetial.famousRace}}</span>
            </p>
            <p>
              <b>文化程度：</b>
              <span>{{auditDetial.diploma}}</span>
            </p>
            <p>
              <b>职业：</b>
              <span>{{auditDetial.userOccupation}}</span>
            </p>
            <p>
              <b>紧急联系人电话：</b>
              <span>{{auditDetial.contactsTel}}</span>
            </p>
          </div>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="签约申请审核" :visible.sync="dialogsigningVisible" class="audit">
      <div>
        <p>
          审核编号：
          <span>{{auditDetial.code}}</span>
        </p>
        <p>
          状态：
          <span>{{auditDetial.dataStatus | checkStatus}}</span>
        </p>
      </div>
      <div class="allaudiDisplay">
        <div class="auditDisplay">
          <div>
            <p>
              <b>标题：</b>
              <span>{{auditDetial.title}}</span>
            </p>
            <p>
              <b>申请签约团队：</b>
              <span>{{auditDetial.singHealthName}}</span>
            </p>

            <p>
              <b>申请人：</b>
              <span>{{auditDetial.userName}}</span>
            </p>
            <p>
              <b>性别：</b>
              <span>{{auditDetial.userSex | conplateSex}}</span>
            </p>
            <p>
              <b>年龄：</b>
              <span>{{auditDetial.userAge}}</span>
            </p>
            <p>
              <b>婚姻状况：</b>
              <span>{{auditDetial.marriage | marriage}}</span>
            </p>
            <p>
              <b>工作单位：</b>
              <span>{{auditDetial.userContacts}}</span>
            </p>
            <p>
              <b>常住地址：</b>
              <span>{{auditDetial.address}}</span>
            </p>
            <p>
              <b>紧急联系人：</b>
              <span>{{auditDetial.contacts}}</span>
            </p>
          </div>
          <div>
            <p>
              <b>申请类型：</b>
              <span>{{auditDetial.singType | sinType}}</span>
            </p>
            <p>
              <b>所属医院：</b>
              <span>{{auditDetial.hospitalName}}</span>
            </p>

            <p>
              <b>手机号：</b>
              <span>{{auditDetial.userPhone}}</span>
            </p>
            <p>
              <b>生日：</b>
              <span>{{auditDetial.userBirthday}}</span>
            </p>
            <p>
              <b>身份证号：</b>
              <span>{{auditDetial.userCharId}}</span>
            </p>
            <p>
              <b>民族：</b>
              <span>{{auditDetial.famousRace}}</span>
            </p>
            <p>
              <b>文化程度：</b>
              <span>{{auditDetial.diploma}}</span>
            </p>
            <p>
              <b>职业：</b>
              <span>{{auditDetial.userOccupation}}</span>
            </p>
            <p>
              <b>紧急联系人电话：</b>
              <span>{{auditDetial.contactsTel}}</span>
            </p>
          </div>
        </div>
        <div class="save_cancel">
          <el-button type="success" @click="agree">同意签约</el-button>
          <el-button type="warning" @click="refusedAudit">拒绝</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="变更详情" :visible.sync="dialogDetialVisible" class="audit">
      <div>
        <p>
          审核编号：
          <span>{{auditDetial.code}}</span>
        </p>
        <p>
          状态：
          <span>{{auditDetial.dataStatus | checkStatus}}</span>
        </p>
      </div>
      <div class="allaudiDisplay">
        <div class="auditDisplay">
          <div>
            <p>
              <b>标题：</b>
              <span>{{auditDetial.title}}</span>
            </p>
            <p>
              <b>原签约团队：</b>
              <span>{{auditDetial.singHealthName}}</span>
            </p>
            <p>
              <b>原团队所属医院：</b>
              <span>{{auditDetial.hospitalName}}</span>
            </p>
            <p>
              <b>申请人：</b>
              <span>{{auditDetial.userName}}</span>
            </p>
            <p>
              <b>性别：</b>
              <span>{{auditDetial.userSex | conplateSex}}</span>
            </p>
            <p>
              <b>年龄：</b>
              <span>{{auditDetial.userAge}}</span>
            </p>
            <p>
              <b>婚姻状况：</b>
              <span>{{auditDetial.marriage | marriage}}</span>
            </p>
            <p>
              <b>工作单位：</b>
              <span>{{auditDetial.userContacts}}</span>
            </p>
            <p>
              <b>常住地址：</b>
              <span>{{auditDetial.address}}</span>
            </p>
            <p>
              <b>紧急联系人：</b>
              <span>{{auditDetial.contacts}}</span>
            </p>
          </div>
          <div>
            <p>
              <b>申请类型：</b>
              <span>{{auditDetial.singType | sinType}}</span>
            </p>
            <!-- <p>
              <b>所属医院：</b>
              <span>{{auditDetial.hospitalName}}</span>
            </p> -->
            <p>
              <b>变更团队：</b>
              <span>{{auditDetial.updateHealthName}}</span>
            </p>

            <p>
              <b>变更团队所属医院：</b>
              <span>{{auditDetial.hospitalName}}</span>
            </p>
            <p>
              <b>手机号：</b>
              <span>{{auditDetial.userPhone}}</span>
            </p>
            <p>
              <b>生日：</b>
              <span>{{auditDetial.userBirthday}}</span>
            </p>
            <p>
              <b>身份证号：</b>
              <span>{{auditDetial.userCharId}}</span>
            </p>
            <p>
              <b>民族：</b>
              <span>{{auditDetial.famousRace}}</span>
            </p>
            <p>
              <b>文化程度：</b>
              <span>{{auditDetial.diploma}}</span>
            </p>
            <p>
              <b>职业：</b>
              <span>{{auditDetial.userOccupation}}</span>
            </p>
            <p>
              <b>紧急联系人电话：</b>
              <span>{{auditDetial.contactsTel}}</span>
            </p>
          </div>
        </div>
        <div class="auditPw">
          <label>变更申请原因:</label>
          <el-input type="textarea" rows="5" v-model="auditDetial.updateRemark"></el-input>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="变更申请审核" :visible.sync="dialogAuditVisible" class="audit">
      <div>
        <p>
          审核编号：
          <span>{{auditDetial.code}}</span>
        </p>
        <p>
          状态：
          <span>{{auditDetial.dataStatus | checkStatus}}</span>
        </p>
      </div>
      <div class="allaudiDisplay">
        <div class="auditDisplay">
          <div>
            <p>
              <b>标题：</b>
              <span>{{auditDetial.title}}</span>
            </p>
            
            <p>
              <b>原签约团队：</b>
              <span>{{auditDetial.singHealthName}}</span>
            </p>
            <p>
              <b>原团队所属医院：</b>
              <span>{{auditDetial.hospitalName}}</span>
            </p>
            <p>
              <b>申请人：</b>
              <span>{{auditDetial.userName}}</span>
            </p>
            <p>
              <b>性别：</b>
              <span>{{auditDetial.userSex | conplateSex}}</span>
            </p>
            <p>
              <b>年龄：</b>
              <span>{{auditDetial.userAge}}</span>
            </p>
            <p>
              <b>婚姻状况：</b>
              <span>{{auditDetial.marriage | marriage}}</span>
            </p>
            <p>
              <b>工作单位：</b>
              <span>{{auditDetial.userContacts}}</span>
            </p>
            <p>
              <b>常住地址：</b>
              <span>{{auditDetial.address}}</span>
            </p>
            <p>
              <b>紧急联系人：</b>
              <span>{{auditDetial.contacts}}</span>
            </p>
          </div>
          <div>
            <p>
              <b>申请类型：</b>
              <span>{{auditDetial.singType | sinType}}</span>
            </p>
            <!-- <p>
              <b>所属医院：</b>
              <span>{{auditDetial.hospitalName}}</span>
            </p> -->
            <p>
              <b>变更团队：</b>
              <span>{{auditDetial.updateHealthName}}</span>
            </p>

            <p>
              <b>变更团队所属医院：</b>
              <span>{{auditDetial.hospitalName}}</span>
            </p>
            <p>
              <b>手机号：</b>
              <span>{{auditDetial.userPhone}}</span>
            </p>
            <p>
              <b>生日：</b>
              <span>{{auditDetial.userBirthday}}</span>
            </p>
            <p>
              <b>身份证号：</b>
              <span>{{auditDetial.userCharId}}</span>
            </p>
            <p>
              <b>民族：</b>
              <span>{{auditDetial.famousRace}}</span>
            </p>
            <p>
              <b>文化程度：</b>
              <span>{{auditDetial.diploma}}</span>
            </p>
            <p>
              <b>职业：</b>
              <span>{{auditDetial.userOccupation}}</span>
            </p>
            <p>
              <b>紧急联系人电话：</b>
              <span>{{auditDetial.contactsTel}}</span>
            </p>
          </div>
        </div>
        <div class="auditPw">
          <label>变更申请原因:</label>
          <el-input type="textarea" rows="5" v-model="auditDetial.updateRemark"></el-input>
        </div>
      </div>
      <div class="save_cancel">
        <el-button type="success" @click="agree()">同意签约</el-button>
        <el-button type="warning" @click="refusedAudit">拒绝</el-button>
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
import {
  deleteObjs,
  getList,
  saveOrUpdate,
  getOne,
  checkSing,
} from "@/api/sign/BsSignApplication";

export default {
  data() {
    return {
      dialogsigningVisible: false,
      dialogsigningDetialVisible: false,
      dialogDetialVisible: false,
      dialogAuditVisible: false,
      options: [
        {
          value: "0",
          label: "签约"
        },
        {
          value: "1",
          label: "变更"
        }
      ],
      auditDetial: {},
      scopedData: {},
      querys: {
        userName: "",
        type: "",
        singDate: "",
        page: 1,
        limit: 10
      },
      list: [],
      listLoading: false,
      dialogFormVisible: false,
      applicantName: "",
      btnLoading: false,
      obj: {
        id: "",
        code: "",
        singType: "",
        title: "",
        singHealthCode: "",
        updateHealthCode: "",
        updateRemark: "",
        dataStatus: "",
        userCode: "",
        userName: "",
        userSex: "",
        userBirthday: "",
        userAge: "",
        userCharId: "",
        famousRace: "",
        marriage: "",
        diploma: "",
        userContacts: "",
        userOccupation: "",
        contacts: "",
        contactsTel: "",
        address: "",
        singHealthName: "",
        hospitalCode: "",
        hospitalName: "",
        userPhone: "",
        updateHealthName: "",
        isDeleted: "",
        createBy: "",
        createTime: "",
        modifyBy: "",
        modifyTime: "",
        modifyIp: "",
        createIp: ""
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
          singType: "",
          title: "",
          singHealthCode: "",
          updateHealthCode: "",
          updateRemark: "",
          dataStatus: "",
          userCode: "",
          userName: "",
          userSex: "",
          userBirthday: "",
          userAge: "",
          userCharId: "",
          famousRace: "",
          marriage: "",
          diploma: "",
          userContacts: "",
          userOccupation: "",
          contacts: "",
          contactsTel: "",
          address: "",
          singHealthName: "",
          hospitalCode: "",
          hospitalName: "",
          userPhone: "",
          updateHealthName: "",
          isDeleted: "",
          createBy: "",
          createTime: "",
          modifyBy: "",
          modifyTime: "",
          modifyIp: "",
          createIp: ""
        };
        this.$refs["dataForm"].resetFields();
      }
    }
  },
  mounted() {
    this.getListData(this.pageQuery);
  },
  methods: {
    // 审核
    Audit(code) {
      let _this=this;

      _this.$set(this,"scopedData",code.row)
      _this.$set(this,"auditDetial",_this.list[code.$index])
      _this.auditDetial=code.row;
      if (code.row.singType == 0) {
        _this.dialogsigningVisible = true;
      } else {
        _this.dialogAuditVisible = true;
      }
    },
    // 同意审核
    agree(){
      let _this=this,
      agreeobj={
        code:_this.auditDetial.code,
        dataStatus:1,
      }
      checkSing(agreeobj).then(res=>{
        if (res.code==0) {
          _this.$message.success(res.msg);
          sessionStorage.setItem("code", JSON.stringify(res.value));
          _this.dialogAuditVisible=false;
          if (_this.scopedData.singType==0) {
            _this.$router.push("/editBase")
          }
        }
      })
    },
    // 拒绝审核
    refusedAudit(){
      let refusedobj={
        code:this.auditDetial.code,
        dataStatus:2,
      },
      _this=this;

      checkSing(refusedobj).then(res=>{
        
        if (res.code==0) {
          this.$message.success(res.msg);
          this.getListData(this.pageQuery);
          _this.dialogAuditVisible=false;
        }
      })
    },
    // 详情
    previewDetail(scope) {
      if (scope.row.singType == 0) {
        this.dialogsigningDetialVisible = true;
      } else {
        this.dialogDetialVisible = true;
      }
      getOne(scope.row.code).then(res => {
        if (res.code == 0) {
          this.$set(this, "auditDetial", res.value);
        }
      });
    },
    deleteObj(row) {
      var array = [];
      array.push(row.id);
      row.loading = true;
      deleteObjs(array).then(res => {
        row.loading = false;
        if (res.code == 0) {
          this.getListData({ page: 1, limit: 10 });
        }
      });
    },
    // 重置按钮
    resetBtn(val) {
      let _this = this;
      _this.querys.userName = "";
      _this.querys.type = "";
      _this.querys.singDate = "";
      _this.getListData(this.pageQuery);
    },
    // 获取列表数据
    getListData(pageParam) {
      let _this=this;
      _this.listLoading = true;
      getList(pageParam).then(res => {
        _this.listLoading = false;
        if (res.code == 0) {
          _this.$set(this,"list",res.value.records)
          _this.pageQuery.total = res.value.total;
          _this.pageQuery.page = res.value.current;
          _this.pageQuery.limit = res.value.size;
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
    }
  }
};
</script>

<style>
.audit >>> .el-dialog__body {
  padding-top: 0px;
}
.auditDisplay {
  width: 80%;
  margin-left: 10%;
  display: flex;
  justify-content: space-between;
}
.auditPw {
  padding-top: 15px;
  width: 80%;
  margin-left: 10%;
}
.save_cancel {
  padding-top: 20px;
  text-align: center;
}
</style>
