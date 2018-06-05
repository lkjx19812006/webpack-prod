<style lang="scss" scoped>
@import "../../css/mixin.scss";
.button-radio {
  flex: 0 0 auto;
  .radio-item {
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: rem(4);
    padding: rem(8) rem(25);
    margin-right: rem(24);
    .radio-item-text {
      height: rem(42);
      font-size: rem(30);
      font-family: PingFang-SC-Medium;
      color: $textColor;
      line-height: rem(42);
    }
    &.active {
      border-color: $themeColor;
      .radio-item-text {
        color: $themeColor;
      }
    }
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
<template>
  <div class="button-radio flex row space item-center">
    <div @click="_radioClick(item, index)" :class="[value == item.value ? 'active': '']" class="radio-item" v-for="(item, index) in radios" :key="index">
      <span class="radio-item-text">{{item.label}}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: "",
    type: {
      type: String,
      default: "sex"
    },
    radioList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    radios() {
      if (this.radioList && this.radioList.length) return this.radioList;
      if (this.type === "sex") {
        return [{ label: "男", value: "0" }, { label: "女", value: "1" }];
      } else if (this.type === "radio") {
        return [{ label: "是", value: "00" }, { label: "否", value: "" }];
      }
    }
  },
  methods: {
    _radioClick(item, index) {
      this.$emit("input", item.value);
      this.$emit("change", item);
    }
  }
};
</script>