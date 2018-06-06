<style lang="scss" scoped>
@import "../../../css/mixin.scss";
.content {
  background: #fff;
  .anyi-cell-item {
    flex-wrap: nowrap;
    /deep/ .anyi-cell-left {
      flex: 0 0 rem(630);
      overflow: hidden;
    }
  }
  .left-title {
    width: 100%;
  }
  .p-modal-sub-conetnt {
    padding: 0 rem(32);
    padding-bottom: rem(32);
  }
}
</style>
<template>
  <yd-layout>
    <div class="content">
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title top-title">保险条款</span>
      </anyiCellItem>
      <anyiCellItem :noBorder="index >= docInfos.length - 1" class="anyi-cell-item" arrow v-for="(item, index) in docInfos" :key="index">
        <a v-if="plateform === 'iphone'" slot="left" class="left-title text-overflow" :href="item.value" :download="item.label">{{item.label}}</a>
        <a v-else-if="plateform === 'android'" slot="left" class="left-title text-overflow" :href="item.value">{{item.label}}</a>
        <a v-else slot="left" class="left-title text-overflow" :href="item.value" :download="item.label">{{item.label}}</a>
      </anyiCellItem>
    </div>
    <yd-button class="popup-close-btn" slot="bottom" @click.native="_closePopup">{{btnText}}</yd-button>
  </yd-layout>
</template>
<script>
import anyiCellItem from "@/components/common/anyi-cell-item";
import accordion from "@/components/common/accordion";
export default {
  components: {
    anyiCellItem,
    accordion
  },
  props: {
    btnText: {
      type: String,
      default: "点击关闭"
    },
    docInfos: {
      type: [Array],
      default: () => {
        return [];
      }
    }
  },
  computed: {
    //判断平台方法
    plateform() {
      var agent = window.navigator.userAgent.toLowerCase();
      if (agent.indexOf("iphone") != -1 && agent.indexOf("android") == -1) {
        return "iphone";
      } else if (
        agent.indexOf("iphone") == -1 &&
        agent.indexOf("android") != -1
      ) {
        return "android";
      } else {
        return "";
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    _closePopup() {
      this.$emit("closePopup");
    }
  }
};
</script>