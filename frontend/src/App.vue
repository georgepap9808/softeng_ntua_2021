<template>
  <div class="vue-tempalte">
    <!-- Main -->
    <div class="App">
          <router-link v-if="authenticated" to="/login" v-on:click.native="logout()" replace>Logout</router-link>
          <router-view @authenticated="setAuthenticated" />
    </div>
  </div>
</template>

<script>
    export default {
        name: 'App',
        data() {
            return {
                authenticated: false,
                mockAccount: {
                    email: "nef@mail.com",
                    password: "password"
                }
            }
        },
        mounted() {
            if(!this.authenticated) {
                //this.$router.replace({ name: "login" });
            }
        },
        methods: {
            setAuthenticated(status) {
                this.authenticated = status;
            },
            logout() {
                this.authenticated = false;
            }
        }
    }
</script>
