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
    <anyiCellItem class="top" :noBorder="true" v-show="model === 'index'">
      <span class="left-title" slot="left">保障计划</span>
      <span class="right-icon-close" slot="right" @click="_modalClose"></span>
    </anyiCellItem>
    <div class="buy-content" v-show="model === 'index'">
      <div class="plan-select bottom-after flex row space">
        <div @click="_planSelect(item, index)" :class="[productInfo.package_code === item.code ? 'active' : '' ]" v-html="item.label" class="plan-select-item flex center" v-for="(item, index) in planList" :key="index">
        </div>
      </div>
      <anyiCellItem>
        <span class="left-title" slot="left">投保人出生日期</span>
        <yd-datetime v-if="insured.relation != '00'" slot="right" type="date" v-model="applicant.birthday" :start-date="otherData.applicantStartTime" :end-date="otherData.applicantEndTime" placeholder="请选择" :init-emit="false"></yd-datetime>
        <yd-datetime v-else slot="right" type="date" v-model="applicant.birthday" :start-date="otherData.insuredStartTime" :end-date="otherData.insuredEndTime" placeholder="请选择" :init-emit="false"></yd-datetime>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">投保人性别</span>
        <buttonRadio type="sex" slot="right" v-model="applicant.sex"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">是否为本人投保</span>
        <buttonRadio type="radio" slot="right" v-model="insured.relation"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem v-if="insured.relation !== '00'">
        <span class="left-title" slot="left">被保险人出生日期</span>
        <yd-datetime slot="right" type="date" v-model="insured.birthday" :start-date="otherData.insuredStartTime" :end-date="otherData.insuredEndTime" placeholder="请选择" :init-emit="false"></yd-datetime>
      </anyiCellItem>
      <anyiCellItem v-if="insured.relation !== '00'">
        <span class="left-title" slot="left">被保险人性别</span>
        <buttonRadio slot="right" v-model="insured.sex"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem arrow>
        <span class="left-title" slot="left">基本保额</span>
        <select slot="right" v-model="productInfo.base_premium">
          <option :key="index" v-for="(item, index) in limitList" :value="item.value">{{item.label}}</option>
        </select>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">保障期限</span>
        <buttonRadio :radioList="period" slot="right" v-model="productInfo.life_limit"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">缴费年限</span>
        <buttonRadio :radioList="yearPeriod" slot="right" v-model="productInfo.payment_limit"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem>
        <span class="left-title" slot="left">缴费类型</span>
        <buttonRadio :radioList="payTypes" slot="right" v-model="otherData.pay_type"></buttonRadio>
      </anyiCellItem>

      <!-- 附加轻症只有B款升级款才有 -->
      <anyiCellItem v-if="productInfo.package_code==='A'">
        <span class="left-title" slot="left">附加轻症及轻症豁免</span>
        <buttonRadio :radioList="fjqzhm" slot="right" @change="_subClinicalChange" v-model="productInfo.is_sub_clinical"></buttonRadio>
      </anyiCellItem>
      <anyiCellItem :noBorder="!isShowLifelong" v-if="productInfo.package_code==='A'">
        <span class="left-title" slot="left">轻症疾病保额</span>
        <span class="right-title" slot="right">{{sub_clinical_num}}</span>
      </anyiCellItem>

      <!-- 保费豁免根据选择 -->
      <anyiCellItem v-if="isShowLifelong">
        <div class="flex" slot="left">
          <span class="left-title">保费豁免</span>
          <span class="tips">注：投保人保费豁免</span>
        </div>
        <buttonRadio :radioList="lifelongs" slot="right" v-model="productInfo.is_lifelong"></buttonRadio>
      </anyiCellItem>

      <anyiCellItem :noBorder="true" v-if="isShowLifelong">
        <div class="flex" slot="left">
          <span class="left-title">附加险缴费年限</span>
          <span class="tips">注：投保人豁免缴费期限</span>
        </div>
        <span class="right-title" slot="right">{{lifelongYear}}</span>
      </anyiCellItem>
    </div>
    <footerCom @insureClick="_insureClick" :class="[model==='index'? 'footer-com' : '']" :price="countPrice"></footerCom>
  </div>
