// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// Vue.prototype.$http = axios;
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
Vue.config.debug = true


//异步请求前在header里加入token

axios.interceptors.request.use(
  config => {
    config.withCredentials = true
    if(config.url==='/login'){  //如果是登录,不需要携带header里面的token
    }else{
      if (localStorage.getItem('app_token')) {
        config.headers.app_token = localStorage.getItem('app_token');
      }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

//异步请求后，判断token是否过期
axios.interceptors.response.use(
  response =>{
    return response;
  },
  error => {
    if(error.response){
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error.response.data)   // 返回接口返回的错误信息
  }
)

//异步请求前判断请求的连接是否需要token

router.beforeEach((to, from, next) => {
  if(to.meta.requireAuth){
    console.log(store.state.app_token)
    if(store.state.app_token !== null || store.state.app_token !== ''){
      next();
    } else {
        localStorage.setItem('app_id', to.path)
        next({
          path:'/login',
          query:{redirect: to.fullPath}
        })
    }
  }else{
    next();
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render:h => h(App),
  template: '<App/>'
})
