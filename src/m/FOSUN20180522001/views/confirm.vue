<style lang="scss" scoped>
@import "../../../css/mixin.scss";
.confirm {
  //设置样式颜色
  .group {
    .left-title {
      color: $textColor;
    }
    .top-title {
      color: $itemSubTitleColor;
    }
    .right-title {
      color: $itemSubTitleColor;
      max-width: rem(500);
    }
    margin-bottom: rem(26);

    .accordion {
      .cut-icon {
        margin-right: rem(20);
      }
      .left-title {
        color: $textColor;
      }
      .right-title {
        color: $itemSubTitleColor;
        max-width: rem(500);
        &.name-tit {
          margin-right: rem(100);
          color: $itemSubTitleColor;
        }
        &.percent {
          margin-right: rem(30);
          color: $itemSubTitleColor;
        }
      }
      .accordion-content {
        padding: 0;
      }
    }
  }
}
</style>
<template>
  <yd-layout class="confirm">
    <!-- 头部 -->
    <div class="group">
      <anyiCellItem>
        <span slot="left" class="left-title">为谁投保</span>
        <span slot="right" class="right-title" v-if="insured.relation === '00'">本人</span>
        <span slot="right" class="right-title" v-else>他人</span>
      </anyiCellItem>
      <anyiCellItem noBorder>
        <span slot="left" class="left-title">起保日期</span>
        <span slot="right" class="yd-datetime-input">{{addtional.effect}}</span>
      </anyiCellItem>
    </div>

    <!-- 保险信息 -->
    <div class="group">
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title top-title">保险信息</span>
      </anyiCellItem>
      <cellItemCom leftColor="#707070" rightColor="#282828" :cellList="planInfos" :hasMore="true" :showBeforeNum="2"></cellItemCom>
    </div>

    <!-- 投保人信息 -->
    <div class="group">
      <!-- 标题样式 -->
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title top-title">投保人信息</span>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">投保人姓名</span>
        <span slot="right" class="right-title">{{applicant.name}}</span>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">证件类型</span>
        <span slot="right" class="right-title" v-if="applicant.card_type === '01'">身份证</span>
        <span slot="right" class="right-title" v-if="applicant.card_type === '03'">护照</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">证件号码</span>
        <span slot="right" class="right-title">{{applicant.card_id}}</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">性别</span>
        <span slot="right" class="right-title" v-if="applicant.sex === '0'">男</span>
        <span slot="right" class="right-title" v-if="applicant.sex === '1'">女</span>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">出生日期</span>
        <span slot="right" class="right-title">{{applicant.birthday}}</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">居住城市</span>
        <span slot="right" class="right-title text-overflow">{{otherData.labelProvince}}、{{otherData.labelCity}}、{{otherData.labelDistric}}</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">联系地址</span>
        <span slot="right" class="right-title">{{applicant.address}}</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">手机号码</span>
        <span slot="right" class="right-title">{{applicant.phone}}</span>
      </anyiCellItem>

      <anyiCellItem :noBorder="insured.relation !== '00'">
        <span slot="left" class="left-title">电子邮箱</span>
        <span slot="right" class="right-title">{{applicant.email}}</span>
      </anyiCellItem>

      <anyiCellItem v-if="insured.relation === '00'">
        <span slot="left" class="left-title">身高（CM）</span>
        <span slot="right" class="right-title">{{insured.height}}</span>
      </anyiCellItem>

      <anyiCellItem v-if="insured.relation === '00'">
        <span slot="left" class="left-title">体重（KG）</span>
        <span slot="right" class="right-title">{{insured.weight}}</span>
      </anyiCellItem>

      <anyiCellItem v-if="insured.relation === '00'">
        <span slot="left" class="left-title">职业</span>
        <span slot="right" class="right-title text-overflow">{{otherData.labelJob1}}、{{otherData.labelJob2}}、{{otherData.labelJob3}}</span>
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
        <span slot="left" class="left-title  top-title">被保人信息</span>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">与投保人关系</span>
        <span slot="right" class="right-title" v-if="insured.relation === '01'">配偶</span>
        <span slot="right" class="right-title" v-if="insured.relation === '02'">父母</span>
        <span slot="right" class="right-title" v-if="insured.relation === '03'">子女</span>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">被保险人姓名</span>
        <span slot="right" class="right-title">{{insured.name}}</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">证件类型</span>
        <span slot="right" class="right-title" v-if="insured.card_type === '01'">身份证</span>
        <span slot="right" class="right-title" v-if="insured.card_type === '03'">护照</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">证件号码</span>
        <span slot="right" class="right-title">{{insured.card_id}}</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">性别</span>
        <span slot="right" class="right-title" v-if="insured.sex === '0'">男</span>
        <span slot="right" class="right-title" v-if="insured.sex === '1'">女</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">出生日期</span>
        <span slot="right" class="right-title">{{insured.birthday}}</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">手机号码</span>
        <span slot="right" class="right-title">{{insured.phone}}</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">电子邮箱</span>
        <span slot="right" class="right-title">{{insured.email}}</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">身高（CM）</span>
        <span slot="right" class="right-title">{{insured.height}}</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">体重（KG）</span>
        <span slot="right" class="right-title">{{insured.weight}}</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">职业</span>
        <span slot="right" class="right-title text-overflow">{{otherData.labelJob1}}、{{otherData.labelJob2}}、{{otherData.labelJob3}}</span>
      </anyiCellItem>

      <anyiCellItem noBorder>
        <span slot="left" class="left-title">购买份数</span>
        <span slot="right" class="right-title">1</span>
      </anyiCellItem>
    </div>

    <!-- 收益人信息 -->
    <!-- 受益人最多为3个 B不能设置受益人 必须为法定受益人 -->
    <div class="group">
      <anyiCellItem :noBorder="productInfo.package_code === 'B' || beneficiary.type === '1'">
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title  top-title">受益人信息</span>
        <span slot="right" class="right-title" v-if="beneficiary.type === '1'">法定受益人</span>
        <span slot="right" class="right-title" v-if="beneficiary.type === '2'">指定受益人</span>
      </anyiCellItem>
      <div class="beneficiary-list" v-if="productInfo.package_code === 'A' && beneficiary.person.length && beneficiary.type === '2'">
        <accordion :key="index" v-for="(item, index) in beneficiary.person" :isOpenShowBottomBorder="index < beneficiary.person.length - 1" isOpenShowTopBorder :isCloseShowTopBorder="index < beneficiary.person.length - 1" open class="accordion">
          <span slot="left" class="left-title">受益人{{index + 1}}</span>
          <span slot="right" class="right-title name-tit" v-if="beneficiary.person[index].name">{{beneficiary.person[index].name}}</span>
          <span slot="right" class="right-title percent" v-if="beneficiary.person[index].percent">{{beneficiary.person[index].percent}}%</span>
          <div class="accordion-content">
            <anyiCellItem>
              <span slot="left" class="left-title">姓名</span>
              <span slot="right" class="right-title">{{beneficiary.person[index].name}}</span>
            </anyiCellItem>
            <anyiCellItem>
              <span slot="left" class="left-title">受益人是被保险人的</span>
              <span slot="right" class="right-title" v-if="beneficiary.person[index].relation === '01'">配偶</span>
              <span slot="right" class="right-title" v-if="beneficiary.person[index].relation === '02'">父母</span>
              <span slot="right" class="right-title" v-if="beneficiary.person[index].relation === '03'">子女</span>
            </anyiCellItem>
            <anyiCellItem>
              <span slot="left" class="left-title">证件类型</span>
              <span slot="right" class="right-title" v-if="beneficiary.person[index].certificate_type === '01'">身份证</span>
              <span slot="right" class="right-title" v-if="beneficiary.person[index].certificate_type === '03'">护照</span>
            </anyiCellItem>
            <anyiCellItem v-if="beneficiary.person[index].certificate_type === '01'">
              <span slot="left" class="left-title">证件号码</span>
              <span slot="right" class="right-title">{{beneficiary.person[index].certificate_id}}</span>
            </anyiCellItem>
            <anyiCellItem>
              <span slot="left" class="left-title">性别</span>
              <span slot="right" class="right-title" v-if="beneficiary.person[index].sex === '0'">男</span>
              <span slot="right" class="right-title" v-if="beneficiary.person[index].sex === '1'">女</span>
            </anyiCellItem>
            <anyiCellItem>
              <span slot="left" class="left-title">出生日期</span>
              <span slot="right" class="right-title">{{beneficiary.person[index].birthday}}</span>
            </anyiCellItem>
            <anyiCellItem noBorder>
              <span slot="left" class="left-title">受益比例（%）</span>
              <span slot="right" class="right-title">{{beneficiary.person[index].percent}}</span>
            </anyiCellItem>
          </div>
        </accordion>
      </div>

    </div>

    <!-- 续期缴费信息 -->
    <div class="group">
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title  top-title">续期缴费信息</span>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">开户银行</span>
        <span slot="right" class="right-title">{{applicant.account_name}}</span>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">持卡人姓名</span>
        <span slot="right" class="right-title">{{applicant.name}}</span>
      </anyiCellItem>
      <anyiCellItem noBorder>
        <span slot="left" class="left-title">银行账号</span>
        <span slot="right" class="right-title">{{applicant.account}}</span>
      </anyiCellItem>
    </div>

    <!-- 紧急联系人 -->
    <div class="group" style="margin-bottom: 0">
      <accordion isOpenShowTopBorder :isCloseShowTopBorder="false" class="accordion">
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title  top-title">紧急联系人</span>
        <span slot="left" class="left-title" style="color:#B7B7B7">（选填）</span>
        <div class="accordion-content">
          <anyiCellItem>
            <span slot="left" class="left-title">联系人姓名</span>
            <span slot="right" class="right-title">{{contact.name}}</span>
          </anyiCellItem>
          <anyiCellItem noBorder>
            <span slot="left" class="left-title">联系人手机号</span>
            <span slot="right" class="right-title">{{contact.phone}}</span>
          </anyiCellItem>
        </div>
      </accordion>
    </div>

    <buyModalCom @submit="_insureClick" slot="bottom" model="confirm"></buyModalCom>

    <!-- 登陆弹框 -->
    <yd-popup v-model="popup.login" position="right" width="100%" height="100%">
      <div style="height: 100%;" class="flex">
        <iframe frameborder="0" v-bind:src="iframeUrl" @load="loadLogin" style="height: 100%;width: 100%;border: none"></iframe>
      </div>
    </yd-popup>
  </yd-layout>

