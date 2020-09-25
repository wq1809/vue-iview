import axios from 'axios';
import preUrl from '@/url'
import Cookies from 'js-cookie';
import store from '../store'
import { Message } from 'iview';
import {
  setToken,
  getToken,
} from '@/libs/util'
import {router} from '@/router/index';
/**
 * 设置全局axios默认值
 */
axios.defaults.timeout = 6000; //6000的超时验证
//axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
//创建一个axios实例
//const instance = axios.create();
//instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

/**
 * 请求拦截器
 */
axios.interceptors.request.use(function (config) { // 每次请求时会从localStorage中获取token
 let token = getToken();
  if (token) {
    token =token.replace(/'|"/g, '') // 把token加入到默认请求参数中
    config.headers.common['login_token'] = token;
  }
  return config
},
function (error) {
 return Promise.reject(error)
});



/* 响应拦截器 */
axios.interceptors.response.use(function (response) { // ①10010 token过期（30天） ②10011 token无效
  //console.log(JSON.stringify(response))
 // const data = response.data;
 /**
  switch (data.resultCode) {
    case '00000000':
        console.log(router.history.current.name !=='login')
          if(router.history.current.name !=='login'||router.history.current.name!=='cache'){
            //console.log(router.history.current.name !=='login')
              //router.push('login');
          }else{
            return response
          }
        break;
     default:*/

//第一步： 判断响应中 判断token 状态
//if(response.data.code==='00000000' && response.data.code !== undefined){
  //删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
  //
  //console.log(JSON.stringify(response.headers.logintoken)+"==========")
//console.log(JSON.stringify(response.data.code))
//}else{
  //if(response.data.code ==='admin-00000002'&& response.data.code !== undefined){

//}
//else if(response.headers.logintoken){
  //第二部： 判断 token 是否存在，如果存在说明需要更新token
 // setToken('token', response.headers.logintoken) ;// 覆盖原来的token(默认一天刷新一次)
//}
return response
},
function (error) {
  if(error.response){
    switch (error.response.status) {
      case 401:
            // 未登录 清除已登录状态
            Cookies.set('userInfo', '');
            Cookies.set('token', '');
             sessionStorage.setItem("token", "");
              sessionStorage.setItem("userInfo", "");
              setToken("");
              Message.error("请求超时或用户未激活");
              //setTimeout("fun()",1000);
            if (router.history.current.name != "login") {
                //if (data.message !== null) {
                   // Message.error(data.message);
               // } else {
                   // Message.error("登录超时，请重新登录");
               // }
                router.push('login');
            }
            break;
        case 403:
            // 没有权限
            if (data.message !== null) {
                Message.error(data.message);
            } else {
                Message.error("未知错误");
            }
            break;
        case 500:
            // 错误
            if (data.message !== null) {
                Message.error(data.message);
            } else {
                Message.error("未知错误");
            }
            break;
        default:
            return Promise.reject(error);

    }
  }
  return Promise.reject(error)
});


/**
 * @description: 将键值对集合转换为FormData对象，以便axios传参；
 * @param: data ：形如{param1:"",param2:""}
 * @return   {FormData}
 * @author: Breaker-93
 * @date: create on 2017-12-18 15:40:10
 */
export const formData =  (data) =>{
  let _formData = new FormData()
  for (var i in data) {
    _formData.append(i, data[i])
  }
  return _formData;
};

export const S4 =  ()=> {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
};


 export const iframDownloadByUrl= (url) =>{
    let iframe = document.createElement("iframe")
    document.body.appendChild(iframe)
    iframe.src = url
    iframe.style.display = "none"
  };

 export const rcGuid =()=> {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
  };

  /**
   * @description: 时间戳格式转换为日期格式(转换两种)
   * @param: timestamp 时间戳
   * @param type 1:年/月/日  2:年/月/日 时分秒
   * @return    {string}
   * @author: Breaker-93
   * @date: create on 2017-12-18 15:36:49
   */
 export const  transTime =(timestamp, type) =>{
    var newDate = new Date();
    newDate.setTime(timestamp);
    if (type === 1) {
      return newDate.toLocaleDateString();
    }
    if (type === 2) {
      return newDate.toLocaleString();
    }
    if (type === 3) {
      let year = newDate.getFullYear();
      let month = this.formatDateString(newDate.getMonth() + 1);
      let date = this.formatDateString(newDate.getDate());
      let hour = this.formatDateString(newDate.getHours());
      let minute = this.formatDateString(newDate.getMinutes());
      let second = this.formatDateString(newDate.getSeconds());
      return [year, month, date].join("-") + " " + [hour, minute, second].join(":");
    }
  };
  /**
   * @description: 对axios的POST请求方法的封装(已加header)
   * @param: url  -> String
   * @param: param  -> 形如{param1:"",param2:""}
   * @param: thenFun  -> 请求成功（200）的回调函数
   * @param: exeFun  -> 请求失败（非200）的回调函数
   * @return
   * @author: Breaker-93
   * @date: create on 2017-12-18 15:45:09
   * axios.defaults.headers.common['loginToken'] = sessionStorage.getItem('token')
   */
  export const postUtil =(url,param, thenFun, exeFun) =>{
     // let loginToken= sessionStorage.getItem('token');
      axios.post(preUrl.interfaceUrl + url, param,{
      headers: {
        'Content-Type': 'application/json',  
      //  'login_token':loginToken 
      },
    }).then(function (res) {
      thenFun.call(this, res.data);
    }).catch(function (error) {
      exeFun.call(this, error);
    });
  };

  /**
   * 特殊zip
   */
  export const postUtil1 =(url,param, thenFun, exeFun) =>{
    let loginToken= sessionStorage.getItem('token');
    axios.post(preUrl.interfaceUrl + url, param,{
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
     // 'login_token':loginToken
    },
    responseType: 'blob'
  }).then(function (res) {
    thenFun.call(this, res.data);
  }).catch(function (error) {
    exeFun.call(this, error);
  });
};
export const postQueryUti2= (url,param, thenFun, exeFun)=> {
  axios({
    method: 'post',
    url: preUrl.interfaceUrl + url,
    params: param,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    responseType: 'blob'
  }).then(function (res) {
    thenFun.call(this, res.data);
  }).catch(function (error) {
    exeFun.call(this, error);
  });
};
  /**
   *
   */
  export const postQueryUtil= (url,param, thenFun, exeFun)=> {
    let loginToken= sessionStorage.getItem('token');
    axios({
      method: 'post',
      url: preUrl.interfaceUrl + url,
      params: param,
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(function (res) {
      thenFun.call(this, res.data);
    }).catch(function (error) {
      exeFun.call(this, error);
    });
  };


  export const postUploadFile=(url, params,thenFun, exeFun)=>{
    let loginToken= sessionStorage.getItem('token');
    let config = {
      headers: {
        'content-type': 'multipart/form-data',
      //  'login_token':loginToken
      }
    }
    axios.post(preUrl.interfaceUrl + url,params,config)
    .then(function(res){
        //console.log(res);
        thenFun.call(this, res.data);
        }.bind(this))
        .catch(function (error) {
         // console.log(error);
          exeFun.call(this, error);
        }
    )
  };

  export const postFileUtil= (url, param, thenFun, exeFun) =>{
    axios.post(preUrl.interfaceUrl + url, param).then(function (res) {
      thenFun.call(this, res.data);
    }).catch(function (error) {
      exeFun.call(this, error);
    });
  };

  /**
   * 设置请求头中加入token
   *
   */
    export const getTokenUtil =(url, param, thenFun, exeFun) =>{
      axios({
        method: 'get',
        url: preUrl.interfaceUrl + url,
        params: param,
        headers: {
          'Content-Type': 'application/json',
        //  'login_token':loginToken
        }
      }).then(function (res) {
        thenFun.call(this, res.data);
      }).catch(function (error) {
        exeFun.call(this, error);
      });
  };

  /**
   * @description: 对axios的GET请求方法的封装（已加header）
   * @param: url  -> String
   * @param: param  -> 形如{param1:"",param2:""}
   * @param: thenFun  -> 请求成功（200）的回调函数
   * @param: exeFun  -> 请求失败（非200）的回调函数
   * @return
   * @author: Breaker-93
   * @date: create on 2017-12-18 15:48:35
   */
  export const getUtil= (url, param, thenFun, exeFun) =>{
    let loginToken= sessionStorage.getItem('token');
    axios({
      method: 'get',
      url: preUrl.interfaceUrl + url,
      params: param,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(function (res) {
      thenFun.call(this, res.data);
    }).catch(function (error) {
      exeFun.call(this, error);
    });
  };
  /**
   * 特殊下载excel/word
   */
  export const getUtil2= (url, param, thenFun, exeFun) =>{
    //let loginToken= sessionStorage.getItem('token');
    axios({
      method: 'get',
      url: preUrl.interfaceUrl + url,
      params: param,
      headers: {
        'Content-Type': 'application/json'
      },
      responseType:'arraybuffer'
    }).then(function (res) {
      thenFun.call(this, res.data);
    }).catch(function (error) {
      exeFun.call(this, error);
    });
  };
  export const getUtil1 =(url, thenFun, exeFun)=> {
    axios({
      method: 'get',
      url: preUrl.interfaceUrl + url,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      thenFun.call(this, res.data);
    }).catch(function (error) {
      exeFun.call(this, error);
    });
  };
  /**
   * @description: 对axios的DELETE请求方法的封装（已加header）
   * @param: url  -> String
   * @param: param  -> 形如{param1:"",param2:""}
   * @param: thenFun  -> 请求成功（200）的回调函数
   * @param: exeFun  -> 请求失败（非200）的回调函数
   * @return
   * @author: Breaker-93
   * @date: create on 2017-12-18 15:48:35
   */
  export const deleteUtil =(url, param, thenFun, exeFun)=> {

    axios({
      method: 'delete',
      url: preUrl.interfaceUrl + url,
      params: param,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      thenFun.call(this, res.data);
    }).catch(function (error) {
      exeFun.call(this, error);
    });
  };
  /**
   * @description: 对axios的PUT请求方法的封装（已加header）
   * @param: url  -> String
   * @param: param  -> 形如{param1:"",param2:""}
   * @param: thenFun  -> 请求成功（200）的回调函数
   * @param: exeFun  -> 请求失败（非200）的回调函数
   * @return
   * @author: Breaker-93
   * @date: create on 2017-12-18 15:48:35
   */
  export const putUtil= (url, param, thenFun, exeFun)=> {

    axios({
      method: 'put',
      url: preUrl.interfaceUrl + url,
      params: param,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      thenFun.call(this, res.data);
    }).catch(function (error) {
      exeFun.call(this, error);
    });
  };

  /**
   * @description: 对axios的PUT请求方法的封装（已加header）
   * @param: url  -> String
   * @param: param  -> 形如{param1:"",param2:""}
   * @param: thenFun  -> 请求成功（200）的回调函数
   * @param: exeFun  -> 请求失败（非200）的回调函数
   * @return
   * @author: hpz
   * @date: create on 2019-6-19
   */
  export const putBodyUtil =(url, param, thenFun, exeFun)=> {
    axios.put(preUrl.interfaceUrl + url, param,{
      headers: {
        'Content-Type': 'application/json'
     } }
    ).then(function (res) {
      thenFun.call(this, res.data);
    }).catch(function (error) {
      exeFun.call(this, error);
    });
  };

  /**
   * @description: 格式化日期
   * @param: date {Date}
   * @param: fmt {String}
   * @return: {string}
   * @author: Breaker-93
   * @date: create on 2018-01-25 15:36:49
   */
  export const formatDate =(date, fmt)=> {
    var o = {
      "M+": date.getMonth() + 1, // 月份
      "d+": date.getDate(), // 日
      "h+": date.getHours(), // 小时
      "m+": date.getMinutes(), // 分
      "s+": date.getSeconds(), // 秒
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
  };

  export const formatDateHpz=(updateTime)=> {

    let date = new Date(updateTime);
    let fmt  =   "yyyy-MM-dd hh:mm:ss";
    var o = {
      "M+": date.getMonth() + 1, // 月份
      "d+": date.getDate(), // 日
      "h+": date.getHours(), // 小时
      "m+": date.getMinutes(), // 分
      "s+": date.getSeconds(), // 秒
      "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
      "S": date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
    return fmt;
  };
  /**
   * @description: 根据浏览器url中的参数key获取值
   * @param: name url参数key{String}
   * @return: {string}
   * @author: Breaker-93
   * @date: create on 2018-01-25 15:39:28
   */
  export const GetQueryString= (name) =>{
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");

    // 专获取先编码后加密的url的参数，例如： let goUrl = 'experiment.html?'+window.btoa(encodeURIComponent("paramBody="+JSON.stringify(paramBody)));
    var r = window.decodeURIComponent(window.atob(window.location.search.substr(1))).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  };

  /**
   * @description: 根据日期字符串判断当前日期是周几
   * @param: dateStr {String}
   * @return: {string}
   * @author: Breaker-93
   * @date: create on 2018-01-25 15:40:33
   */
   export const transWeekDay =(dateStr)=> {
    let weekDay = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
    let targetDate = new Date(Date.parse(dateStr.replace(/-/g, "/")));
    return weekDay[targetDate.getDay()]
  };
  export const calcAgeByBirth =(strBirthday)=> {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    var d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();
    console.log(nowYear)
    if (nowYear === birthYear) {
      returnAge = 0 // 同年 则为0岁
    } else {
      var ageDiff = nowYear - birthYear // 年之差
      if (ageDiff > 0) {
        if (nowMonth === birthMonth) {
          var dayDiff = nowDay - birthDay // 日之差
          if (dayDiff < 0) {
            returnAge = ageDiff - 1
          } else {
            returnAge = ageDiff
          }
        } else {
          var monthDiff = nowMonth - birthMonth // 月之差
          if (monthDiff < 0) {
            returnAge = ageDiff - 1
          } else {
            returnAge = ageDiff
          }
        }
      } else {
        returnAge = -1 // 返回-1 表示出生日期输入错误 晚于今天
      }
    }
    return returnAge // 返回周岁年龄
  };
  export const calcMonths =(date1, date2)=> {
    date1 = date1.split('-');
    date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
    date2 = date2.split('-');
    date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
    return Math.abs(date1 - date2);
  };

   /**
   * 中国标准时间转换时间戳
   * @param date      Sun Jul 07 2019 00:00:00 GMT+0800 (中国标准时间)
   * @returns {number}   1562515200000
   */
  export const dateToMs =(date) =>{
    let result = new Date(date).getTime();
    return result;
  };
  export const getUrlParam= (url, name)=> {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    // 专获取先编码后加密的url的参数，例如： let goUrl = 'experiment.html?'+window.btoa(encodeURIComponent("paramBody="+JSON.stringify(paramBody)));
    if (url.split("?").length === 1) {
      return null
    }
    var r = url.split("?")[1].match(reg);
    if (r != null) {
      return decodeURI(r[2]);
    } else {
      return null;
    }
  };
  export const exportExcel=(url,param, thenFun, exeFun) =>{
      axios.post(preUrl.interfaceUrl + url, param,{
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        },
        responseType: 'arraybuffer'
      }).then(function (res) {
        thenFun.call(this, res.data);
      }).catch(function (error) {
        exeFun.call(this, error);
      });
  };

  export const byteToMB=(byte)=>{
     var MB =   ((parseInt(byte)  * 1.0) / (1024 * 1024)).toFixed(2)
    return MB;
  };

//获取系统时间返回时间戳
export const getNowFormatDate = ()=>{
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var hour= date.getHours();
        // 获取分钟
        var minute= date.getMinutes();
        // 获取秒
        var second= date.getSeconds();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate+"  "+hour + seperator2+minute+seperator2+ second;
      var datetime = new Date(currentdate);
      var time1 = datetime.getTime();
      return time1;
   }
   //类型 - 数据字典
   export const GetdataDictionary =(id) =>{
    let dataName="";
    switch (id) {
      case '1':
        dataName='单行文本';
      break;
      case '2':
        dataName='整数';
      break;
      case '3':
        dataName='小数';
      break;
      case '4':
        dataName='日期';
      break;
      case '5':
        dataName='时码';
      break;
      case '6':
        dataName='受控词';
      break;
      case '7':
        dataName='多行文本';
      break;
      case '8':
        dataName='分类';
      break;
      case '9':
        dataName='日期和时间';
      break;
      case '10':
        dataName='时间';
      break;
    }
    return dataName;
   }

   //编目类型 - 数据字典
   export const GetCataDataDictionary =(id) =>{
    let dataCataName="";
    switch (id) {
      case '0':
        dataCataName='必填';
      break;
      case '1':
        dataCataName='普通';
      break;
      case '2':
        dataCataName='只读';
      break;
      case '3':
        dataCataName='不可见';
      break;
      case '5':
        dataCataName='图片';
      break;
    }
    return dataCataName;
   }
//翻译全媒体数据类型
export const getDataType=(id,data)=>{
  let staticParamName="暂无";
  data.forEach(function(e){
    if(e.staticParamValue == id){
        staticParamName=e.staticParamDesc;
    }
  })
  return staticParamName;
}

/**获取类容来源 */
export const contentRes=(id,data)=>{
  let name = '';
  data.forEach(function(e){
    if(e.id == id){
      name = e.name;
    }
  })
  return name
}
//export default instance;

export const postUtill =(url,param, thenFun, exeFun) =>{
  axios.post('jx/admin'+url, param,{
  headers: {
    'Content-Type': 'application/json',  
  }
}).then(function (res) {
  thenFun.call(this, res.data);
}).catch(function (error) {
  exeFun.call(this, error);
});
};
