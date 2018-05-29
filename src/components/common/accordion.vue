<style scoped lang="scss">
@import "../../css/mixin.scss";
.accordion {
  background: #fff;
  .top {
    padding: rem(34) rem(32);
    position: relative;
    /deep/ .left-title-line {
      border-left: rem(6) solid $itemTitleColor;
      height: rem(32);
      padding-left: rem(16);
      background: transparent;
      margin-bottom: rem(3);
    }
    /deep/ .left {
      flex: 1;
      .left-title {
        flex: 0 0 auto;
        height: rem(42);
        font-size: rem(30);
        font-family: PingFangSC-Regular;
        color: $itemSubTitleColor;
        line-height: rem(42);
      }
    }
    /deep/ .right {
      .right-title {
        flex: 0 0 auto;
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
    <div v-if="!notop" @click="_openAccordion" class="top flex row space item-center" :class="[ !isOpen ? '':'active', showTopBorder ? 'bottom-after' : '']">
      <div class="left flex row item-center">
        <div class="left-title" v-if="title">
          {{title}}
        </div>
        <slot name="left"></slot>
      </div>
      <div class="right flex row item-center">
        <slot name="right"></slot>
        <div class="right-icon"></div>
      </div>
    </div>
    <div class="content" :class="[ isOpen ? 'show-content':'']">
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
    isCloseShowTopBorder: {
      //是否关闭状态时显示头部边框
      type: Boolean,
      default: false
    },
    isOpenShowTopBorder: {
      //是否是打开的时候显示头部边框
      type: Boolean,
      default: false
    },
    notop: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showTopBorder() {
      if (this.isOpen) {
        //打开时
        return this.isOpenShowTopBorder;
      } else {
        //关闭时
        return this.isCloseShowTopBorder;
      }
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
