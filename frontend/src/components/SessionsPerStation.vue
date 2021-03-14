<template>
  <div class = "main-div">
    <NavigationBar/>
    <div v-if = "!this.charges_loaded">
      <h2 class = "instructions"> <b> Choose the ev charging station and
        time span that interest you: </b> </h2>
      <p class = "instructions_b">
        The charges loaded will only be those which took place in the selected station <br>
        and during the selected time period. Only stations where you have charged at least <br>
        once will appear as selection options. </p>
      <div class = "select-charges">
        <label id = "select-label"> <b> Pick a station: </b> </label>
        <select v-model = "station_data">
          <option v-for = "station in stations" :key = "station.id">
            [{{ station.id }}]
            {{ station.number }}, {{ station.street }},
            {{ station.city }}, {{ station.country}}
          </option>
        </select>
      </div>
      <form class = "date_form" @submit.prevent = "showCharges()">
        <div class="form-group row">
          <label for="example-date-input" class="col-2 col-form-label"> <b> Start Date: </b> </label>
          <div class="col-10">
            <input class="form-control" type="date" v-model="date_from">
          </div>
        </div>
        <div class="form-group row">
          <label for="example-date-input" class="col-2 col-form-label"> <b> End Date: </b> </label>
          <div class="col-10">
            <input class="form-control" type="date" v-model="date_to">
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
      <div class="show_charges">
        <h2 class = "charges-title"> <b> All of your relevant charging sessions: </b> </h2>
        <div class="single_charge" v-for="charge in charges" :key="charge.id">
          <ul>
            <li>
              <h6> <b> Starting Time: </b> {{ charge.starting_time }} </h6>
              <h6> <b> Finishing Time: </b> {{ charge.finishing_time }} </h6>
              <h6> <b> Total Energy Consumption: </b> {{ charge.kwh_delivered | round }} kWh </h6>
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
        stations: [],
        station_data: '',
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
        var station_id = this.station_data.substring(1,2)
        Vue.axios.get('https://127.0.0.1:5000/evcharge/api/SessionsPerStation/' + this.date_from +
        '/' + this.date_to + '?id=' + this.$store.getters.user_id +
        '&station_id=' + station_id, {headers: headers})
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
    },
    created() {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        Vue.axios.get('https://127.0.0.1:5000/evcharge/api/stationByUser?id=' +
        this.$store.getters.user_id, { headers: headers })
        .then(response => {
           if (response.data.total == 0) {
             this.msg = "You haven't made any charges yet, no stations loaded!:("
           }
           else {
             this.stations = response.data.stations
           }
        })
        .catch(err => {
          this.msg = 'Something went wrong, please try again later.'
          console.log(err)
        })
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
   width: 280px;
   height: 260px;
   background-image: url(../assets/adddates3.png);
   margin-top: 30px;
   margin-left: auto;
   margin-right: auto;
   background-size: 100%;
   background-repeat: no-repeat;
  }
  .select-charges {
    margin-left: 25%;
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
  #select-label {
    margin-right: 34px;
  }
</style>
