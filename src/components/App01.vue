<template>
  <main>

    <h1>{{ msg1 }}</h1>
    <h1>{{ city }}</h1>
    <h1>{{ district }}</h1>
    <h1>{{ province }}</h1>
    <button @click="doLogOut"> 退出登录</button>
  </main>
</template>

<script>
import axios from "axios";

export default{
  name: 'App01',
  data () {
    return {
      userName: "",
      msg1: "",
      city : '',
      district: "",
      province: ''
    }
  },
  methods: {
    doLogOut(){
      localStorage.removeItem('app_token')
      this.$router.go(0)
    }
  },
  created(){
    const _this = this
    localStorage.setItem('app_id', 'app01')
    axios({                       //向后台验证token
      method: 'get',
      url: 'http://192.168.43.96:8888/address',
      headers: {app_token: localStorage.getItem("app_token")},
      withCredentials: false
    }).then(function (res){
      if(res.data.hasError === false){
          _this.msg1 = "登录app01成功"
          _this.city = "居住地址城市是" + res.data.data.city;
          _this.district = "居住地区是" + res.data.data.district;
          _this.province = "居住省份是" + res.data.data.province;
      }else{
        localStorage.removeItem("app_token")
        _this.$router.push({
          path: '/login',
          query:{redirect: _this.fullPath}
        })
      }
    })
  }

}


</script>

Add "scoped" attribute to limit CSS to this component only
<style scoped>

</style>
