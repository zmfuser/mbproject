import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
// 打印接口
import doprint from '@/utils/doprint.js'
// bus
import bus from 'vue-bus'

// 图片预览
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import proving from '@/utils/proving'
import proving1 from '@/utils/provingCount'
import htmlToPdf from '@/utils/htmlToPdf'
// 增删表格行的插件
import popup from '@/utils/popup.js'
// 时间过滤器
import moment from 'moment'
import vueToTop from 'vue-totop'
// 自定义过滤器
import filters from '@/filters'
import Config from '@/views/yunxinIM/configs/index'
import Page from '@/utils/page'
import '@/icons' // icon
import '@/permission' // permission control
import { apiExportExcel, formatJson, hasPermission, isEmpty, parseTime } from './utils'
import Pagination from '@/components/Pagination/index'

Vue.use(doprint)
Vue.use(bus)

const SDK = require('@/views/yunxinIM/im/sdk/NIM_Web_SDK_v6.2.0.js')
const WebRTC = require('@/views/yunxinIM/im/sdk/NIM_Web_WebRTC_v6.2.0.js')

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 999999
  }
})

Vue.use(proving)

Vue.use(proving1)

Vue.use(htmlToPdf)

Vue.use(popup)
Vue.filter('time', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD'
  return moment(value).format(formatString)
})

Vue.use(vueToTop)

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

Vue.prototype.$config = Config

Vue.use(Page)

Vue.use(ElementUI, { locale })
Vue.prototype.isEmpty = isEmpty
Vue.prototype.hasPermission = hasPermission
Vue.prototype.formatJson = formatJson
Vue.prototype.apiExportExcel = apiExportExcel
Vue.filter('parseTime', parseTime)
Vue.config.productionTip = false
Vue.component('pagination', Pagination)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
