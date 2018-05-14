// 数据请求地址 通过全局变量 打包引用不同的地址
import axios from 'axios'
import { Toast, Loading } from 'vue-ydui/dist/lib.rem/dialog';

export default class HttpServer {
  constructor () {
    // 个人中心基础 sso 模块的相关数据地址
    this.url = {
      imgPreUrl: location.protocol + '//' + (process.env.NODE_ENV === 'development' ? 'oss.anyitech.ltd' : 'oss.airiskeys.com'),
      saleUrl: location.protocol + '//' + (process.env.NODE_ENV === 'development' ? 'promotion.anyitech.ltd' : 'promotion.airiskeys.com')
    }
  };

  /**
     * 获取公共post请求
     * @param {method} 请求方式
     * @param {url} 请求地址
     * @param {data} 请求数据
     * @param {loading} 是否执行加载图标
     * @returns {Promise} 异步对象
     */
  post (params) {
    /* if (/^\/ws_sso\//.test(params.url)) {
            params.url = this.baseUrl + params.url
        } */
    // params.loading = params.loading || true
    // if (params.loading === false) { params.loading = false } else { params.loading = true };

    var config = {
      method: params.method || 'post', // 解决请求方式问题
      url: params.url,
      data: params.data
      // headers: {
      //     "sso-token": this.getCookie("sso-token") || window.localStorage.getItem('sso_token') || '',
      // }
    };

    if (params.headers && typeof params.headers === 'object') {
      for (var key in params.headers) {
        config.headers[key] = params.headers[key]
      }
    }

    return new Promise((resolve, reject) => {
      if (params.loading === false) { params.loading = false } else { params.loading = true };
      if (params.loading) {
        Loading.open();
      }
      // setTimeout(() => {
      //     Loading.close();
      // }, 5000);
      axios(config).then((res) => {
        Loading.close();
        if (res.status === 200 || res.status === 304 || (res.status > 200 && res.status < 400)) {
          // 请求成功
          if (res.data.code === 0) {
            // Toast({
            //     mes: res.result,
            //     icon: 'success',
            //     timeout: 2000
            // });
            reject(res.data);
          } else {
            resolve(res.data);
          }
        } else if (res.status >= 400) {
          Toast({
            mes: '服务器错误',
            icon: 'error',
            timeout: 2000
          });
          reject(res);
        }
      }).catch((error) => {
        Loading.close();
        if (error.toString().indexOf('Network Error') > -1) {
          Toast({
            mes: '服务器错误',
            icon: 'error',
            timeout: 2000
          });
        }

        if (error && error.response && error.response.status > 401 && error.response.status !== 404) {
          Toast({
            mes: error.msg || '系统错误，稍后再试',
            icon: 'error',
            timeout: 2000
          });
        }

        if (error && error.response && error.response.status === 401) {
          // 跳转时 后面可拼接当前地址登录完成后跳转回来
          window.location.href = '/#/login'
        }
        reject(error);
      });
    });
  };

  /**
     * 获取公共get 请求
     * @param {url} 请求地址
     * @param {loading} 是否执行加载图标
     * @returns {Promise} 异步对象
     */
  get (params) {
    /* if (/^\/ws_sso\//.test(params.url)) {
            params.url = this.baseUrl + params.url
        } */
    return new Promise((resolve, reject) => {
      // 开启数据加载图标
      // 处理传参
      if (params.data) {
        // params.data = params.data;
        var str = '';
        if (params.data && typeof params.data === 'object') {
          for (var key in params.data) {
            str += key + '=' + params.data[key] + '&'
          }
          str = str.substring(0, str.length - 1);
        };
        params.url = params.url + '?' + str;
        console.log(params.url)
      }
      var headers = {
        'sso-token': this.getCookie('sso-token') || window.localStorage.getItem('sso_token') || ''
      };
      axios({ url: params.url, method: 'get', headers: headers }).then(function (response) {
        resolve(response.data);
      }).catch(function (error) {
        if (error.toString().indexOf('Network Error') > -1) {
          Toast({
            mes: error.msg || '系统错误，稍后再试',
            icon: 'error',
            timeout: 2000
          });
        }

        if (error && error.response && error.response.status > 401 && error.response.status !== 404) {
          Toast({
            mes: error.msg || '系统错误，稍后再试',
            icon: 'error',
            timeout: 2000
          });
        }

        if (error && error.response && error.response.status === 401) {
          // 跳转时 后面可拼接当前地址登录完成后跳转回来
          window.location.href = '/#/login'
        }
        reject(error);
      });
    });
  };

  /**
     * 获取URL中参数
     * 修改，用于兼容#/policy/policyInfo?id=4F000100057CC2410D5A0000 这种类型的参数
     * @param name 参数名称
     * @returns {*}
     */
  getUrlParam (name) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    let r = window.location.search.substr(1).match(reg);
    if (r !== null) return decodeURIComponent(r[2]);
    if (window.location.hash.indexOf('?')) {
      r = window.location.hash.split('?')[1].match(reg);
    }
    if (r !== null) return decodeURIComponent(r[2]);
    return null;
  };

  /**
     * 获取cookie
     * @param name
     * @param value
     * @param days
     * @returns {*}
     */
  getCookie (name, value, days) {
    if (arguments.length == 1) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
      return window.localStorage.getItem('sso_token') || null;
    } else if (arguments.length > 1) {
      setCookie(name, encodeURIComponent(value), days);
    }
  };

  /**
     * 设置cookie
     * @param {string} name  键名
     * @param {string} value 键值
     * @param {integer} days cookie周期
     */
  setCookie (name, value, days) {
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      var expires = '; expires=' + date.toGMTString();
    } else {
      var expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=/';
  };

  /**
     * 移除cookie
     * @param name
     */
  removeCookie (name) {
    this.setCookie(name, '', -1);
  };

  /**
     * 过滤所有对象空字段
     * @param {*} params
     * @returns {*}
     */
  filterObjNull (params) {
    if (params && typeof params === 'object') {
      var obj = {};
      Object.keys(params).forEach((item) => {
        if (params.hasOwnProperty(item)) {
          if (params[item] || params[item] === 0 || params[item] === false) obj[item] = params[item];
        }
      });
      return obj;
    } else {
      return params;
    }
  };

  /**
     * @param {*} params
     */
  // 获取用户信息
  getUserInfo (params) {
    params = params || {};
    params.url = '/ws_cloud_service/sales/user/getUserWalletInfo';
    // params.url = "/ws_cloud_service/sales/wechatOauth/mockLogin"; //测试用
    // params.data = {
    //     "subscribe": 1,
    //     "openid": "ocN-Yv8-ReQ-TWC7EpuF68RJWejw",
    //     "nickname": "测试",
    //     "sex": 1,
    //     "language": "zh_CN",
    //     "city": "Pudong New District",
    //     "province": "Shanghai",
    //     "country": "China",
    //     "headimgurl": "http://wx.qlogo.cn/mmopen/k947icPboBqDx5hwan1AdjrzLSrfy57m2AUzBicDoH4W35rLpAaTRrQF8pmLYO3XwR0NGibaOVwOpCPgoEDEGatLQ/0",
    //     "subscribe_time": 1474360122,
    //     "remark": ""
    // };
    params.loading = false
    return new Promise((resolve, reject) => {
      this.post(params).then((res) => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    })
  };
};
