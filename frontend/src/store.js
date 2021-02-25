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
        username: ''
    },
    mutations: {
        login(state,payload) {
            state.token = payload.token
            state.user_id = payload.user_id
            state.username = payload.username
            state.LoggedIn = true
        },
        logout(state) {
            state.token = ''
            state.user_id = ''
            state.username = ''
            state.LoggedIn = false
        }
    },
    actions: {
        login ({commit},creds) {
            return new Promise((resolve,reject) =>{
                Vue.axios.post('http://127.0.0.1:5000/evcharge/api/login?username=' + creds.name + '&password=' + creds.password)
                .then(response => {
                    const token = response.data.token
                    const user_id = response.data.id
                    const username = creds.name
                    localStorage.setItem('token', token)
                    localStorage.setItem('user_id', user_id)
                    localStorage.setItem('username', username)
                    commit("login",{token:token,user_id:user_id,username:username})
                    resolve(response)
                })
                    .catch( err => {
                      reject(err)
                    })
            })
        },
        logout ({commit}) {
            return new Promise((resolve) =>{
              localStorage.removeItem('token')
              localStorage.removeItem('user_id')
              localStorage.removeItem('username')
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
        LoggedIn: state => state.LoggedIn
    }
});
