<template>
  <div class="tableBox">
    <div class="tableLeft">
      <div class="titleleft">
        业务统计数据
        <div id="BottomRightTriangle"></div>
      </div>
      <el-row :gutter="20" class="panel-group">
        <!-- 左上 -->
        <el-col :xs="8" :sm="8" :lg="8"  :xl="8"  class="card-panel-col">
          <div class="card-panel height" @click="handleXuan">
            <div class="mycard-panel-icon-wrapper icon-people">
              <img src="../../../../../static/png/shouye_icon_xuanjiao@3x.png" alt />
            </div>
            <div class="mycard-panel-description">
              <div class="mycard-panel-text">宣教次数</div>
              <count-to :start-val="0" :end-val="Number(guardSum)" class="mycard-panel-num" />
            </div>
          </div>
        </el-col>

        <el-col :xs="8" :sm="8" :lg="8"  :xl="8"  class="card-panel-col">
          <div class="card-panel height" @click="handleSui">
            <div class="mycard-panel-icon-wrapper icon-people">
              <img src="../../../../../static/png/shouye_icon_suifang@3x.png" alt />
            </div>
            <div class="mycard-panel-description">
              <div class="mycard-panel-text">随访次数</div>
              <count-to :start-val="0" :end-val="Number(flupSum)" class="mycard-panel-num" />
            </div>
          </div>
        </el-col>

        <el-col :xs="8" :sm="8" :lg="8"   :xl="8" class="card-panel-col">
          <div class="card-panel height" @click="handleWen">
            <div class="mycard-panel-icon-wrapper icon-people">
              <img src="../../../../../static/png/shouye_icon_zaixianwz@3x.png" alt />
            </div>
            <div class="mycard-panel-description">
              <div class="mycard-panel-text">问诊次数</div>
              <count-to :start-val="0" :end-val="Number(inquirySum)" class="mycard-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <el-table
      :header-cell-style="getRowClass"
      :row-class-name="tableRowClassName"
      :data="tableData"
      border
      style="width: 100%;height:350px;margin-top:20px;"
    >
      <el-table-column label="头像" width="100" align="center">
        <template slot-scope="scope">
          <div class="doctorImg">
            <img :src="scope.row.doctorImage" alt />
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="doctorName" label="医生" align="center"></el-table-column>
      <el-table-column prop="countSum" label="次数" align="center"></el-table-column>
    </el-table>
    <pagination
    small
    :pager-count="3"
      v-if="hide.showpage"
      class="page"
      v-show="total>0"
      :total="total"
      :page.sync="pageList.page"
      :limit.sync="pageList.limit"
      @pagination="handleXuan"
    />
    <pagination
    small
    :pager-count="3"
      v-if="hide.showpage1"
      class="page"
      v-show="total>0"
      :total="total"
      :page.sync="pageList.page"
      :limit.sync="pageList.limit"
      @pagination="handleSui"
    />
    <pagination
    small
    :pager-count="3"
      v-if="hide.showpage2"
      class="page"
      v-show="total>0"
      :total="total"
      :page.sync="pageList.page"
      :limit.sync="pageList.limit"
      @pagination="handleWen"
    />
  </div>
</template>



<script>
import CountTo from "vue-count-to";
import {
  getReportData,
  queryStatistics,
  queryStatisticsFlupDetail,
  queryStatisticsGuardDetail,
  queryStatisticsInquiryDetail
} from "@/api/sys/report";

export default {
  data() {
    return {
      tableData: [],
      hide: {
        manager: false,
        user: false,
        showpage1: false,
        showpage2: false,
        showpage: true
      },
      total: 0,
      pageList: {
        page: 1,
        limit: 6
      },
      flupSum: "", //（随访次数）
      guardSum: "", //（宣教次数）
      inquirySum: "" //（在线问诊数）
    };
  },
  mounted() {
    let _this = this;
    _this.getReportData();
    _this.handleXuan();
  },
  components: {
    CountTo
  },
  methods: {
     tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
    handleXuan() {
      this.hide.showpage1 = false;
      this.hide.showpage2 = false;
      this.hide.showpage = true;
      queryStatisticsGuardDetail(this.pageList).then(res => {
        if (res.code == 0) {
          this.tableData = res.value.records;
          this.list = res.value.records;
          this.total = res.value.total;
          this.pageList.page = res.value.current;
          this.pageList.limit = res.value.size;
        }
      });
    },
    handleSui() {
      this.hide.showpage1 = true;
      this.hide.showpage2 = false;
      this.hide.showpage = false;
      queryStatisticsFlupDetail(this.pageList).then(res => {
        if (res.code == 0) {
          this.tableData = res.value.records;
          this.list = res.value.records;
          this.total = res.value.total;
          this.pageList.page = res.value.current;
          this.pageList.limit = res.value.size;
        }
      });
    },
    handleWen() {
      this.hide.showpage1 = false;
      this.hide.showpage2 = true;
      this.hide.showpage = false;
      queryStatisticsInquiryDetail(this.pageList).then(res => {
        if (res.code == 0) {
          this.tableData = res.value.records;
          this.list = res.value.records;
          this.total = res.value.total;
          this.pageList.page = res.value.current;
          this.pageList.limit = res.value.size;
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
    getReportData() {
      let _this = this;
      let user = _this.$store.state.user.dataUser;
      queryStatistics().then(res => {
        if (res.code == 0) {
          _this.flupSum = res.value.flupSum;
          _this.guardSum = res.value.guardSum;
          _this.inquirySum = res.value.inquirySum;
        }
      });
    },
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>

<style scoped>
.tableLeft .titleleft {
  display: inline-block;
  width: 150px;
  height: 35px;
  text-align: center;
  line-height: 35px;
  color: #fff;
  background: linear-gradient(#92f4dd, #46b79b);
}
#BottomRightTriangle {
  width: 0px;
  height: 0px;
  float: right;
  border-bottom: 35px solid #fff;
  border-left: 20px solid transparent;
}
.el-table .success-row {
  background: #f0f9eb;
}
.doctorImg {
  width: 26px;
  height: 26px;
  margin: 0 auto;
}
.doctorImg img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.page >>> .el-input__inner {
  background: none !important;
}
.pagination-container {
  background: none;
}
.tableBox {
  border: 1px solid #ddd;
  background: #fff;
  box-shadow: -4px 4px 10px #ddd;
  border-radius: 6px;
}
.tableBox >>> .el-table tr {
  background: none !important;
}
.tableBox >>>
.el-table td {
  background: none !important;
}
.tableBox>>>.pagination-container{
  padding: 4px 10px;
}
</style>


<style rel="stylesheet/scss" lang="scss" scoped>

.el-row{
  margin: 0 !important;
}
.panel-group {
  .card-panel-col {
    
  }
  .card-panel {
    // height: 100px;
    cursor: pointer;
    font-size: 12px;
    // position: relative;
    overflow: hidden;
    padding: 0 12px;
    color:#fff666;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    text-align: center;
    padding-top: 15px;
    img {
      width: 36px;
      height:36px;
    }
    .mycard-panel-icon-wrapper {
      // position: absolute;
      top: 5%;
      left: 40%;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
   
    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .mycard-panel-description {
      // position: absolute;
      bottom: 10%;
      left: 25%;
      text-align: center;
      .mycard-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
      }
      .mycard-panel-num {
        font-size: 20px;
        color: #FF9C09
      }
    }
    .card-panel-description {
      float: right;
      margin: 26px;
      margin-left: 0px;
      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}
</style>
