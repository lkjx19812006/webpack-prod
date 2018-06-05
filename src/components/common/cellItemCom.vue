<style lang="scss" scoped>
@import "../../css/mixin.scss";
.cell-item-com {
  //点击展示更多
  .show-list-more {
    background: #fff;
    position: relative;
    height: rem(79);
    .more-icon {
      padding: rem(20);
      height: rem(72);
      width: rem(56);
      transform: rotateZ(90deg);
      transition: all 0.3s ease-in-out;
    }
    &.show-more {
      .more-icon {
        transform: rotateZ(270deg);
      }
    }
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: rem(32);
      right: rem(0);
      margin: auto;
      height: 1px;
      background: #d2d2d2;
    }
  }
}
</style>
<template>
  <div class="cell-item-com">
    <anyiCellItem :noBorder="countNoBorder(index)" v-show="showList(index)" class="anyi-cell-item" @click.native="_showPopup(item)" :arrow="item.arrow" v-for="(item,index) in cellList" :key="index">
      <!-- 标题样式 -->
      <span :style="{color: leftColor}" slot="left" class="left-title" :class="[item.type === 'title' ? 'top-title' : '']">{{item.label}}</span>
      <span :style="{color: rightColor}" slot="right" class="right-title">{{item.value}}</span>
    </anyiCellItem>
    <div v-if='hasMore' class="show-list-more flex center" :class="[hasShowMore ? 'show-more' : '']">
      <img @click="_showMore" class="more-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAaCAMAAACw0Z1uAAAAclBMVEUAAACZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZkjQ/XgAAAAJnRSTlMA7ujdVDIi5Ne2NikbBgTBu51tXhQK066njnpyZTjKyK2af2NHQjJC6wcAAAB5SURBVBjTXc9LFoMgEERRukEBxfDRaBI1/+x/ixlSbc3ueaNSMQcFy3SdgNObhc83+wrCnIVXe2nBw8rSxS49etMefRqPdr5BG512YZcUrJ0JFJ5UoC1UhipPn9r6RFtVE2kEPdiA7qhutl+Q41/VrnVXZRilosNbfw4XBeFnOhPGAAAAAElFTkSuQmCC" alt="加载更多">
    </div>
  </div>
</template>
<script>
import anyiCellItem from "@/components/common/anyi-cell-item";
export default {
  data() {
    return {
      hasShowMore: false
    };
  },
  computed: {},
  components: {
    anyiCellItem
  },
  props: {
    cellList: {
      type: Array,
      default: () => {
        return [
          {
            label: "售后及理赔",
            value: "测试数据",
            arrow: true,
            popupId: "shjlp"
          },
          {
            label: "售后及理赔",
            value: "测试数据",
            arrow: true,
            popupId: "shjlp"
          }
        ];
      }
    },
    leftColor: {
      type: String,
      default: "#707070"
    },
    rightColor: {
      type: String,
      default: "#707070"
    },
    showBeforeNum: {
      //显示前面几条数据 默认显示10条 如果需要控制显示数量 需要传递 hasMore 和 showBeforeNum 两个参数共同控制
      type: Number,
      default: 10
    },
    hasMore: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    _showPopup(item) {
      if (item.popupId) {
        this.$emit("showPopup", item.popupId);
      }
    },
    //展示更多
    _showMore() {
      this.hasShowMore = !this.hasShowMore;
    },
    //计算当前显示
    showList(index) {
      if (this.hasShowMore) return true;
      if (index <= this.showBeforeNum - 1) return true;
      return false;
    },
    //计算显示底部边框
    countNoBorder(index) {
      if (this.hasShowMore) {
        if (index > this.cellList.length - 2) {
          return true;
        } else {
          return false;
        }
      } else {
        if (!this.hasMore && index >= this.cellList.length - 1) {
          return true;
        }
        if (index >= this.showBeforeNum - 1) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
};
</script>