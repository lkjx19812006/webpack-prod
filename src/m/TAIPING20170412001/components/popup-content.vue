<style lang="scss" scoped>
@import "../../../css/mixin.scss";
.content {
  background: #fff;
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
        <span slot="left" class="left-title top-title">{{docInfos.title}}</span>
      </anyiCellItem>

      <accordion :notop="!item.title" :open="idx === 0" :isOpenShowBottomBorder="idx < docInfos.lists.length - 1" :isCloseShowTopBorder="idx < docInfos.lists.length - 1" class="item" v-for="(item, idx) in docInfos.lists" :key="idx" :title="item.title">
        <div class="p-modal-sub-conetnt" v-for="(subItem, jdx) in item.infos" :key="jdx">{{subItem}}</div>
      </accordion>
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