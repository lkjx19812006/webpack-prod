<style lang="scss" scoped>
@import "../../css/mixin.scss";
.buy-modal-com {
  background: $bodybgc;
  .buy-content {
    min-height: 100%;
    padding-bottom: rem(128);
    .right-icon-close {
      height: rem(42);
      width: rem(42);
      background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAAEEfUpiAAAAAXNSR0IArs4c6QAAAjZJREFUWAntVktOw0AMJYhjABvuhdpV0p4BCSHBFZpkASw4VzeFczS8N+RZ7mSmaSpRWDRS4ok/z88eZ5SLi9RV13VHfdM0W7NLGRSy7CjN9bcXyioWzHfpkxZFEQrouq7w+lOsQa7krVyepJGhA0jyfVVVlZG3xWKxaGnEvRQSpTkQlpEosfPpgrPPSUXPaRaMp30g9ZBfRIF04beR2tokRV9gg44tUHQjver0LaRtAKAABxQGJA6Un7VZCkkwqHEzeMnp6gFlNjlgkKMqRois+k03EFvAyZpjymiBBHP4vUTq8ys7wAZqB3Id4U7gDnMhH5sDbM0tlTkQBtPMCVUw5UFz4IP9eBPAGPCFl0ZWTCArqAffRnDGY8BABgFwjEk7ziy/AQMZIMM3wO8hF0zfJABp8+iCnfSzjaVtUIIP1kejctQfBuraAUgFyzEHYgBwmIP2GwKyn2sKxHqAZt0heC7ayuwlS0CSL687r/++AzYFnkrbts/b7fYeG/uIjXv3tqlrHAQz4Dzh/ijL8iGOv4oVfMekrBFwzbHE6L1CYrjC70PKPanjCQSMGrEsEqJbpxyTHZCjBwEYQUaJxDHAWu47S/YSyBFJgU5NLOyDCMg5laS3rdAdNOnnT2JfxcKSnERAQZ4IdcckFtZkAhhKHvG+Yk7YUdUH8mIyJuPEfiD32cZwRzswBdxvDbfFk8wRyRKYkjgGn0IkSQAAG4DeHFpFTEDvngh0nzhEwr+X7Gf5LzrwDcotl5WsLb+XAAAAAElFTkSuQmCC")
        no-repeat center right;
      background-size: rem(38) rem(38);
    }
    .plan-select {
      background: #fff;
      padding-top: rem(10);
      padding-bottom: rem(35);
      padding-right: rem(32);
      .plan-select-item {
        flex: 1;
        height: rem(79);
        background: #fff;
        border-radius: rem(8);
        border: 1px solid #cfcfcf;
        color: #888888;
        margin-left: rem(32);
        &.active {
          color: #fff;
          background: $themeColor;
          border-color: $themeColor;
        }
      }
    }
  }
  .footer-com {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
  }
}
</style>
<template>
  <div class="buy-modal-com flex">
    <div class="buy-content">
      <anyiCellItem :noBorder="true">
        <span class="left-title" slot="left">保障计划</span>
        <span class="right-icon-close" slot="right" @click="_modalClose"></span>
      </anyiCellItem>
      <div class="plan-select bottom-after flex row space">
        <div @click="planIndex = index" :class="[index === planIndex ? 'active' : '' ]" class="plan-select-item flex center" v-for="(item, index) in planList" :key="index">{{item.packageName}}</div>
      </div>
      <anyiCellItem>
        <span class="left-title" slot="left">保险期间</span>
        <span class="right-title" slot="right">1年</span>
      </anyiCellItem>
      <anyiCellItem :noBorder="true">
        <span class="left-title" slot="left">生效日期</span>
        <yd-datetime slot="right" v-model="addtional.effect" value="1988-08-08" start-date="1900-08-08" placeholder="请选择" :init-emit="false"></yd-datetime>
      </anyiCellItem>
    </div>
    <footerCom class="footer-com"></footerCom>
  </div>
</template>
<script>
import footerCom from "@/components/common/footerCom";
import anyiCellItem from "@/components/common/anyi-cell-item";
export default {
  data() {
    return {
      planList: [
        { code: "A", packageName: "全面款" },
        { code: "B", packageName: "全面款" }
      ],
      planIndex: 0,
      addtional: {
        effect: ""
      }
    };
  },
  components: {
    footerCom,
    anyiCellItem
  },
  methods: {
    _modalClose() {
      this.$emit("close");
    }
  }
};
</script>
