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
        <div @click="_planSelect(item, index)" :class="[packageName === item.value ? 'active' : '' ]" v-html="item.label" class="plan-select-item flex center" v-for="(item, index) in planList" :key="index">
        </div>
      </div>
      <anyiCellItem>
        <span class="left-title" slot="left">投保人出生日期</span>
        <yd-datetime slot="right" type="date" v-model="applicant.birthday" :start-date="applicantStartTime" :end-date="applicantEndTime" placeholder="请选择" :init-emit="false"></yd-datetime>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">投保人性别</span>
        <buttonRadio type="sex" slot="right" v-model="applicant.sex"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">是否为本人投保</span>
        <buttonRadio type="radio" slot="right" v-model="isSelf"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">被保险人出生日期</span>
        <yd-datetime slot="right" type="date" v-model="insured.birthday" :start-date="insuredStartTime" :end-date="insuredEndTime" placeholder="请选择" :init-emit="false"></yd-datetime>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">被保险人性别</span>
        <buttonRadio slot="right" v-model="insured.sex"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem arrow>
        <span class="left-title" slot="left">基本保额</span>
        <select slot="right" v-model="limitNum">
          <option :key="index" v-for="(item, index) in limitList" :value="item.value">{{item.label}}</option>
        </select>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">保障期限</span>
        <buttonRadio :radioList="period" slot="right" v-model="lifelong"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">缴费年限</span>
        <buttonRadio :radioList="yearPeriod" slot="right" v-model="payYear"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">缴费类型</span>
        <buttonRadio :radioList="payTypes" slot="right" v-model="payType"></buttonRadio>
      </anyiCellItem>

      <!-- 附加轻症只有B款升级款才有 -->
      <anyiCellItem v-if="packageName==='B款升级款'">
        <span class="left-title" slot="left">附加轻症及轻症豁免</span>
        <buttonRadio :radioList="fjqzhm" slot="right" v-model="qjhm"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem :noBorder="!isShowBfhm" v-if="packageName==='B款升级款'">
        <span class="left-title" slot="left">轻症疾病保额</span>
        <span class="right-title" slot="right">{{qzbe}}</span>
      </anyiCellItem>

      <!-- 保费豁免根据选择 -->
      <anyiCellItem v-if="isShowBfhm">
        <div class="flex" slot="left">
          <span class="left-title">保费豁免</span>
          <span class="tips">注：投保人保费豁免</span>
        </div>
        <buttonRadio :radioList="bfhms" slot="right" v-model="bfhm"></buttonRadio>
      </anyiCellItem>
      
      <anyiCellItem :noBorder="true" v-if="isShowBfhm">
        <div class="flex" slot="left">
          <span class="left-title">附加险缴费年限</span>
          <span class="tips">注：投保人豁免缴费期限</span>
        </div>
        <span class="right-title" slot="right">{{bfhmnx}}</span>
      </anyiCellItem>
    </div>
    <footerCom class="footer-com" :price="countPrice"></footerCom>
  </div>