</template>
<script>
import footerCom from "@/components/common/footerCom";
import anyiCellItem from "@/components/common/anyi-cell-item";
import buttonRadio from "@/components/common/buttonRadio";
import product from "../config/product.js";
import price from "../config/price";
export default {
  props: {
    model: {
      type: String,
      default: "index" //购买组件的模式问题 index write confirm
    }
  },
  data() {
    return {
      planList: product.packageName //头部保险选项
    };
  },
  watch: {
    //套餐切换时
    "productInfo.package_code"(newVal, oldVal) {
      if (newVal === "B") {
        this.dispatchModule("setProduct", "is_sub_clinical", '0');//不包含轻症
      }
    },
    "insured.relation"(newVal, oldVal) {
      //是否为本人投保
      if (newVal === "00") {
        this.dispatchModule("setInsured", "birthday", this.applicant.birthday);
        this.dispatchModule("setInsured", "sex", this.applicant.sex);
        this.dispatchModule("setInsured", "relation", "00");
      }
    },
    "applicant.birthday"(newVal, oldVal) {
      if (this.insured.relation === "00") {
        this.dispatchModule("setInsured", "birthday", this.applicant.birthday);
        this.dispatchModule("setInsured", "sex", this.applicant.sex);
        this.dispatchModule("setInsured", "relation", "00");
      }
    },
    "applicant.sex"(newVal, oldVal) {
      if (this.insured.relation === "00") {
        this.dispatchModule("setInsured", "birthday", this.applicant.birthday);
        this.dispatchModule("setInsured", "sex", this.applicant.sex);
        this.dispatchModule("setInsured", "relation", "00");
      }
    }
  },
  computed: {
    //产品信息
    productInfo() {
      return this.$store.state.productState.product;
    },
    //显示保费豁免
    isShowLifelong() {
      if (
        this.productInfo.package_code === "A" &&
        this.productInfo.is_sub_clinical === "0"
      )
        return false;
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
    otherData() {
      return this.$store.state.productState.otherData;
    },
    //投保人年龄
    applicantAge() {
      var birthday = this.applicant.birthday;
      console.log("选择投保人出生日期:%o", birthday);
      var age = Date.getAgeByDate(birthday);
      return age;
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
    sub_clinical_num() {
      if (this.productInfo.is_sub_clinical === "0") return "不投保";
      if (this.productInfo.package_code === "A") {
        return product["insured"][this.productInfo.package_code][
          this.productInfo.base_premium
        ][2].value;
      } else if (this.productInfo.package_code === "B") {
        return product["insured"][this.productInfo.package_code][
          this.productInfo.base_premium
        ][1].value;
      }
    },

    //保费豁免年限
    lifelongYear() {
      if (this.productInfo.is_lifelong === "0") return "不投保";
      return this.productInfo.payment_limit - 1 + "年";
    },

    //保费试算
    countPrice() {
      var codeKey = this.productInfo.package_code; //产品代号
      var lifeKey = this.productInfo.life_limit; //保障期限
      var payYearKey = this.productInfo.payment_limit; //缴费年限
      var insuredSexKey = this.insured.sex == "0" ? "man" : "woman"; //被保人性别
      var insuredAgeKey = this.insuredAge; //被保险人年龄
      var applicantSexkey = this.applicant.sex == "0" ? "man" : "woman"; //投保人性别
      var applicantAgekey = this.applicantAge; //投保人年龄

      console.log("base", lifeKey, insuredSexKey, payYearKey, insuredAgeKey);

      //拿到产品费率
      var base_list = price[codeKey]["base"]; //基础保费率表
      var subClinical_list = price[codeKey]["sub_clinical"] || null; //轻症费率表
      var lifelong_list = price[codeKey]["lifelong"]; //保费豁免费率表

      var base_rate =
        base_list[lifeKey][insuredSexKey][payYearKey][insuredAgeKey] * 100; //基础保费费率
      var subClinical_rate = 0; //轻症保费费率
      var lifelong_rate = 0; //豁免保费费率
      var total = 0; //总保费
      switch (codeKey) {
        case "A":
          if (this.productInfo.is_sub_clinical === "1") {
            //选择了轻症
            subClinical_rate =
              subClinical_list[lifeKey][insuredSexKey][payYearKey][
                insuredAgeKey
              ] * 100; //轻症费率
            if (this.productInfo.is_lifelong === "1") {
              //选择了保费豁免
              lifelong_rate =
                lifelong_list[lifeKey][applicantSexkey][payYearKey][
                  applicantAgekey
                ] * 100; //豁免费率
            }
          }
          break;
        case "B":
          if (this.productInfo.is_lifelong === "1") {
            //选择了保费豁免
            lifelong_rate =
              lifelong_list[lifeKey][applicantSexkey][payYearKey][
                applicantAgekey
              ] * 100;
          }
          break;
      }
      //计算保额
      var base_num = this.productInfo.base_premium; //基本保额
      var subClinical_num =
        this.productInfo.base_premium /
        5; /** 附加轻症保额，单位元；是主险保额的五分之一*/

      //计算保费
      var base_price = Number.multiply(base_num / 100 / 10, base_rate / 100); //基础保费
      var subClinical_price = Number.multiply(
        subClinical_num / 100 / 10,
        subClinical_rate / 100
      ); //轻症保费

      var lifelong_num = Number.add(base_price, subClinical_price); //豁免保额 = 基础保费 + 轻症保费
      var lifelong_price =
        Math.round(
          Number.multiply(lifelong_num / 100 / 10, lifelong_rate / 100) * 100
        ) / 100; //豁免保费
      //拿到费率 计算保费
      var total = Number.add(
        Number.add(base_price, subClinical_price),
        lifelong_price
      );
      // total = Number.multiply(total, limitNum);
      this.$store.dispatch("setTotal", total); //设置计算后的值
      return total;
    },

    period() {
      return product["保障期限"];
    },
    yearPeriod() {
      //1.投保人年龄 + 缴费年限<=70 被保险人年龄+缴费年限<=70
      var result = [];
      var arr = product["缴费年限"];
      var applicantAge = Date.getAgeByDate(this.applicant.birthday);
      var insuredAge = Date.getAgeByDate(this.insured.birthday);
      var countAge =
        70 - (applicantAge > insuredAge ? applicantAge : insuredAge);
      if (countAge >= 30) {
        result = [...arr];
      } else if (countAge >= 20) {
        result = [arr[0], arr[1]];
        if (this.model === "index") {
          this.$store.dispatch("setProduct", {
            key: "payment_limit",
            value: "15"
          });
        }
      } else if (countAge >= 15) {
        result = [arr[0]];
        if (this.model === "index") {
          this.$store.dispatch("setProduct", {
            key: "payment_limit",
            value: "15"
          });
        }
      } else {
      }
      return result;
    },
    payTypes() {
      return product["缴费类型"];
    },
    lifelongs() {
      //投保人年龄大于=51保费豁免不能投保
      //被保人为本人时 不能投保保费豁免
      var age = this.applicantAge;
      var arr = product["保费豁免"];
      if (age >= 51 || this.insured.relation === "00") {
        this.dispatchModule("setProduct", "is_lifelong", "0");
        return [arr[1]];
      }
      return arr;
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
    //保障计划选择
    _planSelect(item) {
      this.dispatchModule("setProduct", "package_code", item.code);
    },
    //附加轻症豁免选择改变
    _subClinicalChange(item) {
      if (item.value === "0") {
        //不投保轻症 设置保费豁免为0 不投保
        this.dispatchModule("setProduct", "is_lifelong", "0");
      }
    },
    //购买模块关闭
    _modalClose() {
      //每一步操作都设置了状态机中的值 所以不需要保存到session
      this.$emit("close");
    },
    //立即投保
    _insureClick() {
      //跳转到表单填写页面
      if (this.model === "index") {
        this.setOtherDataLabelStr();
        this.$emit("submit");
      } else if (this.model === "write") {
      } else if (this.model === "confirm") {
        this.$emit("submit");
      }
    },

    //统一写入填写保险信息的label对应的值
    setOtherDataLabelStr() {
      var info = this.productInfo;
      var label = {};
      label.labelPackageName = product["package_code"][info.package_code]; //保障计划
      label.labelBasePremium = product["base_premium"][info.base_premium]; //基本保额
      label.labelLifeLimit = product["life_limit"][info.life_limit]; //保障期限
      label.labelPaymentLimit = info.payment_limit + "年"; //缴费期限
      label.labelPayType = "年缴"; //缴费类型
      label.labelSubClinical = product["sub_clinical"][info.is_sub_clinical]; //附加轻症及轻症豁免
      label.labelSubClinicalNum = this.sub_clinical_num; //轻症疾病保额
      label.labelLifelong = product["lifelong"][info.is_lifelong]; //保费豁免
      label.labelLifelongYear = this.lifelongYear; //附加险缴费年限
      for (var key in label) {
        this.dispatchModule("setOtherData", key, label[key]);
      }
    },

    //分发模块
    /**
     * module
     * key
     * value
     */
    dispatchModule(moduleName, key, value) {
      this.$store.dispatch(moduleName, {
        key: key,
        value: value
      });
    }
  }
};
</script>
