module.exports = {
  // 状态示例
  STATE: [
    {
      id: 0,
      value: '状态一'
    },
    {
      id: 1,
      value: '状态二'
    },
    {
      id: 2,
      value: '状态三'
    }
  ],
  
  // 业务类型
  BUSI_DOMAIN: [
    {
      id: 0,
      value: '童话业务'
    },
    {
      id: 1,
      value: '听书馆'
    },
    {
      id: 3,
      value: '资源欣赏平台'
    },
    {
      id: 4,
      value: '四维看看'
    },
    {
      id: 5,
      value: '三维文物库'
    },
    {
      id: 6,
      value: '智慧终端'
    },
    {
      id: 9,
      value: '贵州测试'
    }
  ],
  // 推送内容来源
  PUSH_ATTR: [
    {
      id: 0,
      value: '主题'
    },
    {
      id: 1,
      value: '栏目内容'
    },
    {
      id: 2,
      value: '新闻资讯'
    },
    {
      id: 3,
      value: '连接地址'
    },
    {
      id: 4,
      value: '栏目'
    }
  ],
  // 黑白名单
  CLIENT_ATTR: [
    {
      id: 0,
      value: '黑名单'
    },
    {
      id: 1,
     value: '白名单'
    }
  ],
  // 是否免费
  IS_FREE: [
    {
      id: 0,
      value: '免费'
    },
    {
      id: 1,
      value: '收费'
    }
  ],
  // 内容类型
  CONTENT_PROPER: [
    {
      id: 0,
      value: '剧集'
    },
    {
      id: 1,
      value: '图片电子书'
    },
    {
      id: 2,
      value: '文本电子书'
    },
    {
      id: 3,
      value: '实体纸书'
    },
    {
      id: 5,
      value: '报纸'
    },
    {
      id: 6,
      value: '图片画报'
    },
    {
      id: 7,
      value: '图片期刊'
    },
    {
      id: 8,
      value: '文本学术期刊'
    },
    {
      id: 9,
      value: '图片学术期刊'
    },
    {
      id: 10,
      value: '音频'
    },
    {
      id: 11,
      value: '单片'
    }
  ],
  // 主题类型
  THEME_TYPE: [
    {
      id: 1,
      value: '人物主题'
    },
    {
      id: 2,
      value: '厂家主题'
    },
    {
      id: 3,
      value: '系列主题'
    },
    {
      id: 4,
      value: '单片主题'
    },
    {
      id: 5,
      value: '应景主题'
    }
  ],

  //是否积分主题：1不积分，0积分。
  IS_BP: [
    {
      id: 0,
      value: '积分'
    },
    {
      id: 1,
      value: '不积分'
    },
  ],
  //状态：0可用
  USE_ABLE:[
  {
    id: 0,
    value: '可用'
  },
  {
    id: 1,
    value: '禁用'
  },
],
  // view_modle 0固定模板(可分页);1自定义模板(自定义坐标，不可分页)
  VIEW_MODEL:[
  {
    id: 0,
    value: '固定模板'
  },
  {
    id: 1,
    value: '自定义模板'
  },

],

//订单管理--订单列表--支付方式
  ORDER_PAYTYPE: [
      {
        id: 0,
        value: '未支付'
      },
      {
        id: 1,
        value: '支付宝'
      },
      {
        id: 2,
        value: '微信'
      }
  ],
//订单管理--订单列表--订单状态
  ORDER_STATUS:[
    {
      id: 0,
      value: '待付款'
    },
    {
      id: 1,
      value: '已付款'
    },
    {
      id: 2,
      value: '已取消'
    },
  ]




}
