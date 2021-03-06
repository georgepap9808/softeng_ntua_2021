import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

Vue.config.productionTip = false;

Vue.filter('round', function(value) {
  return Math.round(value * 100) / 100;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
