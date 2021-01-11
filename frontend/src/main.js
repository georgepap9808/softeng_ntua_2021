import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
//import VeeValidate, { Validator }  from 'vee-validate'
//import el from 'vee-validate/dist/locale/el'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
//import '@/assets/css/main.css'

Vue.config.productionTip = false

//Vue.use(VeeValidate, {inject: true, fieldsBagName: 'veeFields', locale: 'el'});
//Validator.localize({ el: el });

Vue.prototype.$http = Axios;
const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
