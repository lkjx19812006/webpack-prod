<style scoped lang="scss">
@import "../../css/mixin.scss";
.accordion {
  .top {
    padding: rem(34) rem(32);
    position: relative;
    .left-title {
      flex: 1;
      height: rem(42);
      font-size: rem(30);
      font-family: PingFangSC-Regular;
      color: $itemSubTitleColor;
      line-height: rem(42);
    }
    .right-icon {
      flex: 0 0 auto;
      height: rem(42);
      width: rem(42);
      position: relative;
      &:after {
        transition: all 0.2s ease-in-out;
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
        transform: rotateZ(90deg);
      }
    }
    &.active {
      .right-icon {
        &:after {
          transform: rotateZ(270deg);
        }
      }
    }
  }
  .content {
    display: none;
    padding: 0 rem(32);
    padding-bottom: rem(32);
    font-size: rem(28);
    font-family: PingFang-SC-Regular;
    color: $textColor;
    line-height: rem(48);
    &.show-content {
      display: block;
    }
  }
}
</style>
<template>
  <div class="accordion">
    <div v-if="!notop" @click="_openAccordion" class="top flex row space item-center" :class="[ !isOpen ? '':'active', !noBorder && !isOpen ? 'bottom-after' : '']">
      <div class="left-title">{{title}}</div>
      <div class="right-icon"></div>
    </div>
    <div class="content" :class="[ isOpen ? 'show-content':'', !noBorder ? 'bottom-after' :'']">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      defalut: "折叠面板标题"
    },
    open: {
      type: Boolean,
      default: false
    },
    noBorder: {
      type: Boolean,
      default: false
    },
    notop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var self = this;
    return {
      isOpen: self.open
    };
  },
  methods: {
    _openAccordion() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
