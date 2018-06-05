<style lang="scss" scoped>
@import "../../css/mixin.scss";
.anyi-cell-item {
  padding: 0 rem(32);
  height: rem(110);
  position: relative;
  &:after {
    content: "";
    height: 1px;
    position: absolute;
    bottom: 0;
    left: rem(32);
    right: rem(0);
    bottom: 0;
    margin: auto;
    background: #d2d2d2;
  }
  .anyi-cell-left {
    height: rem(110);
    flex: 0 0 auto;
    justify-content: flex-start;
    text-align: left;
  }
  .anyi-cell-right {
    height: rem(110);
    justify-content: flex-end;
    text-align: right;
    flex: 1;
    flex-wrap: wrap;
    position: relative;
    /deep/ input,
    select,
    option,
    textarea {
      padding: rem(32) 0;
      height: 100%;
      box-sizing: border-box;
    }
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
    &.directive-valid-input-msg {
      &:before {
        position: absolute;
        content: "";
        left: rem(8);
        top: 50%;
        margin-top: rem(-24);
        height: rem(42);
        width: rem(42);
        background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAAEEfUpiAAAAAXNSR0IArs4c6QAABRdJREFUWAm1V09onFUQn/maJiGm8V/Nboq7sSWgIPWwG//hxVOlVESKejMimBZaPHgSzaFRiMWTB4vY5CD2qLZ4CYWevIiSJgEFwYPSuIHubkxbzZ8lm67fc36zO9++b/drEgj5YPPmzfzezLx5M/NeiBrfyhPPPAwyMMb6em1ZGSYxQTQWMzkXTWKELylm8usxYelI/mjgI6hGL0cIX+CGjnf58wgEwhcUs/lv1HGsiKEaE3bueAdo/uNqVT1imub9fLSUya0K+3x6cf5AA7vNIHYvl7O5UwYrZfM3S08du0/nf2deOGSCYja3YHQ5M3xB6bjXTQCE0ByF31a2jCdjACb6xQcEHIzovJTNjYKQ7UUAMy2LiJxzLJ6HAfFLLqCsC93UwOK8yvQPQPZhV//Rxl+OnAbR+BiZeSpdmIvC4ct0R2Jl02eWBocnSpl8LcYTd+EevIr4ArrrB9oEiKvtxXg2gv/vk88/VE8GcTdVmJ804U5GxKOyWr0ZC/NOFhrGsRuUPRRVAYKD/DChjenO1ONi6YzNbUQeOUeT6cL8YeMRmNiXnOXnEVOIW0PPPmpzw0hsrhuvGUnjyIjgVFaqU8R0ghx1MdMCU3AuVZi95MG2J+/ZFbylbR5ILCbljDU1PZw4w7V91D34yOKPbbFSnO0PwUyqceQJYiT7/85XrDSySgPYKAoDIAuRjTbHiGxtU4KG0Rp9gBsWF0D7H/jWCQJEXOqtRzrMuz5oKzpgOo2CAyaoHxd/u9WCVhnS3qq1A2cdOHqlFbTTeYBEcZ2cfDTbaEGeBMgyqrnntsEmivt+n7kl8QjOUeg+S0QIUzIt6nOG8fMkQH7LZdXr8vkeA9iISkx1pt6wuY3lzaUbqGDM6+VMNFZacvHrTIQhuS/K1fKMLcSIDiyJN9DWG1GiSBDfE7+UsRjXhWas3SvCixWTZOOHsp0JYa5RwO9RB//Mm+5QyPSO9PbXBV5JF2Z7xf3oio4pgBV85ezwiKPwI+k6j4mJqhz1dE9f1+j9v/10u45o/k1U0BQ3KaT8xurdE6ELX5WjxythADmkCDEiiopicF6uq++7D+yfTjLW1Nak7ukAKryczX/giMdQa1gi4DXHfFUcuMYhFSyBESa98Rwdw7MAWVE3wRUmN5EqzJ33w9Y033IGEGjD/mf5B9ndMOZi9EKqn9/nubkK5jv9oIfv3P40pPCsrmGa5QcOvpj+9Vos22IRsCTAAtnlKbk1NFeTjEo63tAzrmMXYjdMy4J66pLem2JwTDrXJwaJ7kVt5chA5iI/eLB3K+NYLGGOnPdpU+yP0AWd0C3YCdgyuTqgWSv3iGhcS3X2H24Nk4F3M0IndMOG5Neo2HwT+tQBlIwql9rDk3I3hrZaq7pR3/KJzY8xBmipdpYofDD39GvYgE1t52jJ2izEKsppT437NqR36HWgBqVTYdSWp4y9+yM26m+Whk3NAbRJPFzQb5PeqUnupI/0DXVQx9P4gU7CtPIk8U6LjddgCzYhVwfQNvFqkkOohI4uRv9ktGrw5uU/Vy7WqHYdP9CeKJGETmnjX8IGbFmrVgewAk823DRCXkH3wgPK/vtI0sgczEhJSUTlJ3QSBjzogC7tiEyXYcN/Hsr69k/b8Z3lSyI5Cak2J3Lj/Z2pr7crUzwXljbLb8kdMo6Lu6H9ijSikaT+kuhAY5EO+l8Tb4xL4b5tbzFfnkRrPjF9tc91j/u7TcLuioc6xm83Sv4H/wE/hRXt7WYAAAAASUVORK5CYII=")
          no-repeat center;
        background-size: rem(32) rem(32);
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
