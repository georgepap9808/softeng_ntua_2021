<template>
  <div>
    <NavigationBar/>
    <div class = "account_info">
      <p> full name:
        {{ user.first_name }} {{ user.last_name}}
      </p>
      <p> email:
        {{ user.email }}
      </p>
      <p> address:
        {{ user.street }} {{ user.number }}, {{ user.city }}, {{ user.zip_code}}
      </p>
    </div>

    <div class = "image_account"> </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
import axios from 'axios';

  export default {
    components: {
      NavigationBar
    },
    data(){
      return {
        user: {
          email: 'nefmy99@gmail.com',
          first_name: 'Nefeli',
          last_name: 'Myropoulou',
          country: 'Greece',
          city: 'Athens',
          street: 'Private Drive',
          number: '4',
          zip_code: '15351'
        }
      }
    },
    methods: {
      displayAccountInfo () {
        axios.get('https://localhost:8765/evcharge/api/AccountInfo')
          .then(response => {
            this.email = response.data.email,
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
    font-size: 19px;
  }
  .account_info {
    border: 2px black;
    margin-top: 200px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 30%;
  }
  .image_account {
     width: 130px;
     height: 150px;
     background-image: url(../assets/user.png);
     margin-top: 100px;
     margin-left: auto;
     margin-right: auto;
     background-size: 100%;
     background-repeat: no-repeat;
  }
</style>
