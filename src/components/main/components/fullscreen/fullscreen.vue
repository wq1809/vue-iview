<template>
  <div>
    <div class="full-screen-btn-con">
      <Tooltip :content="'系统首页'" placement="bottom">        
           <router-link :to="{path:'/firstPage'}">
              <Icon type="md-home" :size="25"  color='#5c6b77'></Icon>
           </router-link>
      </Tooltip>               
    </div>
    <div v-if="showFullScreenBtn" class="full-screen-btn-con">
        <Tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
            <Icon @click.native="handleChange" :type="value ? 'md-contract' : 'md-expand'" :size="23"></Icon>
        </Tooltip>
    </div> 
    <div class="full-screen-btn-con">
        <Tooltip :content="'退出登录'" placement="bottom">        
          <Icon @click.native="handleClick" type="md-power" :size="25"  color='#5c6b77'></Icon>
        </Tooltip>                            
    </div>
  </div>
</template>

<script>
import { mapActions ,mapMutations} from 'vuex'
import {localSave,localRead} from '@/libs/util'
import Cookies from 'js-cookie'
  export default {
    name: 'Fullscreen',
    data(){
      return {
 
      }
    },
    computed: {
      showFullScreenBtn () {
        return window.navigator.userAgent.indexOf('MSIE') < 0
      }
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleFullscreen () {
        let main = document.body
        if (this.value) {
          if (document.exitFullscreen) {
            document.exitFullscreen()
          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen()
          } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen()
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen()
          }
        } else {
          if (main.requestFullscreen) {
            main.requestFullscreen()
          } else if (main.mozRequestFullScreen) {
            main.mozRequestFullScreen()
          } else if (main.webkitRequestFullScreen) {
            main.webkitRequestFullScreen()
          } else if (main.msRequestFullscreen) {
            main.msRequestFullscreen()
          }
        }
      },
      handleChange () {
        this.handleFullscreen()
      },

    ...mapActions([
      'handleLogOut'
    ]),
    ...mapMutations([
      'setTagNavList',
      'updateMenuList'
    ]),
    handleClick () {
      let res =[{"path":"/home","name":"home","meta":{"hideInMenu":true,"title":"首页","notCache":true,"icon":"md-home"},"params":{}}];
      localSave('route', '');
      localSave("buisdomain",'');
      let routerList=[];
      this.handleLogOut().then(() => {
          this.setTagNavList(res);
          this.updateMenuList(routerList);
          localStorage.clear();
          sessionStorage.clear();
          Cookies.remove('token');
          Cookies.remove('userInfo');
          this.$router.push({
              name: 'login'
          });
      })
    },
     
    },
    mounted () {
     
      let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
      isFullscreen = !!isFullscreen
      document.addEventListener('fullscreenchange', () => {
        this.$emit('input', !this.value)
        this.$emit('on-change', !this.value)
      })
      document.addEventListener('mozfullscreenchange', () => {
        this.$emit('input', !this.value)
        this.$emit('on-change', !this.value)
      })
      document.addEventListener('webkitfullscreenchange', () => {
        this.$emit('input', !this.value)
        this.$emit('on-change', !this.value)
      })
      document.addEventListener('msfullscreenchange', () => {
        this.$emit('input', !this.value)
        this.$emit('on-change', !this.value)
      })
      this.$emit('input', isFullscreen);


    }
  }
</script>

<style lang="less">

.full-screen-btn-con {
   margin-right: 18px;
   display: inline-block;
  .ivu-tooltip-rel{
      height: 64px;
      line-height: 56px;
      i{
        cursor: pointer;
      }
    }
}
</style>
