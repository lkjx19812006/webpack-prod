<style lang="scss" scoped>
@import "../../css/mixin.scss";
.anyi-switch {
  height: rem(54);
  width: rem(90);
  border-radius: rem(30);
  transition: all 0.2s ease-in-out;
  background: #e7e7e7;
  margin-left: rem(16);
  box-sizing: border-box;
  &.is-switch {
    background: #09c41d;
    .switch-btn {
      transform: translateX(rem(35));
    }
  }
  .switch-btn {
    margin-left: rem(5);
    transition: all 0.2s ease-in-out;
    height: rem(46);
    width: rem(46);
    border-radius: rem(25);
    background: #fff;
  }
}
</style>
<template>
  <div @click="_switchChange" class="anyi-switch flex row item-center" :class="[value === trueValue ? 'is-switch' : '']">
    <div class="switch-btn"></div>
  </div>
</template>
<script>
export default {
  props: {
    value: "",
    trueValue: {
      type: [String, Boolean, Number],
      default: true
    },
    falseValue: ""
  },
  methods: {
    _switchChange() {
      var falseValue = "";
      if (this.falseValue == undefined) {
        falseValue = "";
      } else if (this.falseValue === false) {
        falseValue = false;
      } else if (this.falseValue === 0) {
        falseValue = 0;
      } else {
        falseValue = this.falseValue;
      }
      var isSwitch =
        this.value === this.trueValue ? falseValue : this.trueValue;
      this.$emit("input", isSwitch);
    }
  }
};
</script>