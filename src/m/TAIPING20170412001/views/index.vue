<style lang="scss" scoped>
//-----------迭代YDUI样式------------------
.yd-scrollview:after {
  height: 0;
}
//-----------YDUI END----------------------
</style>
<template>
  <yd-layout>
    <!-- 
      图片组件 属性
      imgUrl 图片地址 类型  string  可以是本地图片地址或网络地址
      height 图片高度 类型  number  按750设计图算的高度 内部默认有转换
     -->
    <bannerCom :imgUrl="require('@/img/bg@2x.png')" :height="361"></bannerCom>
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

    <!-- 保障责任 -->
    <anyiCellItem :arrow="true" :rightColor="'#707070'">
      <span class="left-title-line" slot="left"></span>
      <span class="left-title" slot="left">保障责任</span>
      <span @click="popup.more = true" class="right-title" slot="right">更多详情</span>
    </anyiCellItem>
    <cellItemCom :cellList="bzzrList" :hasMore="true" :showBeforeNum="4" @showPopup="_showPopup"></cellItemCom>

    <bannerCom :imgUrl="require('@/img/pic_details@2x.png')" :height="655"></bannerCom>

    <bannerCom :imgUrl="require('@/img/pic_details2@2x.png')" :height="655"></bannerCom>

    <cellItemCom leftColor="#282828" :cellList="cellList" @showPopup="_showPopup"></cellItemCom>

    <bottomTips></bottomTips>
    <!-- 
      底部价格和立即投保按钮组件 属性      
      themecolor    主题色        类型  string   默认为#278AFA 设置该属性值 会改变文字和按钮背景颜色
      price         价格          类型  number   根据传入的值 显示价格 默认为0
      btntext       按钮文字      类型  string   可自定义按钮文字  默认为立即投保
      insureClick   按钮点击事件  类型  function  可定义一个事件接受到按钮点击 做些逻辑处理
     -->
    <footerCom slot="bottom" themecolor="#E42F46" :price="49.9" @insureClick="_insureClick"></footerCom>

    <!-- 更多详情弹框 -->
    <yd-popup v-model="popup.more" position="right" width="100%" height="100%">
      <!-- 弹框内部内容模板 -->
      <gdxq :docInfos="gdxqDoc" btnText="自定义按钮文字" @closePopup="popup.more = false"></gdxq>
    </yd-popup>

    <!-- 售后及理赔 -->
    <yd-popup v-model="popup.shjlp" position="right" width="100%">
      <shjlp @closePopup="popup.shjlp = false"></shjlp>
    </yd-popup>

    <!-- 常见问题 -->
    <yd-popup v-model="popup.cjwt" position="right" width="100%">
      <cjwt :docInfos="cjwtDoc" @closePopup="popup.cjwt = false"></cjwt>
    </yd-popup>

    <!-- 投保须知 -->
    <yd-popup v-model="popup.tbxz" position="right" width="100%">
      <span>投保须知</span>
      <yd-button type="danger" @click.native="popup.tbxz = false">Close Right Popup</yd-button>
    </yd-popup>

    <!-- 保险条款 -->
    <yd-popup v-model="popup.bxtk" position="right" width="100%">
      <span>保险条款</span>
      <yd-button type="danger" @click.native="popup.bxtk = false">Close Right Popup</yd-button>
    </yd-popup>

    <!-- 保险条款 -->
    <yd-popup v-model="popup.popup1" position="right" width="100%">
      <span>投保人声明</span>
      <yd-button type="danger" @click.native="popup.popup1 = false">Close Right Popup</yd-button>
    </yd-popup>

    <!-- 保险购买模板 -->
    <yd-popup v-model="showBuy" position="bottom" height="47%">
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
import buyModalCom from "@/components/common/buy-modal-com";
import bottomTips from "@/components/common/bottom-tip";

//弹框相关
import gdxq from "../components/gdxq";
import shjlp from "../components/shjlp";
import cjwt from "../components/cjwt";
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
    gdxq,
    shjlp,
    cjwt
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
    }
  }
};
</script>
