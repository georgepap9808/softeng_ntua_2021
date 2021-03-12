<template>
  <div class = "main-div">
    <NavigationBar/>
    <div v-if = "!charges_loaded">
      <h2 class = "instructions">
        <b> Insert the registration (license) plate of one of your registered
          electrical vehicles: </b>
      </h2>
      <div>
        <p> The charges loaded will refer only to the selected vehicle and time span. </p>
      </div>
      <div class = "charges_input_box">
        <label> <b> Registration Plate: </b> </label>
        <input class = "input-id" maxlength="8" type="text" v-model="reg_p">
      </div>
      <form class = "date_form" @submit.prevent = "showCharges()">
        <div class="form-group row">
          <label for="example-date-input" class="col-2 col-form-label"> <b> Start Date: </b> </label>
          <div class="col-10">
            <input class="form-control" type="date" v-model = "date_from">
          </div>
        </div>
        <div class="form-group row">
          <label for="example-date-input" class="col-2 col-form-label"> <b> End Date: </b> </label>
          <div class="col-10">
            <input class="form-control" type="date" v-model = "date_to">
          </div>
        </div>
        <div v-if = "this.error" class = "message"> {{ error }} </div>
        <div v-if = "this.no_charges" class = "message"> {{ no_charges }} </div>
        <div class = "button_dates">
          <button type="submit" class="btn btn-dark btn-block"> See Charges </button>
        </div>
      </form>
      <div class = "image_adddate"> </div>
    </div>
    <div v-if = "this.charges_loaded">
      <div class="show-charges">
        <h2 class = "charges-title"> All of your relevant charging sessions: </h2>
        <div class="single-charge" v-for="charge in charges" :key="charge.id">
          <ul>
            <li>
              <h6 class = "h6-charges"> <b> Starting Time: </b> {{ charge.starting_time }} </h6>
              <h6 class = "h6-charges"> <b> Finishing Time: </b> {{ charge.finishing_time }} </h6>
              <h6> <b> Total Energy Consumption: </b> {{ charge.kwh_delivered }} kWh </h6>
              <h6> <b> Total Cost: </b> {{ charge.kwh_cost*charge.kwh_delivered | round }} € </h6>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
import Vue from 'vue'
  export default {
    components: {
      NavigationBar
    },
    data(){
      return {
        reg_p: '',
        date_from: "2021-01-01",
        date_to: "2021-01-01",
        error: '',
        charges_loaded: '',
        no_charges: ''
      }
  },
  methods: {
    showCharges: function () {
      const headers = {
        'Content-Type': 'text/json',
        'X-OBSERVATORY-AUTH': this.$store.getters.token
      }
      Vue.axios.get('http://127.0.0.1:5000/evcharge/api/SessionsPerEV/' + this.date_from +
      '/' + this.date_to + '?id=' + this.$store.getters.user_id +
      '&registration_plate=' + this.reg_p, {headers: headers})
      .then(response => {
         if (response.data.total == 0) {
           this.no_charges = "No charges made by you with the vehicle and during the time span selected."
         }
         else {
           this.charges = response.data.sessions
           this.charges_loaded = true
         }
      })
      .catch(err => {
        this.error = 'Something went wrong, please try again later.'
        console.log(err)
      })
    }
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
  }
  .main-div {
    max-width: 1500px;
    margin: 0 auto;
  }
  .instructions {
    text-align: center;
    margin-top: 70px;
    margin-left: auto;
    margin-right: auto;
  }
  .charges_input_box {
    margin-left: 25%;
    width: 50%;
  }
  .input-id {
    margin-top: 10px;
    margin-left: 2%;
  }
  .date_form {
    margin: auto;
    width: 50%;
    margin-top: 15px;
  }
  .button_dates {
    width: 20%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
  }
  .image_adddate {
   width: 270px;
   height: 275px;
   background-image: url(../assets/adddates1.png);
   margin-top: 20px;
   margin-left: auto;
   margin-right: auto;
   background-size: 100%;
   background-repeat: no-repeat;
  }
  .show-charges {
    max-width: 800px;
    margin: 0 auto;
  }
  .single-charge {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #eee;
  }
  .message {
    color : #ff0062;
    text-align: center;
    font-size: 0.8em;
    font-weight: bold;
  }
  .charges-title {
    margin-top: 30px;
  }
  label {
    margin-left: 0%;
    display: inline-block;
    font: 1rem;
  }
</style>
