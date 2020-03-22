import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import './index.js'
import axios from "axios";
import "./registerServiceWorker";

Vue.prototype.$http = axios;
Vue.prototype.axios = axios;


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
