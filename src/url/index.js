/**
 * Created by XieNa on 2019/6/13.
 */
// 全局URL配置
const devUrl = require('./dev.url'); // 当存在多份开发url配置时，可根据需要在此处修改加载；
const prodUrl = require('./prod.url'); // 当存在多份生产url配置时，可根据需要在此处修改加载；
const url = process.env.NODE_ENV === 'production' ? prodUrl : devUrl;
module.exports = {
  interfaceUrl: "http://" + url.apiIP + ":" + url.apiPORT + url.URL, // API服务访问的URL
}