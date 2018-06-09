<style lang="scss" scoped>
@import "../../../css/mixin.scss";
//------------- 迭代YDUI样式 -----------------
.yd-scrollview:after {
  height: 0;
}

//保障计划
.write {
  /deep/ .anyi-cell-item {
    &:last-child {
      &:after {
        content: none;
      }
    }
  }
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
      color: $textColor;
      &.name-tit {
        color: $textColor;
        margin-right: rem(100);
      }
      &.percent {
        color: $textColor;
        margin-right: rem(30);
      }
    }
    .accordion-content {
      padding: 0;
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
    padding: 0 rem(32);
    align-items: flex-start;
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
        <span slot="right" class="right-title">{{insured.relation === '00'? '本人' : '他人'}}</span>
        <anyiSwitch v-model="insured.relation" trueValue="00" slot="right"></anyiSwitch>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">起保日期</span>
        <span slot="right" class="yd-datetime-input r-color">{{addtional.effect}}</span>
      </anyiCellItem>
    </div>

    <!-- 保险信息 -->
    <div class="group product-info">
      <!-- 标题样式 -->
      <anyiCellItem>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title top-title">保险信息</span>
      </anyiCellItem>

      <anyiCellItem arrow>
        <span slot="left" class="left-title">保障计划</span>
        <select v-model="productInfo.package_code" slot="right">
          <option value="A">B款升级款</option>
          <option value="B">C款升级款</option>
        </select>
      </anyiCellItem>

      <anyiCellItem arrow>
        <span class="left-title" slot="left">基本保额</span>
        <select slot="right" v-model="productInfo.base_premium">
          <option :key="index" v-for="(item, index) in limitList" :value="item.value">{{item.label}}</option>
        </select>
      </anyiCellItem>

      <anyiCellItem arrow>
        <span class="left-title" slot="left">保障期限</span>
        <select slot="right" v-model="productInfo.life_limit">
          <option :key="index" v-for="(item, index) in period" :value="item.value">{{item.label}}</option>
        </select>
      </anyiCellItem>

      <anyiCellItem arrow>
        <span class="left-title" slot="left">缴费年限</span>
        <select slot="right" v-model="productInfo.payment_limit">
          <option :key="index" v-for="(item, index) in yearPeriod" :value="item.value">{{item.label}}</option>
        </select>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">缴费类型</span>
        <span slot="right" class="right-title">年缴</span>
      </anyiCellItem>

      <anyiCellItem v-if="productInfo.package_code !== 'B'">
        <span slot="left" class="left-title">附加轻症及轻症豁免</span>
        <span slot="right" class="right-title">{{productInfo.is_sub_clinical === '1'? '包含' : '不包含'}}</span>
        <anyiSwitch v-model="productInfo.is_sub_clinical" trueValue="1" falseValue="0" slot="right"></anyiSwitch>
      </anyiCellItem>

      <anyiCellItem v-if="productInfo.package_code !== 'B'">
        <span slot="left" class="left-title">轻症疾病保额</span>
        <span slot="right" class="right-title" v-if="productInfo.is_sub_clinical === '0'">不投保</span>
        <span slot="right" class="right-title" v-if="productInfo.is_sub_clinical === '1'">{{productInfo.base_premium / 100 / 100 / 5}}万元</span>
      </anyiCellItem>

      <anyiCellItem v-if="insured.relation !== '00'">
        <span slot="left" class="left-title">保费豁免</span>
        <span slot="right" class="right-title">{{productInfo.is_lifelong === '1'? '包含' : '不包含'}}</span>
        <anyiSwitch v-model="productInfo.is_lifelong" trueValue="1" falseValue="0" slot="right" v-if="showLifelongSwitch"></anyiSwitch>
      </anyiCellItem>

      <anyiCellItem v-if="insured.relation !== '00'">
        <span slot="left" class="left-title">附加险缴费年限</span>
        <span slot="right" class="right-title" v-if="productInfo.is_lifelong === '0'">不投保</span>
        <span slot="right" class="right-title" v-if="productInfo.is_lifelong === '1'">{{productInfo.payment_limit - 1 }}年</span>
      </anyiCellItem>
      <!-- <cellItemCom leftColor="#282828" rightColor="#282828" :cellList="planInfos" :hasMore="true" :showBeforeNum="2"></cellItemCom> -->
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
        <input v-form:applicantname="{required: '投保人姓名为空'}" slot="right" v-model="applicant.name" type="text" placeholder="请输入">
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
        <input @blur="_applicantCardBlur" v-toUp v-form:cardid="{required: '投保人身份证为空'}" slot="right" v-model="applicant.card_id" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem v-if="applicant.card_type === '03'">
        <span slot="left" class="left-title">证件号码</span>
        <!-- 护照 -->
        <input v-toUp v-model="applicant.card_id" v-form:item="{required: '投保人护照为空'}" slot="right" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem arrow>
        <span slot="left" class="left-title">性别</span>
        <select :disabled="applicant.card_type === '01'" v-model="applicant.sex" slot="right">
          <option value="0">男</option>
          <option value="1">女</option>
        </select>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">出生日期</span>
        <input v-form:item="{required: '投保人出生日期为空'}" type="text" slot="right" style="display: none" v-model="applicant.birthday">
        <span class="right-title yd-datetime-input" v-if="applicant.card_type === '01'" slot="right">{{applicant.birthday}}</span>
        <yd-datetime v-else slot="right" type="date" v-model="applicant.birthday" :start-date="otherData.applicantStartTime" :end-date="otherData.applicantEndTime" placeholder="请选择" :init-emit="false"></yd-datetime>
      </anyiCellItem>

      <anyiCellItem arrow>
        <span slot="left" class="left-title">居住城市</span>
        <input v-form:item="{required: '居住城市为空'}" type="text" slot="right" style="display: none" v-model="applicant.district">
        <span @click="showAddress = true" slot="right" class="right-title r-color" v-if="!applicant.province || !applicant.city || !applicant.district">请输选择</span>
        <span @click="showAddress = true" slot="right" class="right-title text-overflow" v-else>{{otherData.labelProvince}}、{{otherData.labelCity}}、{{otherData.labelDistric}}</span>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">联系地址</span>
        <input v-form:item="{required: '详细地址为空', valid: {regex: /[0-9a-zA-Z[\u2E80-\u9FFF]{8,}/, errMsg:'请尽量详细地址到具体门牌号，以便理赔和投保'}}" slot="right" v-model="applicant.address" type="text" placeholder="请输入详细地址便于联系和理赔">
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">手机号码</span>
        <input v-form:phone="{required: '投保人手机号码为空'}" slot="right" v-model="applicant.phone" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">电子邮箱</span>
        <input v-form:email="{required:'投保人邮箱为空'}" slot="right" v-model="applicant.email" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem v-if="insured.relation === '00'">
        <span slot="left" class="left-title">身高（CM）</span>
        <input v-form:item="{required: '被保人身高为空'}" slot="right" v-model="insured.height" type="number" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem v-if="insured.relation === '00'">
        <span slot="left" class="left-title">体重（KG）</span>
        <input v-form:item="{required: '被保人体重为空'}" slot="right" v-model="insured.weight" type="number" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem arrow v-if="insured.relation === '00'">
        <span slot="left" class="left-title">职业</span>
        <input v-form:item="{required: '被保人职业为空'}" type="text" slot="right" style="display: none" v-model="insured.job_code">
        <span @click="showJobSelect = true" slot="right" class="right-title r-color" v-if="!insured.job_code">请输选择</span>
        <span @click="showJobSelect = true" slot="right" class="right-title text-overflow" v-else>{{otherData.labelJob1}}、{{otherData.labelJob2}}、{{otherData.labelJob3}}</span>
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
        <input v-form:item="{required: '与投保人关系为空'}" type="text" slot="right" style="display: none" v-model="insured.relation">
        <select v-model="insured.relation" slot="right">
          <option value="01">配偶</option>
          <option value="02">父母</option>
          <option value="03">子女</option>
        </select>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">被保险人姓名</span>
        <input v-form:insurename="{required: '被保人姓名为空'}" slot="right" v-model="insured.name" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem arrow>
        <span slot="left" class="left-title">证件类型</span>
        <select v-model="insured.card_type" slot="right">
          <option value="01">身份证</option>
          <option value="03">护&nbsp;&nbsp;&nbsp;照</option>
        </select>
      </anyiCellItem>

      <anyiCellItem v-if="insured.card_type === '01'">
        <span slot="left" class="left-title">证件号码</span>
        <input @blur="_insuredCardBlur" v-toUp v-form:cardid="{required: '被保人身份证为空'}" slot="right" v-model="insured.card_id" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem v-if="insured.card_type === '03'">
        <span slot="left" class="left-title">证件号码</span>
        <!-- 护照 -->
        <input v-toUp v-model="insured.card_id" v-form:item="{required: '被保人护照为空'}" slot="right" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem arrow>
        <span slot="left" class="left-title">性别</span>
        <select :disabled="insured.card_type === '01'" v-model="insured.sex" slot="right">
          <option value="0">男</option>
          <option value="1">女</option>
        </select>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">出生日期</span>
        <input v-form:item="{required: '被保人出生日期为空'}" type="text" slot="right" style="display: none" v-model="insured.birthday">
        <span class="right-title yd-datetime-input" v-if="insured.card_type === '01'" slot="right">{{insured.birthday}}</span>
        <yd-datetime v-else slot="right" v-model="insured.birthday" :start-date="otherData.insuredStartTime" :end-date="otherData.insuredEndTime" placeholder="请选择" type="date" :init-emit="false"></yd-datetime>
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">手机号码</span>
        <input v-form:phone slot="right" v-model="insured.phone" type="text" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">身高（CM）</span>
        <input v-form:item="{required: '被保人身高为空'}" slot="right" v-model="insured.height" type="number" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem>
        <span slot="left" class="left-title">体重（KG）</span>
        <input v-form:item="{required: '被保人体重为空'}" slot="right" v-model="insured.weight" type="number" placeholder="请输入">
      </anyiCellItem>

      <anyiCellItem arrow>
        <span slot="left" class="left-title">职业</span>
        <input v-form:item="{required: '被保人职业为空'}" type="text" slot="right" style="display: none" v-model="insured.job_code">
        <span @click="showJobSelect = true" slot="right" class="right-title r-color" v-if="!insured.job_code">请输选择</span>
        <span @click="showJobSelect = true" slot="right" class="right-title text-overflow" v-else>{{otherData.labelJob1}}、{{otherData.labelJob2}}、{{otherData.labelJob3}}</span>
      </anyiCellItem>
    </div>

    <!-- 收益人信息 -->
    <!-- 受益人最多为3个 B不能设置受益人 必须为法定受益人 -->
    <div class="group">
      <anyiCellItem :arrow="productInfo.package_code === 'A'">
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title">受益人信息</span>
        <select :disabled="productInfo.package_code === 'B'" v-model="beneficiary.type" slot="right">
          <option value="1">法定受益人</option>
          <option value="2">指定受益人</option>
        </select>
      </anyiCellItem>
      <div class="beneficiary-list" v-if="productInfo.package_code === 'A' && beneficiary.person.length && beneficiary.type === '2'">
        <accordion :key="index" v-for="(item, index) in beneficiary.person" :isOpenShowBottomBorder="index < beneficiary.person.length - 1" isOpenShowTopBorder :isCloseShowTopBorder="index < beneficiary.person.length - 1" open class="accordion">
          <span @click.stop="_delBeneficiary(index)" slot="left" class="cut-icon"></span>
          <span slot="left" class="left-title">受益人{{index + 1}}</span>
          <span slot="right" class="right-title name-tit" v-if="beneficiary.person[index].name">{{beneficiary.person[index].name}}</span>
          <span slot="right" class="right-title percent" v-if="beneficiary.person[index].percent">{{beneficiary.person[index].percent}}%</span>
          <div class="accordion-content">
            <anyiCellItem>
              <span slot="left" class="left-title">姓名</span>
              <input v-form:applicantname="{required: `受益人${index + 1}姓名为空`}" slot="right" v-model="beneficiary.person[index].name" type="text" placeholder="请输入真实姓名">
            </anyiCellItem>
            <anyiCellItem arrow>
              <span slot="left" class="left-title">受益人是被保险人的</span>
              <select v-model="beneficiary.person[index].relation" slot="right">
                <option value="01">配偶</option>
                <option value="02">父母</option>
                <option value="03">子女</option>
              </select>
            </anyiCellItem>
            <anyiCellItem arrow>
              <span slot="left" class="left-title">证件类型</span>
              <select v-model="beneficiary.person[index].certificate_type" slot="right">
                <option value="01">身份证</option>
                <option value="03">护&nbsp;&nbsp;&nbsp;照</option>
                <option value="11">出生证</option>
              </select>
            </anyiCellItem>
            <anyiCellItem v-if="beneficiary.person[index].certificate_type === '01'">
              <span slot="left" class="left-title">证件号码</span>
              <input @blur="_beneficiaryBlur(beneficiary.person[index], index)" v-toUp v-form:cardid="{required:'受益人身份证为空'}" slot="right" v-model="beneficiary.person[index].certificate_id" type="text" placeholder="请输入有效的证件号码">
            </anyiCellItem>
            <anyiCellItem v-if="beneficiary.person[index].certificate_type === '03'">
              <span slot="left" class="left-title">证件号码</span>
              <input v-toUp slot="right" v-model="beneficiary.person[index].certificate_id" v-form:item="{required:'受益人护照为空'}" type="text" placeholder="请输入有效的证件号码">
            </anyiCellItem>
            <anyiCellItem v-if="beneficiary.person[index].certificate_type === '11'">
              <span slot="left" class="left-title">证件号码</span>
              <input v-toUp slot="right" v-model="beneficiary.person[index].certificate_id" v-form:item="{required:'受益出生证为空'}" type="text" placeholder="请输入有效的证件号码">
            </anyiCellItem>

            <anyiCellItem arrow>
              <span slot="left" class="left-title">性别</span>
              <select :disabled="beneficiary.person[index].certificate_type === '01'" v-model="beneficiary.person[index].sex" slot="right">
                <option value="0">男</option>
                <option value="1">女</option>
              </select>
            </anyiCellItem>

            <anyiCellItem>
              <span slot="left" class="left-title">出生日期</span>
              <input v-form:item="{required: `受益人${index + 1}出生日期为空`}" type="text" slot="right" style="display: none" v-model="beneficiary.person[index].birthday">
              <span class="right-title yd-datetime-input" v-if="beneficiary.person[index].certificate_type === '01'" slot="right">{{beneficiary.person[index].birthday}}</span>
              <yd-datetime v-else slot="right" v-model="beneficiary.person[index].birthday" :start-date="otherData.beneficiaryStartTime" :end-date="otherData.beneficiaryEndTime" placeholder="请选择" type="date" :init-emit="false"></yd-datetime>
            </anyiCellItem>

            <anyiCellItem>
              <span slot="left" class="left-title">受益比例（%）</span>
              <input v-form:item="{required: `受益人${index + 1}受益比例为空`, valid:{regex:/^([1-9]\d{0,1}|100)$/, errMsg: '收益比例为1-100之间的整数'}}" slot="right" v-model="beneficiary.person[index].percent" type="number" placeholder="请填写受益百分比">
            </anyiCellItem>
          </div>
        </accordion>
      </div>

    </div>

    <!-- 新增受益人 -->
    <div class="add" v-if="productInfo.package_code === 'A' && beneficiary.type === '2'">
      <div class="add-person flex row center" @click="_addBeneficiary">
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
        <input v-form:item="{required: '开户银行为空'}" type="text" slot="right" style="display: none" v-model="applicant.bank_code">
        <select placeholder="请选择" style="direction:rtl" v-model="applicant.bank_code" slot="right">
          <option value="" style="direction:rtl" class="r-color">请选择</option>
          <option style="direction:rtl" :key="index" v-for="(item, index) in banks" :value="item.value">{{item.label}}</option>
        </select>
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">持卡人姓名</span>
        <input slot="right" disabled v-model="applicant.name" type="text" placeholder="需为投保人本人">
      </anyiCellItem>
      <anyiCellItem>
        <span slot="left" class="left-title">银行账号</span>
        <input v-form:bank slot="right" v-model="applicant.account" type="number" placeholder="只支持银行储蓄卡">
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
            <input slot="right" v-model="contact.name" type="text" placeholder="请输入">
          </anyiCellItem>
          <anyiCellItem>
            <span slot="left" class="left-title">联系人手机号</span>
            <input slot="right" v-model="contact.phone" type="phone" placeholder="请输入有效手机号，便于联系">
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

    <buyModalCom v-submit="{formEl:'.write', eventEl: '.buy-com-btn-submit',submit: _insureClick}" slot="bottom" model="write"></buyModalCom>

    <!-- 地址控件 -->
    <yd-cityselect v-model="showAddress" :callback="_showAddressSelect" :items="addressList" ref="citySelect" :provance=otherData.labelProvince :city=otherData.labelCity :area=otherData.labelDistric></yd-cityselect>
    <!-- 职业控件 -->
    <yd-cityselect v-model="showJobSelect" :callback="_showJobSelect" :items="jobList" ref="jobSelect" :provance=otherData.labelJob1 :city=otherData.labelJob2 :area=otherData.labelJob3></yd-cityselect>
  </yd-layout>
</template>
<script>
import anyiSwitch from "@/components/common/anyi-switch";
import footerCom from "@/components/common/footerCom";
import mixinPopup from "@/mixins/popup";
import anyiCellItem from "@/components/common/anyi-cell-item";
import cellItemCom from "@/components/common/cellItemCom";
import accordion from "@/components/common/accordion";
import product from "../config/product.js";
import anyiRadio from "@/components/common/anyi-radio";
import buyModalCom from "../components/buy-modal-com";
import popupContent from "../components/popup-content";
import bxtk from "../components/bxtk";

import address from "../config/address";
import jobList from "../config/job";
import banks from "../config/banks";

export default {
  name: "Write",
  mixins: [mixinPopup],
  components: {
    anyiSwitch,
    footerCom,
    anyiCellItem,
    cellItemCom,
    accordion,
    anyiRadio,
    popupContent,
    bxtk,

    buyModalCom
  },
  data() {
    return {
      addressList: address,
      showAddress: false,
      showJobSelect: false,
      jobList: jobList,
      banks: banks, //银行信息
      radio: false // 协议部分
    };
  },
  watch: {
    //受益人类型
    "beneficiary.type"(newVal, oldVal) {
      if (newVal === "2" && this.beneficiary.person.length === 0) {
        this._addBeneficiary();
      } else if (newVal === "1") {
        //法定受益人
      }
    },
    //设置银行名称
    "applicant.bank_code"(newVal, oldVal) {
      for (var i = 0; i < this.banks.length; i++) {
        var item = banks[i];
        if (item.value === newVal) {
          this.dispatchModule("setApplicant", "account_name", item.label);
          return;
        }
      }
    },
    "applicant.sex"(newVal, oldVal) {
      this._countPriceIsSelf();
    },
    "applicant.birthday"(newVal, oldVal) {
      this._countPriceIsSelf();
    }
  },
  computed: {
    //是否显示保费豁免切换按钮
    showLifelongSwitch() {
      //判断年龄投保人 > 50 岁不能投豁免
      if (this.applicantAge > 50) {
        return false;
      }
      if (this.productInfo.package_code === "A") {
        if (this.productInfo.is_sub_clinical === "1") {
          return true;
        } else {
          return false;
        }
      } else if (this.productInfo.package_code === "B") {
        return true;
      }
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
    tbxzDoc() {
      return product.doc["投保须知"];
    },
    tbrsmDoc() {
      return product.doc["投保人声明"];
    },
    bxtkDoc() {
      return product.doc["保险条款"][this.productInfo.package_code];
    },
    //投保人年龄
    applicantAge() {
      if (this.applicant.card_type === "01") {
        var result = Date.geCardInfooByCardId(this.applicant.card_id);
        if (result) {
          return result.age;
        }
      }
      return Date.getAgeByDate(this.applicant.birthday);
    },
    //被保人年龄
    insuredAge() {
      if (this.insured.card_type === "01") {
        var result = Date.geCardInfooByCardId(this.insured.card_id);
        if (result) {
          return result.age;
        }
      }
      return Date.getAgeByDate(this.insured.birthday);
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
        limits = productLimit.slice(0, 6);
      } else if (age <= 40) {
        limits = [].concat(productLimit);
      } else if (age <= 45) {
        limits = productLimit.slice(0, 8);
      } else if (age <= 50) {
        limits = productLimit.slice(0, 6);
      } else {
        limits = productLimit.slice(0, productLimit.length);
      }
      console.log("当前可选择投保额度:%o", limits);
      return limits;
    },
    period() {
      return product["保障期限"];
    },
    yearPeriod() {
      //1.投保人年龄 + 缴费年限<=70 被保险人年龄+缴费年限<=70
      var result = [];
      var arr = product["缴费年限"];
      var applicantAge = this.applicantAge;
      var insuredAge = this.insuredAge;
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
        result = [...arr];
      }
      return result;
    }
  },
  mounted() {
    console.log(this.$store.state.productState);
    this._initDefault();
    this.dispatchModule("setDefaultDate");
    this.dispatchModule("setStateBySession");
  },
  methods: {
    _initDefault() {
      //设置默认次日生效
      if (!this.addtional.effect) {
        this.addtional.effect = Date.getDateByNextDay();
      }

      if (this.insured.relation !== "00") {
        this.dispatchModule("setInsured", "relation", "01");
      }

      //设置被保人出生日期性别通过身份证
      if (this.insured.card_type === "01" && this.insured.card_id) {
        //身份证的时候手动设置生日和性别
        var result = Date.geCardInfooByCardId(this.insured.card_id);
        if (result) {
          this.dispatchModule("setInsured", "birthday", result.birth);
          this.dispatchModule("setInsured", "sex", result.sex);
          this._countPriceIsSelf();
        }
      }
      if (this.applicant.card_type === "01" && this.applicant.card_id) {
        //身份证的时候手动设置生日和性别
        var result = Date.geCardInfooByCardId(this.applicant.card_id);
        if (result) {
          this.dispatchModule("setApplicant", "birthday", result.birth);
          this.dispatchModule("setApplicant", "sex", result.sex);
        }
      }
    },
    _insureClick(res) {
      // //基本的表单校验;
      if (!res.valid) {
        this.$dialog.toast({
          mes: res.msg,
          timeout: 2000
        });
        return;
      }
      //是否是本人
      this._countPriceIsSelf();

      //判断投保人未成年 被保人小于30天； 投保人大于55 被保人大于50
      if (!this._validAge()) return;

      //基本校验通过， 业务逻辑校验 校验年龄和缴费期限
      if (!this._validAgeAndPayment()) return;

      //判断被保人年龄区间值 对应基本保额
      if (!this._validAgeBaseNum()) return;

      //校验身高和体重
      if (this.insured.weight < 2.5 || this.insured.weight > 120) {
        this.$dialog.toast({
          mes: "体重不在合理范围内"
        });
        return;
      }
      if (this.insured.height < 30 || this.insured.height > 249) {
        this.$dialog.toast({
          mes: "身高不在合理范围内"
        });
        return;
      }
      //校验受益人比例
      if (!this._validBeneficiaryPercent()) return;

      //协议指定
      if (!this.radio) {
        this.$dialog.toast({
          mes: "请勾选我已了解并同意相关协议"
        });
        return;
      }

      this.$router.push("/confirm");
    },
    //判断年龄
    _validAge() {
      var applicantAge = 0,
        abirth = "",
        insuredAge = 0,
        ibirth = "";
      if (this.applicant.card_type === "01") {
        //身份证
        var aCardInfo = Date.geCardInfooByCardId(this.applicant.card_id);
        if (aCardInfo) {
          applicantAge = aCardInfo.age;
          abirth = aCardInfo.birth;
        } else {
          this.$dialog.toast({
            mes: "投保人证件号码错误",
            duration: 2000
          });
          return false;
        }
      } else {
        applicantAge = Date.getAgeByDate(this.applicant.birthday);
        abirth = this.applicant.birthday;
      }

      if (applicantAge > 55) {
        this.$dialog.toast({
          mes: "投保人年龄上限为55周岁",
          duration: 2000
        });
        return false;
      } else if (applicantAge < 18) {
        this.$dialog.toast({
          mes: "投保人不能为未成年人",
          duration: 2000
        });
        return false;
      }

      //被保人生日年龄
      if (this.insured.card_type === "01") {
        //身份证
        var iCardInfo = Date.geCardInfooByCardId(this.insured.card_id);
        if (iCardInfo) {
          insuredAge = iCardInfo.age;
          ibirth = iCardInfo.birth;
        } else {
          this.$dialog.toast({
            mes: "被保人证件号码错误",
            duration: 2000
          });
          return;
        }
      } else {
        insuredAge = Date.getAgeByDate(this.insured.birthday);
        ibirth = this.insured.birthday;
      }

      if (insuredAge > 50) {
        this.$dialog.toast({
          mes: "被保人年龄上限为50周岁",
          duration: 2000
        });
        return false;
      }
      var now = new Date(); //当前时间
      now.setHours(0);
      now.setMinutes(0);
      now.setSeconds(0);
      now.setMilliseconds(0);
      var insuDate = new Date(ibirth || "");
      insuDate.setHours(0);
      insuDate.setMinutes(0);
      insuDate.setSeconds(0);
      insuDate.setMilliseconds(0);
      var thtime = 30 * 24 * 60 * 60 * 1000;
      if (insuDate.getTime() + thtime > now.getTime()) {
        this.$dialog.toast({
          mes: "被保人必须满30天",
          duration: 2000
        });
        return false;
      }
      return true;
    },

    //判断被保人年龄区间值 对应基本保额
    _validAgeBaseNum() {
      var age = Date.getAgeByDate(this.insured.birthday);
      var base_num = this.productInfo.base_premium;
      var ageFlag = false;
      var errAgeMsg = "";
      //0-17岁 最高 20W
      //18-40岁 最高 50w
      //41-45岁 最高 40W
      //46-50岁 最高 30w
      if (age <= 17 && base_num > 300000) {
        ageFlag = true;
        errAgeMsg = "被保险人为未成年人时，基本保额最高限30万元";
      } else if (age > 40 && age <= 45 && base_num > 400000) {
        ageFlag = true;
        errAgeMsg = "被保险人年龄在41-45周岁，基本保额最高限40万元";
      } else if (age > 45 && age <= 50 && base_num > 300000) {
        ageFlag = true;
        errAgeMsg = "被保险人年龄在46-50周岁，基本保额最高限30万元";
      }
      if (ageFlag) {
        this.$dialog.toast({
          mes: errAgeMsg,
          duration: 2000
        });
        return false;
      }
      return true;
    },
    //校验年龄和缴费期限
    _validAgeAndPayment() {
      //1缴费期限为15年时投保人年龄不能超过55&被保险人年龄不能超过50周岁。
      //1缴费期限为20年时投保人年龄不能超过50&被保险人年龄不能超过50周岁。
      //1缴费期限为30年时投保人年龄不能超过40&被保险人年龄不能超过40周岁。
      //投保人生日年龄
      var applicantAge, abirth, insuredAge, ibirth;
      var ageFlag = false;
      var errAgeMsg = "";
      var paymentLimit = this.productInfo.payment_limit;
      if (this.applicant.card_type === "01") {
        //身份证
        var aCardInfo = Date.geCardInfooByCardId(this.applicant.card_id);
        applicantAge = aCardInfo.age;
        abirth = aCardInfo.birth;
      } else {
        applicantAge = Date.getAgeByDate(this.applicant.birthday);
        abirth = this.applicant.birthday;
      }

      //被保人生日年龄
      if (this.insured.card_type === "01") {
        //身份证
        var iCardInfo = Date.geCardInfooByCardId(this.insured.card_id);
        insuredAge = iCardInfo.age;
        ibirth = iCardInfo.birth;
      } else {
        insuredAge = Date.getAgeByDate(this.insured.birthday);
        ibirth = this.insured.birthday;
      }

      switch (paymentLimit) {
        case "15":
          if (applicantAge > 55) {
            ageFlag = true;
            errAgeMsg = "缴费期限为15年时投保人年龄不能超过55周岁";
            break;
          }
          if (insuredAge > 50) {
            ageFlag = true;
            errAgeMsg = "缴费期限为15年时被保险人年龄不能超过50周岁";
          }
          break;
        case "20":
          if (applicantAge > 50) {
            ageFlag = true;
            errAgeMsg = "缴费期限为20年时投保人年龄不能超过50周岁";
            break;
          }
          if (insuredAge > 50) {
            ageFlag = true;
            errAgeMsg = "缴费期限为20年时被保险人年龄不能超过50周岁";
          }
          break;
        case "30":
          if (applicantAge > 40) {
            ageFlag = true;
            errAgeMsg = "缴费期限为年30时投保人年龄不能超过40周岁";
            break;
          }
          if (insuredAge > 40) {
            ageFlag = true;
            errAgeMsg = "缴费期限为30年时被保险人年龄不能超过40周岁";
          }
          break;
      }
      if (ageFlag) {
        this.$dialog.toast({
          mes: errAgeMsg,
          duration: 2000
        });
        return false;
      }
      return true;
    },
    //校验受益人比例
    _validBeneficiaryPercent() {
      if (this.beneficiary.type === "1") return true;
      var list = this.beneficiary.person;
      var percent = 0;
      list.forEach(item => {
        percent += Number(item.percent);
      });
      if (percent != 100) {
        this.$dialog.toast({
          mes: "收益比例合计必须为100%"
        });
        return false;
      }
      return true;
    },
    //投保人证件号码失去焦点时触发
    _applicantCardBlur(e) {
      var val = e.target.value; //获取值设置出生日期，buy组件中会自动计算保费
      var cardInfo = Date.geCardInfooByCardId(val);
      if (cardInfo) {
        if (cardInfo.age > 55) {
          this.$dialog.toast({
            mes: "投保人最大年限为55周岁",
            duration: 2000
          });
        } else if (cardInfo.age < 18) {
          this.$dialog.toast({
            mes: "投保人不能为未成年人",
            duration: 2000
          });
        }
        this.dispatchModule("setApplicant", "birthday", cardInfo.birth);
        this.dispatchModule("setApplicant", "sex", cardInfo.sex);
        this._countPriceIsSelf();
      }
    },
    _insuredCardBlur(e) {
      var val = e.target.value; //获取值设置出生日期，buy组件中会自动计算保费
      var cardInfo = Date.geCardInfooByCardId(val);
      if (cardInfo) {
        if (cardInfo.age > 50) {
          this.$dialog.toast({
            mes: "被保人最大年限为50周岁",
            duration: 2000
          });
        }
        //设置投保人性别和出生日期
        this.dispatchModule("setInsured", "birthday", cardInfo.birth);
        this.dispatchModule("setInsured", "sex", cardInfo.sex);
      }
    },
    _countPriceIsSelf() {
      //如果被保人是本人
      if (this.insured.relation === "00") {
        //为本人投保
        //将投保人信息复制到被保人
        for (var key in this.insured) {
          if (this.applicant[key]) {
            this.dispatchModule("setInsured", key, this.applicant[key]);
          }
        }
      }
    },
    //添加受益人信息
    _addBeneficiary() {
      if (this.beneficiary.person.length >= 3) {
        this.$dialog.toast({
          mes: "指定受益人最多为3个",
          duration: 2000
        });
        return; //限制只添加3个受益人
      }
      var beneficiaryTemplate = {
        name: "", //    受益人姓名
        certificate_type: "01", //
        certificate_id: "", //
        percent: "", //    受益比例 相加必须等于1 按百分比来算即可
        priority: 1, //    受益优先级
        relation: "01", //   与被保人关系
        sex: "0",
        birthday: "1981-12-01"
      };
      this.dispatchModule("setBeneficiary", "add", beneficiaryTemplate);
    },
    //受益人身份证失去焦点
    _beneficiaryBlur(item, index) {
      if (item.certificate_type === "01") {
        var cardInfo = Date.geCardInfooByCardId(item.certificate_id);
        if (cardInfo) {
          item.birthday = cardInfo.birth;
          item.sex = cardInfo.sex;
        }
      }
    },
    //删除受益人
    _delBeneficiary(index) {
      this.dispatchModule("setBeneficiary", "del", index);
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
      var authNum = Number(job_code[1]);
      if (authNum === 0) {
        this.$dialog.toast({
          mes: "您选择的职业不在承保范围内",
          duration: 2000
        });
        return;
      }
      if (this.productInfo.package_code === "A" && authNum > 4) {
        this.$dialog.toast({
          mes: "您选择的职业不在承保范围内",
          duration: 2000
        });
        return;
      }
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
