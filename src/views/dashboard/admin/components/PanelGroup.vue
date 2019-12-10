<template>
  <div class="panelBox">
      <el-row class="panel-group" :gutter="20">
        <!-- 左上 -->
        <el-col :xs="8" :sm="6" :lg="8" :xl="8" class="card-panel-col">
          <div class="card-panel height" @click="toOverEditor">
            <div class="mycard-panel-description">
              <div class="mycard-panel-text">已签约居民数</div>
              <count-to :start-val="0" :end-val="Number(managerUserSum)" class="mycard-panel-num" />
            </div>
            <div class="mycard-panel-icon-wrapper icon-people">
              <img src="../../../../../static/png/shouye_icon_yhda@3x.png" alt />
            </div>
            
          </div>
        </el-col>

        <el-col :xs="8" :sm="8" :lg="8" :xl="8" class="card-panel-col">
          <div class="card-panel height" @click="handleDoctor">
            <div class="mycard-panel-description">
              <div class="mycard-panel-text">管理医生人数</div>
              <count-to :start-val="0" :end-val="Number(doctorSum)" class="mycard-panel-num" />
            </div>
            <div class="mycard-panel-icon-wrapper icon-people">
              <img src="../../../../../static/png/shouye_icon_yishen@3x.png" alt />
            </div>
            
          </div>
        </el-col>
        <el-col :xs="8" :sm="8" :lg="8" :xl="8" class="card-panel-col">
          <div class="card-panel height" @click="handleUserCount">
             <div class="mycard-panel-description">
              <div class="mycard-panel-text">平台用户数</div>
              <count-to :start-val="0" :end-val="Number(userSum)" class="mycard-panel-num" />
            </div>
            <div class="mycard-panel-icon-wrapper icon-people">
              <img src="../../../../../static/png/shouye_icon_yonghuliang@3x.png" alt />
            </div>
           
          </div>
        </el-col>

        <el-col :xs="8" :sm="8" :lg="8" :xl="8" class="card-panel-col1">
          <div class="card-panel height" @click="handleTeam">
            <div class="mycard-panel-description">
              <div class="mycard-panel-text">健康团队数</div>
              <count-to :start-val="0" :end-val="Number(healthTeamSum)" class="mycard-panel-num" />
            </div>
            <div class="mycard-panel-icon-wrapper icon-people">
              <img src="../../../../../static/png/shouye_icon_tuanlui@3x.png" alt />
            </div>
            
          </div>
        </el-col>

        <el-col :xs="8" :sm="8" :lg="8" :xl="8" class="card-panel-col1">
          <div class="card-panel height" @click="handleSign">
            <div class="mycard-panel-description">
              <div class="mycard-panel-text">申请签约人数</div>
              <count-to :start-val="0" :end-val="Number(managerUserSum)" class="mycard-panel-num" />
            </div>
            <div class="mycard-panel-icon-wrapper icon-people">
              <img src="../../../../../static/png/shouye_icon_shenqinqy@3x.png" alt />
            </div>
            
          </div>
        </el-col>
      </el-row>
  </div>
</template>


<script>
import CountTo from "vue-count-to";
import { getReportData, queryStatistics } from "@/api/sys/report";

export default {
  data() {
    return {
      hide: {
        manager: false,
        user: false
      },
      managerUserSum: "", //（管理用户数）
      flupSum: "", //（随访次数）
      guardSum: "", //（宣教次数）
      inquirySum: "", //（在线问诊数）
      doctorSum: "", //（管理医生数）
      userSum: "", //（普通用户数）
      healthTeamSum: "", //（健康团队数）
      unprocessedArchiveSum: "", //未处理档案数
      signSum: "" //未处理签约数
    };
  },
  mounted() {
    let _this = this;
    _this.getReportData();
  },
  components: {
    CountTo
  },
  methods: {
    toOverEditor() {
      let _this = this;
      _this.$router.push("/manB/manBing");
    },
    handleDoctor() {
      let _this = this;
      _this.$router.push("/doctor");
    },
    handleUserCount() {
      let _this = this;
      _this.$router.push("/system/appUserManager");
    },
    handleTeam() {
      let _this = this;
      _this.$router.push("/BsHealthTeam");
    },
    handleSign() {
      let _this = this;
      _this.$router.push("/singManager");
    },
    getReportData() {
      let _this = this;
      let user = _this.$store.state.user.dataUser;
      queryStatistics().then(res => {
        if (res.code == 0) {
          _this.managerUserSum = res.value.managerUserSum;
          _this.flupSum = res.value.flupSum;
          _this.guardSum = res.value.guardSum;
          _this.inquirySum = res.value.inquirySum;
          _this.doctorSum = res.value.doctorSum;
          _this.userSum = res.value.userSum;
          _this.healthTeamSum = res.value.healthTeamSum;
        }
      });
    },
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.imgspan {
  background-image: url("../../../../../static/img/u.jpg") no-repeat 0px 0px !important;
}
.panelBox {
  height: 300px;
  border: 1px solid #ddd;
  // box-shadow: 17px 7px 11px black;
  margin-bottom: 30px;
  background: #fff;
  border-radius: 6px;
  padding:10px;
  box-shadow: -4px 6px 10px #ddd;
}
.panel-group {
  .card-panel-col {
    // margin: 0px 8px;
    margin-bottom: 32px;
  }
  .card-panel-col1 {
    // margin: 0px 8px;
    margin-bottom: 32px;
  }
  .card-panel {
    height: 120px;
    cursor: pointer;
    font-size: 12px;
    // position: relative;
    overflow: hidden;
    // padding: 0 12px;
    border:1px solid #7EEBD0 !important;
    color: #9D9D9D;
    // font-weight: bold;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    text-align: center;
    img {
      width: 36px;
      height: 36px;
      // width: 35%;
    }
    .mycard-panel-icon-wrapper {
      // position: absolute;
      top: 50%;
      left: 35%;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    // &:hover {
    //   .card-panel-icon-wrapper {
    //     color: #fff;
    //   }
    //   .icon-people {
    //     background: #40c9c6;
    //   }
    //   .icon-message {
    //     background: #36a3f7;
    //   }
    //   .icon-money {
    //     background: #f4516c;
    //   }
    //   .icon-shopping {
    //     background: #34bfa3;
    //   }
    // }
    // .icon-people {
    //   color: #40c9c6;
    // }
    // .icon-message {
    //   color: #36a3f7;
    // }
    // .icon-money {
    //   color: #f4516c;
    // }
    // .icon-shopping {
    //   color: #34bfa3;
    // }
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
      top: 10%;
      left: 16%;
      text-align: center;
      padding-top: 20px;
      .mycard-panel-text {
        line-height: 18px;
        color: #9D9D9D;
        font-size: 14px;
      }
      .mycard-panel-num {
        font-size: 20px;
        color: #ff9c09;
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
