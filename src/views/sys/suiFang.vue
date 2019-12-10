<template>
  <div class="suifang app-container">
    <div class="div-flex">
      <div class="marginTop">
        <label for>档案编号：</label>
        <el-input
          placeholder="请输入档案号"
          v-model="querys.archivesCodeDisplay"
          style="width: 200px;"
          class="filter-item"
        />
      </div>
      <div class="marginTop">
        <label for>建档助理：</label>
        <el-input
          placeholder="请输入建档助理"
          v-model="querys.healthAssistantName"
          style="width: 200px;"
          class="filter-item"
        ></el-input>
      </div>
      <div class="marginTop">
        <label for>随访日期：</label>
        <!-- <el-input
            placeholder="请输入随访日期"
            v-model="querys.createTime"
            style="width: 200px;"
            class="filter-item"
        />-->
        <el-date-picker
          v-model="querys.createTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
        ></el-date-picker>
      </div>
      <!-- <div class="marginTop">
          <label for>医生姓名：</label>
          <el-input
            placeholder="请输入医生姓名"
            v-model="querys.doctor"
            style="width: 200px;"
            class="filter-item"
          ></el-input>
      </div>-->
    </div>
    <!-- 搜索按钮 -->
    <div class="button-seach-regi">
      <el-button plain icon="el-icon-search" class="search" @click="searchBtn()">搜索</el-button>
      <el-button class="reset" @click="resetBtn({page:1,limit:10})">
        <img src="../../../static/png/manbin_icon_chongzhi.png" />重置
      </el-button>
    </div>
    <!-- 添加随访记录 -->
    <div class="createBase">
      <el-button
        class="buildFile"
        plain
        icon="el-icon-circle-plus-outline"
        v-if="hasPermission('followupRecord:edit')"
        @click="addFileToSF"
      >添加随访记录</el-button>
    </div>
    <!-- 随访表格 -->
    <el-table
      v-loading="listLoading"
      :data="SFlist"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      :header-cell-style="getRowClass"
    >
      <el-table-column label="序号" type="index" align="center" width="80"></el-table-column>
      <el-table-column label="随访记录编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.code }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属档案编号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.archivesCodeDisplay }}</span>
        </template>
      </el-table-column>
      <el-table-column label="被随访人" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.archivesUserName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="建档助理" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.healthAssistantName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="随访时间" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.createTime | time}}</span>
        </template>
      </el-table-column>
      <!-- dataStatus -->
      <el-table-column label="随访档案状态" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.dataStatus | changesfstate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="随访类型" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.flupType | selectState}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="160px"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <div class="icon-sizeWidth">
            <el-button
              @click="toEdit(scope.$index, scope.row)"
              v-show="baseLBTN1(scope.row.dataStatus)"
              v-if="hasPermission('followupRecord:edit')"
              icon="el-icon-edit-outline"
              size="mini"
              type="warning"
            >编辑</el-button>
            <el-button
              @click="toviews(scope.$index, scope.row)"
              v-if="hasPermission('followupRecord:query')"
              icon="el-icon-view"
              size="mini"
              type="primary"
            >预览图表</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 页码 -->
    <pagination
      class="page"
      v-show="total>0"
      :total="total"
      :page.sync="pagecQuery.page"
      :limit.sync="pagecQuery.limit"
      @pagination="getsuifangList"
    />
    <el-dialog title=" 请选择你要添加的附表类型" :visible.sync="dialogaddSFVisible">
      <div class="allTable">
        <div class="tableButton" @click="addSF">
          <div>
            <div class="tableType">
              <img
                data-filenum="1"
                class="absoluteImg"
                src="../../../static/png/manbintc_button_gaoxueya.png"
                alt
              />
              <img
                data-filenum="1"
                v-show="addFileObj.gaoxueyaWeek"
                class="selection"
                src="../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="1"
                class="buttomImg"
                src="../../../static/png/manbintc_button_normal.png"
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.gaoxueyaWeek"></i>

              <p class="bingBiao">高血压随访表(周)</p>
            </div>
            <div class="tableType">
              <img
                data-filenum="2"
                class="absoluteImg"
                src="../../../static/png/manbintc_button_gaoxueya.png"
                alt
              />
              <img
                data-filenum="2"
                v-show="addFileObj.gaoxueyaMounth"
                class="selection"
                src="../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="2"
                class="buttomImg"
                src="../../../static/png/manbintc_button_normal.png"
                alt
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.gaoxueyaMounth"></i>

              <p class="bingBiao">高血压随访表(月)</p>
            </div>
          </div>
          <div>
            <div class="tableType">
              <img
                data-filenum="3"
                class="absoluteImg"
                src="../../../static/png/manbintc_button_guanxinb.png"
                alt
              />
              <img
                data-filenum="3"
                v-show="addFileObj.guanxinbingWeek"
                class="selection"
                src="../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="3"
                class="buttomImg"
                src="../../../static/png/manbintc_button_normal.png"
                alt
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.guanxinbingWeek"></i>

              <p class="bingBiao">冠心病随访表(周)</p>
            </div>
            <div class="tableType">
              <img
                data-filenum="4"
                class="absoluteImg"
                src="../../../static/png/manbintc_button_guanxinb.png"
                alt
              />
              <img
                data-filenum="4"
                v-show="addFileObj.guanxinbingMounth"
                class="selection"
                src="../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="4"
                class="buttomImg"
                src="../../../static/png/manbintc_button_normal.png"
                alt
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.guanxinbingMounth"></i>

              <p class="bingBiao">冠心病随访表(月)</p>
            </div>
          </div>
          <div>
            <div class="tableType">
              <img
                data-filenum="5"
                class="absoluteImg"
                src="../../../static/png/manbintc_button_tlb.png"
                alt
              />
              <img
                data-filenum="5"
                v-show="addFileObj.tangniaobingWeek"
                class="selection"
                src="../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="5"
                class="buttomImg"
                src="../../../static/png/manbintc_button_normal.png"
                alt
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.tangniaobingWeek"></i>

              <p class="bingBiao">糖尿病随访表(周)</p>
            </div>
            <div class="tableType">
              <img
                data-filenum="6"
                class="absoluteImg"
                src="../../../static/png/manbintc_button_tlb.png"
                alt
              />
              <img
                data-filenum="6"
                v-show="addFileObj.tangniaobingMounth"
                class="selection"
                src="../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="6"
                class="buttomImg"
                src="../../../static/png/manbintc_button_normal.png"
                alt
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.tangniaobingMounth"></i>

              <p class="bingBiao">糖尿病随访表(月)</p>
            </div>
          </div>
          <div>
            <div class="tableType">
              <img
                data-filenum="7"
                class="absoluteImg"
                src="../../../static/png/manbintc_button_ncz.png"
                alt
              />
              <img
                data-filenum="7"
                v-show="addFileObj.naozuzhong"
                class="selection"
                src="../../../static/png/manbintc_button_selection.png"
                alt
              />
              <img
                data-filenum="7"
                class="buttomImg"
                src="../../../static/png/manbintc_button_normal.png"
                alt
              />
              <i class="el-icon-success table_icon" v-show="addFileObj.naozuzhong"></i>

              <p class="bingBiao">脑卒中随访表</p>
            </div>
          </div>
        </div>
        <div class="confirm">
          <el-button class="confirmButton" @click="addSFTable">确认</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryBsFlupList } from "@/api/sys/suifang.js";
