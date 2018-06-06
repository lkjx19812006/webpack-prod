<style lang="scss" scoped>
.header {
  height: 1.4266666667rem;
  background: rgba(0, 0, 0, 0.85);
  padding-left: 0.6666666667rem;
  line-height: 1.4266666667rem;
  z-index: 999;
  .logo {
    float: left;
    height: 100%;
    .logo_img {
      height: 112%;
      float: left;
    } //文字表述
    .left_allow {
      display: none;
    }
    .logo_font {
      margin-left: 0.42667rem;
      margin-top: 0.48rem;
      height: 35%;
    }
  } //用户图像
  .userLink {
    float: right;
  } //菜单
  .user_img {
    width: 0.8rem;
    float: right;
    display: block;
    margin-top: 0.34667rem;
    margin-right: 0.13333rem;
  }

  .menu {
    margin-right: 0.26667rem;
    display: block;
    border: none;
    background: none;
    width: 41px;
    margin-top: 0;
    padding: 0;
    float: right;
    height: 1.4266666667rem;
    line-height: 1.4266666667rem;
    img {
      display: inline-block;
      width: 0.5066666667rem;
      max-width: 0.5066666667rem;
      vertical-align: middle;
    }
  } //导航条
  .nav-wrap {
    position: fixed;
    width: 130px;
    height: 100vh;
    right: 0;
    top: 0;
    transform: translateX(130px);
    overflow: hidden;
    overflow-y: auto;
    background: #3c3c44;
    li {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      a {
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 16px;
        color: #fff;
      }
    }
  } //蒙层
  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0, 0, 0, 0.5);
  }
}
</style>
<template>
  <div class="header" ref="header" v-if="isShowHeader">
    <div class="logo">
      <img src="@/img/header/logo.png" class="logo_img" alt="logo">
      <img src="@/img/header/slogen.png" class="logo_font" alt="">
    </div>
    <ul class="nav-wrap" v-show="isShowMenu">
      <li>
        <a href="/index.html">首页</a>
      </li>
      <li>
        <a href="/mall/index.html">精选保险</a>
      </li>
      <li>
        <a href="http://m.open.anyi-tech.com/">安逸云保</a>
      </li>
      <li>
        <a href="/about-us.html">关于我们</a>
      </li>
    </ul>
    <button class="menu" title="菜单" @click="_showMenu">
      <img src="@/img/header/menu.png" class="menu_img">
    </button>
    <a href="/personal-center.html" class="userLink" id="user_img">
      <img v-if="!isLogin" src='@/img/header/no.png' class="user_img">
      <img v-if="isLogin" src='@/img/header/yes.png' class="user_img">
    </a>
    <div @click="_hideMenu" class="mask display-none" title="蒙层" v-show="isShowMenu"></div>
  </div>
</template>
<script>
//头部组件 在APP中不显示头 在微信中不显示头
//用户图标根据sso_token判断用户是否登陆
export default {
  data() {
    return {
      isShowMenu: false
    };
  },
  computed: {
    isShowHeader() {
      if (this.isMyApp()) return false;
      if (this.isWx()) return false;
      return true;
    },
    isLogin() {
      return this.http.getCookie("sso_token") ? true : false;
    }
  },
  methods: {
    isWx() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/micromessenger/i) == "micromessenger") {
        return true;
      }
      return false;
    },
    isMyApp() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/riskeys.app/i) == "riskeys.app") {
        return true;
      }
      return false;
    },

    _showMenu() {
      this.isShowMenu = true;
      this.moveParentNode();
    },
    //移动父节点
    moveParentNode() {
      this.$refs.header.parentNode.style["transition"] = "all .3s";
      this.$refs.header.parentNode.style["transform"] = "translateX(-130px)";
    },
    //还原父节点
    resetParentNode() {
      this.$refs.header.parentNode.style["transition"] = "all .3s";
      this.$refs.header.parentNode.style["transform"] = "translateX(0)";
    },
    _hideMenu() {
      this.resetParentNode();
      setTimeout(() => {
        this.isShowMenu = false;
      }, 300);
    }
  }
};
</script>
