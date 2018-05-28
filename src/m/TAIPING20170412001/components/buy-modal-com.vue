<style lang="scss" scoped>
@import "../../../css/mixin.scss";
.buy-modal-com {
  background: $bodybgc;
  .top {
    flex: 0 0 auto;
  }
  .right-icon-close {
    height: rem(42);
    width: rem(42);
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAAEEfUpiAAAAAXNSR0IArs4c6QAAAjZJREFUWAntVktOw0AMJYhjABvuhdpV0p4BCSHBFZpkASw4VzeFczS8N+RZ7mSmaSpRWDRS4ok/z88eZ5SLi9RV13VHfdM0W7NLGRSy7CjN9bcXyioWzHfpkxZFEQrouq7w+lOsQa7krVyepJGhA0jyfVVVlZG3xWKxaGnEvRQSpTkQlpEosfPpgrPPSUXPaRaMp30g9ZBfRIF04beR2tokRV9gg44tUHQjver0LaRtAKAABxQGJA6Un7VZCkkwqHEzeMnp6gFlNjlgkKMqRois+k03EFvAyZpjymiBBHP4vUTq8ys7wAZqB3Id4U7gDnMhH5sDbM0tlTkQBtPMCVUw5UFz4IP9eBPAGPCFl0ZWTCArqAffRnDGY8BABgFwjEk7ziy/AQMZIMM3wO8hF0zfJABp8+iCnfSzjaVtUIIP1kejctQfBuraAUgFyzEHYgBwmIP2GwKyn2sKxHqAZt0heC7ayuwlS0CSL687r/++AzYFnkrbts/b7fYeG/uIjXv3tqlrHAQz4Dzh/ijL8iGOv4oVfMekrBFwzbHE6L1CYrjC70PKPanjCQSMGrEsEqJbpxyTHZCjBwEYQUaJxDHAWu47S/YSyBFJgU5NLOyDCMg5laS3rdAdNOnnT2JfxcKSnERAQZ4IdcckFtZkAhhKHvG+Yk7YUdUH8mIyJuPEfiD32cZwRzswBdxvDbfFk8wRyRKYkjgGn0IkSQAAG4DeHFpFTEDvngh0nzhEwr+X7Gf5LzrwDcotl5WsLb+XAAAAAElFTkSuQmCC")
      no-repeat center right;
    background-size: rem(38) rem(38);
  }
  .buy-content {
    min-height: 100%;
    padding-bottom: rem(128);
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .plan-select {
      background: #fff;
      padding-top: rem(10);
      padding-bottom: rem(35);
      padding-right: rem(32);
      .plan-select-item {
        font-size: rem(28);
        flex: 1;
        height: rem(88);
        background: #fff;
        border-radius: rem(8);
        border: 1px solid #cfcfcf;
        color: #888888;
        margin-left: rem(32);
        &.active {
          color: #fff;
          background: $themeColor;
          border-color: $themeColor;
        }
      }
    }
  }
  .footer-com {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
  }

  //局部样式修改
  .flex {
    .tips {
      color: #909090;
      font-size: rem(24);
    }
  }
}
</style>
<template>
  <div class="buy-modal-com flex">
    <anyiCellItem class="top" :noBorder="true">
      <span class="left-title" slot="left">保障计划</span>
      <span class="right-icon-close" slot="right" @click="_modalClose"></span>
    </anyiCellItem>
    <div class="buy-content">
      <div class="plan-select bottom-after flex row space">
        <div @click="planIndex = index" :class="[index === planIndex ? 'active' : '' ]" class="plan-select-item flex center" v-for="(item, index) in planList" :key="index">
          <span>{{item.packageName}}</span>
          <span v-if="item.code === 'B'">（含身故保障）</span>
          <span v-if="item.code === 'C'">（不含身故保障）</span>
        </div>
      </div>
      <anyiCellItem>
        <span class="left-title" slot="left">投保人出生日期</span>
        <yd-datetime slot="right" v-model="addtional.effect" value="1988-08-08" start-date="1900-08-08" placeholder="请选择" :init-emit="false"></yd-datetime>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">投保人性别</span>
        <buttonRadio type="sex" slot="right" v-model="sex" @change="_sexChange"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">是否为本人投保</span>
        <buttonRadio type="radio" slot="right" v-model="isSelf" @change="_sexChange"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">被保险人出生日期</span>
        <yd-datetime slot="right" v-model="addtional.effect" value="1988-08-08" start-date="1900-08-08" placeholder="请选择" :init-emit="false"></yd-datetime>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">被保险人性别</span>
        <buttonRadio slot="right" v-model="sex1" @change="_sexChange"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">基本保额</span>
        <select slot="right" v-model="limitNum">
          <option :key="index" v-for="(item, index) in limitList" :value="item.value">{{item.label}}</option>
        </select>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">保障期限</span>
        <buttonRadio :radioList="period" slot="right" v-model="sex1" @change="_sexChange"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">缴费年限</span>
        <buttonRadio :radioList="yearPeriod" slot="right" v-model="sex1" @change="_sexChange"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">缴费类型</span>
        <buttonRadio :radioList="payType" slot="right" v-model="sex1" @change="_sexChange"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">附加轻症及轻症豁免</span>
        <buttonRadio :radioList="fjqzhm" slot="right" v-model="sex1" @change="_sexChange"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <div class="flex" slot="left">
          <span class="left-title">保费豁免</span>
          <span class="tips">注：投保人保费豁免</span>
        </div>
        <buttonRadio :radioList="bfhm" slot="right" v-model="sex1" @change="_sexChange"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem :noBorder="true">
        <div class="flex" slot="left">
          <span class="left-title">附加险缴费年限</span>
          <span class="tips">注：投保人豁免缴费期限</span>
        </div>
        <buttonRadio :radioList="bfhm" slot="right" v-model="sex1" @change="_sexChange"></buttonRadio>
      </anyiCellItem>
    </div>
    <footerCom class="footer-com"></footerCom>
  </div>
</template>
<script>
import footerCom from "@/components/common/footerCom";
import anyiCellItem from "@/components/common/anyi-cell-item";
import buttonRadio from "@/components/common/buttonRadio";
import product from "../config/product.js";

export default {
  data() {
    return {
      planList: [
        { code: "B", packageName: "B款升级款" },
        { code: "C", packageName: "C款升级款" }
      ],
      limitNum: 50000,
      sex: "1",
      sex1: "1",
      isSelf: true,
      planIndex: 0,
      addtional: {
        effect: ""
      }
    };
  },
  computed: {
    limitList() {
      return product.limit;
    },
    period() {
      return product["保障期限"];
    },
    yearPeriod() {
      return product["缴费年限"];
    },
    payType() {
      return product["缴费类型"];
    },
    bfhm() {
      return product["保费豁免"];
    },
    fjqzhm() {
      return product["附加轻症及轻症豁免"];
    },
    fjxjfnx() {
      //附加险缴费年限 这个根据保障期限和选择保费豁免生成
      return product["附加险缴费年限"];
    }
  },
  components: {
    footerCom,
    anyiCellItem,
    buttonRadio
  },
  methods: {
    _modalClose() {
      this.$emit("close");
    },
    _sexChange(param) {
      console.log(param);
    }
  }
};
</script>
