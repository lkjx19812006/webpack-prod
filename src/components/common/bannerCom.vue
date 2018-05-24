<style lang="scss" scoped>
@import "../../css/mixin.scss";
.banner-com {
  .banner-img {
    height: 100%;
    width: 100%;
  }
}
</style>
<template>
  <div v-if="imgUrl" class="banner-com flex center" :style="{width: typeof width === 'number' ? width / 100 + 'rem' : width, height:  height / 100 + 'rem'}">
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