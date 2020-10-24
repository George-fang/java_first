import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from "../components/HelloWorld"
import LoginPage from "../components/LoginPage"
import App01 from "../components/App01";
Vue.use(Router)

export default new Router({
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
    }
  ]
});



