<template>
  <div style="height: 100%;">
    <router-view v-wechat-title="$route.meta.title"></router-view>
  </div>
</template>

<script type="text/babel"> export default {name: 'product'} </script>

<style>
  * {
    box-sizing: border-box;
  }
</style>
