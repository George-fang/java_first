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
          localStorage.removeItem('app_token')
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.reject(error)   // 返回接口返回的错误信息
  }
)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  render:h => h(App),
  template: '<App/>'
})
