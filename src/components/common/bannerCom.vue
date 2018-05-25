<style lang="scss" scoped>
@import "../../css/mixin.scss";
.banner-com {
  width: 100%;
  .banner-img {
    height: 100%;
    width: 100%;
  }
}
</style>
<template>
  <div v-if="imgUrl" class="banner-com flex center">
    <img :src="imgUrl" class="banner-img">
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