</template>
<script>
import footerCom from "@/components/common/footerCom";
import anyiCellItem from "@/components/common/anyi-cell-item";
import buttonRadio from "@/components/common/buttonRadio";
import product from "../config/product.js";
import price from "../config/price";
export default {
  data() {
    return {
      price: "0.00",
      planList: product.packageName,
      //投保人
      isSelf: false, //是否为本人投保
      limitNum: 50000, //基本保额
      packageName: "B款升级款",
      productCode: "A",
      lifelong: "life_70", //保险期限
      payYear: 15, //缴费年限
      payType: "年缴", //缴费类型
      qjhm: true, //附加轻症豁免
      bfhm: true //保费豁免
    };
  },
  watch: {
    isSelf(newVal, oldVal) {
      //是否为本人投保
      if (!newVal) return;
      this.$store.dispatch("setInsured", {
        key: "birthday",
        value: this.applicant.birthday
      });
      this.$store.dispatch("setInsured", {
        key: "sex",
        value: this.applicant.sex
      });
    }
  },
  computed: {
    //显示保费豁免
    isShowBfhm() {
      if (this.productCode === "A" && !this.qjhm) return false;
      return true;
    },
    //投保人信息
    applicant() {
      return this.$store.state.productState.applicant;
    },
    //被保人信息
    insured() {
      return this.$store.state.productState.insured[0];
    },
    //计算投保人年龄范围
    applicantStartTime() {
      return Date.getDateByAge(55);
    },
    applicantEndTime() {
      return Date.getDateByAge(18);
    },
    //被保人年龄范围30天到50周岁
    insuredStartTime() {
      return Date.getDateByAge(50);
    },
    insuredEndTime() {
      return Date.getDateByDay(30);
    },
    //投保人年龄
    applicantAge() {
      var birthday = this.applicant.birthday;
      console.log("选择投保人出生日期:%o", birthday);
      return Date.getAgeByDate(birthday);
    },
    //被保人年龄
    insuredAge() {
      var birthday = this.insured.birthday;
      console.log("选择被保人出生日期:%o", birthday);
      return Date.getAgeByDate(birthday);
    },
    limitList() {
      //最高保额规则 被保人
      //30-17岁 最高 20W
      //18-40岁 最高 50w
      //41-45岁 最高 40W
      //46-50岁 最高 30w
      var age = this.insuredAge; //this.insuredAge
      var productLimit = product.limit;
      var limits = [];
      if (age <= 17) {
        limits = productLimit.slice(0, 4);
      } else if (age <= 40) {
        limits = [].concat(productLimit);
      } else if (age <= 45) {
        limits = productLimit.slice(0, 8);
      } else if (age <= 50) {
        limits = productLimit.slice(0, 6);
      }
      console.log("当前可选择投保额度:%o", limits);
      return limits;
    },

    //轻症疾病保额
    qzbe() {
      if (!this.qjhm) return "不投保";
      if (this.packageName === "B款升级款") {
        return product["insured"][this.packageName][this.limitNum][2].value;
      } else if (this.packageName === "C款升级款") {
        return product["insured"][this.packageName][this.limitNum][1].value;
      }
    },

    //保费豁免年限
    bfhmnx() {
      if (!this.bfhm) return "不投保";
      return this.payYear - 1 + "年";
    },

    //保费试算
    countPrice() {
      var codeKey = this.productCode; //产品代号
      var lifeKey = this.lifelong; //保障期限
      var payYearKey = this.payYear; //缴费年限
      var insuredSexKey = this.insured.sex == "0" ? "man" : "woman"; //被保人性别
      var insuredAgeKey = this.insuredAge; //被保险人年龄
      var applicantSexkey = this.applicant.sex == "0" ? "man" : "woman"; //投保人性别
      var applicantAgekey = this.applicantAge; //投保人年龄
      var limitNum = this.limitNum / 1000; //保额每1000 单位

      var base = price[codeKey]["base"]; //基础
      var subClinical = price[codeKey]["sub_clinical"]; //轻症
      var lifelong = price[codeKey]["lifelong"]; //保费豁免

      var basePrice =
        base[lifeKey][insuredSexKey][payYearKey][insuredAgeKey] * 100; //基础保费
      var subClinicalPrice = 0; //轻症保费
      var lifelongPrice = 0; //豁免保费
      switch (codeKey) {
        case "A":
          if (this.qjhm) {
            //选择了轻症
            subClinicalPrice =
              subClinical[lifeKey][insuredSexKey][payYearKey][insuredAgeKey] *
              100;
            if (this.bfhm) {
              lifelongPrice =
                lifelong[lifeKey][applicantSexkey][payYearKey][
                  applicantAgekey
                ] * 100;
            }
          }
          break;
        case "B":
          if (this.bfhm) {
            lifelongPrice =
              lifelong[lifeKey][applicantSexkey][payYearKey][applicantAgekey] *
              100;
          }
          break;
      }
      return (basePrice + subClinicalPrice + lifelongPrice) * limitNum / 100;
    },

    period() {
      return product["保障期限"];
    },
    yearPeriod() {
      return product["缴费年限"];
    },
    payTypes() {
      return product["缴费类型"];
    },
    bfhms() {
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
  mounted() {
    this._initCom();
  },
  methods: {
    //初始化相关
    _initCom() {
      //设置用户默认出生日期
      this.$store.dispatch("setApplicant", {
        key: "birthday",
        value: Date.getDateByAge(18)
      });
    },
    //保障计划选择
    _planSelect(item) {
      this.packageName = item.value;
      this.productCode = item.code;
    },
    _modalClose() {
      this.$emit("close");
    },

   
  }
};
</script>
