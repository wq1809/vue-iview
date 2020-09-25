import Vue from 'vue'
import App from './App'
import { router } from './router/index'
import store from './store'
import iView from 'iview'
import i18n from '@/locale'
import config from '@/config'
import importDirective from '@/directive'
import installPlugin from '@/plugin'
import 'iview/dist/styles/iview.css'
import './index.less'
import '@/assets/icons/iconfont.css'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
import SliderVerificationCode from 'slider-verification-code';
import 'slider-verification-code/lib/slider-verification-code.css';
import VCharts from 'v-charts'
// 引入状态选择文件
import 'echarts-liquidfill' 
import echarts from 'echarts'
Vue.prototype.$echarts = echarts //将echarts存到Vue原型中

Vue.use(SliderVerificationCode);
Vue.use(VCharts)
Vue.use(VueQuillEditor)
const constant = require('@/url/constants')
const api= require('@/api')
const globalUrl = require('@/url')
Vue.prototype.globalApi =api;
Vue.prototype.globalUrl = globalUrl;

Vue.prototype.constant = constant
Vue.use(iView, {
  i18n: (key, value) => i18n.t(key, value)
})
/**
 * @description 注册admin内置插件
 */
installPlugin(Vue)
/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config
/**
 * 注册指令
 */
importDirective(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  render: h => h(App)
})
