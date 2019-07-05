<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  created: function(){
    let auth = false;
    if(!auth) {
      this.$router.push('/login');
    }
  },
  mounted () {
    window.fbAsyncInit = function() {
      // eslint-disable-next-line
      FB.init({
        appId: "340815636586253",
        cookie: true,
        xfbml: true,
        version: "v3.3"
      });

      // eslint-disable-next-line
      FB.AppEvents.logPageView();
      // eslint-disable-next-line
      FB.getLoginStatus(response => {
        console.log("res", response); // 這裡可以得到 fb 回傳的結果
      });
    };
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>