import Vue from 'vue'
// UI框架
import YDUI from 'vue-ydui' /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
// UI框架相关
import 'vue-ydui/dist/ydui.base.css'
import 'vue-ydui/dist/ydui.rem.css'
import '@/css/common.scss'

import anyiDirective from '@/common/vueDirective' // 自定义指令
import Http from '@/common/httpServer'

Vue.use(YDUI)
Vue.use(anyiDirective)

Vue.prototype.http = new Http()
