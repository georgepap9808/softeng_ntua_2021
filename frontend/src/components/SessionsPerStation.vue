<template>
  <div>
    <NavigationBar/>
    <div v-if = "!this.charges_loaded">
      <h2 class = "instructions"> Insert the id of the ev charging station that interests you: </h2>
      <p class = "instructions_b">
        The charges loaded will only be those which took place in the selected station <br>
        and during the selected time span. To find out the id of the charging station of your <br>
        interest, navigate through the relevant section 'EV Charging Stations' in the 'Get Information about' subpage. </p>
      <div class = "charges_input_box">
        <label> Station id: </label>
        <input class ="input-id" type = "text" v-model="station_id">
      </div>
      <form class = "date_form" @submit.prevent = "showCharges()">
        <div class="form-group row">
          <label for="example-date-input" class="col-2 col-form-label"> Start Date: </label>
          <div class="col-10">
            <input class="form-control" type="date" v-model="date_from">
          </div>
        </div>
        <div class="form-group row">
          <label for="example-date-input" class="col-2 col-form-label"> End Date: </label>
          <div class="col-10">
            <input class="form-control" type="date" v-model="date_to">
          </div>
        </div>
        <div v-if = "error" class = "message"> {{ error }} </div>
        <div v-if = "no_charges" class = "message"> {{ no_charges }} </div>
        <div class = "button_dates">
          <button type="submit" class="btn btn-dark btn-block"> See Charges </button>
        </div>
      </form>
      <div class = "image_adddate"> </div>
    </div>
    <div v-if = "this.charges_loaded">
      <div class="show_charges">
        <h2 class = "charges-title"> All relevant charging sessions: </h2>
        <div class="single_charge">
          <ul>
            <li v-for="charge in charges" :key="charge.id">
              <h6 class = "h6-charges"> Starting Time: {{ charge.starting_time }} </h6>
              <h6 class = "h6-charges"> Finishing Time: {{ charge.finishing_time }} </h6>
              <h6 class = "h6-charges"> Total Cost: {{ charge.kwh_cost }} € </h6>
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
        station_id: '',
        date_from: "2021-01-01",
        date_to: "2021-01-01",
        charges: [],
        charges_loaded: false,
        error: '',
        no_charges: ''
      }
    },
    methods: {
      showCharges: function () {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        Vue.axios.get('https://127.0.0.1:5000/evcharge/api/SessionsPerStation/' + this.date_from +
        '/' + this.date_to + '?id=' + this.$store.getters.user_id +
        '&station_id=' + this.station_id, {headers: headers})
        .then(response => {
           if (response.data.total == 0) {
             this.no_charges = "No charges made by you in the station and time span selected."
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
  h2 {
    font-weight: 750;
  }
  .instructions {
    text-align: center;
    margin-top: 70px;
    margin-left: auto;
    margin-right: auto;
  }
  .instructions_b {
    margin-top: 0;
  }
  .charges_input_box {
    margin: 0 auto;
    width: 50%;
  }
  .input-id {
    margin-top: 10px;
    margin-left: 9%;
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
   height: 220px;
   background-image: url(../assets/adddates3.png);
   margin-top: 30px;
   margin-left: auto;
   margin-right: auto;
   background-size: 100%;
   background-repeat: no-repeat;
  }
  label {
    margin-left: 0%;
    display: inline-block;
    font: 1rem 'Nunito', sans-serif;
  }
  .show_charges {
    max-width: 800px;
    margin: 0 auto;
  }
  .single_charge {
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
  ul {
   list-style-type: none;
   padding: 0;
   margin: 0;
  }
  .h6-charges {
    font-weight: bold;
  }
</style>
