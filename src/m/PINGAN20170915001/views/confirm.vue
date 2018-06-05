<style lang="scss" scoped src="../../../css/product/confirm.scss"></style>
<style lang="scss" scoped >
  // 产品私有样式
</style>
<template>
  <yd-layout class="write">
    <!-- 保障计划 -->
    <yd-cell-group>
      <!-- 标题样式 -->
      <yd-cell-item class="group-title">
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
      <yd-cell-item class="group-title">
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
      <yd-cell-item class="group-title">
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
import footerCom from '@/components/common/footerCom';
import mixinPopup from '@/mixins/popup';
import authLogin from '@/mixins/authLogin';
export default {
  name: 'Confirm',
  components: {
    footerCom
  },
  mixins: [mixinPopup, authLogin],
  data () {
    return {
      radio: '' // 协议部分
    };
  },
  mounted () {
    console.log(this);
  },
  methods: {
    _insureClick () {
      // 立即投保后可以调用投保接口
      if (!this.checkLogin()) {
        // 没有cookie 显示登陆
        this.showLogin();
      }
    }
  }
};
</script>
