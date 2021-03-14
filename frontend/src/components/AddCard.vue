<template>
  <div class = "main-div">
    <NavigationBar/>
    <div class="addcard_form">
      <h3> Add a new credit card to your account: </h3>
      <form @submit.prevent = "addCard()">
        <div class="form-group">
          <label>  Card Number: </label>
          <input required v-model = "card_number" type="password" class="form-control"  maxlength="16" placeholder="Enter card number">
        </div>
        <div class="form-group">
          <label> Card Expiration Date: </label>
          <input required v-model = "card_expiration" type="month" class="form-control" placeholder="Enter expiration date">
        </div>
        <div class="form-group">
          <label for="model_info"> Security code: </label>
          <input required v-model = "cvc_code" type="text" class="form-control" maxlength="3" placeholder="Enter cvc code">
        </div>
        <div v-if = "error" class = "error"> {{ error }} </div>
        <div v-if = "success" class = "success"> {{ success }} </div>
        <div class = "addcard_button">
          <button type="submit" class="btn btn-dark btn-block"> Add Card </button>
        </div>
      </form>
      <div class = "image_addcard"> </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import NavigationBar from './NavigationBar.vue'
  export default {
    components: {
      NavigationBar
    },
    data(){
      return {
        card_number: null,
        card_expiration: "2022-01-01",
        cvc_code: null,
        error: null,
        success: null
      }
    },
    methods: {
      addCard: function () {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        Vue.axios.post('http://127.0.0.1:5000/evcharge/api/card?user_id=' + this.$store.getters.user_id
        + '&card_number=' + this.card_number + '&card_expiration=' + this.card_expiration
        + '&cvc_code=' + this.cvc_code, { headers: headers })
        .then(() =>
           this.success = 'New credit card successfully inserted.'
         )
         .catch(err => {
           this.error = 'Something went wrong, please try again later.'
           console.log(err)
        })
      }
    }
  }
</script>

<style>
  .main-div {
    max-width: 1500px;
    margin: 0 auto;
  }
  .addcard_form {
    width: 40%;
    margin-top: 50px;
    margin-left: auto;
    margin-right: auto;
  }
  .addcard_button {
    width: 20%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }
  .error {
    color : #ff0062;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 0.8em;
    font-weight: bold;
  }
  .success {
    color : #16b800;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 0.8em;
    font-weight: bold;
  }
  .image_addcard {
   width: 250px;
   height: 260px;
   background-image: url(../assets/addcard.png);
   margin-top: 40px;
   margin-left: auto;
   margin-right: auto;
   background-size: 100%;
   background-repeat: no-repeat;
  }
  * {
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
    color: #2c3e50;
  }
  h3 {
    font-weight: 750;
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
  label {
    display: inline-block;
  }
</style>
