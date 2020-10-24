<template>
  <main>

    <h1>{{msg}}</h1>
    <input v-model="userName"/>
    <input v-model="password"/>
    <button @click="doClick">提交</button>
  </main>
</template>

<script>

import axios from 'axios'

export default {
  name: 'LoginPage',
  data () {

    return {
      userName: "",
      password: "",
      msg: "您还没有登录，请登录",
      n: "",
      e: ''
    }
  },
  created() {
    const _this = this
    axios({
      method: "get",
      url: "http://192.168.43.67:8888/rsa",
      withCredentials: false
    }).then(function (res){
      _this.n = res.data.data.n
      _this.e = res.data.data.e
    })
  },
  methods: {
    doClick(){
      const _this = this
      if (this.username === null || this.password === null) {
        alert('账号或密码不能为空');
      }else {
        const res = tempDoLock(this.password, {n: this.n, e: this.e});
        console.log(this.password, this.n, this.e)
        axios({
          method: "post",
          url: "http://192.168.43.67:8888/user",
          data: {
            "user_phone_number": this.userName,
            "user_password": res,
            "app_id": localStorage.getItem('app_id'),
            "e" : this.e,
            "n" : this.n,
          },
          transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
          }],
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }).then(function (res) {
          if (res.data.error === "true") { // 如果错了
            _this.msg = res.data.data
          } else {
            localStorage.setItem('app_token', res.data.data);
          }
        })
      }
    }
  }
}

/**
 * 给出底数，指数、取余基数，返回计算结果
 * @param {long} base 底数
 * @param {long} power 指数
 * @param {long} mod 取余计数
 * @returns {Integer} base&power % mod
 */
const fastPower = function(base, power, mod){
  base = BigInt(base.charCodeAt());
  let ans = BigInt(1)
  let cur = BigInt(base % mod);
  while(power !== BigInt(0)){
    if(power % BigInt(2) === BigInt(1)){
      ans = (ans * cur) % mod;
    }
    cur = (cur * cur) % mod;
    power = power / BigInt(2);
  }
  return ans;
}

/**
 * 给出一个公钥对，以及需要加密的字符串，在此进行加密
 * @param {String} beforeLockStr 需要加密的字符串
 * @param {e: long, n: long}} RsaKey 公钥对
 */
const doLock = function(beforeLockStr, RsaKey){
  console.log(beforeLockStr, RsaKey)
  let res = []
  let len = beforeLockStr.length; // 长度
  for(let i = 0; i < len; i++){
    let curChar = beforeLockStr[i]; // 获取当前位置字符
    res.push(BigInt.asIntN(64, fastPower(curChar, BigInt(RsaKey.e), BigInt(RsaKey.n))));
  }
  return res;
}

const tempDoLock = function (beforeLockStr, RsaKey) {
  let res = ""
  let temp = doLock(beforeLockStr, RsaKey)
  for(let i = 0; i < temp.length; i++){
    res += temp[i] + ";"
  }
  return res;
}


</script>

 Add "scoped" attribute to limit CSS to this component only
<style scoped>

</style>
