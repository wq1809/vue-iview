<style lang="less">
  @import './login.less';
</style>
<template>
  <div class="login">
     <div class="lt" ></div>
    <div style="width: 300px;box-shadow: rgba(0, 0, 0, 0.65) 0px 0px 10px;color: rgb(255, 255, 255);z-index: 999;font-size: 20px;position: fixed;height: 388px;left: 50%; margin-left: -150px;margin-top: -199px;top: 50%;" >
      <div style="width: 100%;height: 10px;background: #1ABC9C;margin-bottom: 18px;"></div>
          <Card icon="log-in" :bordered="false">
              <p slot="title"  style="padding-top: 10px; height: 43px;width: 263px;display: block;color: rgb(26, 188, 156); font-size: 19px;text-align: center;">
                   中国文化遗产标本库
              </p>
              <div class="form-con">
                <login-form @on-success-valid="handleSubmit"></login-form>
                <p class="login-tip">输入用户名和密码</p>
              </div>
          </Card>
      </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import Cookies from "js-cookie";
import md5 from 'js-md5';
import {postUtill,postUtil,postQueryUtil,postUploadFile,postFileUtil,getTokenUtil,getUtil,getUtil1,deleteUtil,putUtil} from '@/libs/index'
import {
  setToken,
  getToken,
  localSave,
  localRead,
  canTurnTo
} from '@/libs/util'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password,flag }) {
      let pass= md5(password).toUpperCase();
      let param={"password": pass,"username": userName};
       postUtill(this.globalApi.login, param, res =>{
        if(res.resultCode == "00000000"){
          let token=res.data.token;
          Cookies.set('userInfo',userName,{expires: 7});
          localSave('user',userName);
          Cookies.set('token',token,{expires: 7});
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userInfo", userName);
          setToken(token);
          if(flag){
            this.$router.push({
              name: 'home'
            });
          }else{
            this.$Message.error("请滑动验证后登陆");
          }
        }else if(res.resultCode ==='admin-00000001'){
            this.$Message.error("用户名或密码错误");
        }else if(res.resultCode === 'admin-00010004'){
            this.$Message.error("账号被冻结");
        }else{
            this.$Message.error("网络请求失败");
        }
      });
    }
  }
}
</script>
