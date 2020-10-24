import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    // 存储token
    app_token: localStorage.getItem('app_token') ? localStorage.getItem('app_token') : '',
    app_id: localStorage.getItem('app_id') ? localStorage.getItem('app_id') : ''
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.app_token = user.app_token;
      state.app_id = user.app_id;
      localStorage.setItem('app_token', user.app_token);
      localStorage.setItem('app_id', user.app_id);
    }
  }
});


