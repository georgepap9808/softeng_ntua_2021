import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        LoggedIn: false,
        token: localStorage.getItem('token') || '',
        user_id : ""
    },
    mutations: {
        login(state,payload) {
            state.token = payload.token
            state.user_id = payload.user_id
            state.LoggedIn = true
        },
        logout(state) {
            state.token = ''
            state.user_id = ''
            state.LoggedIn = false
        }
    },
    actions: {
        login ({commit},creds) {
            return new Promise((resolve,reject) =>{
                axios({url: 'https://localhost:8765/evcharge/api/login', data: creds, method: 'POST' })
                .then(response => {
                    const token = response.data.token
                    const user_id = response.data.id
                    localStorage.setItem('token', token)
                    localStorage.setItem('user_id', user_id)
                    axios.defaults.headers.common['Authorization'] = token
                    commit("login",{token:token,user_id:user_id})
                    resolve(response)
                })
                    .catch( err => {
                      localStorage.removeItem('token')
                      reject(err)
                    })
            })
        },
        logout ({commit}) {
            return new Promise((resolve) =>{
              localStorage.removeItem('token')
              localStorage.removeItem('user_id')
              delete axios.defaults.headers.common['Authorization']
              commit('logout')
              resolve()
            })
        }
    },
    getters: {
        user_id: state => state.user_id,
        token: state => state.token,
        LoggedIn: state => state.LoggedIn,
    }
});
