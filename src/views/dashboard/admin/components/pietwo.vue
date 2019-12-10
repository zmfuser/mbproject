<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import { queryDiseaseSort,} from "@/api/sys/report";

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
      default: "245px"
    }
  },
  data() {
    return {
      dataList:[],
      chart: null
    };
  },
  mounted() {
    let id = this.$store.state.user.dataUser.id;
    if(id==1){
      this.handlePie();
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
    handlePie(){
      let _this=this
      queryDiseaseSort().then(res=>{
        if(res.code==0){
          for(var item of res.value){
            _this.dataList.push({value:item.countSum,name:item.diseaseType})
          }
          console.log(_this.dataList)
          _this.initChart();
        }
      })
    },
    initChart() {
      let _this=this
      _this.chart = echarts.init(_this.$el, "macarons");
      _this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        backgroundColor:"#fff",
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["funnel"]
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "面积模式",
            type: "pie",
            radius: [30, 110],
            center: ["50%", "50%"],
            roseType: "area",
            data:_this.dataList
          }
        ]
      });
    }
  }
};
</script>
