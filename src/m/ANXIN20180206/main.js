// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './index.vue'
import anyiDirective from '@/common/vueDirective' // 自定义指令
import Http from '@/common/httpServer'
import YDUI from 'vue-ydui' /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import '@/css/product/product.base.scss'
import VueWechatTitle from 'vue-wechat-title'
import Router from 'vue-router'
Vue.use(VueWechatTitle)
Vue.use(Router)
Vue.use(YDUI)
Vue.use(anyiDirective)
Vue.prototype.$http = new Http()

const views = require.context('./', true, /^views\/.*\.vue$/);

let router = new Router({
  routes: []
});

// 引入http服务模块
// import App from './App'
/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  // template: '<App/>',
  render: create => create(App)
}).$mount('#product')
