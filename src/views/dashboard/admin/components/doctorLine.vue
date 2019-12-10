<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import { queryInqueryLeaderBoard } from "@/api/sys/report";

const animationDuration = 6000;

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "190px"
    }
  },
  data() {
    return {
      chart: null,
      date: [],
      count: []
    };
  },
  mounted() {
    let id = this.$store.state.user.dataUser.id;
    if (id == 1) {
      this.handleLine();
    }
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    handleLine() {
      let _this = this;
      queryInqueryLeaderBoard().then(res => {
        if (res.code == 0) {
          for (var item of res.value) {
            _this.date.unshift(item.doctorName);
            _this.count.unshift(item.countSum);
          }
          _this.initChart();
        }
      });
    },
    initChart() {
      let _this = this;
      _this.chart = echarts.init(this.$el, "macarons");

      _this.chart.setOption({
        // title: {
        //   text: "医生好评率Top10",
        //   X:"left",
        //   backgroundColor:'#55C7AB',
        //   padding:[5,5,5,5],
        //   borderRadius:"4px",
        //   textStyle:{
        //     color:"#fff",
        //     fontSize:"16"
        //   }
        // },
        backgroundColor: "#fff",
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        // legend: {
        //   data: ["2011年", "2012年"]
        // },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          boundaryGap: [0, 0.01],
					axisLine:{
					  lineStyle:{
					    color:"#ccc"
					  }
					}
        },
        yAxis: {
          type: "category",
          data: _this.date,
					axisLine:{
					  lineStyle:{
					    color:"#ccc"
					  }
					}
        },
        series: [
          {
            name: "",
            type: "bar",
            data: _this.count
          }
        ]
      });
    }
  }
};
</script>
