<style lang="scss" scoped>
@import "../../../css/mixin.scss";
.confirm {
  //设置样式颜色
  .group {
    .left-title {
      color: $textColor;
    }
    .top-title {
      color: $itemSubTitleColor;
    }
    .right-title {
      color: $itemSubTitleColor;
    }
    margin-bottom: rem(26);

    .accordion {
      .cut-icon {
        margin-right: rem(20);
      }
      .right-title {
        color: $textColor !important;
        &.name-tit {
          margin-right: rem(100);
        }
        &.percent {
          margin-right: rem(30);
        }
      }
      .accordion-content {
        padding: 0 !important;
      }
    }
  }
}
</style>
<template>
  <yd-layout class="confirm">
    <!-- 头部 -->
    <div class="group">
      <anyiCellItem>
        <span slot="left" class="left-title">为谁投保</span>
        <span slot="right" class="right-title">他人</span>
      </anyiCellItem>
      <anyiCellItem noBorder>
        <span slot="left" class="left-title">起保日期</span>
        <span slot="right" class="right-title">2018-05-16</span>
      </anyiCellItem>
    </div>

    <!-- 保险信息 -->
    <div class="group">
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title top-title">保险信息</span>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">为谁投保</span>
        <span slot="right" class="right-title">他人</span>
      </anyiCellItem>
      <anyiCellItem noBorder>
        <span slot="left" class="left-title">起保日期</span>
        <span slot="right" class="right-title">2018-05-16</span>
      </anyiCellItem>
    </div>

    <!-- 保险信息 -->
    <div class="group">
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title top-title">投保人信息</span>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">为谁投保</span>
        <span slot="right" class="right-title">他人</span>
      </anyiCellItem>
      <anyiCellItem noBorder>
        <span slot="left" class="left-title">起保日期</span>
        <span slot="right" class="right-title">2018-05-16</span>
      </anyiCellItem>
    </div>

    <!-- 保险信息 -->
    <div class="group">
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title top-title">被保人信息</span>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">为谁投保</span>
        <span slot="right" class="right-title">他人</span>
      </anyiCellItem>
      <anyiCellItem noBorder>
        <span slot="left" class="left-title">起保日期</span>
        <span slot="right" class="right-title">2018-05-16</span>
      </anyiCellItem>
    </div>

    <!-- 受益人信息 -->
    <div class="group">
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title top-title">受益人信息</span>
        <span slot="right" class="right-title">指定受益人</span>
      </anyiCellItem>
      <accordion class="accordion" isOpenShowTopBorder isCloseShowTopBorder>
        <span slot="left" class="left-title">受益人1</span>
        <span slot="right" class="right-title name-tit">张三</span>
        <span slot="right" class="right-title percent">50%</span>
        <div>
          <anyiCellItem>
            <span slot="left" class="left-title">为谁投保</span>
            <span slot="right" class="right-title">他人</span>
          </anyiCellItem>
          <anyiCellItem>
            <span slot="left" class="left-title">起保日期</span>
            <span slot="right" class="right-title">2018-05-16</span>
          </anyiCellItem>
        </div>
      </accordion>
      <accordion class="accordion" isOpenShowTopBorder :isCloseShowTopBorder="false">
        <span slot="left" class="left-title">受益人1</span>
        <span slot="right" class="right-title name-tit">张三</span>
        <span slot="right" class="right-title percent">50%</span>
        <div>
          <anyiCellItem>
            <span slot="left" class="left-title">为谁投保</span>
            <span slot="right" class="right-title">他人</span>
          </anyiCellItem>
          <anyiCellItem noBorder>
            <span slot="left" class="left-title">起保日期</span>
            <span slot="right" class="right-title">2018-05-16</span>
          </anyiCellItem>
        </div>
      </accordion>
    </div>

    <!-- 续期缴费信息 -->
    <div class="group">
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title top-title">续期缴费信息</span>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">为谁投保</span>
        <span slot="right" class="right-title">他人</span>
      </anyiCellItem>
      <anyiCellItem noBorder>
        <span slot="left" class="left-title">起保日期</span>
        <span slot="right" class="right-title">2018-05-16</span>
      </anyiCellItem>
    </div>

    <!-- 紧急联系人 -->
    <div class="group">
      <accordion isOpenShowTopBorder :isCloseShowTopBorder="false" class="accordion" open>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title top-title">紧急联系人</span>
        <div class="accordion-content">
          <anyiCellItem>
            <span slot="left" class="left-title">为谁投保</span>
            <span slot="right" class="right-title">他人</span>
          </anyiCellItem>
          <anyiCellItem noBorder>
            <span slot="left" class="left-title">起保日期</span>
            <span slot="right" class="right-title">2018-05-16</span>
          </anyiCellItem>
        </div>
      </accordion>
    </div>

    <footerCom slot="bottom" themecolor="#E42F46" :price="49.9" @insureClick="_insureClick"></footerCom>

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

import anyiCellItem from "@/components/common/anyi-cell-item";
import cellItemCom from "@/components/common/cellItemCom";
import accordion from "@/components/common/accordion";

export default {
  name: "Confirm",
  components: {
    footerCom,
    anyiCellItem,
    accordion
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
