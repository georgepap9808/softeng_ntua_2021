<template>
  <div class = "main-div">
    <NavigationBar/>
    <div class="addcar_form">
      <h3> Add a new vehicle to your account: </h3>
      <form @submit.prevent = "addVehicle()">
        <div class="form-group">
          <label for="reg_plate">Registration Plate: </label>
          <input required v-model = "reg_plate" type="text" class="form-control"
          placeholder="Enter registration plate e.g. ΧΧΧ-0000" maxlength="8">
        </div>
        <div class="form-group">
          <label for="manufacturer">Manufacturer: </label>
          <input required v-model = "manufacturer" type="text" class="form-control"
          placeholder="Enter manufacturer">
        </div>
        <div class="form-group">
          <label for="model_info">Model Info: </label>
          <input required v-model = "model_info" type="text" class="form-control" placeholder="Enter model info">
        </div>
        <div v-if = "error" class = "message"> {{ error }} </div>
        <div v-if = "success" class = "message"> {{ success }} </div>
        <div class = "addcar_button">
          <button type="submit" class="btn btn-dark btn-block"> Add Vehicle </button>
        </div>
      </form>
      <div class = "image_addcar"> </div>
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
        reg_plate: null,
        manufacturer: null,
        model_info: null,
        error: null,
        success: null
      }
    },
    methods: {
      addVehicle: function () {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        Vue.axios.post('http://127.0.0.1:5000/evcharge/api/vehicle?user_id=' + this.$store.getters.user_id
        + '&registration_plate=' + this.reg_plate + '&manufacturer=' + this.manufacturer
        + '&model=' + this.model_info, { headers: headers })
         .then(() =>
           this.success = 'New electrical vehicle successfully inserted.'
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
  .addcar_form {
    width: 40%;
    margin-top: 100px;
    margin-left: auto;
    margin-right: auto;
  }
  .addcar_button {
    width: 20%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
  }
  .image_addcar {
   width: 180px;
   height: 130px;
   background-image: url(../assets/addcar.png);
   margin-top: 60px;
   margin-left: auto;
   margin-right: auto;
   background-size: 100%;
   background-repeat: no-repeat;
  }
  .message {
    color : #ff0062;
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 0.8em;
    font-weight: bold;
  }
  * {
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
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
