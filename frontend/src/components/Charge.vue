<template>
  <div class = "main-div">
    <NavigationBar/>
    <!-- page 1 -->
    <div class = "front_page" v-if = "!this.plugged_in">
      <h1 class = "welcoming-message"> <b>
      Welcome to EV charging station at
      {{ station_data.number }}, {{ station_data.street }},
      {{ station_data.city }}, {{ station_data.country}}! </b> </h1>
      <h2 class = "welcoming-message-b">
        <b> Plug in your electrical vehicle </b> and
        press the following button <br> to add your charging settings and
        initiate the charging process. </h2>
    <!-- button -->
      <div class = "addsettings-button">
        <button v-on:click="PluggedIn()" class="btn btn-outline-dark btn-block btn-lg">
          Add Charging Settings </button>
      </div>
      <div class = "image-welcome-charging"> </div>
    </div>
    <!-- page 2 -->
    <div v-if = "(this.plugged_in)&(!this.loading_bar)&(!this.charging_done)">
      <h2 class = "successful-plug-in">
        You successfully plugged in your electrical vehicle:
        {{ this.vehicle_data.manufacturer }}, {{ this.vehicle_data.model }}
        with registration plate: {{ this.vehicle_data.registration_plate }}.
      </h2>
      <!-- providers -->
      <h2 class = "pick-provider">
        Choose an energy provider for this charging session:
      </h2>
      <div class="row">
        <div class="column" style="background-color:#d8f3dc;">
          <button v-on:click="addProvider('dei')" class="btn btn-outline"> DEI </button>
        </div>
        <div class="column" style="background-color:#b7e4c7;">
          <button v-on:click="addProvider('voltera')" class="btn btn-outline"> Voltera </button>
        </div>
        <div class="column" style="background-color:#95d5b2;">
          <button v-on:click="addProvider('protergia')" class="btn btn-outline"> Protergia </button>
        </div>
        <div class="column" style="background-color:#74c69d;">
          <button v-on:click="addProvider('watt&volt')" class="btn btn-outline"> Watt & Volt </button>
        </div>
      </div>
      <p class = "after-provider" v-if = "this.provider_name">
        You selected {{ this.provider_name }} as your energy provider.
      </p>
      <h2 class = "pick-setting">
        Now set <b> one </b> of the following charging parameters:
      </h2>
      <!-- radiobuttons -->
      <div id = "radiobuttons">
        <input type = "radio" value = "time" v-model = "setting">
        <label class = "settings-label"> <b> Set Time </b> </label> <br>
        <div v-if = "setting == 'time'">
          <input type = "range" v-model = "time" class = "radio-range" min = "0" max = "240" step = "1">
          <b> {{ this.time }} MIN </b> <br>
        </div>
        <input type = "radio" value = "kwh" v-model = "setting">
        <label> <b> Set kWh </b> </label> <br>
        <div v-if = "setting == 'kwh'">
          <input type = "range" v-model = "kwh" class = "radio-range" min = "0" max = "100" step = "1">
          <b> {{ this.kwh }} KWH </b> <br>
          <p class = "msg"> Be careful not to surpass your vehicle's kWh capacity! </p>
        </div>
        <input type = "radio" value = "price" v-model = "setting">
          <label> <b> Set Price </b> </label> <br>
        <div v-if = "setting == 'price'">
          <input type = "text" v-model = "price" class = "price-input"> € <br>
        </div>
      </div>
      <p v-if ="(this.setting == 'time')&(this.time!=0)" class = "expected">
        Expected cost for this session: {{ ((this.time / 60) * 50 * this.kwh_cost) | round }}€. <br>
        Expected energy consumption: {{ (this.time / 60) * 50 | round }} kWh.
      </p>
      <p v-if = "(this.setting == 'kwh')&(this.kwh!=0)" class = "expected">
        Expected cost for this session: {{ (this.kwh * this.kwh_cost) | round }}€. <br>
        Expected charging time: {{ ( this.kwh / 50) * 60 | round }} min.
      </p>
      <p v-if = "(this.setting == 'price')&(this.price!=0)" class = "expected">
        Expected charging time for this session: {{ ((this.price / this.kwh_cost) / 50) * 60 | round }} min. <br>
        Expected energy consumption: {{ (this.price / this.kwh_cost) | round }} kWh.
      </p>
      <div class = "charge-button">
        <button v-on:click="addSession()" class="btn btn-outline-dark btn-block btn-lg">
            Initiate Charging </button>
      </div>
    </div>
    <!-- page 3 -->
    <div v-on:click.self="move()" v-if = "(this.loading_bar)&(!this.charging_done)">
      <h2  class = "almost-complete"> <b> Charging almost complete... </b> </h2>
      <div id="myProgress">
        <div id="myBar"></div>
      </div>
      <div v-on:click.self="done()" class = "image_account" > </div>
    </div>
    <!-- page 4 -->
    <div v-if = "this.charging_done">
      <h2 class = "goodye"> <b> You're done! </b> <br>
        Your account was billed for this charging session with {{ this.price | round }}€. <br>
        Drive safely and enjoy the ride. </h2>
      <div class = "image_goodbye"> </div>
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
        station_data: '',
        vehicle_data: '',
        provider_name: '',
        station_id: '',     // needed
        reg_plate: '',      // needed
        plugged_in: '',
        provider_id: '',    // needed
        setting: '',
        time: 0,
        kwh: 0,             // needed
        price: '',
        kwh_cost: '',       // needed
        success: '',
        error: '',
        loading_bar:'',
        charging_done:''
      }
    },
    created() {
      const headers = {
        'Content-Type': 'text/json',
        'X-OBSERVATORY-AUTH': this.$store.getters.token
      }
      Vue.axios.get('https://127.0.0.1:5000/evcharge/api/allStations',
      { headers: headers })
      .then(response => {
          let stations = response.data.stations
          let index = Math.floor(Math.random() * response.data.total)
          this.station_data = stations[index]
          this.station_id = this.station_data.id
       })
       .catch(err => {
         this.error = 'Something went wrong, please try again later.'
         console.log(err)
      })
    },
    methods: {
      PluggedIn: function() {
        this.plugged_in = true;
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        Vue.axios.get('https://127.0.0.1:5000/evcharge/api/vehicle?user_id='
        + this.$store.getters.user_id, { headers: headers })
        .then(response => {
            let vehicles = response.data.vehicles
            let index = Math.floor(Math.random() * response.data.total)
            this.vehicle_data = vehicles[index]
            this.reg_plate = this.vehicle_data.registration_plate
         })
         .catch(err => {
           this.error = 'Something went wrong, please try again later.'
           console.log(err)
        })
      },
      addProvider: function(provider_name) {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        this.provider_name = provider_name
        Vue.axios.get('https://127.0.0.1:5000/evcharge/api/allProviders',
         { headers: headers })
        .then(response => {
            let providers = response.data.providers
            for (let i = 0, l = providers.length; i < l; i++) {
              if (provider_name == providers[i].name) {
                this.provider_id = providers[i].id
                this.kwh_cost = providers[i].kwh_cost
              }
            }
         })
         .catch(err => {
           this.error = 'Something went wrong, please try again later.'
           console.log(err)
        })
      },
      move: function() {
        let i = 0;
        let elem = document.getElementById("myBar");
        let width = 1;
        if (i == 0) {
          i = 1;
          let id = setInterval(function() {
            if (width >= 100) {
              clearInterval(id);
              i = 0;
            }
            else {
              width++;
              elem.style.width = width + "%";
            }
          }, 50);
        }
        else {
          width++;
          elem.style.width = width + "%";
        }
      },
      done: function() {
        this.charging_done = true;
      },
      addSession: function() {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        if (this.setting == 'time') {
          this.kwh = (this.time / 60) * 50
          this.price = this.kwh * this.kwh_cost
        }
        else if (this.setting == "price") {
          this.kwh = this.price / this.kwh_cost
          this.time = (this.kwh / 50) * 60
        }
        else {
          this.time = (this.kwh / 50) * 60
          this.price = this.kwh * this.kwh_cost
        }
        let date = new Date();
        let start =
          date.getFullYear() + "-" +
          ("00" + (date.getMonth() + 1)).slice(-2) + "-" +
          ("00" + date.getDate()).slice(-2) + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2);
        // starting time of the charging session in hours and minutes
        let s_h = parseInt(start.substring(11,13))
        let s_min = parseInt(start.substring(14,16))
        // charging duration in hours and minutes
        let duration_h = Math.floor(this.time / 60)
        let duration_min = this.time % 60
        // finishing times
        let fin_year = parseInt(start.substring(0,4))
        let fin_month = parseInt(start.substring(5,7))
        let fin_date = parseInt(start.substring(8,10))
        let fin_h = s_h + duration_h
        let fin_min = s_min + duration_min
        if (fin_min >= 60) {
          fin_h++
          fin_min -= 60
        }
        if (fin_h >= 24) {
          fin_date++
          fin_h -= 24
        }
        if (fin_date >= 32) {
          fin_month++
          fin_date = 1
        }
        if (fin_month >= 12) {
          fin_year++
          fin_month = 1
        }
        // february case not taken in consideration, neither 30-days months
        let finish = fin_year + '-' + fin_month + '-' + fin_date + " " + fin_h + ":" + fin_min
        Vue.axios.post('https://127.0.0.1:5000/evcharge/api/AddSingleSession?user_id=' +
        this.$store.getters.user_id + '&station_id=' + this.station_id + '&registration_plate=' +
        this.reg_plate + '&starting_time='+  start + '&finishing_time=' + finish + '&kwh_cost=' +
        this.kwh_cost + '&kwh_delivered=' + this.kwh + '&provider_id=' + this.provider_id,
        { headers:headers })
         .then(() =>
           this.success = 'New electrical vehicle successfully inserted.'
         )
         .catch(err => {
           this.error = 'Something went wrong, please try again later.'
           console.log(err)
         })
         this.loading_bar = true;
         console.log("i'm here");
      }
    }
  }
