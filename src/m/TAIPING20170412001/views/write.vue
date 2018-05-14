<style lang="scss">
//------------- 迭代YDUI样式 -----------------
.yd-scrollview:after {
  height: 0;
}

.yd-cell-item {
  display: flex;
  position: relative;
  height: 1.1rem;
  padding-left: 0.32rem;
  padding-right: 0.32rem;
  overflow: hidden;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
.yd-cell-left {
  font-size: 0.3rem;
  font-family: PingFangSC-Medium;
  color: rgba(112, 112, 112, 1);
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  span {
    line-height: 0.3rem;
  }
}
.yd-cell-right {
  flex: 1;
  font-size: 0.3rem;
  font-family: PingFangSC-Regular;
  color: rgba(112, 112, 112, 1);
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  span {
    line-height: 0.3rem;
  }
}
.yd-cell-arrow:after {
  font-size: 0.3rem;
  height: 0.3rem;
  color: rgba(151, 151, 151, 1);
  content: "\E608";
}

.yd-datetime-input {
  font-size: 0.3rem !important;
  color: #282828 !important;
  height: 0.45rem !important;
  text-align: right !important;
  font-family: PingFangSC-Regular !important;
  justify-content: flex-end !important;
}
.yd-datetime-placeholder {
  font-size: 0.3rem !important;
  color: #b7b7b7 !important;
  outline: none;
  font-family: PingFangSC-Regular !important;
}
//------------- 迭代YDUI样式EDN -----------------

//--------------迭代input 样式 ------------------
input,
select,
option {
  font-size: 0.3rem !important;
  color: #282828 !important;
  height: 0.45rem !important;
  text-align: right !important;
  font-family: PingFangSC-Regular !important;
}
input::placeholder {
  font-size: 0.3rem !important;
  color: #b7b7b7 !important;
  outline: none;
  font-family: PingFangSC-Regular !important;
}
select,
option {
  direction: rtl; //设置文字对齐方式
  text-align: right;
}
//--------------迭代input 样式END ------------------

//保障计划
.write {
  .time-icon {
    height: 0.28rem;
    width: 0.28rem;
    margin-left: 0.2rem;
  }

  .left-title-line {
    width: 0.04rem;
    height: 0.32rem;
    background: #282828;
    margin-right: 0.2rem;
  }
  .left-title {
    height: 0.45rem;
    font-size: 0.32rem;
    font-family: PingFangSC-Medium;
    color: #282828;
    line-height: 0.45rem;
  }
  .right-title {
    height: 0.45rem;
    font-size: 0.3rem;
    font-family: PingFangSC-Regular;
    color: #282828;
    line-height: 0.42rem;
  }

  //-------------协议样式-------------------
  .yd-radio-group {
    padding: 0 0.32rem;
    font-size: 0.28rem;
    font-family: PingFangSC-Medium;
    color: rgba(40, 40, 40, 1);
    padding-bottom: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .xieyi {
      color: #e3263a;
      flex: 0 0 auto;
    }
  }
  //-------------协议样式END----------------
}
</style>
<template>
  <yd-layout class="write">
    <!-- 保障计划 -->
    <yd-cell-group>
      <!-- 标题样式 -->
      <yd-cell-item>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title">保障计划</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">保险方案</span>
        <span slot="right" class="right-title">二轮快递外卖综合方案</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">生效日期</span>
        <!-- 
          自定义表单校验 如 类似与时间控件这样的没有input的可以设置一个隐藏的input 在这个input上进行表单校验定义  
         -->
        <input slot="left" v-form:item="{required:'请选择生效时间'}" v-model="addtional.effect" type="text" v-show="false">
        <yd-datetime slot="right" v-model="addtional.effect" value="1988-08-08" start-date="1900-08-08" placeholder="请选择" :init-emit="false"></yd-datetime>
        <img class="time-icon" slot="right" :src="require('@/img/calendar@2x.png')" />
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">保障期限</span>
        <div slot="right">
          <span class="right-title">{{addtional.effect}}</span><br>
          <span class="right-title">至{{addtional.effect}}</span>
        </div>
      </yd-cell-item>
    </yd-cell-group>

    <!-- 投保人信息 -->
    <yd-cell-group>
      <!-- 标题样式 -->
      <yd-cell-item>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title">投保人信息</span>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">投保人姓名</span>
        <!-- 
          自定义表单校验指令 v-form:item="{required:'为空时报的错误信息', valid:{regex: '正则的规则', errMsg:'正则错误的信息'}}"
          一些内置的默认指令
          v-form:applicantname  校验投保人姓名   传参时用参数的校验规则 同上 不传时默认内部的校验规则
          v-form:insurename     校验被保人姓名
          v-form:cardid         简单校验身份证
          v-form:phone          校验手机
          v-form:email          校验邮箱
          v-form:account        请输入账号
          v-form:pass           请输入密码
          
          其他校验 后期根据需求再进行添加
         -->
        <input slot="right" v-model="applicant.name" type="text" placeholder="请输入">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">身份证号码</span>
        <input slot="right" v-model="applicant.card_id" type="text" placeholder="请输入">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">出生日期</span>
        <yd-datetime slot="right" v-model="applicant.birthday" value="1988-08-08" start-date="1900-08-08" placeholder="请选择" :init-emit="false"></yd-datetime>
        <img class="time-icon" slot="right" :src="require('@/img/calendar@2x.png')" />
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">手机号码</span>
        <input slot="right" type="text" v-model="applicant.phone" placeholder="请输入">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">邮箱地址</span>
        <input slot="right" type="text" v-model="applicant.email" placeholder="请输入">
      </yd-cell-item>
    </yd-cell-group>

    <!-- 被保人信息 -->
    <yd-cell-group>
      <!-- 标题样式 -->
      <yd-cell-item>
        <span slot="left" class="left-title-line"></span>
        <span slot="left" class="left-title">被保人信息</span>
      </yd-cell-item>
      <yd-cell-item arrow>
        <span slot="left" class="left-title">与投保人关系</span>
        <select v-model="insured.relation" slot="right">
          <option value="">请选择与投保关系</option>
          <option value="00">本人</option>
          <option value="01">配偶</option>
          <option value="02">父母</option>
          <option value="03">子女</option>
        </select>
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">被保人姓名</span>
        <input slot="right" v-model="insured.name" type="text" placeholder="请输入">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">身份证号码</span>
        <input slot="right" v-model="insured.card_id" type="text" placeholder="请输入">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">出生日期</span>
        <yd-datetime slot="right" v-model="insured.birthday" value="1988-08-08" start-date="1900-08-08" placeholder="请选择" :init-emit="false"></yd-datetime>
        <img class="time-icon" slot="right" :src="require('@/img/calendar@2x.png')" />
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">手机号码</span>
        <input slot="right" v-model="insured.phone" type="text" placeholder="请输入">
      </yd-cell-item>
      <yd-cell-item>
        <span slot="left" class="left-title">受益人</span>
        <span slot="right" class="right-title">法定受益人</span>
      </yd-cell-item>
    </yd-cell-group>

    <!-- 协议部分 -->
    <yd-radio-group class="yd-radio-group" v-model="radio" color="#E42F46" :size="20">
      <yd-radio val="1" class="yd-radio">
        <span>我已了解并同意</span>
      </yd-radio>
      <span @click="popup.tbxz = true" class="xieyi">《投保须知》</span>
      <span>、</span>
      <span @click="popup.bxtk = true" class="xieyi">《保险条款》</span>
    </yd-radio-group>

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

    <footerCom v-submit="{formEl:'.write', eventEl: '.right-btn',submit: _insureClick}" slot="bottom" themecolor="#E42F46" :price="49.9"></footerCom>
  </yd-layout>
</template>
<script>
import footerCom from '@/components/common/footerCom';
import mixinPopup from '@/mixins/popup';
export default {
  name: 'Write',
  mixins: [mixinPopup],
  components: {
    footerCom
  },
  data () {
    return {
      addtional: {
        effect: '' // 生效日期
      },

      // 投保人
      applicant: {
        name: '',
        card_type: '',
        card_id: '',
        phone: '',
        email: '',
        birthday: '1980-01-01',
        sex: ''
      },
      // 被保险人
      insured: {
        name: '',
        card_type: '',
        card_id: '',
        phone: '',
        birthday: '1980-01-01',
        job_code: '', // 职业类别
        declaration_answern: '', // 健康告知是否全部通过，通过 1，不通过 0
        sex: '',
        relation: '00' // 与被保人关系
      },
      radio: '' // 协议部分
    };
  },
  methods: {
    _insureClick (res) {
      // 基本的表单校验
      // if (!res.valid) {
      //   this.$dialog.toast({
      //     mes: res.msg,
      //     timeout: 2000
      //   });
      //   return;
      // }
      this.$router.push('/confirm');
    }
  }
};
</script>
