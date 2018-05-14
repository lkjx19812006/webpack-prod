<style lang="scss" >
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
.banner-com {
  .banner-img {
    height: 100%;
    width: 100%;
  }
}
</style>
<template>
  <div v-if="imgUrl" class="banner-com flex center" :style="{width: typeof width === 'number' ? width / 75 + 'rem' : width, height:  height / 75 + 'rem'}">
    <img :src="imgUrl" class="banner-img">
  </div>
</template>
<script>
export default {
  props: {
    width: {
      type: [Number, String],
      default: "100%"
    },
    height: {
      type: Number,
      default: 0
    },
    imgUrl: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  }
};
</script>