</script>

<style>
  .main-div {
    max-width: 1500px;
    margin: 0 auto;
  }
  .welcoming-message {
    margin-top: 80px;
    text-align: center;
    font-size: 25px;
  }
  .welcoming-message-b {
    margin-top: 30px;
    text-align: center;
  }
  .addsettings-button {
    width: 30%;
    margin-top: 70px;
    margin-left: auto;
    margin-right: auto;
  }
  .image-welcome-charging {
   width: 400px;
   height: 300px;
   background-image: url(../assets/adddates3.png);
   margin-top: 40px;
   margin-left: auto;
   margin-right: auto;
   background-size: 100%;
   background-repeat: no-repeat;
  }
  .successful-plug-in {
    text-align: center;
    margin-top: 50px;
    font-weight: bold;
  }
  .pick-provider {
    text-align: center;
    margin-top: 40px;
  }
  .column {
    float: left;
    width: 12.5%;
    padding: 10px;
  }
  .row:after {
    content: "";
    display: table;
    clear: both;
  }
  .row {
    margin-left: 33.25%;
  }
  .after-provider {
    font-size: 18px;
    margin-top: 30px;
  }
  .pick-setting {
    text-align: center;
    margin-top: 30px;
  }
  #radiobuttons {
    margin-left: 600px;
  }
  #radiobuttons input {
    display: inline-block;
    margin-right: 10px;
  }
  #radiobuttons label {
    display: inline-block;
    font-size: 20px;
  }
  .radio-range {
    width: 30%;
  }
  .price-input {
    width: 10%;
  }
  .expected {
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
  }
  .charge-button {
    width: 30%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
  }
  .msg {
    color : orange;
    text-align: center;
    font-size: 0.8em;
    font-weight: bold;
    margin-right: 580px;
  }
  #myProgress {
    width: 50%;
    background-color: white;
    margin-left: auto;
    margin-right: auto;
    margin-top: 40px;
  }
  #myBar {
    width: 1%;
    height: 45px;
    background-color: #a0c4ff;
    border-radius: 25px;
  }
  .almost-complete {
    margin-top: 150px;
    text-align: center;
    font-size: 25px;
  }
  .image_account {
     width: 380px;
     height: 360px;
     background-image: url(../assets/info.png);
     margin-top: 50px;
     margin-left: auto;
     margin-right: auto;
     background-size: 100%;
     background-repeat: no-repeat;
  }
  .goodye {
    text-align: center;
    margin-top: 150px;
    font-size: 25px;
  }
  .image_goodbye {
     width: 370px;
     height: 370px;
     background-image: url(../assets/goodbye.png);
     margin-top: 60px;
     margin-left: auto;
     margin-right: auto;
     background-size: 100%;
     background-repeat: no-repeat;
  }
</style>
