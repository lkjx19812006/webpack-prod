<style lang="scss" scoped>
@import "../../../css/mixin.scss";
.top-title-banner {
  position: relative;
  width: 100%;
  height: rem(360);
  background: url("../productImg/banner@2x.png") no-repeat center;
  background-size: 100%;
  .img-text {
    position: absolute;
    top: 0;
    left: 0;
    .title {
      margin-left: rem(44);
      font-size: rem(36);
      color: $titleColor;
      line-height: rem(50);
      font-family: PingFang-SC-Heavy;
      font-weight: 600;
      margin-top: rem(56);
      margin-bottom: rem(43);
    }
    .info {
      p {
        .left {
          margin-left: rem(44);
          height: rem(8);
          width: rem(8);
          background: $themeColor;
          margin-right: rem(6);
          border-radius: rem(8);
        }
        font-size: rem(24);
        font-family: PingFang-SC-Medium;
        color: $titleColor;
        line-height: rem(40);
      }
    }
  }
}
</style>
<template>
  <yd-layout>
    <div class="top-title-banner">
      <div class="img-text">
        <h1 class="title">康乐一生重大疾病保险</h1>
        <div class="info">
          <p class="flex row item-center">
            <span class="left"></span>
            <span class="info-text">80种重疾+35种轻症保障</span>
          </p>
          <p class="flex row item-center">
            <span class="left"></span>
            <span class="info-text">贴心豁免保障</span>
          </p>
          <p class="flex row item-center">
            <span class="left"></span>
            <span class="info-text">交费灵活，保障期限可自选</span>
          </p>
        </div>
      </div>
    </div>

    <productRangeCom :rangeList="rangeList"></productRangeCom>

    <!--头部套餐选择组件  -->
    <planSelect v-model="productInfo.package_code" :planList="planList"></planSelect>

    <div class="bottom-after">
      <limitCell ref="limitCom" v-model="productInfo.base_premium" :tabList="limitList"></limitCell>
    </div>

    <!-- 保障责任 -->
    <anyiCellItem :arrow="true" :rightColor="'#707070'">
      <span class="left-title-line" slot="left"></span>
      <span class="left-title top-title" slot="left">保障责任</span>
      <span @click="popup.more = true" class="right-title" slot="right" style="color: #707070">更多详情</span>
    </anyiCellItem>
    <cellItemCom :cellList="bzzrList" :hasMore="true" :showBeforeNum="4" @showPopup="_showPopup"></cellItemCom>

    <bannerCom :imgUrl="require('../productImg/banner2.jpg')"></bannerCom>
    <bannerCom :imgUrl="require('../productImg/banner3.jpg')"></bannerCom>
    <bannerCom :imgUrl="require('../productImg/BitmapCopy8@2x.png')"></bannerCom>
    <bannerCom :imgUrl="require('../productImg/BitmapCopy9@2x.png')"></bannerCom>

    <cellItemCom leftColor="#282828" :cellList="cellList" @showPopup="_showPopup"></cellItemCom>

    <bottomTips></bottomTips>

    <footerCom slot="bottom" themecolor="#E42F46" :price="total" @insureClick="_insureClick"></footerCom>

    <!-- 更多详情弹框 -->
    <yd-popup v-model="popup.more" position="right" width="100%" height="100%">
      <!-- 弹框内部内容模板 -->
      <popupContent :docInfos="gdxqDoc" @closePopup="popup.more = false"></popupContent>
    </yd-popup>

    <!-- 售后及理赔 -->
    <yd-popup v-model="popup.shjlp" position="right" width="100%">
      <shjlp @closePopup="popup.shjlp = false"></shjlp>
    </yd-popup>

    <!-- 常见问题 -->
    <yd-popup v-model="popup.cjwt" position="right" width="100%">
      <popupContent :docInfos="cjwtDoc" @closePopup="popup.cjwt = false"></popupContent>
    </yd-popup>

    <!-- 投保须知 -->
    <yd-popup v-model="popup.tbxz" position="right" width="100%">
      <popupContent :docInfos="tbxzDoc" @closePopup="popup.tbxz = false"></popupContent>
    </yd-popup>

    <!-- 保险条款 -->
    <yd-popup v-model="popup.bxtk" position="right" width="100%">
      <bxtk :docInfos="bxtkDoc" @closePopup="popup.bxtk = false"></bxtk>
    </yd-popup>

    <!-- 保险条款 -->
    <yd-popup v-model="popup.popup1" position="right" width="100%">
      <popupContent :docInfos="tbrsmDoc" @closePopup="popup.popup1 = false"></popupContent>
    </yd-popup>

    <!-- 保险购买模板 -->
    <yd-popup class="buy-com" v-model="showBuy" position="bottom" height="72%">
      <buyModalCom model="index" @submit="_submit" @close="_closeBuy"></buyModalCom>
    </yd-popup>

  </yd-layout>
</template>

<script>
import anyiCellItem from "@/components/common/anyi-cell-item";
import footerCom from "@/components/common/footerCom";
import bannerCom from "@/components/common/bannerCom";
import productRangeCom from "@/components/common/productRangeCom";
import cellItemCom from "@/components/common/cellItemCom";

