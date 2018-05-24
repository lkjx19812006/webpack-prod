<style lang="scss" scoped>
@import "../../../css/mixin.scss";
// 售后及理赔
//售后及理赔
#shouhoulipei {
  position: relative;
  padding: rem(32);
  padding-top: rem(48);
  background: #fff;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: rem(32);
    right: rem(32);
    height: 1px;
    background: #d2d2d2;
  }
  p {
    font-size: rem(28);
    font-family: PingFang-SC-Medium;
    color: #585858;
    line-height: rem(54);
    .gzh {
      font-size: rem(32);
      color: $themeColor;
      font-weight: Bold;
    }
    .liuc {
      font-size: rem(32);
      color: #585858;
      font-weight: Bold;
    }
  }
  .qr-img {
    padding-top: rem(91);
    padding-bottom: rem(108);
    img {
      height: rem(268);
      width: rem(268);
    }
  }

  .fuwu-list {
    .space {
      margin-bottom: rem(30);
    }
    .fuwu-item {
      border: rem(2) solid #e2eaff;
      width: rem(324);
      height: rem(65);
      line-height: rem(65);
      font-family: PingFang-SC-Medium;
      font-weight: Medium;
      color: $textColor;
      text-align: center;
    }
  }
}
</style>
<template>
  <yd-layout>
    <anyiCellItem :noBorder="true">
      <span slot="left" class="left-title-line"></span>
      <span slot="left" class="left-title top-title">理赔流程</span>
    </anyiCellItem>
    <div id="shouhoulipei">
      <p>
        <span>关注</span>
        <span class="gzh">“安逸风险管家”</span>
        <span>官方微信公众号</span>
      </p>
      <p>
        <span>点击</span>
        <span class="liuc">用户服务 > 在线理赔，</span>
        <span>即可享受省心理赔服务</span>
      </p>
      <div class="qr-img flex center">
        <img :src="require('@/img/qr@2x.png')" alt="安逸风险管家公众号">
      </div>
      <div class="fuwu-list">
        <div class="flex space row">
          <div class="fuwu-item">
            专家24小时快捷服务
          </div>
          <div class="fuwu-item">
            协助您一起准备材料
          </div>
        </div>
        <div class="flex space row">
          <div class="fuwu-item">
            绿色通道申请理赔
          </div>
          <div class="fuwu-item">
            为您的权益保驾护航
          </div>
        </div>
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