var product = {
  //头部范围
  rangeList: [
    { title: "保障范围", rang: "满30天-50周岁" },
    { title: "保障群体", rang: "少儿/成年/中老年" },
    { title: "保障期限", rang: "至70周岁-终身可选" }
  ],
  packageName: [
    { code: 'A', label: '<span>B款升级款</span><span>（含身故保障）</span>', value: 'B款升级款' },
    { code: 'B', label: '<span>C款升级款</span><span>（不含身故保障）</span>', value: 'C款升级款' }
  ],
  //投保额度
  limit: [
    { label: '5万元', value: 50000 },
    { label: '10万元', value: 100000 },
    { label: '15万元', value: 150000 },
    { label: '20万元', value: 200000 },
    { label: '25万元', value: 250000 },
    { label: '30万元', value: 300000 },
    { label: '35万元', value: 350000 },
    { label: '40万元', value: 400000 },
    { label: '45万元', value: 450000 },
    { label: '50万元', value: 500000 }
  ],
  //保障期限
  '保障期限': [
    { label: '至70岁', value: 'life_70' },
    { label: '至80岁', value: 'life_80' },
    { label: '终身', value: 'life_all' },
  ],
  '缴费年限': [
    { label: '15年', value: '15' },
    { label: '20年', value: '20' },
    { label: '30年', value: '30' },
  ],
  '缴费类型': [
    { label: '年缴', value: '年缴' }
  ],
  '附加轻症及轻症豁免': [
    { label: '包含', value: '1' },
    { label: '不包含', value: '0' },
  ],
  '保费豁免': [
    { label: '包含', value: '1' },
    { label: '不包含', value: '0' }
  ],
  //保险类型
  insured: {
    "A": {
      50000: [
        { label: '重大疾病保险金', value: '5万元' },
        { label: '身故保险金', value: '5万元' },
        { label: '轻症疾病保险金', value: '1万元' }
      ],
      100000: [
        { label: '重大疾病保险金', value: '10万元' },
        { label: '身故保险金', value: '10万元' },
        { label: '轻症疾病保险金', value: '2万元' }
      ],
      150000: [
        { label: '重大疾病保险金', value: '15万元' },
        { label: '身故保险金', value: '15万元' },
        { label: '轻症疾病保险金', value: '3万元' }
      ],
      200000: [
        { label: '重大疾病保险金', value: '20万元' },
        { label: '身故保险金', value: '20万元' },
        { label: '轻症疾病保险金', value: '4万元' }
      ],
      250000: [
        { label: '重大疾病保险金', value: '25万元' },
        { label: '身故保险金', value: '25万元' },
        { label: '轻症疾病保险金', value: '5万元' }
      ],
      300000: [
        { label: '重大疾病保险金', value: '30万元' },
        { label: '身故保险金', value: '30万元' },
        { label: '轻症疾病保险金', value: '6万元' }
      ],
      350000: [
        { label: '重大疾病保险金', value: '35万元' },
        { label: '身故保险金', value: '35万元' },
        { label: '轻症疾病保险金', value: '7万元' }
      ],
      400000: [
        { label: '重大疾病保险金', value: '40万元' },
        { label: '身故保险金', value: '40万元' },
        { label: '轻症疾病保险金', value: '8万元' }
      ],
      450000: [
        { label: '重大疾病保险金', value: '45万元' },
        { label: '身故保险金', value: '45万元' },
        { label: '轻症疾病保险金', value: '9万元' }
      ],
      500000: [
        { label: '重大疾病保险金', value: '50万元' },
        { label: '身故保险金', value: '50万元' },
        { label: '轻症疾病保险金', value: '10万元' }
      ],
      common: [
        { label: '被保险人轻症疾病豁免保险费', value: '豁免后期保险费' },
        { label: '投保人重大疾病豁免保险费', value: '豁免后期保险费' },
        { label: '投保人轻症疾病豁免保险费', value: '豁免后期保险费' },
        { label: '投保人身故豁免保险费', value: '豁免后期保险费' },
        { label: '投保人失能豁免保险费', value: '豁免后期保险费' }
      ]
    },
    "B": {
      50000: [
        { label: '重大疾病保险金', value: '5万元' },
        { label: '轻症疾病保险金', value: '1.5万元' }
      ],
      100000: [
        { label: '重大疾病保险金', value: '10万元' },
        { label: '轻症疾病保险金', value: '3万元' }
      ],
      150000: [
        { label: '重大疾病保险金', value: '15万元' },
        { label: '轻症疾病保险金', value: '4.5万元' }
      ],
      200000: [
        { label: '重大疾病保险金', value: '20万元' },
        { label: '轻症疾病保险金', value: '6万元' }
      ],
      250000: [
        { label: '重大疾病保险金', value: '25万元' },
        { label: '轻症疾病保险金', value: '7.5万元' }
      ],
      300000: [
        { label: '重大疾病保险金', value: '30万元' },
        { label: '轻症疾病保险金', value: '9万元' }
      ],
      350000: [
        { label: '重大疾病保险金', value: '35万元' },
        { label: '轻症疾病保险金', value: '10.5万元' }
      ],
      400000: [
        { label: '重大疾病保险金', value: '40万元' },
        { label: '轻症疾病保险金', value: '12万元' }
      ],
      450000: [
        { label: '重大疾病保险金', value: '45万元' },
        { label: '轻症疾病保险金', value: '13.5万元' }
      ],
      500000: [
        { label: '重大疾病保险金', value: '50万元' },
        { label: '轻症疾病保险金', value: '15万元' }
      ],
      common: [
        { label: '被保险人轻症疾病豁免保险费', value: '豁免后期保险费' },
        { label: '投保人重大疾病豁免保险费', value: '豁免后期保险费' },
        { label: '投保人轻症疾病豁免保险费', value: '豁免后期保险费' },
        { label: '投保人身故豁免保险费', value: '豁免后期保险费' },
        { label: '投保人失能豁免保险费', value: '豁免后期保险费' }
      ]
    },
  },
  //开户银行
  banks: [
    { label: '工商银行', value: '工商银行' },
    { label: '建设银行', value: '建设银行' },
    { label: '邮储银行', value: '邮储银行' },
    { label: '农业银行', value: '农业银行' },
    { label: '民生银行', value: '民生银行' },
    { label: '招商银行', value: '招商银行' },
    { label: '兴业银行', value: '兴业银行' },
    { label: '中国银行', value: '中国银行' },
    { label: '中信银行', value: '中信银行' },
    { label: '交通银行', value: '交通银行' },
    { label: '平安银行', value: '平安银行' },
    { label: '光大银行', value: '光大银行' }
  ],

  doc: {
    //保障责任
    'A': {
      title: '康乐一生重大疾病保险B款升级款-保障责任',
      lists: [
        {
          title: '重大疾病保险金',
          infos: [
            '若被保险人在保险期间内因意外，或本合同生效（若曾复效，则自本合同最后复效）之日起180天后因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本合同所列的一种或多种重大疾病，保险按本合同基本保险金额给付重大疾病保险金，同时本合同终止。',
            '若被保险人在本合同生效（若曾复效，则自本合同最后复效）之日起180天内因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本合同列明的一种或多种重大疾病，保险公司将按投保人已交纳本合同累计保险费数额（不计息）给付重大疾病保险金，同时本合同终止。'
          ]
        },
        {
          title: '身故保险金',
          infos: [
            '若被保险人因意外，或者于本合同生效(若曾复效,则自本合同最后复效)之日起180日后因非意外的原因导致身故,且被保险人身故时已满18周岁(含18周岁生日),保险公司将按本合同的基本保险金额给付身故保险金,本合同终止。',
            '若被保险人因意外，或者于本合同生效(若曾复效,则自本合同最后复效)之日起180日后因非意外的原因导致身故,且被保险人身故时未满18周岁(不含18周岁生日),保险公司将按投保人已缴纳的本合同累计保险费(不计息)给付身故保险金,本合同终止。',
            '若被保险人于本合同生效(若曾复效,则自本合同最后复效)之日起180日内因非意外的原因导致身故,保险公司将按投保人已缴纳的本合同累计保险费(不计息)给付身故保险金,本合同终止。'
          ]
        },
        {
          title: '轻症疾病保险金',
          infos: [
            '若被保险人因意外，或在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天后因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本附加合同列明的一种或多种轻症疾病，保险公司按本合同基本保险金额的20%给付轻症疾病保险金。每种轻症给付以一次为限，不同轻症疾病可多次给付，累积给付以三次为限。',
            '若被保险人在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天内因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本附加合同列明的一种或多种轻症疾病，保险公司将按投保人已交纳的本附加合同累计保险费数额（不计息）给付轻症疾病保险金，同时本附加合同终止'
          ]
        },
        {
          title: '被保险人轻症疾病豁免保险费',
          infos: [
            '若被保险人在保险期间内因意外，或在本附加合同生效（若曾复效，则自本合同最后复效）之日起180天后因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本附加合同列明的一种或多种轻症疾病，则自确诊日后首个本附加合同的保险费约定交纳日开始，直至本附加合同最后一次保险费约定交纳日止，保险公司豁免前述期间内本附加合同及主合同应交纳的保险费。保险公司视豁免的保险费为已交纳的保险费，本附加合同及其他被豁免合同继续有效。']
        },
        {
          title: '投保人重大疾病豁免保险费',
          infos: [
            '若投保人在保险期间内因意外，或本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天后因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本附加合同所列的一种或多种重大疾病，保险公司豁免相应豁免保险费期间内该投保人名下被豁免保险凭证载明的应交保险费，本公司视豁免的保险费为已交纳的保险费，同时本附加合同终止。',
            '若投保人在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天内（含180天）因非意外的原因在保险公司认可的医院由专科医生确诊初次发生本附加合同列明的一种或多种重大疾病，保险公司将按投保人已交纳的本附加合同累计保险费数额（不计息）给付重大疾病保险金，同时本附加合同终止。'
          ]
        },
        {
          title: '投保人轻症疾病豁免保险费',
          infos: [
            '若投保人在保险期间内因意外，或在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天后因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本附加合同列明的一种或多种轻症疾病，保险公司豁免相应豁免保险费期间内该投保人名下被豁免保险凭证载明的应交保险费，保险公司视豁免的保险费为已交纳的保险费，同时本附加合同终止。',
            '若投保人在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天内因非意外的原因在保险公司认可的医院由专科医生确诊初次发生本附加合同列明的一种或多种轻症疾病，保险公司将按投保人已交纳的本附加合同累计保险费数额（不计息）给付轻症疾病保险金，同时本附加合同终止。'
          ]
        },
        {
          title: '投保人身故豁免保险费',
          infos: [
            '若投保人在保险期间内因意外，或在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天后因非意外的原因导致身故，保险公司豁免相应豁免保险费期间内该投保人名下被豁免保险凭证载明的应交保险费，保险公司视豁免的保险费为已交纳的保险费，同时本附加合同终止。',
            '若投保人在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天内因非意外的原因导致身故，保险公司将按投保人已交纳的本附加合同累计保险费数额（不计息）给付身故保险金，同时本附加合同终止。'
          ]
        },
        {
          title: '投保人失能豁免保险费',
          infos: [
            '若投保人在保险期间内因意外原因，或在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天后因非意外的原因，经双方约定的医疗或鉴定机构鉴定确认，被认定为自主生活能力完全丧失，即无法独立完成六项基本日常生活活动中的三项或三项以上，且该状态持续一百八十天以上的，保险公司豁免相应豁免保险费期间内该投保人名下被豁免保险凭证载明的应交保险费，保险公司视豁免的保险费为已交纳的保险费，同时本附加合同终止。',
            '若投保人在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天内因非意外的原因,经双方约定的医疗或鉴定机构鉴定确认，被认定为自主生活能力完全丧失，即无法独立完成六项基本日常生活活动中的三项或三项以上，且该状态持续一百八十天以上的，保险公司将按投保人已交纳的本附加合同累计保险费数额（不计息）给付失能保险金，同时本附加合同终止。'
          ]
        }
      ]
    },
    'B': {
      title: '康乐一生重大疾病保险C款升级款-保障责任',
      lists: [
        {
          title: '重大疾病保险金',
          infos: [
            '若被保险人在保险期间内因意外，或本合同生效（若曾复效，则自本合同最后复效）之日起180天后因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本合同所列的一种或多种重大疾病，保险按本合同基本保险金额给付重大疾病保险金，同时本合同终止。',
            '若被保险人在本合同生效（若曾复效，则自本合同最后复效）之日起180天内因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本合同列明的一种或多种重大疾病，保险公司将按投保人已交纳本合同累计保险费数额（不计息）给付重大疾病保险金，同时本合同终止。'
          ]
        },
        {
          title: '轻症疾病保险金',
          infos: [
            '若被保险人因意外，或在本合同生效（若曾复效，则自本合同最后复效）之日起180天后因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本合同列明的一种或多种轻症疾病，保险公司按本合同基本保险金额的30%给付轻症疾病保险金。每种轻症给付以一次为限，不同轻症疾病可多次给付，累积给付以三次为限。',
            '若被保险人在本合同生效（若曾复效，则自本合同最后复效）之日起180天内因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本合同列明的一种或多种轻症疾病，保险公司将按投保人已交纳的本合同累计保险费数额（不计息）给付轻症疾病保险金，同时本合同终止。'
          ]
        },
        {
          title: '被保险人轻症疾病豁免保险费',
          infos: [
            '若被保险人在保险期间内因意外，或在本合同生效（若曾复效，则自本合同最后复效）之日起180天后因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本合同列明的一种或多种轻症疾病，则自确诊日后首个本合同的保险费约定交纳日开始，直至本合同最后一次保险费约定交纳日止，保险公司豁免前述期间内本合同应交纳的保险费。保险公司视豁免的保险费为已交纳的保险费，本合同继续有效。'
          ]
        }, {
          title: '投保人重大疾病豁免保险费',
          infos: [
            '若投保人在保险期间内因意外，或本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天后因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本附加合同所列的一种或多种重大疾病，保险公司豁免相应豁免保险费期间内该投保人名下被豁免保险凭证载明的应交保险费，本公司视豁免的保险费为已交纳的保险费，同时本附加合同终止。',
            '若投保人在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天内（含180天，下同）因非意外的原因在保险公司认可的医院由专科医生确诊初次发生本附加合同列明的一种或多种重大疾病，保险公司将按投保人已交纳的本附加合同累计保险费数额（不计息）给付重大疾病保险金，同时本附加合同终止。'
          ]
        },
        {
          title: '投保人轻症疾病豁免保险费',
          infos: [
            '若投保人在保险期间内因意外，或在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天后因非意外的原因在保险公司指定或认可的医疗机构由专科医生确诊初次发生本附加合同列明的一种或多种轻症疾病，保险公司豁免相应豁免保险费期间内该投保人名下被豁免保险凭证载明的应交保险费，保险公司视豁免的保险费为已交纳的保险费，同时本附加合同终止。',
            '若投保人在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天内因非意外的原因在保险公司认可的医院由专科医生确诊初次发生本附加合同列明的一种或多种轻症疾病，保险公司将按投保人已交纳的本附加合同累计保险费数额（不计息）给付轻症疾病保险金，同时本附加合同终止。'
          ]
        },
        {
          title: '投保人身故豁免保险费',
          infos: [
            '若投保人在保险期间内因意外，或在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天后因非意外的原因导致身故，保险公司豁免相应豁免保险费期间内该投保人名下被豁免保险凭证载明的应交保险费，保险公司视豁免的保险费为已交纳的保险费，同时本附加合同终止。',
            '若投保人在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天内因非意外的原因导致身故，保险公司将按投保人已交纳的本附加合同累计保险费数额（不计息）给付身故保险金，同时本附加合同终止。'
          ]
        },
        {
          title: '投保人失能豁免保险费',
          infos: [
            '若投保人在保险期间内因意外原因，或在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天后因非意外的原因，经双方约定的医疗或鉴定机构鉴定确认，被认定为自主生活能力完全丧失，即无法独立完成六项基本日常生活活动中的三项或三项以上，且该状态持续一百八十天以上的，保险公司豁免相应豁免保险费期间内该投保人名下被豁免保险凭证载明的应交保险费，保险公司视豁免的保险费为已交纳的保险费，同时本附加合同终止。',
            '若投保人在本附加合同生效（若曾复效，则自本附加合同最后复效）之日起180天内因非意外的原因,经双方约定的医疗或鉴定机构鉴定确认，被认定为自主生活能力完全丧失，即无法独立完成六项基本日常生活活动中的三项或三项以上，且该状态持续一百八十天以上的，保险公司将按投保人已交纳的本附加合同累计保险费数额（不计息）给付失能保险金，同时本附加合同终止。'
          ]
        }
      ]
    },
    '投保须知': {
      title: '投保须知',
      lists: [
        {
          title: '',
          infos: [
            '1、责任免除、保险责任、犹豫期、费用扣除、退保、保险单现金价值、投保人、被保险人义务等内容详见产品条款， 请务必仔细阅读产品条款及电子保单的特别约定。',
            '2、本产品由复星联合健康保险股份有限公司承保，目前该公司在东莞、佛山、江门、北京设有分支机构。本产品仅限在设有分支机构的区域销售。',
            '3、本产品承保年龄为出生满30天-50周岁(含30天、50周岁),且交费期满不能超过70周岁。',
            '4、本产品未成年人仅限父母为其投保。',
            '5、本产品B款支持1-4类职业投保，C款支持1-6类职业投保，职业查询详见职业表。',
            '6、本产品针对投保人的年龄为18-60周岁(含18、60周岁)，且要求交费期满投保人年龄不能超过70周岁。对于18-50周岁的投保人可选择附加《康乐一生投保人豁免重大疾病保险（升级款）》。',
            '7、本产品最低保额5万元，最高保额限制：出生满30天-17周岁，20万元；18-40周岁，50万元；41-45周岁，40万元；46-50周岁，30万元。',
            '8、本产品仅提供电子保单,电子保单与纸质保单具有同等法律效力。',
            '9、在中国境内（不含港澳台）的外籍人士购买本产品需满足：最近一年在中国境内居住、工作或生活超过6个月。不承保回原国籍。',
            '10、投保康乐一生系列产品的客户可免费加入“健康星”会员俱乐部，且单张保单基本保额≥30万，可享有额外的健康服务，详见《复星联合康乐一生重大疾病保险健康服务》。',
            '11、康乐一生重疾系列产品的直系亲属范围为：父母、祖父母、外祖父母。',
            '12、康乐一生重疾系列产品，针对医保卡代刷客户，复星联合不受理承保，客户也无需进行补充告知。'
          ]
        }
      ]
    },
    '常见问题': {
      title: '康乐一生重大疾病保险-常见问题',
      lists: [
        {
          title: '1、本产品对医院有要求吗?',
          infos: [
            '本产品对医院的要求指包括本公司指定医疗机构，以及符合下列所有条件的机构：',
            '（1）位于境内，拥有合法经营执照，当地基本医疗保险管理机构最新公布的二级以上（含二级）的定点医院，或其它合同双方约定的医院；',
            '（2）设立的主要目的为向受伤者和患病者提供留院治疗和护理服务；',
            '（3）有合格的医生和护士提供全日二十四小时的医疗和护理服务；',
            '（4）非主要作为康复医院、诊所、护理、疗养、戒酒、戒毒或类似的医疗机构。'
          ]
        },
        {
          title: '2、轻症保险金可以累计赔付吗？',
          infos: [
            '本产品每种轻症疾病限给付一次,给付后该种轻症疾病保险金保险责任终止。不同轻症疾病可以多次给付,但本产品的轻症疾病保险金累计给付以三次为限,当累计给付的轻症疾病保险金达到三次时,轻症疾病保险金保险责任终止,若被保险人因同一原因导致发生两种或两种以上的轻症疾病,保险公司仅按一种轻症疾病给付轻症疾病保险金'
          ]
        },
        {
          title: '3、本产品提供什么类型的发票？',
          infos: [
            '本产品提供电子发票，发票抬头仅限投保人，且投保人只能为个人。'
          ]
        },
        {
          title: '4、如何查询验证保单？',
          infos: [
            '投保完成后,电子保单会直接发送至您邮箱,为保证您的合法权益,您可在投保成功后的次日拨打复星联合健康保险客服热线4006-11-7777或通过访问官网,对您所投保保单的相关信息进行查询。'
          ]
        }
      ]
    },
    '保险条款': {
      'A': [
        {
          label: '复星联合康乐一生重大疾病保险（B款升级款）条款.pdf',
          value: '/static/doc/TAIPING20170412001/B/复星联合康乐一生重大疾病保险（B款升级款）条款.pdf'
        },
        {
          label: '复星联合附加康乐一生轻症疾病保险（升级款）条款.pdf',
          value: '/static/doc/TAIPING20170412001/B/复星联合附加康乐一生轻症疾病保险（升级款）条款.pdf'
        },
        {
          label: '复星联合附加康乐一生投保人豁免重大疾病保险（升级款）条款.pdf',
          value: '/static/doc/TAIPING20170412001/B/复星联合附加康乐一生投保人豁免重大疾病保险（升级款）条款.pdf'
        }
      ],
      'B': [
        {
          label: '复星联合康乐一生重大疾病保险（C款升级款）条款.pdf',
          value: '/static/doc/TAIPING20170412001/C/复星联合康乐一生重大疾病保险（C款升级款）条款.pdf'
        },
        {
          label: '复星联合附加康乐一生投保人豁免重大疾病保险（升级款）条款.pdf',
          value: '/static/doc/TAIPING20170412001/C/复星联合附加康乐一生投保人豁免重大疾病保险（升级款）条款.pdf'
        }
      ]
    },
    '投保人声明': {
      title: '投保人声明',
      lists: [
        {
          title: '',
          infos: [
            '1、投保时，本投保人已就该产品的保障内容以及保险金额向被保险人进行了明确说明，并征得其同意。',
            '2、本投保人兹声明上述各项内容填写属实，并知道如果投保信息不真实，保险公司将有权拒赔，一切后果由本人承担。',
            '3、本投保人已充分了解提供的投保人、被保险人和指定受益人的身份信息、身份证明文件以及投保人的联系方式等个人信息均真实有效。如信息错误或缺失的，本人将按照贵公司要求补充更正，本人知晓上述个人信息在补充更正完成前不能核保或保全通过。',
            '4、未经本人同意，保险公司不会将本人信息用于人身保险公司和第三方机构的销售活动。',
            '5、本投保人已完整阅读本产品投保须知、投保提示书、保险条款，知晓产品特点，尤其是保障责任、免除责任、犹豫期、费用扣除、退保、保险单现金价值、投保人、被保险人义务的内容等各重要事项。本投保人特此同意接受该条款及投保须知之全部内容。',
            '6、本投保人已明确并接受本计划的承保机构、承保、保全变更、退保和理赔办理方式及理赔金支付方式。',
            '7、本投保人已明确了解该保险合同的成立、生效是以保险公司出具保单为准，确认非以支付保费为保险合同的成立要件。',
            '8、本投保人同意将保险合同生效日次日视为签收日。',
            '9、根据《中华人民共和国合同法》第十一条规定，数据电文是合法的合同表现形式。本人接受保险公司在慧择保险提供的电子保单作为本投保书成立生效的合法有效凭证，具有完全证据效力。'
          ]
        }
      ]
    },
    //健康告知分投保了豁免保费和未投保豁免保费
    '健康告知': {
      '豁免保费': {
        tipsTitle: '请投保人/被保险人确认上述问题答案：',
        tipsdes: '（若被保险人为未成年人，则请被保险人的父母代为回答）',
        title: "投保人/被保险人健康告知",
        lists: [
          {
            title: '',
            infos: [
              '1、投保人及被保险人最近5年内是否因健康异常发生过住院或手术，或由体检医师或医生给投保人及被保险人提出住院或手术的建议？此处所述住院治疗或手术不包含阑尾炎、脂肪瘤、肺炎、上呼吸道感染、骨折、颈椎疾病、急性胃炎或非萎缩性胃炎、上消化道出血、顺产手术、胆囊炎。',
              '2、投保人及被保险人是否抽烟超过15支/日或以任何方式食用烟草？',
              '3、过去1年中，投保人及被保险人是否在一年内因不明原因体重增加或减少超过5公斤？',
              '4、投保人及被保险人是否在投保或复效时被拒保、延期、加费或除外责任承保？',
              '5、投保人及被保险人是否参与任何危险的运动或赛事（如赛车、登山、攀岩、滑雪、潜水、跳伞、蹦极、驾驶航空机具以及其它危险运动或赛事）？',
              '6、投保人及被保险人是否在国外持续居住超过五个月或准备前往有战乱或疾病流行的国家？',
              '7、投保人及被保险人是否曾经或正在使用镇静安眠药、迷幻剂、毒品或其他违禁药物，是否有麻醉剂成瘾、酒精或药物滥用成瘾？',
              '8、投保人及被保险人的直系亲属（除配偶）是否有人患过以下疾病？<br> 卵巢癌或乳腺癌（仅对女性被保险人的直系亲属）、大肠癌、心肌梗塞、冠心病、脑中风、糖尿病、多发性硬化症、帕金森氏病、多囊肾性疾病。',
              '9、投保人及被保险人是否曾患有下列疾病，或因下列疾病而接受检查或治疗？<br>' +
              '（1）先天性疾病、癫痫、身体或智力残疾、双耳失聪、双眼失明或高度近视1000度以上<br>' +
              '（2）心脑血管疾病（高血压、冠心病、主动脉狭窄、肺动脉高压、脑血管瘤或畸形、脑中风、心肌梗塞）；<br>' +
              '（3）呼吸系统疾病（慢性支气管炎、肺结节疾病、胸膜粘连、哮喘、肺结核、肺栓塞、肺纤维化、慢性阻塞性肺病、终末期肺病、呼吸功能衰竭）；<br>' +
              '（4）内分泌或免疫系统疾病（糖尿病、甲状腺功能亢进症、甲状腺功能减退症、原发性醛固酮增多症、嗜铬细胞瘤、系统性红斑狼疮、肌营养不良、强直性脊柱炎、风湿或类风湿关节炎）<br>' +
              '（5）消化系统疾病（肝炎或肝硬化、重症肝炎、胰腺炎、萎缩性胃炎、胃或十二指肠溃疡、溃疡性结肠炎、克隆氏病）；<br>' +
              '（6）泌尿系统疾病（急性肾炎、慢性肾炎、肾病综合症、肾功能不全、肾功能衰竭、肾动脉狭窄、多囊肾）；<br>' +
              '（7）血液系统或淋巴系统疾病（贫血、再生障碍性贫血、白血病、血友病、骨髓增生异常综合症、何杰金氏病、非何杰金氏淋巴瘤）；<br>' +
              '（8）精神或神经系统疾病（抑郁症、焦虑症、精神分裂症、酒精或药物滥用、癫痫、帕金森氏症、阿尔兹海默病、重症肌无力、多发性硬化）；<br>' +
              '（9）未明确诊断为良性的息肉、囊肿、肿块、赘生物；癌症或任何肿瘤、艾滋病。<br>',
              '10、15周岁以上女性投保人及被保险人告知：<br>' +
              '(1)您是否正在怀孕？<br>' +
              '(2)您是否曾/正患有以下症状或疾病？乳房肿块、阴道不规则流血、子宫肌瘤、子宫内膜异位症、卵巢囊肿等乳房或女性生殖系统症状或疾病？<br>' +
              '(3) 您是否曾因异常妊娠而住院治疗或手术（含异常妊娠导致的剖腹生产）？<br>',
              '11、婴幼儿告知（2周岁及以下告知） ：<br>' +
              '(1)被保险人出生时体重是否小于2.5公斤？<br>' +
              '(2)是否有畸形、发育迟缓、脑瘫、智能障碍、听力障碍、其他残障、反复发热/气喘/腹泻、遗传或先天性疾病？<br>'
            ]
          }
        ]
      },
      '未豁免保费': {
        tipsTitle: '请确认上述问题答案：',
        tipsdes: '（若被保险人为未成年人，则请被保险人的父母代为回答）',
        title: '被保险人健康告知',
        lists: [
          {
            title: '',
            infos: [
              '1、您最近5年内是否因健康异常发生过住院或手术，或由体检医师或医生给投保人及被保险人提出住院或手术的建议？此处所述住院治疗或手术不包含阑尾炎、脂肪瘤、肺炎、上呼吸道感染、骨折、颈椎疾病、急性胃炎或非萎缩性胃炎、上消化道出血、顺产手术、胆囊炎。',
              '2、您是否抽烟超过15支/日或以任何方式食用烟草？',
              '3、过去1年中，您是否在一年内因不明原因体重增加或减少超过5公斤？',
              '4、您是否在投保或复效时被拒保、延期、加费或除外责任承保？',
              '5、您是否参与任何危险的运动或赛事（如赛车、登山、攀岩、滑雪、潜水、跳伞、蹦极、驾驶航空机具以及其它危险运动或赛事）？',
              '6、您是否在国外持续居住超过五个月或准备前往有战乱或疾病流行的国家？',
              '7、您是否曾经或正在使用镇静安眠药、迷幻剂、毒品或其他违禁药物，是否有麻醉剂成瘾、酒精或药物滥用成瘾？',
              '8、您的直系亲属（除配偶）是否有人患过以下疾病？<br>' +
              '卵巢癌或乳腺癌（仅对女性被保险人的直系亲属）、大肠癌、心肌梗塞、冠心病、脑中风、糖尿病、多发性硬化症、帕金森氏病、多囊肾性疾病。',
              '9、您是否曾患有下列疾病，或因下列疾病而接受检查或治疗？<br>' +
              '（1）先天性疾病、癫痫、身体或智力残疾、双耳失聪、双眼失明或高度近视1000度以上；<br>' +
              '（2）心脑血管疾病（高血压、冠心病、主动脉狭窄、肺动脉高压、脑血管瘤或畸形、脑中风、心肌梗塞）；<br>' +
              '（3）呼吸系统疾病（慢性支气管炎、肺结节疾病、胸膜粘连、哮喘、肺结核、肺栓塞、肺纤维化、慢性阻塞性肺病、终末期肺病、呼吸功能衰竭）；<br>' +
              '（4）内分泌或免疫系统疾病（糖尿病、甲状腺功能亢进症、甲状腺功能减退症、原发性醛固酮增多症、嗜铬细胞瘤、系统性红斑狼疮、肌营养不良、强直性脊柱炎、风湿或类风湿关节炎）；<br>' +
              '（5）消化系统疾病（肝炎或肝硬化、重症肝炎、胰腺炎、萎缩性胃炎、胃或十二指肠溃疡、溃疡性结肠炎、克隆氏病）；<br>' +
              '（6）泌尿系统疾病（急性肾炎、慢性肾炎、肾病综合症、肾功能不全、肾功能衰竭、肾动脉狭窄、多囊肾）；<br>' +
              '（7）血液系统或淋巴系统疾病（贫血、再生障碍性贫血、白血病、血友病、骨髓增生异常综合症、何杰金氏病、非何杰金氏淋巴瘤）；<br>' +
              '（8）精神或神经系统疾病（抑郁症、焦虑症、精神分裂症、酒精或药物滥用、癫痫、帕金森氏症、阿尔兹海默病、重症肌无力、多发性硬化）；<br>' +
              '（9）未明确诊断为良性的息肉、囊肿、肿块、赘生物；癌症或任何肿瘤、艾滋病。',
              '10、15周岁以上女性被保险人告知：<br>' +
              '(1)您是否正在怀孕？<br>' +
              '(2)您是否曾/正患有以下症状或疾病？乳房肿块、阴道不规则流血、子宫肌瘤、子宫内膜异位症、卵巢囊肿等乳房或女性生殖系统症状或疾病？<br>' +
              '(3) 您是否曾因异常妊娠而住院治疗或手术（含异常妊娠导致的剖腹生产）？',
              '11、婴幼儿告知（2周岁及以下告知） ：<br>' +
              '(1)被保险人出生时体重是否小于2.5公斤？<br>' +
              '(2)是否有畸形、发育迟缓、脑瘫、智能障碍、听力障碍、其他残障、反复发热/气喘/腹泻、遗传或先天性疾病？<br>'
            ]
          }
        ]
      }
    }
  },
  //保障责任
  responsibility: [
    {
      label: "售后及理赔",
      arrow: true,
      popupId: "shjlp"
    },
    {
      label: "常见问题",
      arrow: true,
      popupId: "cjwt"
    },
    {
      label: "投保须知",
      arrow: true,
      popupId: "tbxz"
    },
    {
      label: "保险条款",
      arrow: true,
      popupId: "bxtk"
    },
    {
      label: "投保人声明",
      arrow: true,
      popupId: "popup1"
    }
  ]
}
export default product


