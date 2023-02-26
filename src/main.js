import Vue from 'vue'
import Element from 'element-ui'
import App from '@/App'
import i18n from '@/i18n'
import router from '@/router'
import store from '@/store'
import '@/icons'
import '@/element-ui-theme'
import '@/assets/scss/index.scss'
import http from '@/utils/request'
import renRadioGroup from '@/components/ren-radio-group'
import renSelect from '@/components/ren-select'
import renDeptTree from '@/components/ren-dept-tree'
import renRegionTree from '@/components/ren-region-tree'
import { isAuth } from '@/utils'
import cloneDeep from 'lodash/cloneDeep'
import $api from "@/api/index.js";
//引入集成表格
import objTablePlus from 'obj-table-plus'
import objModal from 'obj-modal'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import "tailwindcss/tailwind.css"
import * as dayjs from 'dayjs'
import VueCookie from 'vue-cookie'    
// import "swiper/css/swiper.css";
import EasySlider from 'vue-easy-slider'

Vue.config.productionTip = false

Vue.use(Element, {
  size: 'default',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.use(renRadioGroup)
Vue.use(renSelect)
Vue.use(renDeptTree)
Vue.use(renRegionTree)
Vue.use(objTablePlus)
Vue.use(objModal)
Vue.use(VXETable)
Vue.use(VueCookie)
Vue.use(EasySlider)

// 挂载全局
Vue.prototype.$http = http
Vue.prototype.$api = $api
Vue.prototype.$day = dayjs
Vue.prototype.isAuth = isAuth

// 保存整站vuex本地储存初始状态
window.SITE_CONFIG['storeState'] = cloneDeep(store.state)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
