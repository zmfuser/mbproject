<template>
  <div class="editor">
    <!-- <div class="textTitle"></div> -->
    <el-row class="textTitle">
      <el-col :span="6" :offset="5" :xs="5" :sm="5" :lg="5">
        <div class="titleLeft"></div>
      </el-col>
      <el-col :span="6" :xs="4" :sm="4" :lg="4">慢病管理平台数据展示中心</el-col>
      <el-col :span="6" :xs="5" :sm="5" :lg="5">
        <div class="titleRight"></div>
      </el-col>
    </el-row>
    <el-col class="dashboard-editor-container">
      <!-- 管理员首页 -->
      <el-row v-if="hide.Manager">
        <el-col :xs="6" :sm="6" :lg="6">
          <el-row>
            <el-col :xs="24" :sm="24" :lg="24">
              <panel-group @handleSetLineChartData="handleSetLineChartData" />
            </el-col>
          </el-row>
          <el-row>
            <el-col :xs="24" :sm="24" :lg="24">
              <Table></Table>
            </el-col>
          </el-row>
        </el-col>

        <el-col :xs="12" :sm="12" :lg="12">
          <el-row :gutter="20">
            <el-col :xs="12" :sm="8" :lg="8" class="mapTop">
              <div class="mapBlue">
                <span>今日新增用户数</span>
                <p>
                  <count-to :start-val="0" :end-val="Number(newUser)" class="mycard-panel-num" />
                </p>
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :lg="8" class="mapTop">
              <div class="mapGreen">
                <span>今日新增档案数</span>
                <p>
                  <count-to :start-val="0" :end-val="Number(newArchives)" class="mycard-panel-num" />
                </p>
              </div>
            </el-col>
            <el-col :xs="12" :sm="8" :lg="8" class="mapTop">
              <div class="mapYellow">
                <span>今日新增签约申请</span>
                <p>
                  <count-to
                    :start-val="0"
                    :end-val="Number(newApplicationSign)"
                    class="mycard-panel-num"
                  />
                </p>
              </div>
            </el-col>

            <el-col :xs="24" :sm="24" :lg="24" class="map">
              <el-row>
                <el-col :span="6" :offset="1" :xs="16" :sm="16" :lg="16">
                  <!-- <div>
                    <el-tag >中国</el-tag>
                    <el-tag @click="handleProvince">{{province.name}}</el-tag>
                    <el-tag >{{city.name}}</el-tag>
                  </div> -->
                </el-col>
                <el-col :xs="24" :sm="24" :lg="24">
                  <Map></Map>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-col>

        <el-col :xs="6" :sm="6" :lg="6">
          <el-row>
            <el-col :xs="24" :sm="24" :lg="24">
              <div class="box">
                <div class="titleleft1">
                  每日在线问诊排行
                  <div id="BottomRightTriangle"></div>
                </div>
                <!-- <StackedTwo ref="statisticsNewInquiryList"></StackedTwo> -->
                <doctorLine></doctorLine>
              </div>
            </el-col>

            <el-col :xs="24" :sm="24" :lg="24">
              <div class="box">
                <div class="titleleft1">
                  每日新增用户数
                  <div id="BottomRightTriangle"></div>
                </div>
                <StackedThree ref="statisticsNewUserList"></StackedThree>
              </div>
            </el-col>

            <el-col :xs="24" :sm="24" :lg="24">
              <div class="box">
                <div class="titleleft1">
                  每日档案建档数
                  <div id="BottomRightTriangle"></div>
                </div>
                <Stacked ref="statisticsNewArchiveList"></Stacked>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="24">
              <div class="box">
                <div class="titleleft1">
                  疾病分类
                  <div id="BottomRightTriangle"></div>
                </div>
                <pietwo></pietwo>
              </div>
            </el-col>
          </el-row>
        </el-col>
      </el-row>

      <!-- 非管理员首页 -->
      <el-row v-if="hide.disManager">
        <el-col :xs="24" :sm="24" :lg="12">
          <PanelGroupTwo @handleSetLineChartData="handleSetLineChartData" />
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="chart-wrapper" @click="handleDoughnut">
            <DoughnutChart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="6">
          <div class="chart-wrapper">
            <DoughnutChartTwo />
          </div>
        </el-col>
      </el-row>
      <!-- 非管理员首页 -->
      <el-row v-if="hide.disManager">
        <Workday></Workday>
      </el-row>

      <el-row
        v-if="hide.disManager"
        style="background:#fff;padding:16px 16px 0;margin-bottom:32px;"
      >
        <line-chart :chart-data="lineChartData" />
      </el-row>
    </el-col>
  </div>
</template>

