<template>
  <div class="user-avator-dropdown" id="user-avator2">
    <span v-if="currentlyAllMedia" >  
       <Select v-model="model1"   style="width:150px;margin-right:10px" @on-change="setBusiDomain" :label-in-value="true" >
            <Option v-for="item in cityList" :value="item.staticParamValue" :key="item.staticParamValue" :label="item.staticParamDesc">{{item.staticParamDesc}}</Option>
        </Select>
   
    </span>
    <Dropdown @on-click="handleClick">
      <Avatar :src="userAvator"/>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
       <DropdownMenu slot="list">
       <!-- <DropdownItem name="cache">我的应用</DropdownItem> -->
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions ,mapMutations} from 'vuex'
import {localSave,localRead} from '@/libs/util'
import axios from 'axios';
export default {
  name: 'User',
  inject:['reload'],
   data() {
        return {
          model1:'1',
          placeholder:'全部',
          cityList:[],
          currentlyAllMedia:true
        }
        },
  props: {
    userAvator: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default () {
        return []
      }
    }
  },
  methods: {
     dict:function(){
        let buis= localRead("buisdomain");
        if(buis===""){
          let params={"staticParamName":"BUSI_DOMAIN"};
            axios({
              methods:"get",
              url:'/jx'+this.globalApi.selectParamByNameAndValue,
              params:{
                  "staticParamName":"BUSI_DOMAIN"
                },
              headers: {
                'Content-Type': 'application/json'
              },
            }).then((response)=>{
                  this.cityList=response.data.data;
                  localSave("buisdomain",this.cityList);
                  this.model1='1';
                   let params={"busiDomain":this.model1};  
              axios({
                  methods:"get",
                  url:'/jx'+this.globalApi.updateBusiDomain,
                  params:{
                    "busiDomain":this.model1
                    },
                  headers: {
                    'Content-Type': 'application/json'
                  },
                }).then((response)=>{
                    this.$Message.success('切换成功');
                
                
                })
            })      
        }else{
          let params={"staticParamName":"BUSI_DOMAIN"};
            axios({
              methods:"get",
              url:'/jx'+this.globalApi.selectParamByNameAndValue,
              params:{
                  "staticParamName":"BUSI_DOMAIN"
                },
              headers: {
                'Content-Type': 'application/json'
              },
            }).then((response)=>{
                  this.cityList=response.data.data;
            })      
          this.model1=localRead("value");
        }
        
            
        },
      setBusiDomain:function(e){
          let busiDomain=e.value;
          let params={"busiDomain":busiDomain.toString()};  
          axios({
              methods:"get",
              url:'/jx'+this.globalApi.updateBusiDomain,
              params:{
                 "busiDomain":busiDomain.toString()
                },
              headers: {
                'Content-Type': 'application/json'
              },
            }).then((response)=>{
                this.$Message.success('切换成功');
                 localSave("value",e.value);
                this.reload()          
            })

        },
    ...mapActions([
      'handleLogOut'
    ]),
    ...mapMutations([
      'setTagNavList',
      'updateMenuList'
    ]),
    handleClick (name) {
      let res =[{"path":"/home","name":"home","meta":{"hideInMenu":true,"title":"首页","notCache":true,"icon":"md-home"},"params":{}}];
      switch (name) {
        case 'logout':
        localSave('route', '');
        localSave("buisdomain",'');
        let routerList=[];
        this.handleLogOut().then(() => {
            this.setTagNavList(res);
            this.updateMenuList(routerList);
            this.$router.push({
              name: 'login'
            });
          })
          break;
          case 'cache':
            localSave('route', '');
          localSave("buisdomain",'');
           let router_List=[];
           this.setTagNavList(res);
           this.updateMenuList(router_List);
            this.$router.push({
              name: 'cache'
           });
          break;
      }
    },
    //查询当前类型
    // getBusiDomain(){
    //   let params={};
    //    axios({
    //           methods:"get",
    //           url:'/jx'+this.globalApi.getBusiDomain,
    //           params:{ },
    //           headers: {
    //             'Content-Type': 'application/json'
    //           },
    //         }).then((response)=>{
    //             console.log(response.data,"dddd")
    //         })     
    // }
  },
  mounted(){
    // this.getBusiDomain();
    //判断隐藏
    if(localRead('keyword')=='m_006'){
      this.currentlyAllMedia=true;
      this.dict();
     
    }else{
      this.currentlyAllMedia=false;
    }
  }
}
</script>
<style lang="less">
#user-avator2
{
  .ivu-avatar {
      display: inline-block;
      text-align: center;
      background: url(../../../../assets/images/ren.png) no-repeat;
      color: #fff;
      white-space: nowrap;
      position: relative;
      overflow: hidden;
      vertical-align: middle;
      width: 26px;
      height: 26px;
      line-height: 26px;
      border-radius: 16px;
      margin-right: 2px;
      margin-left: -10px;
    }

}
</style>