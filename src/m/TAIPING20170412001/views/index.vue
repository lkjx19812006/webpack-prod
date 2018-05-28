<style lang="scss" scoped>
.limit-select {
}
</style>
<template>
  <yd-layout>
    <bannerCom :imgUrl="require('../productImg/banner@2x.png')"></bannerCom>
    <!-- 
      产品范围组件 属性
      rangeList 产品范围数据源 类型 array  格式如下
       [
          { title: "承保范围", rang: "大陆地区" },
          { title: "承保周期", rang: "一年" },
          { title: "保障范围", rang: "企业" }
       ]
    -->
    <productRangeCom :rangeList="rangeList"></productRangeCom>

    <!--头部套餐选择组件  -->
    <planSelect :planList="planList" @change="_planChange"></planSelect>

    <div class="bottom-after">
      <limitCell v-model="limitNum" @change="_limitChange" :tabList="limitList"></limitCell>
    </div>

    <!-- 保障责任 -->
    <anyiCellItem :arrow="true" :rightColor="'#707070'">
      <span class="left-title-line" slot="left"></span>
      <span class="left-title" slot="left">保障责任</span>
      <span @click="popup.more = true" class="right-title" slot="right">更多详情</span>
    </anyiCellItem>
    <cellItemCom :cellList="bzzrList" :hasMore="true" :showBeforeNum="4" @showPopup="_showPopup"></cellItemCom>

    <bannerCom :imgUrl="require('../productImg/Bitmap@2x.png')"></bannerCom>
    <bannerCom :imgUrl="require('../productImg/BitmapCopy7@2x.png')"></bannerCom>
    <bannerCom :imgUrl="require('../productImg/BitmapCopy8@2x.png')"></bannerCom>
    <bannerCom :imgUrl="require('../productImg/BitmapCopy9@2x.png')"></bannerCom>

    <cellItemCom leftColor="#282828" :cellList="cellList" @showPopup="_showPopup"></cellItemCom>

    <bottomTips></bottomTips>

    <footerCom slot="bottom" themecolor="#E42F46" :price="49.9" @insureClick="_insureClick"></footerCom>

    <!-- 更多详情弹框 -->
    <yd-popup v-model="popup.more" position="right" width="100%" height="100%">
      <!-- 弹框内部内容模板 -->
      <popupContent :docInfos="gdxqDoc" btnText="自定义按钮文字" @closePopup="popup.more = false"></popupContent>
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
      <span>保险条款</span>
      <yd-button type="danger" @click.native="popup.bxtk = false">Close Right Popup</yd-button>
    </yd-popup>

    <!-- 保险条款 -->
    <yd-popup v-model="popup.popup1" position="right" width="100%">
      <popupContent :docInfos="tbrsmDoc" @closePopup="popup.popup1 = false"></popupContent>
    </yd-popup>

    <!-- 保险购买模板 -->
    <yd-popup class="buy-com" v-model="showBuy" position="bottom" height="72%">
      <buyModalCom @close="showBuy = false"></buyModalCom>
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
import tempCom from "@/components/popupCom/tempCom";
import planSelect from "@/components/common/plan-select";

import bottomTips from "@/components/common/bottom-tip";
import limitCell from "@/components/common/limitCell";

//弹框相关
import shjlp from "../components/shjlp";
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
    tempCom,
    planSelect,
    buyModalCom,
    bottomTips,
    limitCell,

    shjlp,
    popupContent
  },
  data() {
    return {
      packageName: "B款升级版",
      limitNum: 50000,
      planList: product.packageName,
      rangeList: product.rangeList,
      cellList: product.responsibility,
      showBuy: false
    };
  },
  computed: {
    //保障责任列表
    bzzrList() {
      var result = product.insured[this.packageName][this.limitNum];
      var common = product.insured[this.packageName]["common"];
      return result.concat(common);
    },
    gdxqDoc() {
      var packageName = this.packageName;
      return product.doc[packageName];
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

    limitList() {
      return product.limit;
    }
  },

  mounted() {
    this._addEventPopState();
  },
  methods: {
    _insureClick() {
      // 跳转到表单页面进行填写
      this.showBuy = true;
      // this.$router.push("/write");
    },
    // 显示弹窗信息
    _showPopup(pid) {
      // 排他
      for (var key in this.popup) {
        this.popup[key] = false;
      }
      // 显示当前弹框信息
      this.popup[pid] = true;
    },
    //保险计划改变
    _planChange(param) {
      this.packageName = param.select.name;
      console.log(param);
    },
    _limitChange(param) {
      this.limitNum = param.value;
    }
  }
};
</script>
