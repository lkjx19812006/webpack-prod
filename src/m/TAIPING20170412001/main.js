/*
 * 默认使用动态路由
 * 配置一下标题即可
 * 如果目录下大量vue文件不使用，可以改成静态路由
 */
import Vue from 'vue'
import Router from 'vue-router'
import YDUI from 'vue-ydui' /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import VueWechatTitle from 'vue-wechat-title'
import App from './App.vue'
import anyiDirective from '@/common/vueDirective' // 自定义指令
import Http from '@/common/httpServer'
import 'vue-ydui/dist/ydui.base.css'
import 'vue-ydui/dist/ydui.rem.css'
import '@/css/common.scss'

Vue.use(VueWechatTitle);
Vue.use(Router);
Vue.use(YDUI);
Vue.use(anyiDirective);
Vue.prototype.$http = new Http();
Vue.config.productionTip = false;

// 设置路由标题 当前为动态路径
const titles = {
  '/index': '首页',
  '/write': '填写信息',
  '/confirm': '确认信息'
};

/**
 * 获取views文件夹下所有的vue文件
 */
const views = require.context('./', true, /views\/.*\.vue$/).keys();
// 动态路由
let routeConfig = views.map(v => {
  const path = v.match(/views(\/.*)\.vue/)[1];
  // 路径不可使用变量，只能用字符串拼接，否则webpack不会打包进去
  const comp = resolve => require(['./views' + path + '.vue'], resolve);
  return {
    path: path,
    component: comp,
    meta: { title: titles[path] || '' }
  }
});

routeConfig.push({
  path: '/',
  redirect: '/index',
  meta: {
    title: '加载中'
  }
});

let router = new Router();
// 添加动态路由
router.addRoutes(routeConfig);

new Vue({
  router,
  render: create => create(App)
}).$mount('#product');