<script>
import PanelGroup from "./components/PanelGroup";
import PanelGroupTwo from "./components/PanelGroupTwo";
import LineChart from "./components/LineChart";
import RaddarChart from "./components/RaddarChart";
import PieChart from "./components/PieChart";
import BarChart from "./components/BarChart";
import DoughnutChart from "./components/DoughnutChart";
import DoughnutChartTwo from "./components/DoughnutChartTwo";
import Workday from "./components/Workday";
import Table from "./components/Table";
import Map from "./components/map";
import Stacked from "./components/Stacked";
import StackedTwo from "./components/StackedTwo";
import StackedThree from "./components/StackedThree";
import pietwo from "./components/pietwo";
import doctorLine from "./components/doctorLine";
import { queryslist, queryTodayNewStatistics } from "@/api/sys/report";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145]
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130]
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130]
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130]
  }
};
import CountTo from "vue-count-to";
export default {
  name: "DashboardAdmin",
  components: {
    CountTo,
    PanelGroup,
    PanelGroupTwo,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
    DoughnutChart,
    DoughnutChartTwo,
    Workday,
    Table,
    Map,
    Stacked,
    StackedThree,
    StackedTwo,
    pietwo,
    doctorLine
  },
  data() {
    return {
      talkVue:null,
      // province:{
      //   name:"",
      //   adcode:""
      // },
      // city:{
      //   name:"",
      //   adcode:""
      // },
      hide: {
        disManager: false,
        Manager: false
      },
      newArchives: "", //新增档案数
      newApplicationSign: "", //新增申请签约
      newUser: "", //新增用户数
      lineChartData: lineChartData.newVisitis
    };
  },
  mounted() {
    let _this=this
    let id = _this.$store.state.user.dataUser.id;
    if (id == 1) {
      _this.handleToday();
      _this.handleLine();
    }
    _this.handleCheck();

    // _this.$bus.on("map",res=>{
    //   _this.talkVue=res.talkVue
    //   if(res.value.value.level=="province"){
    //     _this.$set(_this.province,"name",res.value.value.name)
    //     _this.$set(_this.province,"adcode",res.value.value.adcode)
    //   }
    //   if(res.value.value.level=="city"){
    //     _this.$set(_this.city,"name",res.value.value.name)
    //     _this.$set(_this.province,"adcode",res.value.value.adcode)
    //   }

    // })
  },
  methods: {
    handleProvince(){
      let _this=this;
      _this.talkVue.initChart(_this.province.adcode)
    },
    handleHide(ref,state){
      let _this=this
      if(state=="close"){
        _this.$refs[ref].style.display="none"
      }else if(state=="open"){
        _this.$refs[ref].style.display="block"
      }
    },
    handleDoughnut() {
      this.$router.push("/manB/manBing");
    },
    handleToday() {
      let _this = this;
      queryTodayNewStatistics().then(res => {
        if (res.code == 0) {
          _this.newArchives = res.value.newArchives;
          _this.newApplicationSign = res.value.newApplicationSign;
          _this.newUser = res.value.newUser;
        }
      });
    },
    handleLine() {
      let _this = this;
      queryslist().then(res => {
        // _this.$refs.statisticsNewInquiryList.handleInfo(
        //   res.value.statisticsNewInquiryList
        // );
        _this.$refs.statisticsNewUserList.handleInfo1(
          res.value.statisticsNewUserList
        );
        _this.$refs.statisticsNewArchiveList.handleInfo2(
          res.value.statisticsNewArchiveList
        );
      });
    },
    handleCheck() {
      let _this = this;
      let user = _this.$store.state.user.dataUser;
      _this.$bus.emit("user11", user);
      if (user.id == 1) {
        _this.hide.disManager = false;
        _this.hide.Manager = true;
      } else if (user.id != 0) {
        _this.hide.disManager = true;
        _this.hide.Manager = false;
      }
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.titleLeft,
.titleRight {
  display: inline-block;
  width: 100%;
  // width: 390px;
  height: 20px;
  border: 1px solid #e9f2f5;
  margin: -3px 5px;
  // background: #e9f2f5;
  background: #56c8ac;
  border-radius: 6px;
  opacity: 0.1;
}
.textTitle {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding: 12px 12px;
  color: #38a192;
}
.box {
  position: relative;
  box-shadow: -4px 4px 10px #ddd;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  border-radius: 6px;
}
.titleleft1 {
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 700;
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
.map {
  margin-top: 20px;
}
.mapBlue {
  background: #478cf8;
}
.mapGreen {
  background: #56c8ac;
}
.mapYellow {
  background: #f5c66d;
}
.mapTop {
  display: flex;
  justify-content: space-around;
}
.mapTop > div {
  width: 200px;
  height: 95px;
  text-align: center;
  font-size: 16px;
  border: 1px solid #ddd;
  padding: 15px 15px;
  border-radius: 6px;
  // box-shadow: 14px 0px 20px black
}
.mapTop > div > span,
p {
  color: #fff;
}
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  // background-image: url("http://pic37.nipic.com/20140121/9738787_160130530129_2.jpg");
  background-size: 100% 100%;
  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
</style>
