<template>
  <div class = "main-div">
    <NavigationBar/>
    <h3 class = "account_title"> Some basic information about your account: </h3>
    <div class = "account_info">
      <p> Full Name:
        {{ this.first_name }} {{ this.last_name}}
      </p>
      <p> Address:
        {{ this.number }} {{ this.street }}, {{ this.city }}, {{ this.zip_code}}
      </p>
    </div>
    <div class = "image_account"> </div>
    <h6 class = "error_message">
      If any piece of information is incorrect, please contact us <br>
      via our e-mail address, evchargingsystem@mail.com. </h6>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
import Vue from 'vue';
  export default {
    components: {
      NavigationBar
    },
    data(){
      return {
        first_name: '',
        last_name: '',
        country: '',
        city: '',
        street: '',
        number: '',
        zip_code: ''
      }
    },
    methods: {
      displayAccountInfo () {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        Vue.axios.get('http://127.0.0.1:5000/evcharge/api/admin/users/'
        + this.$store.getters.username, { headers: headers})
          .then(response => {
            this.first_name = response.data.first_name,
            this.last_name = response.data.last_name,
            this.country = response.data.country,
            this.city = response.data.city,
            this.street = response.data.street,
            this.number = response.data.number,
            this.zip_code = response.data.zip_code
          })
           .catch(err => console.log(err))
      }
    },
    beforeMount(){ this.displayAccountInfo() },
  }
</script>

<style>
  * {
    font-family: 'Nunito', sans-serif;
    color: #2c3e50;
  }
  p {
    font-size: 18px;
  }
  h3 {
    font-size: 20px;
  }
  .main-div {
    max-width: 1500px;
    margin: 0 auto;
  }
  .account_title {
    font-weight: 750;
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  .account_info {
    border: 2px black;
    margin-top: 40px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 30%;
  }
  .image_account {
     width: 350px;
     height: 330px;
     background-image: url(../assets/info.png);
     margin-top: 60px;
     margin-left: auto;
     margin-right: auto;
     background-size: 100%;
     background-repeat: no-repeat;
  }
  .error_message {
    text-align: center;
    margin-top: 60px;
  }
</style>
