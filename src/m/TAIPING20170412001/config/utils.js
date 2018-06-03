//日期时间格式化 扩展到原型
(function () {
  //时间格式化
  Date.prototype.toFormat = function (fmt) {
    if (!this || !fmt) {
      return "";
    }
    let date = null;
    if (Object.prototype.toString.call(this) === '[object Date]') {
      date = this;
    } else if (Object.prototype.toString.call(this) === '[object String]') {
      date = new Date(this);
      if (isNaN(date)) {
        let reg = /^(1[89]\d\d|2[01][01]\d)[-|\/](1[0-2]|0\d|\d)[-|\/](\d|[0-2]\d|3[01])$/;
        if (this.indexOf("T") > -1) {
          // 为了兼容曾经后端输错错误的UTC格式
          let parts = this.match(/\d+/g);
          let isoTime = Date.UTC(parts[0], parts[1] - 1, parts[2], parts[3], parts[4], parts[5]);
          date = new Date(isoTime);
        } else if (reg.test(this)) {
          // 兼容iOS这是不按套路的系统
          date = new Date(this.replace(reg, "$2/$3/$1"))
        }
      }
    }
    //其他规则暂时不支持
    if (date === null || isNaN(date) || date === "Invalid Date") {
      return "";
    }
    var o = {
      "M+": date.getMonth() + 1,                 //月份
      "d+": date.getDate(),                    //日
      "h+": date.getHours(),                   //小时
      "m+": date.getMinutes(),                 //分
      "s+": date.getSeconds(),                 //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  };

  //获取时间通过年龄 静态方法
  Date.getDateByAge = function (age) {
    if (age && typeof age === 'number') {
      var nowDate = new Date();
      nowDate.setYear(nowDate.getFullYear() - age)
      return nowDate.toFormat('yyyy-MM-dd');
    }
    return new Date().toFormat('yyyy-MM-dd')
  }

  //获取时间通过天数 静态方法
  Date.getDateByDay = function (day) {
    if (day && typeof day === 'number') {
      var nowDate = new Date();
      nowDate.setDate(nowDate.getDate() - day)
      return nowDate.toFormat('yyyy-MM-dd');
    }
    return new Date().toFormat('yyyy-MM-dd')
  }

  //通过时间或年龄 静态方法
  Date.getAgeByDate = function (date) {
    if (date && typeof date === 'string') {
      var now = new Date();
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);
      var nowY = now.getFullYear();
      var ageDate = new Date(date);
      ageDate.setHours(0);
      ageDate.setMinutes(0);
      ageDate.setSeconds(0);
      ageDate.setMilliseconds(0);
      var ageY = ageDate.getFullYear();
      var age = nowY - ageY;
      if (nowY === ageY) return age;//年相等必定为0岁   
      if (ageY < nowY) {
        ageDate.setYear(ageY + age)
        var ageT = ageDate.getTime();
        var nowT = now.getTime()
        if (ageT > nowT) { //月份或日份大于当前的减一岁
          age--
        }
      } else if (ageY > nowY) {
        age = 0;
      }
      return age;
    }
    return 0;
  }

  var checkIdLast = function (Num) {
    if (Num.length != 18)
      return false;
    var x = 0;
    var y = '';
    for (i = 18; i >= 2; i--)
      x = x + (square(2, (i - 1)) % 11) * parseInt(Num.charAt(19 - i - 1));
    x %= 11;
    y = 12 - x;
    if (x == 0)
      y = '1';
    if (x == 1)
      y = '0';
    if (x == 2)
      y = 'X';
    return y;
  };

  // 求得x的y次方
  function square(x, y) {
    var i = 1;
    for (j = 1; j <= y; j++)
      i *= x;
    return i;
  }

  //验证身份证包括年龄 性别 生日 等
  Date.geCardInfooByCardId = function (val) {
    if (!val) return null;
    if (val.length != 18) return null;
    var reg = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/;
    if (!reg.test(val)) return null;
    var last = val.substring(val.length - 1);
    var lastNum = checkIdLast(val);
    if (last.toUpperCase() != lastNum) return null;
    var result = {};
    var array = /^(\d{6})(\d{8})(\d{2})(\d{1})(\d{1}|x|X)$/.exec(val);
    result.birth = array[2].replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");//设置出生日期
    result.sex = array[4] % 2 == 0 ? "1" : "0";//设置性别
    var bArr = array[2].match(/^(\d{4})(\d{2})(\d{2})$/);
    var date = new Date(bArr[1], bArr[2] - 1, bArr[3]);
    var now = new Date();
    var year = now.getFullYear() - date.getFullYear();
    if (date.getMonth() > now.getMonth()) {
      year--;
    } else if (date.getMonth() == now.getMonth() && date.getDate() > now.getDate()) {
      year--;
    }
    result.age = year;//设置年龄
    return result;
  };




  /*
  * 判断obj是否为一个整数
  */
  function isInteger(obj) {
    return Math.floor(obj) === obj;
  }

  /*
  * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
  * @param floatNum {number} 小数
  * @return {object}
  *   {times:100, num: 314}
  */
  function toInteger(floatNum) {
    var ret = { times: 1, num: 0 };
    var isNegative = floatNum < 0;
    if (isInteger(floatNum)) {
      ret.num = floatNum;
      return ret;
    }
    var strfi = floatNum + "";
    var dotPos = strfi.indexOf(".");
    var len = strfi.substr(dotPos + 1).length;
    var times = Math.pow(10, len);
    var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10);
    ret.times = times;
    if (isNegative) {
      intNum = -intNum;
    }
    ret.num = intNum;
    return ret;
  }

  /*
  * 核心方法，实现加减乘除运算，确保不丢失精度
  * 思路：把小数放大为整数（乘），进行算术运算，再缩小为小数（除）
  *
  * @param a {number} 运算数1
  * @param b {number} 运算数2
  * @param digits {number} 精度，保留的小数点数，比如 2, 即保留为两位小数
  * @param op {string} 运算类型，有加减乘除（add/subtract/multiply/divide）
  *
  */
  function operation(a, b, digits, op) {
    var o1 = toInteger(a);
    var o2 = toInteger(b);
    var n1 = o1.num;
    var n2 = o2.num;
    var t1 = o1.times;
    var t2 = o2.times;
    var max = t1 > t2 ? t1 : t2;
    var result = null;
    switch (op) {
      case "add":
        if (t1 === t2) {
          // 两个小数位数相同
          result = n1 + n2;
        } else if (t1 > t2) {
          // o1 小数位 大于 o2
          result = n1 + n2 * (t1 / t2);
        } else {
          // o1 小数位 小于 o2
          result = n1 * (t2 / t1) + n2;
        }
        return result / max;
      case "subtract":
        if (t1 === t2) {
          result = n1 - n2;
        } else if (t1 > t2) {
          result = n1 - n2 * (t1 / t2);
        } else {
          result = n1 * (t2 / t1) - n2;
        }
        return result / max;
      case "multiply":
        result = n1 * n2 / (t1 * t2);
        return result;
      case "divide":
        result = n1 / n2 * (t2 / t1);
        return result;
    }
  }

  // 加减乘除的四个接口
  function add(a, b, digits) {
    return operation(a, b, digits, "add");
  }
  function subtract(a, b, digits) {
    return operation(a, b, digits, "subtract");
  }
  function multiply(a, b, digits) {
    return operation(a, b, digits, "multiply");
  }
  function divide(a, b, digits) {
    return operation(a, b, digits, "divide");
  }

  Number.add = add;//+
  Number.subtract = subtract;//-
  Number.multiply = multiply;//*
  Number.divide = divide;//÷

})()

