// vuex 状态管理
// 证件类型编码表
//  cardtype: {
//     "居民身份证": "01",
//     "军官证": "02",
//     "护照": "03",
//     "驾驶执照": "04",
//     "返乡证": "05",
//     "组织机构代码证": "06",
//     "港澳通行证": "07",
//     "台湾通行证": "08",
//     "学生证": "09",
//     "户口簿": "10",
//     "营业执照": "96",
//     "税务登记证": "97",
//     "代理业务员职业证号": "98",
//     "工商登记号": "9001",
//     "其它法人证件": "9100",
//     "其他": "99"
// },
// // 被保人与投保人关系编码表
// relation: {
//     "本人": "00",//本人;
//     "配偶": "01", //配偶;
//     "父母": "02", //父母;
//     "子女": "03",//子女;
//     "兄弟姐妹": "05", //兄弟姐妹;
//     "雇主": "06",//雇主;
//     "雇员": "07",// 雇员;
//     "祖父母、外祖父母": "08",//祖父母、外祖父母;
//     "祖孙、外祖孙": "09", //祖孙、外祖孙;
//     "监护人": "10",//监护人;
//     "被监护人": "11",//被监护人;
//     "朋友": "12",//朋友;
//     "雇佣": "17",//雇佣;
//     "未知": "98",//未知;
//     "其他": "99" //其他
// },
// // 性别编码表
// sex: {
//     "男": "0",
//     "女": "1",
//     "不清楚": "2"
// }
const state = {
	"total": 0,
	"product": {
		"id": "FOSUN20180522001",    //Y 核心产品ID
		"name": "复星：康乐一生",    //N 产品名称
		"package_code": "A",         //Y 产品套餐code
		"base_premium": 50000,  //Y 基本保费
		"life_limit": "life_70",    //Y 保障期限 life_70 life_80 life_all
		"payment_limit": "15",       //Y 缴费年限 15 20 30
		"is_sub_clinical": "1",     //N 是否包含附加轻症 是 1，否 0；套餐A是，必传
		"is_lifelong": "1",         //Y 是否保费豁免 是 1，否 0；
		"pay_type": '年缴'//缴费类型没有字段注意
	},
	"applicant": {
		"name": "殷谦",
		"card_type": "01",
		"card_id": "430921199106111318",
		"phone": "17763732365",
		"email": "371516100@qq.com",
		"birthday": "1991-06-11",
		"sex": "0",

		"address": "",     //详细地址
		"province": "",   //省
		"city": "",       //市
		"district": "",   //区/县

		"bank_code": "9001",//银行代码
		"account": "6666666666666666",//银行账号
		"account_name": "工商银行",//银行名称
	},
	"insured": {
		"name": "",
		"phone": "",
		"email": "",
		"card_type": "01",
		"card_id": "",
		"birthday": "",
		"sex": "0",
		"relation": "00",// 与被保人关系
		"job_code": "",//职业代码

		"height": "", //Y 身高
		"weight": "",  //Y 体重
	},
	//受益人
	"beneficiary": {
		"type": "1", //    受益方式   法定 1 指定 2
		"person": []
	},
	"beneficiaryTemplate": {
		"name": "", //    受益人姓名
		"certificate_type": "01", //
		"certificate_id": "", //
		"percent": "", //    受益比例 相加必须等于1 按百分比来算即可
		"priority": 1, //    受益优先级
		"relation": "01", //   与被保人关系
	},
	//附加的
	"addtional": {
		urgent_name: '',//紧急联系人
		urgent_phone: '',//紧急联系人手机
	},

	//其他页面逻辑相关值限制参数
	otherData: {
		applicantStartTime: '',//投保人日期选择开始
		applicantEndTime: '',//投保人日期选择结束
		insuredStartTime: '',//被保人日期选择开始
		insuredEndTime: '',//被保人日期选择结束

		//信息填写不能更改字段展示
		labelPackageName: 'B款升级款',//保障计划	
		labelBasePremium: '',//基本保额
		labelLifeLimit: '',//保障期限
		labelPaymentLimit: '',//缴费期限
		labelPayType: '年缴',//缴费类型
		labelSubClinical: '',//附加轻症及轻症豁免     
		labelSubClinicalNum: '',//轻症疾病保额    
		labelLifelong: '',//保费豁免
		labelLifelongYear: '',//附加险缴费年限

		//居住城市
		labelProvince: '',
		labelCity: '',
		labelDistric: '',

		//职业类别
		labelJob1: '',
		labelJob2: '',
		labelJob3: ''
	}
}

//计算状态 用于过滤等操作
const getters = {
	applicant: state => state.applicant,
	insured: state => state.insured
}

const actions = {
	//设置total
	setTotal({ commit, state }, param) {
		return new Promise((resolve, reject) => {
			commit('setTotal', param)
			resolve(param)
		})
	},
	//设置当前产品信息
	setProduct({ commit, state }, params) {
		return new Promise((resolve, reject) => {
			commit('setProduct', params)
			resolve(params)
		})
	},
	//设置投保人信息
	setApplicant({ commit, state }, params) {
		return new Promise((resolve, reject) => {
			commit('setApplicant', params)
			resolve(params)
		})
	},
	//设置被保人信息
	setInsured({ commit, state }, params) {
		return new Promise((resolve, reject) => {
			commit('setInsured', params)
			resolve(params)
		})
	},
	//设置受益人信息
	setBeneficiary({ commit, state }, params) {
		return new Promise((resolve, reject) => {
			commit('setBeneficiary', params)
			resolve(params)
		})
	},
	//设置其他限制信息
	setOtherData({ commit, state }, params) {
		return new Promise((resolve, reject) => {
			commit('setOtherData', params)
			resolve(params)
		})
	}
}

//执行 执行同步操作
const mutations = {
	//设置总数
	setTotal(state, param) {
		state.total = param;
	},
	//设置产品相关信息
	setProduct(state, params) {
		state.product[params.key] = params.value;
	},
	//设置投保人信息
	setApplicant(state, params) {
		state.applicant[params.key] = params.value;
	},
	//设置被保人信息
	setInsured(state, params) {
		state.insured[params.key] = params.value;
	},
	//设置其他限制信息
	setOtherData(state, params) {
		state.otherData[params.key] = params.value;
	},

	//设置受益人信息
	setBeneficiary(state, params) {
		//params type类型为add 或 del
		// {key: 'add', value: addValue};
		// {key: 'del', value: delIndex};
		if (params && typeof params === 'object') {
			switch (params.key) {
				case 'add':
					state.beneficiary.person.push(params.value);
					break;
				case 'del':
					state.beneficiary.person.splice(params.value, 1);
					break;
			}
		}
	},
}

//暴露成员 实现模块化
export default {
	state,
	getters,
	actions,
	mutations
}
