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

})()

