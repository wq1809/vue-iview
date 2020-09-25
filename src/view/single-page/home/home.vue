<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="12" :md="8" :lg="4" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;padding-bottom: 10px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
      <Row :gutter="20" style="margin-top: 10px;">
        <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
          <Card shadow>
            <!-- 饼状图 -->
            <div id="chartmainpie"  style="width:340px; height:330px;"></div>
          </Card>
        </i-col>
        <i-col :md="24" :lg="16" style="margin-bottom: 20px;">
          <Card shadow style="width:100%;">
            <!-- 柱状图 -->
            <div id="chartmainbar"  style="width:100%; height:330px;"></div>
          </Card>
        </i-col>
      </Row>
         <Row>
      <Card shadow style="width:100%;">
        <div id="chartmainline"  style="width:100%; height:330px;"></div>
      </Card>
    </Row>
  </div>
</template>

<script>
import {
  postUtil,
  postQueryUtil,
  postUploadFile,
  postFileUtil,
  getTokenUtil,
  getUtil,
  getUtil1,
  deleteUtil,
  putUtil,
  putBodyUtil
}from '@/libs/index';
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    Example
  },
  data () {
    return {
      inforCardData: [],
      //任务
      taskCount:0,
      //稿件数量
      manuscriptCount:parseInt(0),
      //素材数量
      materialCount:0,
      fileCount:[],
      pieData: [],
      barData: [],
      taskDayCount:[],
      materialDayCount:[],
      manuscriptDayCount:[],
      topicDayCount:[],
      titleDayCount:[]
    }
  },
  methods:{
    init(){
    },
    getTopStatistics(){
      let params={};
      getUtil(this.globalApi.topStatistics,params,res=>{
        if(res.resultCode==='00000000'){
        let re=  { 'title': '任务总量', 'icon': 'md-list-box', 'count': parseInt(res.data.inforCardData.taskCount), 'color': '#9A66E4' };
        let dj= { 'title': '稿件数量', 'icon': 'md-paper', 'count': parseInt(res.data.inforCardData.manuscriptCount), 'color': '#19be6b' };
        let sc= { 'title': '素材数量', 'icon': 'md-photos', 'count': parseInt(res.data.inforCardData.materialCount), 'color': '#ffd572' };
         this.inforCardData.push(re);
         this.inforCardData.push(dj);
         this.inforCardData.push(sc);
         this.barData=res.data.barData;
         this.taskDayCount=res.data.todayData.taskDayCount;
         this.materialDayCount=res.data.todayData.materialDayCount;
         this.manuscriptDayCount=res.data.todayData.manuscriptDayCount;
        // console.log(JSON.stringify(res.data.todayData.taskDayCount));
        this.getXtBt();
         this.getLineBar();
        }else{
          this.$Message.error("网络请求失败");
        }
      });
    },
    //资源统计
    selectAllDateList(){
      let params={};
       let num=0;
       getUtil(this.globalApi.selectfilecount,params,res=>{
        //console.log(JSON.stringify(res));
        if(res.resultCode==='00000000'){
        let zy={ 'title': '资源总量', 'icon': 'ios-albums', 'count':parseInt(res.data.sumCount) , 'color': '#2d8cf0'};
        this.inforCardData.push(zy);
        }else{
          this.$Message.error("网络请求失败");
        }
       })
    },
    getXtBt(){
       let params={};
       getUtil(this.globalApi.selectdispatch,params,res=>{
        if(res.resultCode==='00000000'){
    let xt={ 'title': '选题总量', 'icon': 'ios-paper', 'count': parseInt(res.data.topicTotal), 'color': '#ed3f14' };
    let bt= { 'title': '报题总量', 'icon': 'ios-barcode', 'count': parseInt(res.data.titleTotal), 'color': '#E46CBB' };
        this.inforCardData.push(xt);
        this.inforCardData.push(bt);
        this.topicDayCount=res.data.topicDayCount;
        this.titleDayCount=res.data.titleDayCount;
        this.getlineStack();
        }else{
          this.$Message.error("网络请求失败");
        }
        });
    },

    getZo(){
      let params={};
      var dataList=[];
      getUtil(this.globalApi.selectAllDateList,params,res=>{
        if(res.resultCode==='00000000'){
          let data=[];
          let a={};
          let d={};
          let i ={};
          let v ={};
          let o={};
          res.data.fileSize.forEach(function(v){
            if(v.type==='img'){//图片
              i ={'value': v.sum_size, 'name': '图片'}
              dataList.push(i);
            }else if(v.type==='audio'){//音频
              if(v.sum_size===''||v.sum_size ===undefined){
                a={'value': 0, 'name': '音频'};
                dataList.push(a);
              }else{
                a={'value': v.sum_size, 'name': '音频'};
                dataList.push(a);
              }
            }else if(v.type==='doc'){//文档
              if(v.sum_size===''||v.sum_size ===undefined){
                 d= {'value': 0, 'name': '文档'}
                 dataList.push(d);
              }else{
                d={'value': v.sum_size, 'name': '文档'};
                dataList.push(d);
              }
            }else if(v.type==='video'){//视频
              v ={'value': v.sum_size, 'name': '视频'}
              dataList.push(v);
            }else if(v.type==='other'){//其他
              if(v.sum_size===''||v.sum_size ===undefined){
                o={'value': 0, 'name': '其他'}
               dataList.push(o);
              }else{
                 o={'value': v.sum_size, 'name': '其他'}
                dataList.push(o);
              }
            }
          });
          let  option ={
            title : {
                text: '资源总量',
                //subtext: '纯属虚构',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['图片','音频','文档','视频','其他']
            },
            series : [
              {
                  name: '访问来源',
                  type: 'pie',
                  radius : '40%',
                  center: ['50%', '60%'],
                  data:  dataList,
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
            ]
          };
        let chartmainpie = this.$echarts.init(document.getElementById("chartmainpie"));
        chartmainpie.setOption(option);
        }else{
          this.$Message.error("网络请求失败");
        }
      });
    },
    //每月任务量
    getLineBar(){
     let option = {
        title : {
          text: '每月任务量',
          x:'center'
        },
        color: ['#3398DB'],
        tooltip : {
          trigger: 'axis',
          axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
         right:'4',
          left: '3%',
          bottom: '3%',
          containLabel: true
        },
        xAxis:[
        {
          type : 'category',
          data : ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月','9月','10月','11月','12月'],
          axisTick: {
              alignWithLabel: true
          }
        }
        ],
        yAxis : [ { type : 'value'}],
        series : [
        {
          name:'任务量',
          type:'bar',
          barWidth: '60%',
          data:this.barData,
        }
        ]
      };
       let chartmainbar = this.$echarts.init(document.getElementById("chartmainbar"));
        chartmainbar.setOption(option);
    },
    getlineStack(){
        let option = {
          title: {
              text: '每周数据量'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['任务','稿件','素材','报题','选题']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name:'任务',
                type:'line',
                stack: '总量',
                data:this.taskDayCount
            },
            {
                name:'稿件',
                type:'line',
                stack: '总量',
                data:this.materialDayCount
            },
            {
                name:'素材',
                type:'line',
                stack: '总量',
                data:this.manuscriptDayCount
            },
            {
                name:'报题',
                type:'line',
                stack: '总量',
                data:this.topicDayCount
            },
            {
                name:'选题',
                type:'line',
                stack: '总量',
                data:this.titleDayCount
            }
        ]
      };

      let chartmainline = this.$echarts.init(document.getElementById("chartmainline"));
        chartmainline.setOption(option);
    }
  },
  mounted () {
   this.getZo();
   this.getTopStatistics();
   this.selectAllDateList();
   //this.getXtBt();
  },

}
</script>
<style lang="less">
.count-style{
  font-size: 24px;
}
</style>
