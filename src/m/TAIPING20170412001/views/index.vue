<style lang="scss">
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
    <productRangeCom></productRangeCom>

    <!-- 
      列表组件 属性
      cellList 列表数据源 类型 array 格式如下
      [
          {
            isLeftLine: true, //是否显示左边的竖线 
            leftLineColor: 'red',//左边竖线颜色 不传默认为文字颜色
            leftText: "保障责任", //左边文字内容
            leftColor: "#282828", //左边文字颜色 不传默认 #707070
            rightText: "更多详情", //右边文字内容
            rightColor: "#707070", //右边文字颜色 不传默认 #707070
            arrow: true, //是否显示箭头 true显示箭头 false 不显示
            popupId: 'more'//需要显示的弹框id  对应本页面data种定义的 popup 中对应的键
          }
      ]
      showPopup  具备popupId条目的点击事件  类型  function  参数中返回当前点击的popupId
     -->
    <cellItemCom @showPopup="_showPopup"></cellItemCom>

    <bannerCom :imgUrl="require('@/img/pic_details@2x.png')" :height="655"></bannerCom>

    <bannerCom :imgUrl="require('@/img/pic_details2@2x.png')" :height="655"></bannerCom>

    <cellItemCom :cellList="cellList" @showPopup="_showPopup"></cellItemCom>

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
      <tempCom themecolor="#E42F46" btnText="自定义按钮文字" @closePopup="popup.more = false"></tempCom>
    </yd-popup>

    <!-- 售后及理赔 -->
    <yd-popup v-model="popup.shjlp" position="right" width="100%">
      <span>售后及理赔</span>
      <yd-button type="danger" @click.native="popup.shjlp = false">Close Right Popup</yd-button>
    </yd-popup>

    <!-- 常见问题 -->
    <yd-popup v-model="popup.cjwt" position="right" width="100%">
      <span>常见问题</span>
      <yd-button type="danger" @click.native="popup.cjwt = false">Close Right Popup</yd-button>
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

  </yd-layout>
</template>

<script>
import footerCom from '@/components/common/footerCom';
import bannerCom from '@/components/common/bannerCom';
import productRangeCom from '@/components/common/productRangeCom';
import cellItemCom from '@/components/common/cellItemCom';
import mixinPopup from '@/mixins/popup';
import tempCom from '@/components/popupCom/tempCom';
export default {
  name: 'Index',
  mixins: [mixinPopup],
  components: {
    footerCom,
    bannerCom,
    productRangeCom,
    cellItemCom,
    tempCom
  },
  data () {
    return {
      cellList: [
        {
          leftText: '售后及理赔',
          leftColor: '#282828',
          arrow: true,
          popupId: 'shjlp'
        },
        {
          leftText: '常见问题',
          leftColor: '#282828',
          arrow: true,
          popupId: 'cjwt'
        },
        {
          leftText: '投保须知',
          leftColor: '#282828',
          arrow: true,
          popupId: 'tbxz'
        },
        {
          leftText: '保险条款',
          leftColor: '#282828',
          arrow: true,
          popupId: 'bxtk'
        }
      ]
    };
  },
  mounted () {
    this._addEventPopState();
  },
  methods: {
    _insureClick () {
      // 跳转到表单页面进行填写
      this.$router.push('/write');
    },
    // 显示弹窗信息
    _showPopup (pid) {
      // 排他
      for (var key in this.popup) {
        this.popup[key] = false;
      }
      // 显示当前弹框信息
      this.popup[pid] = true;
    }
  }
};
</script>