</template>
<script>
import footerCom from "@/components/common/footerCom";
import mixinPopup from "@/mixins/popup";
import authLogin from "@/mixins/authLogin";

import anyiCellItem from "@/components/common/anyi-cell-item";
import cellItemCom from "@/components/common/cellItemCom";
import accordion from "@/components/common/accordion";

import buyModalCom from "../components/buy-modal-com";

export default {
  name: "Confirm",
  components: {
    footerCom,
    anyiCellItem,
    accordion,
    cellItemCom,

    buyModalCom
  },
  mixins: [mixinPopup, authLogin],
  data() {
    return {
      isSendIng: false //发生数据中
    };
  },
  computed: {
    //总价
    total() {
      return this.$store.state.productState.total;
    },
    //投保人信息
    applicant() {
      return this.$store.state.productState.applicant;
    },
    //被保人信息
    insured() {
      return this.$store.state.productState.insured[0];
    },
    //产品信息
    productInfo() {
      return this.$store.state.productState.product;
    },
    //受益人信息
    beneficiary() {
      return this.$store.state.productState.beneficiary;
    },
    otherData() {
      return this.$store.state.productState.otherData;
    },
    //附加的
    addtional() {
      return this.$store.state.productState.addtional;
    },
    //紧急联系人
    contact() {
      return this.$store.state.productState.contact;
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
    }
  },
  mounted() {
    //获取session值
    this.dispatchModule("setStateBySession");
  },
  methods: {
    _insureClick() {
      //该产品发布在云保和风险管家端
      //云保地址测试http://open.anyitech.ltd
      //云保地址生产http://open.anyi-tech.com
      //风险管家地址http://test.m.anyi-tech.com
      //风险管家生产http://m.anyi-tech.com
      var hostConfig = {
        "m.anyi-tech.com": {
          env: "pro",
          platform: "风险管家"
        },
        "test.m.anyi-tech.com": {
          env: "dev",
          platform: "风险管家"
        },
        "open.anyi-tech.com": {
          env: "pro",
          platform: "安逸云保"
        },
        "open.anyitech.ltd": {
          env: "dev",
          platform: "安逸云保"
        }
      };

      var hostname = window.location.hostname;
      var env = (hostConfig[hostname] && hostConfig[hostname].env) || "dev"; //环境
      var platform =
        (hostConfig[hostname] && hostConfig[hostname].platform) || "风险管家"; //平台
      var ybId = "FOSUN20180522001-001"; //云保Id

      if (platform === "风险管家" && !this.checkLogin()) {
        //校验平台是否需要登陆
        //需要登陆 校验登陆
        this.showLogin();
        return;
      }

      //云保不需要登陆 风险管家需要登陆 接口地址
      var url =
        platform === "风险管家"
          ? "/spb/standard/product/insured.action"
          : "/spb/standard/product/insuredWithoutLogin.action";

      var total = this.total * 100; //产品总价
      var product = this.copyObj(this.productInfo); //复制产品信息
      product.base_premium = product.base_premium * 100; //基本保费处理
      var applicant = this.applicant; //投保人信息
      var insured = this.insured; //被保人信息
      var addtional = this.addtional; //其他信息
      var beneficiary = { type: "", person: [] }; //受益人处理百分比
      beneficiary.type = this.beneficiary.type; //设置受益人类型
      for (var i = 0; i < this.beneficiary.person.length; i++) {
        //处理受益人百分比
        var obj = {};
        var item = this.beneficiary.person[i];
        for (var key in item) {
          obj[key] = item[key];
        }
        obj.percent = Number.divide(obj.percent, 100); //处理比例
        beneficiary.person.push(obj);
      }
      var views = {
        city_name:
          this.otherData.labelProvince +
          this.otherData.labelCity +
          this.otherData.labelDistric,
        profession_name:
          this.otherData.labelJob1 +
          this.otherData.labelJob2 +
          this.otherData.labelJob3
      };

      var sendData = {
        total: total,
        app_id: window.sessionStorage.getItem("appid") || "10000",
        core_info: {
          total: total,
          product: product,
          applicant: this.applicant,
          insured: [this.insured],
          beneficiary: beneficiary,
          addtional: this.addtional,
          contact: this.contact,
          views: views
        },
        product_id: ybId,
        yb_applicant: {
          //云保投保人信息
          name: this.applicant.name, //投保人姓名
          telephone: this.applicant.phone, //投保人手机号码
          email: this.applicant.email //投保人联系邮箱
        }
      };
      console.log(sendData);

      if (!this.isSendIng) {
        this.isSendIng = true;
        this.$http
          .post({
            url: url,
            data: sendData,
            loading: true
          })
          .then(res => {
            this.isSendIng = false;
            if (res.code === "80001") {
              this.$dialog.toast({
                mes: res.msg,
                duration: 2000
              });
            } else if (res.code === "1") {
              //将当前表单值存到session中
              var session = {
                total: this.total,
                product: this.productInfo,
                applicant: this.applicant,
                insured: [this.insured],
                beneficiary: this.beneficiary,
                addtional: this.addtional,
                contact: this.contact,
                otherData: this.otherData
              };
              sessionStorage.setItem(
                this.productInfo.id,
                JSON.stringify(session)
              );
              this.loadScript(res.data);
            }
            console.log(res);
          })
          .catch(err => {
            this.isSendIng = false;
            this.$dialog.toast({
              mes: err.toString(),
              duration: 2000
            });
          });
      }
    },
    checkLogin() {
      return !!this.$http.getCookie("sso_token");
    },
    //复制一个对象
    copyObj(oldObj) {
      var newObj = {};
      if (oldObj && typeof oldObj === "object") {
        for (var key in oldObj) {
          if (oldObj.hasOwnProperty(key)) {
            newObj[key] = oldObj[key];
          }
        }
      }
      return newObj;
    },
    loadScript(scriptstr) {
      var strContent = scriptstr.match(/<script>(\S*)<\/script>/)[1];
      var script = window.document.createElement("script");
      script.type = "text/javascript";
      script.innerText = strContent;
      document.body.appendChild(script);
    },
    dispatchModule(moduleName, key, value) {
      this.$store.dispatch(moduleName, {
        key: key,
        value: value
      });
    }
  }
};
</script>
