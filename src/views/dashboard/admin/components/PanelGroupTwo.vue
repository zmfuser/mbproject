<template>
  <el-row :gutter="20" class="panel-group">
    <el-col :xs="11" :sm="11" :lg="11" class="card-panel-col">
      <div class="card-panel height" @click="userCount">
        <div class="mycard-panel-icon-wrapper icon-people">
          <img src="../../../../../static/png/shouye_icon_daiqianyue.png" alt />
        </div>
        <div class="mycard-panel-description">
          <div class="mycard-panel-text">管理的居民数</div>
          <count-to :start-val="0" :end-val="Number(managerUserSum)" class="mycard-panel-num" />
        </div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="12" class="card-panel-col">
      <el-row>
        <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col">
          <div class="card-panel" @click="flupCount">
            <div class="card-panel-icon-wrapper icon-message">
              <!-- <svg-icon icon-class="message" class-name="card-panel-icon"/> -->
              <img src="../../../../../static/png/shouye_icon_yhda.png" alt />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">随访次数</div>
              <count-to :start-val="0" :end-val="Number(flupSum)" class="card-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :lg="24" class="card-panel-col">
          <div class="card-panel" @click="guardCount">
            <div class="card-panel-icon-wrapper icon-money">
              <!-- <svg-icon icon-class="money" class-name="card-panel-icon"/> -->
              <img src="../../../../../static/png/shouye_icon_suifang.png" alt srcset />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">宣教次数</div>
              <count-to :start-val="0" :end-val="Number(guardSum)" class="card-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="24" :lg="24">
          <div class="card-panel" @click="inquiryCount">
            <div class="card-panel-icon-wrapper icon-shopping">
              <!-- <svg-icon icon-class="shopping" class-name="card-panel-icon"/> -->
              <img src="../../../../../static/png/shouye_icon_yishen.png" alt />
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">在线问诊数</div>
              <count-to :start-val="0" :end-val="Number(inquirySum)" class="card-panel-num" />
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="12"></el-col>
  </el-row>
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
    // 跳转就诊列表页
    inquiryCount() {
      this.$router.push("/BsInquiry");
    },
    // 跳转宣教列表页
    guardCount() {
      this.$router.push("/BsHealthGuard");
    },
    // 跳转随访列表页
    flupCount() {
      this.$router.push("/manB/suifang");
    },
    // 跳转用户终端列表页
    userCount() {
      this.$router.push("/system/appUserManager");
    },
    getReportData() {
      let _this = this;
      let user = _this.$store.state.user.dataUser;
      queryStatistics().then(res => {
        _this.managerUserSum = res.value.managerUserSum;
        _this.flupSum = res.value.flupSum;
        _this.guardSum = res.value.guardSum;
        _this.inquirySum = res.value.inquirySum;
        _this.doctorSum = res.value.doctorSum;
        _this.userSum = res.value.userSum;
        _this.unprocessedArchiveSum = res.value.unprocessedArchiveSum;
        _this.signSum = res.value.signSum;
      });
    },
    handleSetLineChartData(type) {
      this.$emit("handleSetLineChartData", type);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.panel-group {
  .card-panel-col {
    margin-bottom: 32px;
  }
  .height {
    height: 274px !important;
  }
  .card-panel {
    height: 70px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
    img {
      width: 48px;
      height: 48px;
    }
    .mycard-panel-icon-wrapper {
      position: absolute;
      top: 20%;
      left: 40%;
      margin: 14px 0 0 14px;
      padding: 0;
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
      padding: 0;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }
    .card-panel-icon {
      float: left;
      font-size: 48px;
    }
    .mycard-panel-description {
      position: absolute;
      bottom: 25%;
      left: 37%;
      font-weight: bold;
      margin: 10px;
      margin-left: 0px;
      text-align: center;
      .mycard-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }
      .mycard-panel-num {
        font-size: 20px;
      }
    }
    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 10px;
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
