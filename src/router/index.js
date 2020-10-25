import Vue from 'vue'
import Router from 'vue-router'
import LoginPage from "../components/LoginPage"
import App01 from "../components/App01";
import App02 from "../components/App02";
import store from "../store";
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/app01',
      name: 'App01',
      component: App01,
      meta: {
        requireAuth: true,  // 表示进入这个路由是需要登录的
      },
    },
    {
      path: '/app02',
      name: 'App02',
      component: App02,
      meta: {
        requireAuth: true,
      },
    }
  ],
  mode: "history"
});

//异步请求前判断请求的连接是否需要token
router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
    console.log(store.state.app_token)
    if(store.state.app_token !== null){
      next();
    } else {
      next({
        name: 'LoginPage',
        query:{redirect: to.fullPath}
      })
    }
  }else{
    next();
  }
})

export default router;
