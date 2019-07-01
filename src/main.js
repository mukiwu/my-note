import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import Element from 'element-ui'
import './assets/scss/element-variables.scss'
import './assets/scss/element-modify.scss'
import './assets/scss/component.scss'
import './assets/scss/common.scss'


Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
