// 以插件的方式 申明自定义指令集
var anyiDirective = {};
anyiDirective.install = function (Vue, options) {
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
    // 添加特定样式
    input.classList.add('directive-valid-input');
    // 校验是否为空
    if (binding.value && binding.value.required) {
      if (!input.value) {
        input.setAttribute('data-valid', false);
        input.setAttribute('data-errMsg', binding.value.required);
        return;
      } else {
        input.setAttribute('data-valid', true);
        input.setAttribute('data-errMsg', '校验通过');
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
      } else {
        input.setAttribute('data-valid', true);
        input.setAttribute('data-errMsg', '校验通过');
      }
    }
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
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^[\u4e00-\u9fa5]{2,50}|([A-Za-z]+\s?)*[A-Za-z]$/, errMsg: '投保人姓名格式错误' };
          break;
        case 'insurename':// v-form:insurename 校验被保人姓名
          validDef.required = (binding.value && binding.value.required) || '请输入被保人姓名';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^[\u4e00-\u9fa5]{2,50}|([A-Za-z]+\s?)*[A-Za-z]$/, errMsg: '被保人姓名格式错误' };
          break;
        case 'cardid':// v-form:cardid 简单校验身份证
          validDef.required = (binding.value && binding.value.required) || '请输入身份证号码';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/, errMsg: '身份证格式错误' };
          break;
        case 'phone':// v-form:phone 校验手机
          validDef.required = (binding.value && binding.value.required) || '请输入手机号码';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^1[345789]\d{9}$/, errMsg: '手机号码格式错误' };
          break;
        case 'email':// v-form:email 校验邮箱
          validDef.required = (binding.value && binding.value.required) || '请输入电子邮箱';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^[A-Za-zd0-9]+([-_.][A-Za-zd0-9]+)*@([A-Za-zd0-9]+[-.])+[A-Za-zd0-9]{2,5}$/, errMsg: '电子邮箱格式错误' };
          break;
        case 'account':// v-form:account 校验账号
          validDef.required = (binding.value && binding.value.required) || '请输入账号';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^[0-9A-Za-z]{5,16}$/, errMsg: '账号格式错误' };
          break
        case 'pass':// v-form:account 校验密码
          validDef.required = (binding.value && binding.value.required) || '请输入密码';
          validDef.valid = (binding.value && binding.value.valid) || { regex: /^[0-9A-Za-z]{5,16}$/, errMsg: '密码格式错误' };
          break
        default:
          break
      }
      binding.value = validDef;
    }
    _setInputDataBefore(el, binding, vnode);
  }

  // v-form:xxxx={required:, valid: {regex:,errMsg:''}}或者不传参数
  Vue.directive('form', {
    // 防止页面刷新时未更新数据不BUG
    inserted (el, binding, vnode) {
      setTimeout(function () {
        _initInputData(el, binding, vnode);
      })
    },
    // 组件更新时调用
    componentUpdated (el, binding, vnode) {
      setTimeout(function () {
        _initInputData(el, binding, vnode);
      })
    }
  })

  // v-submit={formEl: el, eventEl: el, submit: fn} //formEl 元素内部的表单 eventEl 绑定提交时间的按钮为支持组件  submit 提交事件
  Vue.directive('submit', {
    inserted (el, binding, vnode) {
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
                binding.value.submit(validObj)
                return;
              }
            }
            binding.value.submit(validObj);
          }
        }
      });
    }
  })

  // ------------------------------自定义指令校验结束-------------------------------------
}
export default anyiDirective;
