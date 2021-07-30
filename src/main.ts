import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from './components/Layout.vue'
import Icon from './components/Icon.vue'
import { DatetimePicker } from 'mint-ui';
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

Vue.component('date-picker', DatetimePicker);
Vue.component('layout', Layout)
Vue.component('icon', Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
