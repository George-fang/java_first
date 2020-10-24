<template>
  <main>

    <h1>这是app01</h1>
    <h1>{{ msg }}</h1>
  </main>
</template>

<script>
export default{
  name: 'App01',
  data () {
    return {
      userName: "",
      msg: localStorage.getItem("app_token")
    }
  },

}


</script>

Add "scoped" attribute to limit CSS to this component only
<style scoped>

</style>
