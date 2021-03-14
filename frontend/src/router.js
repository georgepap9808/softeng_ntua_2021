import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('./components/Login.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('./components/Logout.vue')
  },
  {
    path: '/Home',
    name: 'Home',
    component: () => import('./components/Home.vue'),
  },
  {
    path: '/AddVehicle',
    name: 'AddVehicle',
    component: () => import('./components/AddVehicle.vue'),
  },
  {
    path: '/AddCard',
    name: 'AddCard',
    component: () => import('./components/AddCard.vue'),
  },
  {
    path: '/SessionsPerStation',
    name: 'SessionsPerStation',
    component: () => import('./components/SessionsPerStation.vue'),
},
  {
    path: '/SessionsPerEV',
    name: 'SessionsPerEV',
    component: () => import('./components/SessionsPerEV.vue'),
  },
  {
    path: '/SessionsPerProvider',
    name: 'SessionsPerProvider',
    component: () => import('./components/SessionsPerProvider.vue'),
  },
  {
    path: '/Myinfo',
    name: 'Myinfo',
    component: () => import('./components/AccountInfo.vue'),
  },
  {
    path: '/Bills',
    name: 'Bills',
    component: () => import('./components/Bills.vue'),
  },
  {
    path: '/Charge',
    name: 'Charge',
    component: () => import('./components/Charge.vue'),
  },
  {
    path: '/Providers',
    name: 'Providers',
    component: () => import('./components/Providers.vue'),
  },
  {
    path: '/Stations',
    name: 'Stations',
    component: () => import('./components/Stations.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
