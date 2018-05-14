<style lang="scss">
//底部立即投保按钮
//-----------flex布局开始-------------
.flex {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.column {
  flex-direction: column;
}
.center {
  justify-content: center;
  align-items: center;
}
.item-center {
  align-items: center;
}
//--------------flex布局结束--------------
.product-range-com {
  height: 1.7067rem;
  background: rgba(255, 255, 255, 1);
  margin-bottom: 0.32rem;
  .range-item {
    justify-content: space-between;
    flex: 1;
    .left-range {
      flex: 1;
      .range-title {
        height: 0.44rem;
        font-size: 0.32rem;
        font-family: PingFangSC-Medium;
        color: rgba(112, 112, 112, 1);
        line-height: 0.44rem;
      }
      .range {
        height: 0.56rem;
        font-size: 0.4rem;
        font-family: PingFangSC-Medium;
        color: rgba(31, 40, 59, 1);
        line-height: 0.56rem;
      }
    }

    &::after {
      content: "";
      height: 0.9333rem;
      width: 0.0267rem;
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
  <div class="product-range-com flex item-center">
    <div class="range-item flex" v-for="item,index in rangeList" :key="index">
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
