<template>
  <div id="app">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import * as fb from './modules/helpers/fb';

const fbOptions = {
  appId: "340815636586253",
  cookie: true,
  xfbml: true,
  version: "v3.3"
}

export default {
  name: 'app',
  mounted () {
    let auth = false;
    if(!auth) {
      // this.$router.push('/login');
    }
    this.initFbSdk()
  },
  methods: {
    async initFbSdk () {
      const FB = await fb.getFbSdk(fbOptions)
      FB.AppEvents.logPageView()
      FB.getLoginStatus(response => {
        console.log("res", response);
        if (response.status === 'connected') {
          console.log('已登入')
          // this.$router.push('/home');
        } else {
          // this.$router.push('/login');
        }
      })
    }, 
  }
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