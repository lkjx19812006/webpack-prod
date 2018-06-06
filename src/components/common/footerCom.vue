<style lang="scss" scoped>
@import "../../css/mixin.scss";
.anyi-footer-com {
  height: rem(109);
  background: #fff;
  flex: 0 0 rem(109);
  z-index: 9;
  .left-price {
    flex: 1;
    border-top: 1px solid #e7e7e7;
    color: $priceColor;
    padding-left: rem(40);
    .price-num {
      margin-top: rem(10);
      height: rem(90);
      font-size: rem(64);
      font-family: PingFangSC-Medium;
      line-height: rem(90);
    }
    .price-txt {
      margin-top: rem(45);
      margin-left: rem(16);
      height: rem(45);
      font-size: rem(32);
      font-family: PingFangSC-Regular;
      line-height: rem(45);
    }
  }

  .right-btn {
    border-radius: 0;
    flex: 0 0 auto;
    width: rem(300);
    height: rem(110);
    font-size: rem(32);
    font-family: PingFangSC-Medium;
    color: rgba(255, 255, 255, 1);
    line-height: rem(110);
    background: $themeColor !important;
  }
  .right-btn:hover {
    background: $hoverColor !important;
  }
  .right-btn:active {
    background: $activeColor !important;
  }
}
</style>
<template>
  <footer class="anyi-footer-com flex row">
    <div class="left-price flex row">
      <span class="price-num">{{price}}</span>
      <span class="price-txt">元</span>
    </div>
    <slot></slot>
    <yd-button type="primary" class="right-btn flex center buy-com-btn-submit" @click.native="_insureClick ">{{btntext}}</yd-button>
  </footer>
</template>
<script>
export default {
  props: {
    price: {
      //价格
      type: [Number, String],
      default: 0
    },
    btntext: {
      //按钮文字
      type: String,
      default: "立即投保"
    }
  },
  data() {
    return {};
  },
  methods: {
    _insureClick() {
      this.$emit("insureClick"); //将事件传递给父元素
    }
  }
};
</script>