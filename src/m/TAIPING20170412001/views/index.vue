<style lang="scss" scoped>
.limit-select {
}
</style>
<template>
  <yd-layout>
    <bannerCom :imgUrl="require('../productImg/banner@2x.png')"></bannerCom>

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

    <bannerCom :imgUrl="require('../productImg/Bitmap@2x.png')"></bannerCom>
    <bannerCom :imgUrl="require('../productImg/BitmapCopy7@2x.png')"></bannerCom>
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
      return this.$store.state.productState.insured;
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
  },
  methods: {
    //初始化默认值
    _initDefault() {
      //设置日期限制
      //投保人日期选择开始时间
      if (!this.otherData.applicantStartTime) {
        this.dispatchModule(
          "setOtherData",
          "applicantStartTime",
          Date.getDateByAge(55)
        );
      }
      //投保人日期选择结束时间
      if (!this.otherData.applicantEndTime) {
        this.dispatchModule(
          "setOtherData",
          "applicantEndTime",
          Date.getDateByAge(18)
        );
      }

      //被保人日期选择开始时间
      if (!this.otherData.insuredStartTime) {
        this.dispatchModule(
          "setOtherData",
          "insuredStartTime",
          Date.getDateByAge(50)
        );
      }
      //被保人日期选择结束时间
      if (!this.otherData.insuredEndTime) {
        this.dispatchModule(
          "setOtherData",
          "insuredEndTime",
          Date.getDateByDay(30)
        );
      }
      //设置投保人默认出生日期
      if (!this.applicant.birthday) {
        this.dispatchModule("setApplicant", "birthday", Date.getDateByAge(18));
      }
      //设置被保人默认出生日期
      if (!this.insured.birthday) {
        this.dispatchModule("setInsured", "birthday", Date.getDateByDay(30));
      }
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
