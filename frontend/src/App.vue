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
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  },
  methods: {
    logout: function () {
      this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
    }
  },
  created: function () {
  this.$http.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.$store.dispatch(logout)
      }
      throw err;
    });
  });
  }
}
</script>
