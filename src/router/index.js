import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

/*
 * 路由放置到当个产品中
 * 默认使用静态路由
 * 可以设置为动态路由
 */

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

// 默认跳到index
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

export default router
