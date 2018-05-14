// 定义一个混入对象
// 只要引入了该混合文件 组件就具备该文件里面的属性和方法 
// 可以全局混入 也可以局部混入 可查Vue看文档https://cn.vuejs.org/v2/guide/mixins.html
var myMixin = {
  data: function () {
    return {
      popup: {
        more: false, // 更多
        shjlp: false, // 售后及理赔
        cjwt: false, // 常见问题
        tbxz: false, // 投保须知
        bxtk: false, // 保险条款
        popup1: false,
        popup2: false,
        popup3: false,
        popup4: false,
        popup5: false,
        popup6: false,
        popup7: false,
        popup8: false
      },
      isonpopstate: false// 是否是物理返回按钮产生的回退
    }
  },
  watch: {
    'popup.more' (newVal, oldVal) {
      this._handlerBackClick(newVal, oldVal)
    },
    'popup.shjlp' (newVal, oldVal) {
      this._handlerBackClick(newVal, oldVal)
    },
    'popup.cjwt' (newVal, oldVal) {
      this._handlerBackClick(newVal, oldVal)
    },
    'popup.tbxz' (newVal, oldVal) {
      this._handlerBackClick(newVal, oldVal)
    },
    'popup.bxtk' (newVal, oldVal) {
      this._handlerBackClick(newVal, oldVal)
    },
    'popup.popup1' (newVal, oldVal) {
      this._handlerBackClick(newVal, oldVal)
    },
    'popup.popup2' (newVal, oldVal) {
      this._handlerBackClick(newVal, oldVal)
    },
    'popup.popup3' (newVal, oldVal) {
      this._handlerBackClick(newVal, oldVal)
    },
    'popup.popup4' (newVal, oldVal) {
      this._handlerBackClick(newVal, oldVal)
    },
    'popup.popup5' (newVal, oldVal) {
      this._handlerBackClick(newVal, oldVal)
    },
    'popup.popup6' (newVal, oldVal) {
      this._handlerBackClick(newVal, oldVal)
    },
    'popup.popup7' (newVal, oldVal) {
      this._handlerBackClick(newVal, oldVal)
    },
    'popup.popup8' (newVal, oldVal) {
      this._handlerBackClick(newVal, oldVal)
    }
    // 后期需要其他弹框监听物理按键可在下面继续添加popup中的属性监听
  },
  mounted () {
    this._addEventPopState();
  },
  methods: {
    // 开启监听
    _addEventPopState () {
      window.onpopstate = (e) => {
        // 属性全部设置为false
        this.isonpopstate = true;
        this._handlerPopup()
      };
    },

    // 监听窗口时间执行返回操作
    _handlerBackClick (newVal, oldVal) {
      if (this.plateform() === 'android') {
        if (newVal) {
          this.isonpopstate = false;
          var json = { time: new Date().getTime() };
          window.history.pushState(json, '', window.location.href);
        } else if (!newVal && oldVal && !this.isonpopstate) {
          // 非物理回退产生的值变化 需要回退一个
          window.history.back();
        }
      }
    },
    _handlerPopup (newVal) {
      for (var key in this.popup) {
        this.popup[key] = false;
      }
    },
    plateform () {
      var agent = window.navigator.userAgent.toLowerCase();
      if (agent.indexOf('android') > -1) {
        return 'android';
      } else if (agent.indexOf('iOS') > -1 || agent.indexOf('iphone') > -1) {
        return 'iOS'
      }
    }
  }
}
export default myMixin
