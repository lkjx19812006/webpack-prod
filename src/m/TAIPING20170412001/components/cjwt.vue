<style lang="scss" scoped>
@import "../../../css/mixin.scss";
// 常见问题
.yd-popup-content {
  //公共样式 基于更多详情来写的 后面其他弹框页面在此基础上迭代
  .content {
    background: #fff;
    .item {
      position: relative;
      padding: rem(32);
      .p-modal-sub-tit {
        .left-tit,
        .right-tit {
          height: rem(42);
          font-size: rem(30);
          font-family: PingFangSC-Medium;
          color: $itemSubTitleColor;
          line-height: rem(42);
        }
      }
      .p-modal-sub-conetnt {
        margin-top: rem(18);
        font-size: rem(28);
        font-family: PingFang-SC-Regular;
        color: $textColor;
        line-height: rem(48);
      }
      &:before {
        content: "";
        position: absolute;
        top: 0;
        left: rem(32);
        right: rem(32);
        height: 1px;
        background: #d2d2d2;
      }
    }
  }

  .popup-close-btn {
    border-radius: 0;
    z-index: 9;
    height: 1.09rem;
    font-size: 0.32rem;
    font-family: PingFangSC-Medium;
    color: rgba(255, 255, 255, 1);
    line-height: 1.09rem;
  }
}
</style>
<template>
  <yd-layout>
    <div class="content">
      <anyiCellItem :noBorder="true">
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title top-title">{{docInfos.title}}</span>
      </anyiCellItem>

      <div class="item" v-for="(item, idx) in docInfos.lists" :key="idx">
        <div class="p-modal-sub-tit flex between">
          <span class="left-tit">{{item.title}}</span>
          <!-- <span class="right-tit"></span> -->
        </div>
        <div class="p-modal-sub-conetnt" v-for="(subItem, jdx) in item.infos" :key="jdx">{{subItem}}</div>
      </div>
    </div>
    <yd-button class="popup-close-btn" slot="bottom" @click.native="_closePopup">{{btnText}}</yd-button>
  </yd-layout>
</template>
<script>
import anyiCellItem from "@/components/common/anyi-cell-item";
export default {
  components: {
    anyiCellItem
  },
  props: {
    btnText: {
      type: String,
      default: "点击关闭"
    },
    docInfos: {
      type: Object,
      default: () => {
        return {};
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