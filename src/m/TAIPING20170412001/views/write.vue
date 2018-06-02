<style lang="scss" scoped>
@import "../../../css/mixin.scss";
//------------- 迭代YDUI样式 -----------------
.yd-scrollview:after {
  height: 0;
}

//保障计划
.write {
  .group {
    margin-bottom: rem(26);
  }
  .right-title {
    flex: 1;
    max-width: rem(500);
    text-align: right;
  }
  .r-color {
    color: $textColor;
  }

  .accordion {
    .cut-icon {
      margin-right: rem(20);
    }
    .right-title {
      color: $textColor !important;
      &.name-tit {
        margin-right: rem(100);
      }
      &.percent {
        margin-right: rem(30);
      }
    }
    .accordion-content {
      padding: 0 !important;
    }
  }

  .add {
    margin-bottom: rem(24);
    .add-person {
      flex: 0 0 auto;
      height: rem(110);
      background: #fff;
      .btn-txt {
        height: rem(42);
        font-size: rem(30);
        font-family: PingFangSC-Regular;
        color: $themeColor;
        line-height: rem(42);
        margin-left: rem(15);
      }
    }
  }

  .xieyi {
    padding: rem(32);
    padding-bottom: 0;
    align-items: flex-start;
    .radio {
      margin-right: rem(18);
    }
    .xieyi-content {
      flex: 1;
      font-size: rem(28);
      font-family: PingFangSC-Medium;
      color: $itemSubTitleColor;
      line-height: rem(42);
      .xieyi-item {
        color: $themeColor;
      }
    }
  }
}
</style>
<template>
  <yd-layout class="write">
    <!-- 保障计划 -->
    <div class="group">
      <!-- 标题样式 -->
      <anyiCellItem>
        <span slot="left" class="left-title">为谁投保</span>
        <span slot="right" class="right-title r-color" v-if="insured.relation === '00'">本人</span>
        <span slot="right" class="right-title r-color" v-else>他人</span>
      </anyiCellItem>
      <anyiCellItem noBorder>
        <span slot="left" class="left-title">起保日期</span>
        <span slot="right" class="yd-datetime-input r-color">默认为次日</span>
      </anyiCellItem>
    </div>

    <!-- 投保人信息 -->
    <div class="group">
      <!-- 标题样式 -->
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title">保险信息</span>
      </anyiCellItem>
      <cellItemCom leftColor="#282828" rightColor="#282828" :cellList="planInfos" :hasMore="true" :showBeforeNum="2"></cellItemCom>
    </div>

    <!-- 投保人信息 -->
    <div class="group">
      <!-- 标题样式 -->
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title">投保人信息</span>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">投保人姓名</span>
        <input v-form:applicantname slot="right" v-model="applicant.name" type="text" placeholder="请输入">
      </anyiCellItem>
      <anyiCellItem arrow>
        <span slot="left" class="left-title">证件类型</span>
        <select v-model="applicant.card_type" slot="right">
          <option value="01">身份证</option>
          <option value="03">护&nbsp; &nbsp;照</option>
        </select>
      </anyiCellItem>

      <anyiCellItem v-if="applicant.card_type === '01'">
        <span slot="left" class="left-title">证件号码</span>
        <!-- 身份证 -->
        <input v-toUp v-form:cardid slot="right" v-model="applicant.card_id" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem v-if="applicant.card_type === '03'">
        <span slot="left" class="left-title">证件号码</span>
        <!-- 护照 -->
        <input v-toUp v-model="applicant.card_id" slot="right" type="text" placeholder="请输入护照">
      </anyiCellItem>

      <anyiCellItem arrow>
        <span slot="left" class="left-title">性别</span>
        <select v-model="applicant.sex" slot="right">
          <option value="0">男</option>
          <option value="1">女</option>
        </select>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">出生日期</span>
        <yd-datetime slot="right" v-model="applicant.birthday" :start-date="otherData.applicantStartTime" :end-date="otherData.applicantEndTime" placeholder="请选择" type="date" :init-emit="false"></yd-datetime>
      </anyiCellItem>

      <anyiCellItem arrow>
        <span slot="left" class="left-title">居住城市</span>
        <span @click="showAddress = true" slot="right" class="right-title r-color" v-if="!applicant.province || !applicant.city || !applicant.district">请输选择</span>
        <span @click="showAddress = true" slot="right" class="right-title text-overflow" v-else>{{otherData.labelProvince}}、{{otherData.labelCity}}、{{otherData.labelDistric}}</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">联系地址</span>
        <input slot="right" v-model="applicant.address" type="text" placeholder="请输入详细地址便于联系和理赔">
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">手机号码</span>
        <input v-form:phone slot="right" v-model="applicant.phone" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem :noBorder="insured.relation !== '00'">
        <span slot="left" class="left-title">电子邮箱</span>
        <input v-form:email slot="right" v-model="applicant.email" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem v-if="insured.relation === '00'">
        <span slot="left" class="left-title">身高（CM）</span>
        <input v-form:item="{required: '请输入身高'}" slot="right" v-model="insured.height" type="number" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem v-if="insured.relation === '00'">
        <span slot="left" class="left-title">体重（KG）</span>
        <input v-form:item="{required: '请输入体重'}" slot="right" v-model="insured.weight" type="number" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem arrow v-if="insured.relation === '00'">
        <span slot="left" class="left-title">职业</span>
        <span @click="showJobSelect = true" slot="right" class="right-title r-color" v-if="!insured.job_code">请输选择</span>
        <span @click="showJobSelect = true" slot="right" class="right-title text-overflow" v-else>{{otherData.labelJob1}}、{{otherData.labelJob2}}、{{otherData.labelJob3}}</span>
      </anyiCellItem>

      <anyiCellItem :noBorder="true" v-if="insured.relation === '00'">
        <span slot="left" class="left-title">购买份数</span>
        <span slot="right" class="right-title">1</span>
      </anyiCellItem>
    </div>

    <!-- 被保人信息 -->
    <div class="group" v-if="insured.relation != '00'">
      <!-- 标题样式 -->
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title">被保人信息</span>
      </anyiCellItem>
      <anyiCellItem arrow>
        <span slot="left" class="left-title">与投保人关系</span>
        <select v-model="insured.relation" slot="right">
          <option value="">请选择与投保关系</option>
          <option value="00">本人</option>
          <option value="01">配偶</option>
          <option value="02">父母</option>
          <option value="03">子女</option>
        </select>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">被保险人姓名</span>
        <input slot="right" v-model="insured.name" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem arrow>
        <span slot="left" class="left-title">证件类型</span>
        <select slot="right">
          <option value="">身份证</option>
          <option value="">护照</option>
        </select>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">证件号码</span>
        <input slot="right" v-model="insured.card_id" type="text" placeholder="请输入">
      </anyiCellItem>
      <anyiCellItem arrow>
        <span slot="left" class="left-title">性别</span>
        <select slot="right">
          <option value="">男</option>
          <option value="">女</option>
        </select>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">出生日期</span>
        <yd-datetime slot="right" v-model="insured.birthday" value="1988-08-08" start-date="1900-08-08" placeholder="请选择" :init-emit="false"></yd-datetime>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">居住城市</span>
        <yd-datetime slot="right" v-model="insured.birthday" value="1988-08-08" start-date="1900-08-08" placeholder="请选择" :init-emit="false"></yd-datetime>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">联系地址</span>
        <input slot="right" v-model="insured.phone" type="text" placeholder="请输入详细地址便于联系和理赔">
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">手机号码</span>
        <input slot="right" v-model="insured.phone" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">电子邮箱</span>
        <input slot="right" v-model="insured.phone" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">身高（CM）</span>
        <input slot="right" v-model="insured.phone" type="number" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">体重（KG）</span>
        <input slot="right" v-model="insured.phone" type="number" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem arrow>
        <span slot="left" class="left-title">职业</span>
        <input slot="right" v-model="insured.phone" type="number" placeholder="请输入">
      </anyiCellItem>
    </div>

    <!-- 收益人信息 -->
    <div class="group">
      <accordion isOpenShowTopBorder :isCloseShowTopBorder="false" class="accordion">
        <span slot="left" class="cut-icon"></span>
        <span slot="left" class="left-title">受益人1</span>
        <span slot="right" class="right-title name-tit">张三</span>
        <span slot="right" class="right-title percent">50%</span>
        <div class="accordion-content">
          <anyiCellItem>
            <span slot="left" class="left-title">姓名</span>
            <input slot="right" v-model="insured.name" type="text" placeholder="请输入真实姓名">
          </anyiCellItem>
          <anyiCellItem arrow>
            <span slot="left" class="left-title">受益人是被保险人的</span>
            <select v-model="insured.relation" slot="right">
              <option value="00">本人</option>
              <option value="01">配偶</option>
              <option value="02">父母</option>
              <option value="03">子女</option>
            </select>
          </anyiCellItem>
          <anyiCellItem arrow>
            <span slot="left" class="left-title">证件类型</span>
            <select slot="right">
              <option value="">身份证</option>
              <option value="">护照</option>
            </select>
          </anyiCellItem>
          <anyiCellItem>
            <span slot="left" class="left-title">证件号码</span>
            <input slot="right" v-model="insured.name" type="text" placeholder="请输入有效的证件号码">
          </anyiCellItem>
          <anyiCellItem noBorder>
            <span slot="left" class="left-title">受益比例（%）</span>
            <input slot="right" v-model="insured.name" type="text" placeholder="请填写受益百分比">
          </anyiCellItem>
        </div>
      </accordion>

    </div>

    <!-- 新增受益人 -->
    <div class="add">
      <div class="add-person flex row center">
        <span class="add-icon"></span>
        <span class="btn-txt">新增受益人</span>
      </div>
    </div>

    <!-- 续期缴费信息 -->
    <div class="group">
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title">续期缴费信息</span>
      </anyiCellItem>
      <anyiCellItem arrow>
        <span slot="left" class="left-title">开户银行</span>
        <select v-model="insured.relation" slot="right">
          <option :key="index" v-for="(item, index) in banks" :value="item.value">{{item.label}}</option>
        </select>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">持卡人姓名</span>
        <input slot="right" v-model="insured.phone" type="number" placeholder="需为投保人本人">
      </anyiCellItem>
      <anyiCellItem noBorder>
        <span slot="left" class="left-title">银行账号</span>
        <input slot="right" v-model="insured.phone" type="number" placeholder="只支持银行储蓄卡">
      </anyiCellItem>
    </div>

    <!-- 紧急联系人 -->
    <div class="group">
      <accordion isOpenShowTopBorder :isCloseShowTopBorder="false" class="accordion">
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title">紧急联系人</span>
        <span slot="left" class="left-title" style="color:#B7B7B7">（选填）</span>
        <div class="accordion-content">
          <anyiCellItem>
            <span slot="left" class="left-title">联系人姓名</span>
            <input slot="right" v-model="insured.name" type="text" placeholder="请输入">
          </anyiCellItem>
          <anyiCellItem noBorder>
            <span slot="left" class="left-title">联系人手机号</span>
            <input slot="right" v-model="insured.name" type="text" placeholder="请输入有效手机号，便于联系">
          </anyiCellItem>
        </div>
      </accordion>
    </div>

    <!-- 协议部分 -->
    <div class="xieyi flex row">
      <anyiRadio class="radio" v-model="radio"></anyiRadio>
      <div class="xieyi-content">
        <span>我已了解并同意</span>
        <span @click="popup.tbxz = true" class="xieyi-item">《投保须知》</span>
        <span>、</span>
        <span @click="popup.bxtk = true" class="xieyi-item">《保险条款》</span>
        <span>和</span>
        <span @click="popup.popup1 = true" class="xieyi-item">《投保人声明》</span>
      </div>
    </div>

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

    <buyModalCom v-submit="{formEl:'.write', eventEl: '.buy-com-btn-submit',submit: _insureClick}" slot="bottom" model="write"></buyModalCom>

    <!-- 地址控件 -->
    <yd-cityselect v-model="showAddress" :callback="_showAddressSelect" :items="addressList" ref="citySelect" :provance=otherData.labelProvince :city=otherData.labelCity :area=otherData.labelDistric></yd-cityselect>
    <!-- 职业控件 -->
    <yd-cityselect v-model="showJobSelect" :callback="_showJobSelect" :items="jobList" ref="jobSelect" :provance=otherData.labelJob1 :city=otherData.labelJob2 :area=otherData.labelJob3></yd-cityselect>
  </yd-layout>
