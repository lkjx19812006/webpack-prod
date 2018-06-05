<style lang="scss" scoped>
//------------- 迭代YDUI样式 -----------------
.yd-cell-item {
  display: flex;
  position: relative;
  height: 1.1rem;
  padding-left: 0.32rem;
  padding-right: 0.32rem;
  overflow: hidden;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.yd-cell-left {
  font-size: 0.3rem;
  font-weight: 500;
  color: rgba(112, 112, 112, 1);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  span {
    line-height: 0.3rem;
  }
}
.yd-cell-right {
  flex: 1;
  font-size: 0.3rem;
  color: rgba(112, 112, 112, 1);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  span {
    line-height: 0.3rem;
  }
}
.yd-cell-arrow:after {
  font-size: 0.3rem;
  height: 0.3rem;
  color: rgba(151, 151, 151, 1);
  content: "\E608";
}
//------------- 迭代YDUI样式EDN -----------------
.cell-item-com {
  .left-title-line {
    width: 0.04rem;
    height: 0.32rem;
    background: rgba(40, 40, 40, 1);
    margin-right: 0.2rem;
  }
  .left-title {
    height: 0.45rem;
    font-size: 0.30rem;
    color: rgba(31, 31, 31, 1);
    line-height: 0.45rem;
  }
  .right-title {
    height: 0.42rem;
    font-size: 0.3rem;

    color: rgba(112, 112, 112, 1);
    line-height: 0.42rem;
  }
}
</style>
<template>
  <yd-cell-group class="cell-item-com">
    <!-- 标题样式 -->

    <yd-cell-item @click.native="_showPopup(item)" :arrow="item.arrow" :type="item.popupId ? 'label' : 'div'" v-for="item,index in cellList" :key="index">
      <!-- 标题样式 -->
      <span :style="{background: item.leftLineColor || item.leftColor || '#707070'}" slot="left" class="left-title-line" v-if="item.leftText && item.isLeftLine"></span>
      <span :style="{color: item.leftColor || '#707070'}" slot="left" class="left-title" v-if="item.leftText">{{item.leftText}}</span>
      <span :style="{color: item.rightColor || '#707070'}" slot="right" class="right-title" v-if="item.rightText">{{item.rightText}}</span>
    </yd-cell-item>

  </yd-cell-group>
</template>
<script>
export default {
  props: {
    cellList: {
      type: Array,
      default: () => {
        return [
          {
            isLeftLine: true, // 是否显示左边得竖线
            leftText: '保障责任', // 左边文字内容
            leftColor: '#282828',
            rightText: '更多详情', // 右边文字内容
            rightColor: '#707070',
            arrow: true, // 是否显示箭头
            popupId: 'more'
          },
          {
            type: 'item', // 类型项目
            leftText: '意外身故，残疾',
            rightText: '2万',
            alink: '',
            hash: ''
          },
          {
            type: 'item', // 类型
            leftText: '意外医疗费用',
            rightText: '0.1万',
            alink: '',
            hash: ''
          },
          {
            type: 'item', // 类型
            leftText: '个人第三者责任',
            rightText: '2万',
            alink: '',
            hash: ''
          },
          {
            type: 'item', // 类型
            leftText: '第三者责任意外医疗',
            rightText: '0.1万',
            alink: '',
            hash: ''
          }
        ];
      }
    }
  },
  methods: {
    _showPopup (item) {
      if (item.popupId) {
        this.$emit('showPopup', item.popupId);
      }
    }
  }
};
</script>
