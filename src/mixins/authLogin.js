var authLogin = {
  data: function () {
    return {
      env:
        /test|^localhost$|^127\.0\.0\.1$|^192\..*$/gi.test(location.hostname) &&
        /^(?!.*opentest)/gi.test(location.hostname),
      iframeUrl: ''
    }
  },
  computed: {
    // 通过域名动态计算环境
    process () {
      return {
        test: {
          sso: '//sso.test.anyi-tech.com',
          login: '//test.m.anyi-tech.com'
        },
        prod: {
          sso: '//sso.anyi-tech.com',
          login: '//m.anyi-tech.com'
        }
      }[this.env ? 'test' : 'prod'];
    },
    domain () {
      var origin = window.location.origin;
      if (
        origin.indexOf('127') > -1 ||
        origin.indexOf('localhost') > -1 ||
        origin.indexOf('test') > -1
      ) {
        // 测试环境或本地环境
        return location.protocol + '//' + 'test.m.anyi-tech.com';
      } else {
        return location.protocol + '//' + 'm.anyi-tech.com';
      }
    }
  },
  methods: {
    checkLogin () {
      return !!this.http.getCookie('sso_token');
    },
    showLogin () {
      // TODO 当前用的测试环境的地址测试，实际需要动态配置
      this.popup.login = true;
      // TODO 需要增加返回，暂时没写
      // location.href = '#login';
      // const domain = location.protocol + '//' + 'test.m.anyi-tech.com';
      this.iframeUrl =
        this.process.login +
        '/login.html?fromUrl=' +
        encodeURIComponent(location.origin + '/static/blank.html');
    },
    setCookie () {
      var script = document.createElement('script');
      var setCookie =
        this.process.sso + '/ws_sso/auth/setCookie'; /* this.domain + */
      script.type = 'text/javascript';
      script.src = setCookie;
      var that = this;
      script.onload = script.onreadystatechange = function () {
        if (
          !this.readyState ||
          this.readyState === 'loaded' ||
          this.readyState === 'complete'
        ) {
          that.popup.login = false;
          that.iframeUrl = '';
          script.onload = script.onreadystatechange = null;
        }
      };
      document.body.appendChild(script);
    },
    loadLogin (e) {
      let href = '';
      try {
        // 跨域时 contentWindow 会直接报错，没有找到判断方法
        href = e.currentTarget.contentWindow.location.href;
      } catch (ex) {
        href = '';
      }
      if (/^(?!.*fromUrl).*blank\.html/gi.test(href)) {
        this.setCookie();
        // this.showlogin = false;
        // this.iframeUrl = '';
      }
      // console.log(e.currentTarget.contentWindow.location.href)
    }
  }
}

export default authLogin;
