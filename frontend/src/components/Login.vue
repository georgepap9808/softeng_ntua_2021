<template>
    <div class="vue-tempalte">
    <!-- Navigation -->
    <nav class="navbar shadow bg-white rounded justify-content-between flex-nowrap flex-row fixed-top">
      <div class="container">
        <a class ="navbar-brand float-left">
          <router-link class = "nav-link home" to="/"> EV Charging System </router-link>
        </a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <router-link class="nav-link pr-3" to="/login">Sign in</router-link>
          </li>
          <li class="nav-item">
            <router-link class="btn btn-outline-primary" to="/">Sign up</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Login Form -->
    <div class="vertical-center">
      <div class="inner-block">
        <form>
            <h3>Sign In</h3>
            <div class="form-group">
                <label>Email address</label>
                <input type="email"
                name = "email"
                v-model = "input.email"
                class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password"
                name = "password"
                v-model = "input.password"
                class="form-control form-control-lg" />
            </div>

            <button type="button"
            v-on: click = "login()"
            class="btn btn-dark btn-lg btn-block"> Sign In </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                input: {
                    email: null,
                    password: null
                },
              err: {
                error: null,
                msg: ""
              }
            }
        },
        methods: {
            login() {
                if(this.input.email != null && this.input.password != null) {
                    if(this.input.email == this.$parent.mockAccount.email &&
                    this.input.password == this.$parent.mockAccount.password) {
                        this.$emit("authenticated", true);
                        this.$router.replace({ name: 'home' });
                    } else {
                        console.log("The email and / or password is incorrect");
                    }
                } else {
                    console.log("An email and password must be present");
                }
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
