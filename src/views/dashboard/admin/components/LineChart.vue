<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
  import echarts from 'echarts'
  import { debounce } from '@/utils'
  import { getReportData } from '@/api/sys/report'

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        chart: null,
        sidebarElm: null,
        valueList: [],
        xAxisList: []
      }
    },
    mounted() {
      this.initChart()
      if (this.autoResize) {
        this.__resizeHandler = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHandler)
      }

      // 监听侧边栏的变化
      this.sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      this.sidebarElm && this.sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHandler)
      }

      this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

      this.chart.dispose()
      this.chart = null
    },
    methods: {
      sidebarResizeHandler(e) {
        if (e.propertyName === 'width') {
          this.__resizeHandler()
        }
      },
      setOptions(data, xdata) {
        this.chart.setOption(
          {
            title: {
              text: '近7日每日建档数',      //主标题
              textStyle: {
                color: '#ff9b21',        //颜色
                fontStyle: 'normal',     //风格
                fontWeight: 'normal',    //粗细
                fontFamily: 'Microsoft yahei',   //字体
                fontSize: 18,     //大小
                align: 'center'   //水平对齐
              }
            },
            tooltip: {
              show: true,
              formatter: '{c}%'　　　　//这是关键，在需要的地方加上就行了
            },
            //右上角工具栏
            toolbox: {
              show: true, feature: {
                magicType: { show: true, type: ['line', 'bar', 'stack', 'tiled'] },
                saveAsImage: { show: true }
              }
            },
            xAxis: [
              {
                type: 'category',
                data: xdata
              }
            ],
            yAxis: [
              {
                type: 'value',
                splitLine: {           // 控制Y轴的分隔线(辅助线)
                  show: false,        // 默认显示，属性show控制显示与否
                  lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    color: ['#ccc'],
                    width: 1,
                    type: 'solid'
                  }
                }

              }
            ],
            series: [
              {
                'name': '建档数',
                'type': 'bar',
                'barGap': '5%', //两个柱子距离
                itemStyle: {
                  normal: {
                    color: '#ab78ba',   //柱状颜色
                    label: {
                      show: true,  //柱头数字
                      position: 'top',
                      textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                      }
                    }
                  }
                }
              },
              {
                'name': '建档数',
                'type': 'bar',
                label: {
                  show: true,
                  position: 'top',
                  formatter: '{c}份'　　　　//这是关键，在需要的地方加上就行了
                },
                'data': data
              }
            ]
          }
        )
      },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        getReportData().then(res => {
          var list = res.value.createArchives
          for (var item of  list) {
            this.valueList.push(item.count)
            this.xAxisList.push(item.date)
          }
          this.setOptions(this.valueList, this.xAxisList)
        })

      }
    }
  }
</script>
