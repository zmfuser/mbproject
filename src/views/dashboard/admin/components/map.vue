<template>
  <div>
    <div class="elTag">
      <el-tag @click="handleChina" v-show="hide.china">中国</el-tag>
      <el-tag @click="handleProvince" v-show="hide.province">{{province.name}}</el-tag>
      <el-tag v-show="hide.city">{{city.name}}</el-tag>
    </div>
    <div id="map" :class="className" :style="{height:height,width:width}"/>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { debounce } from '@/utils'
  import $ from 'jquery'
  import { getAdCode, getCitys, getDistricts, getProvinces, queryStatistics } from '@/api/sys/report'

  require('echarts/theme/macarons') // echarts theme

  const animationDuration = 6000
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
        default: '700px'
      }
    },
    data() {
      return {
        chart: null,
        data: [],
        province: {
          name: '',
          adcode: ''
        },
        hide: {
          china: false,
          province: false,
          city: false
        },
        dataName: [],
        city: {
          name: '',
          adcode: ''
        }
      }
    },
    mounted() {
      getProvinces().then(res => {
        this.initChart('china', res.value)
      })
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    },
    methods: {
      // 点击中国返回中国地图
      handleChina() {
        let _this = this
        _this.hide.province = false
        _this.hide.china = false
        getProvinces().then(res => {
          _this.initChart('china', res.value)
        })
      },
      // 点击省级返回省级地图
      handleProvince() {
        let _this = this
        _this.hide.city = false
        getCitys(_this.province.name).then(res => {
          _this.initChart(_this.province.adcode, res.value)
        })
      },
      initChart(adCode, map) {
        var _this = this
        if (map == null) {
          map = []
        }
        var mapData = [
          {
            latitude: 34.757975,
            longitude: 113.665412,
            name: '郑州市',
            value: 10,
            color: '#FBDA31'
          } //郑州市
        ]
        mapData = map
        var dom = document.getElementById('map')
        var myChart = echarts.init(dom)
        var option1 = null
        myChart.showLoading() //加载动画
        $.get(
          // "https://geo.datav.aliyun.com/areas/bound/100000.json",
          '../static/geo/' + adCode + '.json',
          function(result) {
            myChart.hideLoading() //关闭加载动画
            echarts.registerMap(name, result) //加载地图数据
            option1 = {
              tooltip: {
                trigger: 'item',
                formatter: function(params) {
                  return params.name
                }
              },
              toolbox: {
                show: false, //此字段表示是否显示或启用
                orient: 'vertical', //工具栏
                left: 'left',
                top: 'top',
                feature: {
                  dataView: {
                    readOnly: false
                  },
                  restore: {},
                  saveAsImage: {}
                }
              },
              geo: {
                type: 'map',
                zoom: 1.2, //地图初始大小，这里是关键，一定要放在 series中  因为geo在series中会加载，所以zoom放在此处
                roam: false,
                itemStyle: {
                  normal: {
                    borderColor: '#94C6FE', //区域边框颜色
                    areaColor: '#76AAFF' //区域填充颜色
                  },
                  emphasis: {
                    areaColor: '#317EE9',
                    borderWidth: 0
                  }
                }
              },
              series: [
                {
                  type: 'effectScatter',
                  coordinateSystem: 'geo',
                  //animation: true,
                  rippleEffect: {
                    brushType: 'stroke'
                  },
                  symbolSize: function(val, params) {
                    //散点大小
                    return val[2]
                  },
                  data: mapData.map(function(itemOpt) {
                    //散点生成
                    return {
                      name: "地址："+itemOpt.name+'<br>'+"用户数："+itemOpt.value + '人',
                      value: [itemOpt.longitude, itemOpt.latitude, 13],
                      label: {
                        emphasis: {
                          position: 'right',
                          show: false
                        }
                      },
                      itemStyle: {
                        normal: {
                          color: itemOpt.color
                        }
                      }
                    }
                  })
                }
              ]
            }

            myChart.setOption(option1, true)
            window.addEventListener('resize', function() {
              //浏览器大小调整echarts随之改变
              myChart.resize()
            })
            myChart.on('click', function(params) {
              //地图区域点击时的联动根据params的值来联动对应数据
              var param = {}
              param.cityName = params.name
              getAdCode(param).then(res => {
                let value = { value: res, talkVue: _this }
                _this.$bus.emit('map', value)
                if (res.value.level == 'district') {
                  return
                } else if (res.value.level == 'city') {
                  _this.hide.city = true
                  _this.city.name = res.value.name
                  _this.city.adcode = res.value.adcode
                  getDistricts(res.value.name).then(resf => {
                    _this.initChart(res.value.adcode, resf.value)
                  })
                } else if (res.value.level == 'province') {
                  _this.hide.china = true
                  _this.hide.province = true
                  _this.province.name = res.value.name
                  _this.province.adcode = res.value.adcode
                  getCitys(res.value.name).then(resf => {
                    _this.initChart(res.value.adcode, resf.value)
                  })
                }
              })
            })
          }
        )
      }
    }
  }
</script>


<style scoped>
  .elTag {
    margin-left: 5%;
  }

  .elTag >>> .el-tag {
    cursor: pointer;
  }
</style>
