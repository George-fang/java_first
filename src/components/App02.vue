<template>
  <main>
    <h1>{{ msg1 }}</h1>
    <h1>{{ msg2 }}</h1>
    <button @click="doLogOut"> 退出登录</button>
  </main>
</template>

<script>
import axios from "axios";

export default{
  name: 'App02',
  data () {
    return {
      userName: "",
      msg1: "",
      msg2: ""
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
    localStorage.setItem('app_id', 'app02')
    axios({                       //向后台验证token
      method: 'get',
      url: 'http://192.168.43.96:9999/drink',
      headers: {app_token: localStorage.getItem("app_token")},
      withCredentials: false
    }).then(function (res){
      if(res.data.error === false){
        _this.msg1 = res.data.data.nickname + ",登录app02成功";
        _this.msg2 = "最喜欢喝的饮料是" + res.data.data.favoriteDrinks[0].drinkName +
                    "和" + res.data.data.favoriteDrinks[1].drinkName;


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
