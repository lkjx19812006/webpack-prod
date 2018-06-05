<style lang="scss" scoped>
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
  height: 1.09rem;
  background: #fff;
  flex: 0 0 1.09rem;
  z-index: 9;
  .left-price {
    flex: 1;
    border-top: 0.01rem solid #e7e7e7;
    color: rgba(228, 47, 70, 1);
    padding-left: 0.4rem;
    .price-num {
      margin-top: 0.1rem;
      height: 0.9rem;
      font-size: 0.64rem;
      font-weight: 500;
      line-height: 0.9rem;
    }
    .price-txt {
      margin-top: 0.41rem;
      margin-left: 0.16rem;
      height: 0.45rem;
      font-size: 0.32rem;

      line-height: 0.45rem;
    }
  }

  .right-btn {
    border-radius: 0;
    flex: 0 0 auto;
    width: 3rem;
    height: 1.09rem;
    font-size: 0.32rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 0.45rem;
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
