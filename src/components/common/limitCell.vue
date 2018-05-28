<style lang="scss" scoped>
@import "../../css/mixin.scss";
.tab-bar {
  width: 100%;
  padding: rem(22) 0;
  background: #fff;
  overflow: hidden;
  flex: 0 0 auto;
  justify-content: flex-start;
  position: relative;
  .tab-item {
    flex: 0 0 auto;
    .title {
      flex: 0 0 auto;
      font-size: rem(30);
      font-family: PingFangSC-Regular;
      background: #fff;
      border-radius: rem(35);
      text-align: center;
      padding: rem(15) rem(35);
      margin-left: rem(32);
      color: $textColor;
      border: 1px solid #cfcfcf;
      box-sizing: border-box;
    }
    &.active {
      .title {
        border-color: $themeColor;
        color: #fff;
        background: $themeColor;
      }
    }
    &:last-child {
      .title {
        margin-right: rem(32);
      }
    }
  }
}
</style>
<template>
  <div ref="tabWrap" class="tab-bar flex row" @touchstart="_touchstart" @touchmove="_touchmove" @touchend="_touchend">
    <div :ref="'tab' + index" :class="[item.value === value ? 'active' : '']" @click="itemClick(index,item)" class="tab-item center" v-for="(item,index) in tabList" :key="index">
      <div class="title">
        {{item.label}}
      </div>
    </div>
  </div>
</template>
<script>
import TWEEN from "@/lib/tween";
export default {
  data() {
    return {
      activeIndex: -1,
      timer: null,
      touchObj: {
        startX: 0,
        moveX: 0,
        endX: 0,
        temp: 0,
        startTime: 0,
        endTime: 0
      }
    };
  },
  props: {
    value: "",
    tabList: {
      type: Array,
      default: () => {
        return [
          { label: "按钮一", value: 1 },
          { label: "按钮二", value: 2 },
          { label: "按钮三", value: 3 },
          { label: "按钮四", value: 4 },
          { label: "按钮五", value: 5 },
          { label: "按钮六", value: 6 }
        ];
      }
    }
  },
  mounted() {
    this.initPosition();
  },
  methods: {
    //初始化位置
    initPosition() {
      for (var i = 0; i < this.tabList.length; i++) {
        var item = this.tabList[i];
        if (this.value === item.value) {
          this.itemClick(i, item);
          return;
        }
      }
    },
    itemClick(index, param) {
      this.$emit("input", param.value);
      var target = this.$refs["tab" + index][0];
      var tabWrap = this.$refs.tabWrap;
      var itemLeft = target.offsetLeft;
      var wrapWidth = tabWrap.offsetWidth;
      if (itemLeft > wrapWidth / 2) {
        this._scrollTo(
          tabWrap,
          itemLeft - wrapWidth / 2 + target.offsetWidth / 2
        );
      } else if (itemLeft <= wrapWidth / 2) {
        this._scrollTo(tabWrap, 0);
      }
      if (index !== this.activeIndex) {
        this.activeIndex = index;
        this.$emit("change", param);
      }
    },
    _touchstart(e) {
      if (this._getWrapBoxWidth() > this._getBoxScrollWidth()) return;
      this.touchObj.startX = e.touches[0].pageX;
      this.touchObj.startTime = new Date().getTime();
      // console.log("触摸开始：" + this.touchObj.startX);
    },
    _touchmove(e) {
      if (this._getWrapBoxWidth() > this._getBoxScrollWidth()) return;
      this.touchObj.moveX =
        this.touchObj.startX - e.touches[0].pageX + this.touchObj.temp;

      // console.log(this.touchObj.moveX);
      //设置左右滚动
      this.$refs.tabWrap.scrollLeft = this.touchObj.moveX;
    },
    _touchend(e) {
      if (this._getWrapBoxWidth() > this._getBoxScrollWidth()) return;
      var duration = new Date().getTime() - this.touchObj.startTime;
      var touches = e.changedTouches ? e.changedTouches[0] : e;
      var offsetLeft = this.touchObj.startX - touches.pageX; //本次滚动偏移位置
      var speed = Math.abs(offsetLeft) / duration; // 惯性移动速度
      var moveTime = duration * speed * 2; // 惯性滚动时间(动画)
      moveTime = moveTime > 1000 ? 1000 : moveTime;
      this.touchObj.moveX += offsetLeft * speed * 2; // 惯性移动距离

      if (this.touchObj.moveX < 0) {
        this.touchObj.temp = 0;
      } else if (this.touchObj.moveX > this._getLeftOrRightScrollWidth()) {
        this.touchObj.temp = this._getLeftOrRightScrollWidth();
      } else {
        this.touchObj.temp = this.touchObj.moveX;
      }
      var tabWrap = this.$refs.tabWrap;
      console.log(this.touchObj.temp, tabWrap.scrollLeft, tabWrap);
      this.stateTransform(
        tabWrap.scrollLeft,
        this.touchObj.temp,
        num => {
          console.log();
          tabWrap.scrollLeft = num;
          this.touchObj.temp = num;
        },
        moveTime
      );
    },
    //获取盒子滚动宽度
    _getBoxScrollWidth() {
      var allWidth = 0;
      this.tabList.forEach((item, index) => {
        allWidth += this.$refs["tab" + index][0].offsetWidth;
      });
      return allWidth;
    },
    //获取包裹盒子宽度
    _getWrapBoxWidth() {
      return this.$refs.tabWrap.offsetWidth;
    },
    //获取左右可滚动距离
    _getLeftOrRightScrollWidth() {
      return this._getBoxScrollWidth() - this._getWrapBoxWidth();
    },
    //左右滚动函数
    _scrollTo(tabWrap, scrollNum) {
      if (tabWrap.scrollLeft === 0 && scrollNum === 0) return;
      //获取可滚动盒子的总宽
      var allWidth = this._getBoxScrollWidth();

      //1.如果盒子宽度大于总宽 不滚动
      if (tabWrap.offsetWidth >= allWidth) return;

      //2获取左右可滚动距离
      var scrollWidth = allWidth - tabWrap.offsetWidth;

      //3如果需要滚动的距离 大于可滚动距离， 让滚动距离等于可滚动距离
      if (scrollNum >= scrollWidth) scrollNum = scrollWidth;

      //状态过渡
      this.stateTransform(tabWrap.scrollLeft, scrollNum, num => {
        tabWrap.scrollLeft = num;
        this.touchObj.temp = num;
      });
    },
    stateTransform(from, to, callback) {
      var vm = this;
      function animate() {
        if (TWEEN.update()) {
          requestAnimationFrame(animate);
        }
      }

      new TWEEN.Tween({ number: from })
        .easing(TWEEN.Easing.Circular.Out)
        .to({ number: to }, 300)
        .onUpdate(function() {
          callback(Number(this.number.toFixed(0)));
        })
        .delay(0)
        .start();
      animate();
    }
  }
};
</script>
