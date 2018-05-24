<style lang="scss" scoped>
//------------- 迭代YDUI样式 -----------------
.yd-scrollview:after {
  height: 0;
}

.yd-cell-item {
  display: flex;
  position: relative;
  height: 1.1rem;
  padding-left: 0.32rem;
  padding-right: 0.32rem;
  overflow: hidden;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.yd-cell-left {
  font-size: 0.3rem;
  color: rgba(112, 112, 112, 1);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  span {
    line-height: 0.3rem;
  }
}
.yd-cell-right {
  flex: 1;
  font-size: 0.3rem;
  color: rgba(112, 112, 112, 1);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  span {
    line-height: 0.3rem;
  }
}
.yd-cell-arrow:after {
  font-size: 0.3rem;
  height: 0.3rem;
  color: rgba(151, 151, 151, 1);
  content: "\E608";
}

.yd-datetime-input {
  font-size: 0.3rem !important;
  color: #282828 !important;
  height: 0.45rem !important;
  text-align: right !important;
  justify-content: flex-end !important;
}
.yd-datetime-placeholder {
  font-size: 0.3rem !important;
  color: #b7b7b7 !important;
  outline: none;
}
.yd-popup-content {
  > div {
    height: 100%;
  }
}
//------------- 迭代YDUI样式EDN -----------------

//--------------迭代input 样式 ------------------
input,
select,
option {
  font-size: 0.3rem !important;
  color: #282828 !important;
  height: 0.45rem !important;
  text-align: right !important;
}
input::placeholder {
  font-size: 0.3rem !important;
  color: #b7b7b7 !important;
  outline: none;
}
select,
option {
  direction: rtl; //设置文字对齐方式
  text-align: right;
}
//--------------迭代input 样式END ------------------

//保障计划
.write {
  .time-icon {
    height: 0.28rem;
    width: 0.28rem;
    margin-left: 0.2rem;
  }

  .left-title-line {
    width: 0.04rem;
    height: 0.32rem;
    background: #282828;
    margin-right: 0.2rem;
  }
  .left-title {
    height: 0.45rem;
    font-size: 0.32rem;
    color: #707070;
    line-height: 0.45rem;
  }
  .right-title {
    height: 0.45rem;
    font-size: 0.3rem;
    color: #282828;
    line-height: 0.42rem;
  }

  //-------------协议样式-------------------
  .yd-radio-group {
    padding: 0 0.32rem;
    font-size: 0.28rem;
    color: rgba(40, 40, 40, 1);
    padding-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .xieyi {
      color: #e3263a;
      flex: 0 0 auto;
    }
  }
  //-------------协议样式END----------------
}
</style>
<template>
  <yd-layout class="write">
    <!-- 保障计划 -->
    <yd-cell-group>
      <!-- 标题样式 -->
      <yd-cell-item>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title">保障计划</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">保险方案</span>
        <span slot="right" class="right-title">二轮快递外卖综合方案</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">生效日期</span>
        <span slot="right" class="right-title">2018-05-01 00:00:00</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">保障期限</span>
        <div slot="right">
          <span class="right-title">2018-05-01 00:00:00</span><br>
          <span class="right-title">至2018-05-01 00:00:00</span>
        </div>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">保费</span>
        <span slot="right" class="right-title" style="color: #E42F46">49.00元</span>
      </yd-cell-item>
    </yd-cell-group>

    <!-- 投保人信息 -->
    <yd-cell-group>
      <!-- 标题样式 -->
      <yd-cell-item>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title">投保人信息</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">投保人姓名</span>
        <span slot="right" class="right-title">黄大吉</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">身份证号码</span>
        <span slot="right" class="right-title">368286199010281314</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">出生日期</span>
        <span slot="right" class="right-title">1990.10.28</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">手机号码</span>
        <span slot="right" class="right-title">18516687688</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">邮箱地址</span>
        <span slot="right" class="right-title">jiejie12345@qq.com</span>
      </yd-cell-item>
    </yd-cell-group>

    <!-- 被保人信息 -->
    <yd-cell-group>
      <!-- 标题样式 -->
      <yd-cell-item>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title">被保人信息</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">与投保人关系</span>
        <span slot="right" class="right-title">父母</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">被保人姓名</span>
        <span slot="right" class="right-title">黄小花</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">身份证号码</span>
        <span slot="right" class="right-title">389289195802041346</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">出生日期</span>
        <span slot="right" class="right-title">1958-04-13</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">手机号码</span>
        <span slot="right" class="right-title">15688889999</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">受益人</span>
        <span slot="right" class="right-title">法定受益人</span>
      </yd-cell-item>
    </yd-cell-group>

    <!-- 协议部分 -->
    <yd-radio-group class="yd-radio-group" v-model="radio" color="#E42F46" :size="20">
      <yd-radio val="1" class="yd-radio">
        <span>我已了解并同意</span>
      </yd-radio>
      <span @click="popup.tbxz = true" class="xieyi">《投保须知》</span>
      <span>、</span>
      <span @click="popup.bxtk = true" class="xieyi">《保险条款》</span>
    </yd-radio-group>

    <footerCom slot="bottom" themecolor="#E42F46" :price="49.9" @insureClick="_insureClick"></footerCom>

    <!-- 投保须知 -->
    <yd-popup v-model="popup.tbxz" position="right" width="100%">
      <span>投保须知</span>
      <yd-button type="danger" @click.native="popup.tbxz = false">Close Right Popup</yd-button>
    </yd-popup>

    <!-- 保险条款 -->
    <yd-popup v-model="popup.bxtk" position="right" width="100%">
      <span>保险条款</span>
      <yd-button type="danger" @click.native="popup.bxtk = false">Close Right Popup</yd-button>
    </yd-popup>

    <!-- 登陆弹框 -->
    <yd-popup v-model="popup.login" position="right" width="100%" height="100%">
      <div style="height: 100%;" class="flex">
        <iframe frameborder="0" v-bind:src="iframeUrl" @load="loadLogin" style="height: 100%;width: 100%;border: none"></iframe>
      </div>
    </yd-popup>

  </yd-layout>
</template>
<script>
import footerCom from "@/components/common/footerCom";
import mixinPopup from "@/mixins/popup";
import authLogin from "@/mixins/authLogin";
export default {
  name: "Confirm",
  components: {
    footerCom
  },
  mixins: [mixinPopup, authLogin],
  data() {
    return {
      radio: "" // 协议部分
    };
  },
  mounted() {
    console.log(this);
  },
  methods: {
    _insureClick() {
      // 立即投保后可以调用投保接口
      if (!this.checkLogin()) {
        // 没有cookie 显示登陆
        this.showLogin();
      }
    }
  }
};
</script>