export default {
  data() {
    return {
      suifanNumber: 0,
      querys: {
        archivesCodeDisplay: "",
        healthAssistantName: "",
        createTime: ""
      },
      employee: {
        archivesUserName: "",
        archivesCode: "",
        healthAssistantName: "",
        dataStatus: "",
        createTime: "",
        flupType: ""
      },
      total: 0,
      pagecQuery: {
        page: 1,
        limit: 10
      },
      submitLoading: false,
      SFlist: [],
      listLoading: false,
      dialogDoctorVisible: false,
      dialogaddSFVisible: false,
      addFileObj: {
        gaoxueyaWeek: false,
        gaoxueyaMounth: false,
        guanxinbingWeek: false,
        guanxinbingMounth: false,
        naozuzhong: false,
        tangniaobingWeek: false,
        tangniaobingMounth: false
      }
    };
  },
  mounted() {
    let _this=this
    _this.getsuifangList(this.pagecQuery);
    _this.$bus.on("dialog", res => {
      console.log(res);
      if (res.key == 1) {
        _this.dialogaddSFVisible = true;
        
      }
    });
  },
  methods: {
    baseLBTN1(value) {
      if (value == 1) {
        return false;
      } else {
        return true;
      }
    },
    // 自动获取随访列表数据
    getsuifangList(value) {
      queryBsFlupList(value).then(res => {
        this.listLoading = true;
        let value = res.value;
        if (res.code == 0) {
          this.listLoading = false;
          this.SFlist = res.value.records;
          this.total = value.total;
          this.pagecQuery.page = value.current;
          this.pagecQuery.limit = value.size;
        }
      });
    },
    // 编辑按钮
    toEdit() {
      this.$router.push("/SFedit");
    },
    // 搜索按钮
    searchBtn() {
      let search = {
        archivesCodeDisplay: this.querys.archivesCodeDisplay,
        healthAssistantName: this.querys.healthAssistantName,
        createTime: this.querys.createTime,
        page: 1,
        limit: 10
      };
      queryBsFlupList(search).then(res => {
        let value = res.value;
        if (res.code == 0) {
          this.SFlist = res.value.records;
          this.total = value.total;
          this.pagecQuery.page = value.current;
          this.pagecQuery.limit = value.size;
        }
      });
    },
    // 重置按钮
    resetBtn(val) {
      let _this = this;
      _this.querys.createBy = "";
      _this.querys.archivesCodeDisplay = "";
      _this.querys.createTime = "";
      queryBsFlupList(val).then(res => {
        var value = res.value;
        if (res.code == 0) {
          this.SFlist = res.value.records;
          this.total = value.total;
          this.pagecQuery.page = value.current;
          this.pagecQuery.limit = value.size;
        }
      });
    },
    addFileToSF() {
      this.dialogaddSFVisible = true;
    },
    // 更改表头颜色
    getRowClass({ row, column, rowIndex, columnIndex }) {
      if (rowIndex == 0) {
        return "background:rgba(228,248,245,1)";
      } else {
        return "";
      }
    },
    // 添加随访记录弹窗
    addSF(e) {
      if (e.target.nodeName == "IMG") {
        var number = e.target.dataset.filenum;
        if (number == 1) {
          this.addFileObj.gaoxueyaWeek = !this.addFileObj.gaoxueyaWeek;
          if (this.addFileObj.gaoxueyaWeek) {
            this.suifanNumber += 1;
          } else {
            this.suifanNumber -= 1;
          }
        } else if (number == 2) {
          this.addFileObj.gaoxueyaMounth = !this.addFileObj.gaoxueyaMounth;
          if (this.addFileObj.gaoxueyaMounth) {
            this.suifanNumber += 1;
          } else {
            this.suifanNumber -= 1;
          }
        } else if (number == 3) {
          this.addFileObj.guanxinbingWeek = !this.addFileObj.guanxinbingWeek;
          if (this.addFileObj.guanxinbingWeek) {
            this.suifanNumber += 1;
          } else {
            this.suifanNumber -= 1;
          }
        } else if (number == 4) {
          this.addFileObj.guanxinbingMounth = !this.addFileObj
            .guanxinbingMounth;
          if (this.addFileObj.guanxinbingMounth) {
            this.suifanNumber += 1;
          } else {
            this.suifanNumber -= 1;
          }
        } else if (number == 5) {
          this.addFileObj.tangniaobingWeek = !this.addFileObj.tangniaobingWeek;
          if (this.addFileObj.tangniaobingWeek) {
            this.suifanNumber += 1;
          } else {
            this.suifanNumber -= 1;
          }
        } else if (number == 6) {
          this.addFileObj.tangniaobingMounth = !this.addFileObj
            .tangniaobingMounth;
          if (this.addFileObj.tangniaobingMounth) {
            this.suifanNumber += 1;
          } else {
            this.suifanNumber -= 1;
          }
        } else if (number == 7) {
          this.addFileObj.naozuzhong = !this.addFileObj.naozuzhong;
          if (this.addFileObj.naozuzhong) {
            this.suifanNumber += 1;
          } else {
            this.suifanNumber -= 1;
          }
        }
      }
    },
    // 添加随访记录-确认
    addSFTable() {
      for (const item in this.addFileObj) {
        this.confim = this.addFileObj[item] || this.confim;
      }
      if (this.confim) {
        sessionStorage.setItem("data", JSON.stringify(this.addFileObj));
        sessionStorage.setItem("suifanNumber", this.suifanNumber);
        this.$router.push("/tableSF");
      } //把data对应的值保存到sessionStorage
    },
    // 编辑
    toEdit(index, row) {
      this.$router.push("/update");
      sessionStorage.setItem("archivesCode", row.archivesCode);
      sessionStorage.setItem("sfCode", row.code);
    },
    // 编辑弹窗
    toemployee() {
      this.dialogDoctorVisible = true;
    },

    toviews(index, row) {
      this.$router.push("/Sbase");
      sessionStorage.setItem("archivesCode", row.archivesCode);
      sessionStorage.setItem("sfCode", row.code);
    }
  }
};
</script>


<style scoped>
.marginTop {
  margin-top: 10px;
}
.icon-sizeWidth .el-button {
  padding: 5px 5px;
}
.div-flex {
  width: 85%;
  margin: 15px auto;
  display: flex;
  justify-content: space-around;
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
.table_icon {
  position: absolute;
  bottom: 20px;
  right: 5px;
}
.selection {
  position: absolute;
  width: 75%;
}
/* 添加随访记录弹窗样式 */
.allTable {
  width: 100%;
  text-align: center;
}
.tableButton > .el-button {
  margin-bottom: 5px;
  width: 25%;
  margin-left: 45px;
}

.tableButton {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-align: center;
}
.tableType {
  margin-bottom: 40%;
  position: relative;
}
.tableType .buttomImg {
  width: 75%;
}
.absoluteImg {
  position: absolute;
  left: 23%;
  bottom: 34%;
}
.tableButton > .el-button {
  margin-bottom: 5px;
  width: 25%;
  margin-left: 45px;
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
</style>

