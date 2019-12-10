<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";

const animationDuration = 6000;
import { queryStatistics } from "@/api/sys/report";
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
      default: "258px"
    }
  },
  data() {
    return {
      chart: null,
      data: [],
      dataName:[],
    };
  },
  mounted() {
    this.getReportData();
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHandler);
  },
  methods: {
    getReportData() {
      let _this = this;
      let user = _this.$store.state.user.dataUser;
      queryStatistics().then(res => {
        if (res.code == 0) {
          _this.data.push(
            { value: res.value.unprocessedArchiveSum, name: "未处理档案数"+"\n"+res.value.unprocessedArchiveSum },
            // { value: res.value.unprocessedArchiveSum, name: "已处理档案数" },
          );
          // _this.dataName.push("未处理档案数","已处理档案数")
           _this.dataName.push("未处理档案数")
          _this.$nextTick(function() {
            _this.initChart();
          });
        }
      });
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");

      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        // legend: {
        //   orient: "vertical",
        //   x: "left",
        //   data: this.dataName
        // },
        color:["#F5C567"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: "center",
                textStyle: {
                  fontSize: "15",
                  fontWeight: "bold"
                }
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "20",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.data
          }
        ]
      });
    }
  }
};
</script>
