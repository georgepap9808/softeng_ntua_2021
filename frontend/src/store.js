import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);

export default new Vuex.Store({
    plugins: [createPersistedState({
      storage: window.sessionStorage,
    })],
    state: {
        LoggedIn: false,
        token: "default_token",
        user_id : "",
        username: '',
        charging_enabled: ''
    },
    mutations: {
        login(state,payload) {
            state.token = payload.token
            state.user_id = payload.user_id
            state.username = payload.username
            state.LoggedIn = true
            state.charging_enabled = payload.charging_enabled
        },
        logout(state) {
            state.token = ''
            state.user_id = ''
            state.username = ''
            state.LoggedIn = false
            state.charging_enabled = false
        }
    },
    actions: {
        login ({commit},creds) {
            return new Promise((resolve,reject) =>{
                Vue.axios.post('https://127.0.0.1:5000/evcharge/api/login?username=' + creds.name + '&password=' + creds.password)
                .then(response => {
                    const token = response.data.token
                    const user_id = response.data.id
                    const username = creds.name
                    const charging_enabled = creds.charging_enabled
                    localStorage.setItem('token', token)
                    localStorage.setItem('user_id', user_id)
                    localStorage.setItem('username', username)
                    localStorage.setItem('charging_enabled', charging_enabled)
                    commit("login",{token:token,user_id:user_id,username:username,charging_enabled:charging_enabled})
                    resolve(response)
                })
                .catch(err => {
                  reject(err)
                })
            })
        },
        logout ({commit}) {
            return new Promise((resolve) =>{
              localStorage.removeItem('token')
              localStorage.removeItem('user_id')
              localStorage.removeItem('username')
              localStorage.removeItem('charging_enabled')
              sessionStorage.clear();
              commit('logout')
              resolve()
            })
        }
    },
    getters: {
        user_id: state => state.user_id,
        token: state => state.token,
        username: state => state.username,
        LoggedIn: state => state.LoggedIn,
        charging_enabled: state => state.charging_enabled
    }
});
