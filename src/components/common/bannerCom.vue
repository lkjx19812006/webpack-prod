<style lang="scss" scoped>
@import "../../css/mixin.scss";
.banner-com {
  width: 100%;
  position: relative;
  .banner-img {
    height: 100%;
    width: 100%;
  }
  .img-text {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
<template>
  <div v-if="imgUrl" class="banner-com flex center">
    <img :src="imgUrl" class="banner-img">
    <div class="img-text">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
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