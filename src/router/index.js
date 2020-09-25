import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers} from '@/router/routers'
import store from '@/store'
import iView from 'iview'
import {getUtil} from '@/libs/index'
import {
  setToken,
  getToken,
  localSave,
  localRead,
  canTurnTo,
  toDefaultPage,
  formatMenu,
  loadMenu
} from '@/libs/util'
import config from '@/config'
const { homeName } = config

Vue.use(VueRouter)
export const router = new VueRouter({
  mode: 'history',
  routes: routers
})

/**
 * 自定义添加路由方法  避免出现路由重复问题
 * [vue-router] Duplicate named routes definition
 */
router.$addRoutes = (params) => {
//router.matcher = new VueRouter({mode: 'history'}).matcher
router.addRoutes(params)
}

const LOGIN_PAGE_NAME = 'login'
const CACHE_PAGE_NAME = 'home'

router.beforeEach((to, from, next) => {

  iView.LoadingBar.start()
  const token = getToken()
  const menu = localRead('route'); // 读取路由数据
  const accountId = localRead('user');
  const keyword = localRead('keyword');
  const fromName=from.name;
  const fullPath =to.fullPath;
  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({
      name: LOGIN_PAGE_NAME // 跳转到登录页
    })
  }
  // else if(token && to.name === CACHE_PAGE_NAME){
  //   console.log('22222222222222')
  //   next()
  // }
  else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转
  }else if (token && to.name === LOGIN_PAGE_NAME) {
    //已登录且要跳转的页面是登录页
    next({
      name: homeName // 跳转到homeName页
    })
  }else{
    if(!menu || menu.length === 0){
          var LeaderList = []
          let list =sweep;
          LeaderList = formatMenu(list);
          localSave('route', JSON.stringify(list));
          // 将404路由动态注入，防止第一次没有路由数据跳转到404,
          LeaderList.push({
              path: '/401',
              name: 'error_401',
              meta: {
                hideInMenu: true
              },
              component: () => import('@/view/error-page/401.vue')
            },
            {
              path: '*',
              name: 'error_404',
              meta: {
                hideInMenu: true
              },
              component: () => import('@/view/error-page/404.vue')
            },
            {
              path: '/500',
              name: 'error_500',
              meta: {
                hideInMenu: true
              },
              component: () => import('@/view/error-page/500.vue')
            })
          //刷新菜单
          store.commit('updateMenuList', LeaderList);
          next({...to.path,replace:true})
    }else if(menu && to.matched.length===0){
      store.commit('updateMenuList', loadMenu());
      to.fullPath ? next(to.fullPath) : next('login')
    }else if(fullPath.toString()=== '/home' && to.matched.length>0 && fromName ===null && menu){
      store.commit('updateMenuList', loadMenu());
      next();
    }else{
      next()
    }
  }
});

var sweep=[
    { permissionId:1, menuId:1, title:"系统首页", path:"sys", component:"Main", icon:"md-funnel", parentId:0, hideInMenu:"", showAlways:"true", children:[
        {permissionId:11, menuId:11, title:"系统首页", path:"firstPage", component:"/web-leading/sys-page/sys-firstPage", icon:"md-funnel", parentId:0, hideInMenu:"", showAlways:""},
        {permissionId:12, menuId:12, title:"账户设置", path:"accountSetting", component:"/web-leading/sys-page/sys-accountSetting", icon:"md-funnel", parentId:0, hideInMenu:"", showAlways:""},
        {permissionId:13, menuId:13, title:"操作日志", path:"sys-oprLog", component:"/web-leading/sys-page/sys-oprLog", icon:"md-funnel", parentId:0, hideInMenu:"", showAlways:""},   
      ]
    },
    { permissionId:2, menuId:2, title:"标本库", path:"spc", component:"Main", icon:"md-funnel", parentId:0, hideInMenu:"", showAlways:"true", children:[
        {permissionId:21, menuId:21, title:"标本管理", path:"management", component:"/web-leading/spc-lib/spc-management", icon:"md-funnel", parentId:0, hideInMenu:"", showAlways:""},
        {permissionId:22, menuId:22, title:"专题库", path:"proLib", component:"/web-leading/spc-lib/spc-proLib", icon:"md-funnel", parentId:0, hideInMenu:"", showAlways:""}, 
      ]
    },
    { permissionId:3, menuId:3, title:"工作台", path:"work", component:"Main", icon:"md-funnel", parentId:0, hideInMenu:"", showAlways:"true", children:[
        {permissionId:31, menuId:31, title:"标本审核", path:"audit", component:"/web-leading/work-bench/spc-audit", icon:"md-funnel", parentId:0, hideInMenu:"", showAlways:""},
      ]
    },

]


router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})
