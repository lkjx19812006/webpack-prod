<style lang="scss" scoped>
@import "../../../css/mixin.scss";
//健康告知
.content {
  background: #fff;
  .item {
    .p-modal-sub-tit {
      .left-tit,
      .right-tit {
        height: rem(42);
        font-size: rem(30);
        font-family: PingFangSC-Medium;
        color: $itemSubTitleColor;
        line-height: rem(42);
      }
    }
    .p-modal-sub-conetnt {
      padding: rem(32);
      font-size: rem(28);
      font-family: PingFang-SC-Regular;
      color: $textColor;
      line-height: rem(48);
    }
  }
  .select-radio {
    padding-top: rem(37);
    padding-bottom: rem(48);
    .tips {
      height: rem(45);
      font-size: rem(32);
      font-family: PingFang-SC-Medium;
      color: $itemSubTitleColor;
      line-height: rem(45);
      margin-bottom: rem(32);
      .des {
        font-size: rem(24);
        color: #909090;
      }
    }
    /deep/ .radio-wrap {
      .radio-item {
        padding-left: rem(60);
        padding-right: rem(60);
      }
    }
  }
  .bottom-tips {
    background: $bodybgc;
    padding: rem(32);
    padding-bottom: 0;
    font-size: rem(28);
    font-family: PingFang-SC-Medium;
    color: #484848;
    line-height: rem(48);
    .tips-cnt {
      font-family: PingFang-SC-Regular;
    }
  }
}
.footer-bottom-wrap {
  background: #fff;
  z-index: 9;
  height: rem(110);
  padding: 0 rem(32);
  border-top: 1px solid #d2d2d2;
  .btn-item {
    width: rem(326);
    height: rem(70);
    border-radius: rem(8);
    border: 1px solid $themeColor;
    font-size: rem(30);
    font-family: PingFang-SC-Medium;
    color: $themeColor;
    line-height: rem(68);
    text-align: center;
    background: #fff;
    &.active {
      background: $themeColor;
      color: #fff;
    }
    &:active {
      background: $activeColor;
      color: #fff;
    }
  }
}
</style>
<template>
  <yd-layout>
    <div class="content">
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title top-title">{{healthDoc.title}}</span>
      </anyiCellItem>

      <div class="item" v-for="(item, idx) in healthDoc.lists" :key="idx">
        <div class="p-modal-sub-tit flex between">
          <span class="left-tit" v-html="item.title" v-if="item.title"></span>
          <!-- <span class="right-tit"></span> -->
        </div>
        <div class="p-modal-sub-conetnt" :class="[jdx >= item.infos.length - 1 ? '' : 'bottom-after']" v-for="(subItem, jdx) in item.infos" :key="jdx" v-html="subItem"></div>
      </div>

      <!-- 底部提示 -->
      <div class="bottom-tips">
        <div class="tips-tit">郑重声明：</div>
        <div class="tips-cnt">本投保人声明上述内容填写属实，如有隐瞒或告知不实，保险公司有权解除保险合同，对于合同解除前发生的任何事故，保险公司可不承担任何责任。</div>
      </div>

    </div>
    <div class="footer-bottom-wrap flex row space item-center" slot="bottom">
      <div class="btn-item yd-btn-primary" @click="_closePopup(false)">
        部分为是
      </div>
      <div class="btn-item active yd-btn-primary" @click="_closePopup(true)">
        以上全否
      </div>
    </div>
    <!-- <yd-button class="popup-close-btn"  @click.native="_closePopup">下一步</yd-button> -->
  </yd-layout>
</template>
<script>
import anyiCellItem from "@/components/common/anyi-cell-item";
import product from "../config/product.js";
import buttonRadio from "@/components/common/buttonRadio";
export default {
  components: {
    anyiCellItem,
    buttonRadio
  },
  computed: {
    healthDoc() {
      var key =
        this.$store.state.productState.product.is_lifelong === "1"
          ? "豁免保费"
          : "未豁免保费";
      return product.doc["健康告知"][key];
    }
  },
  data() {
    return {};
  },
  methods: {
    _closePopup(param) {
      if (param) {
        this.$router.push("write");
      } else {
        this.$dialog.toast({
          mes:"您的健康告知不符合保险公司的审核标准，无法提交保单。建议您咨询之后再进行投保，非常感谢！",
          timeout: 2000
        });
      }
    }
  }
};
</script>