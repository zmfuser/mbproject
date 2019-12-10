<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";

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
      statisticsNewArchiveList:{},
      date:[],
      count:[],
      chart: null
    };
  },
  mounted() {
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
    handleInfo2(val) {
      let _this = this;
      _this.statisticsNewArchiveList = val;
      for (var item of val) {
        _this.date.push(item.date);
        _this.count.push(item.count);
      }
      _this.$nextTick(function() {
        _this.initChart();
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        // title: {
        //   text: "近7日新增档案,新增签约情况",
        //   x: "left",
        //   align: "right",
        //   textStyle: {
        //     color: "#66D3D4"
        //   }
        // },
        backgroundColor:"#fff",
        color: ["#74ADFF"],
         xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.date
    },
    yAxis: {
        type: 'value',
        axisLine:{
          lineStyle:{
            color:"#ccc"
          }
        }
    },
    xAxis: {
        type: 'value',
        axisLine:{
          lineStyle:{
            color:"#ccc"
          }
        }
    },
    series: [{
        data: this.count,
        type: 'line',
        areaStyle: {}
    }]
      });
    }
  }
};
</script>
