<style lang="scss" scoped>
@import "../../css/mixin.scss";
.anyi-cell-item {
  padding: rem(34) rem(32);
  position: relative;
  &:after {
    content: "";
    height: 1px;
    position: absolute;
    bottom: 0;
    left: rem(32);
    right: rem(32);
    bottom: 0;
    margin: auto;
    background: #d2d2d2;
  }
  .anyi-cell-left {
    flex: 0 0 auto;
    justify-content: flex-start;
    text-align: left;
  }
  .anyi-cell-right {
    justify-content: flex-end;
    text-align: right;
    flex: 1;
    flex-wrap: wrap;
    position: relative;
    &.cell-right-show-arrow {
      padding-right: rem(40);
      &:after {
        position: absolute;
        right: 0;
        content: "";
        top: 0;
        bottom: 0;
        margin: auto;
        height: rem(32);
        width: rem(32);
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA5UlEQVRYR+XXuw2DMBSF4YOQEANAQ88ktBQsS8UEVIxAgTyGcUQXkSL3cRyKUBv9H8LS1S1SSgmCJ8aI4zjQdR2qqhK8ITtSSAHbtmFdVzRNg3EcUde1rPDllBgQQsA8zzjPk4oQA64P2fcdy7JQESpADoQawEaYAEyEGcBCuAAMhBvgRVAAHgQNYEVQARYEHaBFZAHcEW3bYpomlGX5MZqyAe6IYRjQ9/0fAd4n589/gWZs0++AJn5dCCpAG6cCLHEawBqnADxxN8AbdwEYcTOAFTcBmHE1gB1XAR5fzR5fTnOt5y+2SpOwS8kS6QAAAABJRU5ErkJggg==")
          no-repeat center;
        background-size: rem(32) rem(32);
      }
    }
    //针对输入框错误提示
    /deep/ .directive-valid-input-msg {
      flex: 0 0 100%;
      color: red;
      font-size: rem(24);
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      padding: rem(10) 0;
      &:before {
        font-family: YDUI-ICONS;
        font-size: inherit;
        font-size: rem(32);
        content: "\E614";
        padding-right: rem(10);
      }
    }
  }
  &.no-after-border {
    &:after {
      content: none;
    }
  }
}
</style>
<template>
  <div class="anyi-cell-item flex row item-center" :class="[ noBorder ? 'no-after-border' : '']">
    <div class="anyi-cell-left flex row item-center">
      <slot name="icon"></slot>
      <slot name="left"></slot>
    </div>
    <div class="anyi-cell-right flex row item-center" :class="[arrow ? 'cell-right-show-arrow': '']">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    arrow: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    }
  }
};
</script>
