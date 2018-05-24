<style lang="scss" scoped>
@import "../../css/mixin.scss";
.plan-select {
  background: #fff;
  padding: rem(32) 0;
  padding-bottom: 0;
  position: relative;
  &:before {
    position: absolute;
    content: "";
    bottom: 0;
    margin: auto;
    left: rem(32);
    right: rem(32);
    height: 1px;
    background: #d2d2d2;
  }
  .plan-select-item {
    flex: 1;
    margin-left: rem(32);
    text-align: center;
    background-color: #fff;
    height: rem(104);
    padding: 0;
    border: rem(2) solid #cfcfcf;
    position: relative;
    font-size: rem(30);
    font-family: PingFang-SC-Bold;
    color: $textColor;
    margin-bottom: rem(40);
    border-radius: rem(8);
    &:after {
      //箭头
      content: "";
      height: 0;
      width: 0;
      border: rem(18) solid transparent;
      border-top: rem(18) solid transparent;
      position: absolute;
      right: 0;
      left: 0;
      bottom: rem(-28);
      margin: auto;
    }
    &:last-child {
      margin-right: rem(32);
    }
    /deep/ span {
      height: rem(42);
      line-height: rem(42);
    }
    &.active {
      border-color: $themeColor;
      background: $themeColor;
      color: #fff;
      &:after {
        border-top: rem(14) solid $themeColor;
      }
    }
  }
}
</style>
<template>
  <div class="plan-select flex row space item-center">
    <div @click="_selected(index)" v-html="item.name" :class="[ selectCount === index ? 'active' : '']" class="plan-select-item flex center" v-for="(item, index) in planList" :key="index">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectCount: 0
    };
  },
  props: {
    planList: {
      type: Array,
      default: () => {
        return [
          { code: "A", name: "全面款(￥298)" },
          { code: "B", name: "全面款(￥298)" }
        ];
      }
    },
    selectIndex: {
      //默认选择的下标
      type: Number,
      default: 0
    }
  },
  created() {
    this.selectCount = this.selectIndex;
  },
  methods: {
    _selected(index) {
      this.selectCount = index;
      this.$emit("change", { index: index, select: this.planList[index] });
    }
  }
};
</script>
