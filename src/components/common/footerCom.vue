<style lang="scss">
//底部立即投保按钮
//-----------flex布局开始-------------
.flex {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.column {
  flex-direction: column;
}
.center {
  justify-content: center;
  align-items: center;
}
.item-center {
  align-items: center;
}
//--------------flex布局结束--------------
.anyi-footer-com {
  height: 1.4533rem;
  background: #fff;
  flex: 0 0 1.4533rem;
  z-index: 9;
  .left-price {
    flex: 1;
    border-top: 0.0133rem solid #e7e7e7;
    color: rgba(228, 47, 70, 1);
    padding-left: 0.5333rem;
    .price-num {
      margin-top: 0.1333rem;
      height: 1.2rem;
      font-size: 0.8533rem;
      font-family: PingFangSC-Medium;
      line-height: 1.2rem;
    }
    .price-txt {
      margin-top: 0.5467rem;
      margin-left: 0.2133rem;
      height: 0.6rem;
      font-size: 0.4267rem;
      font-family: PingFangSC-Regular;
      line-height: 0.6rem;
    }
  }

  .right-btn {
    border-radius: 0;
    flex: 0 0 auto;
    width: 4rem;
    height: 1.4533rem;
    font-size: 0.4267rem;
    font-family: PingFangSC-Medium;
    color: rgba(255, 255, 255, 1);
    line-height: 0.6rem;
  }
  .right-btn:active {
    background: rgb(204, 54, 73) !important;
  }
}
</style>
<template>
  <footer class="anyi-footer-com flex">
    <div class="left-price flex" :style="{color: themecolor}">
      <span class="price-num">{{price}}</span>
      <span class="price-txt">元</span>
    </div>
    <slot></slot>
    <yd-button :style="{background: themecolor}" type="primary" class="right-btn flex center " @click.native="_insureClick ">{{btntext}}</yd-button>
  </footer>
</template>
<script>
export default {
  props: {
    themecolor: {
      //主题色
      type: String,
      default: "#278AFA"
    },
    price: {
      //价格
      type: Number,
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