</template>
<script>
import footerCom from "@/components/common/footerCom";
import mixinPopup from "@/mixins/popup";
import anyiCellItem from "@/components/common/anyi-cell-item";
import cellItemCom from "@/components/common/cellItemCom";
import accordion from "@/components/common/accordion";
import product from "../config/product.js";
import anyiRadio from "@/components/common/anyi-radio";
import buyModalCom from "../components/buy-modal-com";

import address from "../config/address";
import jobList from "../config/job";
export default {
  name: "Write",
  mixins: [mixinPopup],
  components: {
    footerCom,
    anyiCellItem,
    cellItemCom,
    accordion,
    anyiRadio,

    buyModalCom
  },
  data() {
    return {
      addressList: address,
      showAddress: false,
      showJobSelect: false,
      jobList: jobList,
      radio: "" // 协议部分
    };
  },
  watch: {
    "applicant.card_type"(newVal, oldVal) {
      this.dispatchModule("setApplicant", "card_type", newVal);
    }
  },
  computed: {
    //投保人信息
    applicant() {
      return this.$store.state.productState.applicant;
    },
    //被保人信息
    insured() {
      return this.$store.state.productState.insured;
    },
    productInfo() {
      return this.$store.state.productState.product;
    },
    otherData() {
      return this.$store.state.productState.otherData;
    },
    //保障计划
    planInfos() {
      var self = this;
      return [
        { label: "保障计划", value: self.otherData.labelPackageName },
        { label: "基本保额", value: self.otherData.labelBasePremium },
        { label: "保障期限", value: self.otherData.labelLifeLimit },
        { label: "缴费年限", value: self.otherData.labelPaymentLimit },
        { label: "缴费类型", value: self.otherData.labelPayType },
        { label: "附加轻症及轻症豁免", value: self.otherData.labelSubClinical },
        { label: "轻症疾病保额", value: self.otherData.labelSubClinicalNum },
        { label: "保费豁免", value: self.otherData.labelLifelong },
        { label: "附加险缴费年限", value: self.otherData.labelLifelongYear }
      ];
    },
    countPcdLabel() {
      var arr = [];
      if (this.pcd.length) {
        this.pcd.forEach(item => {
          if (item.label) {
            arr.push(item.label);
          }
        });
      }
      return (arr.length && arr.join(",")) || "";
    },
    banks() {
      return product.banks;
    }
  },
  mounted() {
    console.log(this.$store.state.productState);
  },
  methods: {
    _submit() {},
    _insureClick(res) {
      console.log(res);
      //基本的表单校验;
      if (!res.valid) {
        this.$dialog.toast({
          mes: res.msg,
          timeout: 2000
        });
        return;
      }
      this.$router.push("/confirm");
    },
    _showAddressSelect(res) {
      //写入到投保人信息中
      this.dispatchModule("setApplicant", "province", res.itemValue1);
      this.dispatchModule("setApplicant", "city", res.itemValue2);
      this.dispatchModule("setApplicant", "district", res.itemValue3);

      this.dispatchModule("setOtherData", "labelProvince", res.itemName1);
      this.dispatchModule("setOtherData", "labelCity", res.itemName2);
      this.dispatchModule("setOtherData", "labelDistric", res.itemName3);
    },
    _showJobSelect(res) {
      //写入被保人职业信息
      var job_code = res.itemValue3.split("-"); //000102-1-2;

      this.dispatchModule("setInsured", "job_code", job_code[0]);
      this.dispatchModule("setOtherData", "labelJob1", res.itemName1);
      this.dispatchModule("setOtherData", "labelJob2", res.itemName2);
      this.dispatchModule("setOtherData", "labelJob3", res.itemName3);
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