import mixinPopup from "@/mixins/popup";

import planSelect from "@/components/common/plan-select";

import bottomTips from "@/components/common/bottom-tip";
import limitCell from "@/components/common/limitCell";

//弹框相关
import shjlp from "../components/shjlp";
import bxtk from "../components/bxtk";
import popupContent from "../components/popup-content";
import buyModalCom from "../components/buy-modal-com";

import product from "../config/product.js";
export default {
  name: "Index",
  mixins: [mixinPopup],
  components: {
    anyiCellItem,
    footerCom,
    bannerCom,
    productRangeCom,
    cellItemCom,

    planSelect,
    buyModalCom,
    bottomTips,
    limitCell,

    bxtk,
    shjlp,
    popupContent
  },
  data() {
    return {
      planList: product.packageName, //保险套餐配置
      rangeList: product.rangeList, //保障范围配置
      cellList: product.responsibility, //收获理赔等常见问题 弹窗相关配置
      showBuy: false //显示购买组件？
    };
  },
  computed: {
    total() {
      return this.$store.state.productState.total;
    },
    productInfo() {
      return this.$store.state.productState.product;
    },
    applicant() {
      return this.$store.state.productState.applicant;
    },
    insured() {
      return this.$store.state.productState.insured[0];
    },
    otherData() {
      return this.$store.state.productState.otherData;
    },
    //保障责任列表
    bzzrList() {
      var result =
        product.insured[this.productInfo.package_code][
          this.productInfo.base_premium
        ];
      var common = product.insured[this.productInfo.package_code]["common"];
      return result.concat(common);
    },
    gdxqDoc() {
      return product.doc[this.productInfo.package_code];
    },
    cjwtDoc() {
      return product.doc["常见问题"];
    },
    tbxzDoc() {
      return product.doc["投保须知"];
    },
    tbrsmDoc() {
      return product.doc["投保人声明"];
    },
    bxtkDoc() {
      return product.doc["保险条款"][this.productInfo.package_code];
    },
    limitList() {
      return product.limit;
    }
  },

  mounted() {
    this._initDefault();
    this.dispatchModule("setDefaultDate");
  },
  methods: {
    //初始化默认值
    _initDefault() {
      //设置appid
      try {
        var appid = this.$http.getUrlParam("appid");
        if (appid) sessionStorage.setItem("appid", appid);
      } catch (error) {}
      if (this.insured.relation != "00") {
        this.dispatchModule("setInsured", "relation", "");
      }
      // //是否为本人投保 填写页也需要同样处理
      // if (this.insured.relation != "00") {
      //   this.dispatchModule("setInsured", "relation", "");
      // }
      // //设置日期限制
      // //投保人日期选择开始时间
      // if (!this.otherData.applicantStartTime) {
      //   this.dispatchModule(
      //     "setOtherData",
      //     "applicantStartTime",
      //     Date.getDateSection(18, 55).startDate
      //   );
      // }
      // //投保人日期选择结束时间
      // if (!this.otherData.applicantEndTime) {
      //   this.dispatchModule(
      //     "setOtherData",
      //     "applicantEndTime",
      //     Date.getDateSection(18, 55).endDate
      //   );
      // }

      // //被保人日期选择开始时间
      // if (!this.otherData.insuredStartTime) {
      //   this.dispatchModule(
      //     "setOtherData",
      //     "insuredStartTime",
      //     Date.getDateSection(18, 50).startDate
      //   );
      // }
      // //被保人日期选择结束时间
      // if (!this.otherData.insuredEndTime) {
      //   this.dispatchModule(
      //     "setOtherData",
      //     "insuredEndTime",
      //     Date.getDateByDay(30)
      //   );
      // }

      // //受益人日期开始
      // if (!this.otherData.beneficiaryStartTime) {
      //   this.dispatchModule(
      //     "setOtherData",
      //     "beneficiaryStartTime",
      //     Date.getDateByAge(100)
      //   );
      // }
      // //受益人日期结束
      // if (!this.otherData.beneficiaryEndTime) {
      //   this.dispatchModule(
      //     "setOtherData",
      //     "beneficiaryEndTime",
      //     Date.getDateByDay(0)
      //   );
      // }

      // //设置投保人默认出生日期
      // if (!this.applicant.birthday) {
      //   this.dispatchModule("setApplicant", "birthday", Date.getDateByAge(18));
      // }
      // //设置被保人默认出生日期
      // if (!this.insured.birthday) {
      //   this.dispatchModule("setInsured", "birthday", Date.getDateByAge(18));
      // }
    },
    _insureClick() {
      // 跳转到表单页面进行填写
      this.showBuy = true;
    },
    // 显示弹窗信息 主要市底部理赔问题以及其他的弹框信息中
    _showPopup(pid) {
      // 排他
      for (var key in this.popup) {
        this.popup[key] = false;
      }
      // 显示当前弹框信息
      this.popup[pid] = true;
    },
    _closeBuy() {
      this.showBuy = false;
      this.$refs.limitCom.initPosition();
    },
    _submit() {
      this.$router.push("/health");
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
