<style lang="scss" scoped>
// 弹窗框模板
.yd-popup-content {
  > div {
    height: 100%;
  }
  .popup-close-btn {
    border-radius: 0;
    z-index: 9;
    height: 1.09rem;
    font-size: 0.32rem;
    font-family: PingFangSC-Medium;
    color: rgba(255, 255, 255, 1);
    line-height: 1.09rem;
  }
}
</style>
<template>
  <yd-layout>
    <div class="top-content">
      这里放点内容
    </div>
    <yd-button :style="{background: themecolor}" class="popup-close-btn" slot="bottom" @click.native="_closePopup" type="danger">{{btnText}}</yd-button>
  </yd-layout>
</template>
<script>
export default {
  props: {
    themecolor: {
      //主题色
      type: String,
      default: "#278AFA"
    },
    btnText: {
      type: String,
      default: "点击关闭"
    }
  },
  data() {
    return {};
  },
  methods: {
    _closePopup() {
      this.$emit("closePopup");
    }
  }
};
</script>