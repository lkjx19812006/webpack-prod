<style lang="scss" scoped>
@import "../../css/mixin.scss";
//--------------flex布局结束--------------
.product-range-com {
  height: rem(128);
  background: rgba(255, 255, 255, 1);
  margin-bottom: rem(24);
  .range-item {
    justify-content: space-between;
    flex: 1;
    .left-range {
      flex: 1;
      .range-title {
        height: rem(33);
        font-size: rem(24);
        font-family: PingFangSC-Medium;
        color: $textColor;
        line-height: rem(33);
      }
      .range {
        height: rem(42);
        font-size: rem(30);
        font-family: PingFangSC-Medium;
        color: $titleColor;
        line-height: rem(42);
      }
    }

    &::after {
      content: "";
      height: rem(70);
      width: 1px;
      background: #cfcfcf;
    }
  }
  .range-item:last-child {
    &::after {
      content: "";
      display: none;
    }
  }
}
</style>
<template>
  <div class="product-range-com flex row item-center">
    <div class="range-item flex row" v-for="(item,index) in rangeList" :key="index">
      <div class="left-range flex column item-center">
        <span class="range-title">{{item.title}}</span>
        <span class="range">{{item.rang}}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    rangeList: {
      type: Array,
      default: () => {
        return [
          { title: "承保范围", rang: "大陆地区" },
          { title: "承保周期", rang: "一年" },
          { title: "保障范围", rang: "企业" }
        ];
      }
    }
  },
  data() {
    return {};
  }
};
</script>
