import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store.js'

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
    path: '/home',
    name: 'home',
    component: () => import('./components/Home.vue'),
  //  meta: {
  //    requiresAuth: true
  //  }
  },
  {
    path: '/addcar',
    name: 'addcar',
    component: () => import('./components/AddVehicle.vue'),
  //  meta: {
  //    requiresAuth: true
  //  }
},
  {
    path: '/SessionsPerStation',
    name: 'SessionsPerStation',
    component: () => import('./components/SessionsPerStation.vue'),
  //  meta: {
  //    requiresAuth: true
  //  }
},
  {
    path: '/SessionsPerEV',
    name: 'SessionsPerEV',
    component: () => import('./components/SessionsPerEV.vue'),
  //  meta: {
  //    requiresAuth: true
  //  }
  },
  {
    path: '/SessionsPerProvider',
    name: 'SessionsPerProvider',
    component: () => import('./components/SessionsPerProvider.vue'),
  //  meta: {
  //    requiresAuth: true
  //  }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.LoggedIn) {
      next()
      return
    }
    //next('/login')
  } else {
    next()
  }
})

export default router
