<template>
    <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class ="navbar-brand float-left">
          <router-link class = "nav-link home" to="/login"> EV Charging System </router-link>
        </a>
      </div>
    </nav>
    <!-- Login Form -->
    <div class="vertical-center">
      <div class="inner-block">
        <form class = "login" @submit.prevent = "login">
            <h3>Sign In</h3>
            <div class="form-group">
                <label> Username </label>
                <input required v-model = "name" type="text" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Password</label>
                <input required v-model = "password" type="password" class="form-control form-control-lg" />
            </div>
            <button type="submit"
            class="btn btn-dark btn-lg btn-block"> Sign In </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        name: null,
        password: null
      }
    },
    methods: {
      login: function () {
        this.$store.dispatch('login', {
                    name: this.name,
                    password: this.password,
        }).then(() =>
          this.$router.push('/'))
        .catch(err => console.log(err))
      }
    }
}
</script>

<style>
  body,
  html,
  .App,
  .vue-tempalte,
  .vertical-center {
    width: 100%;
    height: 100%;
  }
  .navbar-light {
    background-color: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  }
  .vertical-center {
    display: flex;
    text-align: left;
    justify-content: center;
    flex-direction: column;
  }
  .inner-block {
    width: 450px;
    margin: auto;
    background: #ffffff;
    box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
    padding: 40px 55px 45px 55px;
    border-radius: 15px;
    transition: all .3s;
  }
  .vertical-center .form-control:focus {
    border-color: #2554FF;
    box-shadow: none;
  }
  .vertical-center h3 {
    text-align: center;
    margin: 0;
    line-height: 1;
    padding-bottom: 20px;
  }
  label {
    font-weight: 500;
    font-family: 'Nunito', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  * {
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
    color: #2c3e50;
  }
  body {
    background: #99AABB; /*!important;*/
    min-height: 100vh;
    display: flex;
    font-weight: 400;
  }
  a {
    color: #2c3e50;
  }
</style>
