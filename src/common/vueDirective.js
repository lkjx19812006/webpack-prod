// 以插件的方式 申明自定义指令集
var anyiDirective = {};
anyiDirective.install = function (Vue, options) {
  //强制校验身份证
  var IdentityCodeValid = function (code) {
    var city = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江 ", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北 ", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏 ", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外 " };
    var tip = "";
    var pass = true;

    if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
      tip = "身份证号格式错误";
      pass = false;
    }

    else if (!city[code.substr(0, 2)]) {
      tip = "地址编码错误";
      pass = false;
    }
    else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        //校验位
        var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != code[17]) {
          tip = "校验位错误";
          pass = false;
        }
      }
    }
    // if(!pass) alert(tip);
    return pass;
  }



  // --------------------------------自定义指令校验开始-----------------------------------
  /**
   * {
   *  required: '标题不能为空', //为空时的消息
   *  valid:{
   *    regex:/^[0-9]*$/, //正则校验的格式
   *    errMsg: '微信分享的标题格式不对' //正则校验错误的消息
   *  }
   * }
   *
   */
  var _setInputData = function (input, binding, vnode) {
    var validObj = { msg: '表单校验成功', valid: true };// 默认校验通过
    // 添加特定样式
    input.classList.add('directive-valid-input');
    // 校验是否为空
    if (binding.value && binding.value.required) {
      if (!input.value) {
        input.setAttribute('data-valid', false);
        input.setAttribute('data-errMsg', binding.value.required);
        validObj.msg = binding.value.required;
        validObj.valid = false;
        return validObj;
      } else {
        input.setAttribute('data-valid', true);
        input.setAttribute('data-errMsg', '校验通过');
        _inputChangeHandle(input, validObj, false)
      }
    }
    // 校验正则
    if (binding.value && binding.value.valid && binding.value.valid.regex) {
      var regex;
      if (typeof binding.value.valid.regex === 'string') {
        regex = new RegExp(binding.value.valid.regex)
      } else if (typeof binding.value.valid.regex === 'object') {
        regex = binding.value.valid.regex
      }
      if (!regex.test(input.value)) {
        input.setAttribute('data-valid', false);
        input.setAttribute('data-errMsg', binding.value.valid.errMsg);
        validObj.msg = binding.value.valid.errMsg;
        validObj.valid = false;
        return validObj;
      } else {
        input.setAttribute('data-valid', true);
        input.setAttribute('data-errMsg', '校验通过');
        _inputChangeHandle(input, validObj, false)
      }
    }
    //如果是校验身份证基本正则校验外还需要单独强制校验
    if (binding.arg === 'cardid') {
      var cardRes = IdentityCodeValid(input.value);
      if (!cardRes) {
        input.setAttribute('data-valid', false);
        input.setAttribute('data-errMsg', binding.value.valid.errMsg);
        validObj.msg = binding.value.valid.errMsg;
        validObj.valid = false;
        return validObj;
      }
    }
    return validObj
  }

  var _setInputDataBefore = function (el, binding, vnode) {
    if (el.tagName !== 'INPUT') {
      var input = el.querySelector('input');
      _setInputData(input, binding)
    } else if (el.tagName === 'INPUT') {
      _setInputData(el, binding)
    }
  }

  var _initInputData = function (el, binding, vnode) {
    // 默认校验规则
    var validDef = {
      required: '',
      valid: {
        regex: '', // 正则校验的格式
        errMsg: '' // 正则校验错误的消息
      }
    };
    // 如果el 是input 输入框 则不进行下一级搜索 否则直到搜到输入框为止
    if (binding.arg && binding.arg === 'item') { // v-form:item 自定义校验规则规则如上
      validDef.required = binding.value && binding.value.required;
      validDef.valid = binding.value && binding.value.valid;
    } else {
      // 用户传入时，更新校验规则
      var arg = binding.arg;// 获取指令后的修饰参数
      switch (arg) {
        case 'applicantname':// v-form:applicantname 校验投保人姓名
          validDef.required = (binding.value && binding.value.required) || '请输入投保人姓名';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^[\u4e00-\u9fa5]{2,50}|([A-Za-z]+\s?)*[A-Za-z]$/, errMsg: '请输入2-50位中文、4-50位英文' };
          break;
        case 'insurename':// v-form:insurename 校验被保人姓名
          validDef.required = (binding.value && binding.value.required) || '请输入被保人姓名';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^[\u4e00-\u9fa5]{2,50}|([A-Za-z]+\s?)*[A-Za-z]$/, errMsg: '请输入2-50位中文、4-50位英文' };
          break;
        case 'cardid':// v-form:cardid 简单校验身份证
          validDef.required = (binding.value && binding.value.required) || '请输入身份证号码';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/, errMsg: '身份证号格式错误' };
          break;
        case 'phone':// v-form:phone 校验手机
          validDef.required = (binding.value && binding.value.required) || '请输入手机号码';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^1[345789]\d{9}$/, errMsg: '手机号码有误，请重新输入' };
          break;
        case 'email':// v-form:email 校验邮箱
          validDef.required = (binding.value && binding.value.required) || '请输入电子邮箱';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@([A-Za-zd0-9]+[-.])+[A-Za-zd0-9]{2,5}$/, errMsg: '邮箱格式不正确，请重新输入' };
          break;
        case 'account':// v-form:account 校验账号
          validDef.required = (binding.value && binding.value.required) || '请输入账号';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^[0-9A-Za-z]{5,16}$/, errMsg: '账号格式错误' };
          break
        case 'pass':// v-form:account 校验密码
          validDef.required = (binding.value && binding.value.required) || '请输入密码';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^[0-9A-Za-z]{5,16}$/, errMsg: '密码格式错误' };
          break
        case 'bank':// v-form:bank 校验密码
          validDef.required = (binding.value && binding.value.required) || '请输入银行卡号';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^[0-9]{16,25}$/, errMsg: '银行卡号格式错误' };
          break
        default:
          break
      }
      binding.value = validDef;
    }
    _setInputDataBefore(el, binding, vnode);
  }

  //change事件时动态校验表单格式
  var _inputChangeHandle = function (el, validRes, isScroll) {
    //获取父级元素
    var parentNode = el.parentNode;
    //拿到结果 对样式进行修改
    if (validRes.valid) {//校验成功 
      parentNode.classList.remove('directive-valid-input-msg');
    } else {//校验失败
      parentNode.classList.add('directive-valid-input-msg');
      //页面滚动
      if (isScroll) {
        el.scrollIntoView(true);
        el.scrollIntoViewIfNeeded();
      }
      // el.focus()
    }
  }

  // v-form:xxxx={required:, valid: {regex:,errMsg:''}}或者不传参数
  Vue.directive('form', {
    // 防止页面刷新时未更新数据不BUG
    inserted(el, binding, vnode) {
      setTimeout(function () {
        _initInputData(el, binding, vnode);
        //失去焦点
        // el.onblur = function (e) {
        //   var validRes = {};
        //   validRes.valid = e.target.getAttribute('data-valid') === 'true' ? true : false;
        //   validRes.msg = e.target.getAttribute('data-errMsg');
        //   _inputChangeHandle(el, validRes, false);
        // }
        // 前端统一 报错 点击立即投保时才校验表单
        // el.onchange = function (e) {
        //   _inputChangeHandle(e, el, binding, vnode)
        // }
        // el.onfocus = function () {
        //   el.scrollIntoView(true);
        //   el.scrollIntoViewIfNeeded();
        // }
      })

    },
    // 组件更新时调用
    update(el, binding, vnode) {
      _initInputData(el, binding, vnode);
    },
    //解除绑定时调用 必须要调用 不调用 v-if互斥条件的dom元素会有问题
    unbind(el, binding, vnode) {
      el.setAttribute('data-valid', '');
      el.setAttribute('data-errMsg', '');
      // el.onblur = null;
      //清除错误提示
      var parentNode = el.parentNode;
      parentNode.classList.remove('directive-valid-input-msg');
    }
  })

  // v-submit={formEl: el, eventEl: el, submit: fn} //formEl 元素内部的表单 eventEl 绑定提交时间的按钮为支持组件  submit 提交事件
  Vue.directive('submit', {
    inserted(el, binding, vnode) {
      if (binding.value && binding.value.eventEl) {
        el = el.querySelector(binding.value.eventEl)
      }
      el.addEventListener('click', function () {
        // 校验子选项
        if (binding.value && binding.value.submit && typeof binding.value.submit === 'function' && binding.value.formEl) {
          // 拿到校验结果 传递过去
          var validObj = { msg: '表单校验成功', valid: true };// 默认校验通过
          var formWrap = document.querySelector(binding.value.formEl);
          if (formWrap) {
            // 找到表单盒子下面所有 的绑定过指令的input输入框
            var inputList = formWrap.querySelectorAll('.directive-valid-input');
            for (var i = 0; i < inputList.length; i++) {
              var item = inputList[i];
              var isValid = item.getAttribute('data-valid');
              // 校验不通过
              if (isValid === 'false') {
                validObj.msg = item.getAttribute('data-errMsg');
                validObj.valid = false;
                _inputChangeHandle(item, validObj, true)
                binding.value.submit(validObj)
                return;
              }
              _inputChangeHandle(item, validObj, true);
            }
            binding.value.submit(validObj);
          }
        }
      });
    }
  })

  // ------------------------------自定义指令校验结束-------------------------------------
  var toUp = function (e) {
    var val = e.target.value;
    e.target.value = val.toUpperCase()
  }
  //全部转成成大写
  Vue.directive('toUp', {
    inserted(el, binding, vnode) {
      setTimeout(function () {
        el.addEventListener('blur', toUp)
      })
    },
    update(el, binding, vnode) {
      var val = el.value;
      el.value = val.toUpperCase()
    },
    unbind(el, binding, vnode) {
      el.removeEventListener('blur', toUp);
    }
  })
  var toLo = function (e) {
    var val = e.target.value;
    e.target.value = val.toLowerCase()
  }
  //转换成小写
  Vue.directive('toLo', {
    inserted(el, binding, vnode) {
      setTimeout(function () {
        el.addEventListener('blur', toLo)
      })
    },
    update(el, binding, vnode) {
      var val = el.value;
      el.value = val.toLowerCase()
    },
    unbind(el, binding, vnode) {
      el.removeEventListener('blur', toLo);
    }
  })


}
export default anyiDirective;
