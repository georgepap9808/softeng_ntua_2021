<template>
  <div class = "main-div">
    <NavigationBar/>
    <div class = "front_page" v-if = "!this.plugged_in">
      <h1 class = "welcoming-message"> <b>
      Welcome to EV charging station at
      {{ station_data.number }}, {{ station_data.street }},
      {{ station_data.city }}, {{ station_data.country}}! </b> </h1>
      <h2 class = "welcoming-message-b">
        <b> Plug in your electrical vehicle </b> and
        press the following button <br> to add your charging settings and
        initiate the charging process. </h2>
      <div class = "addsettings-button">
        <button v-on:click="PluggedIn()" class="btn btn-dark btn-block">
          Add Charging Settings </button>
      </div>
      <div class = "image-welcome-charging"> </div>
    </div>
    <div v-if = "this.plugged_in">
      <h2 class = "successful-plug-in">
        You successfully plugged in your electrical vehicle:
        {{ this.vehicle_data.manufacturer }}, {{ this.vehicle_data.model }} <br>
        with registration plate: {{ this.vehicle_data.registration_plate }}.
      </h2>
      <h2 class = "pick-provider">
        Choose an energy provider for this charging session:
      </h2>
      <div class="row">
        <div class="column" style="background-color:#468faf;">
          <button v-on:click="addProvider('dei')" class="btn btn-outline"> DEI </button>
        </div>
        <div class="column" style="background-color:#61a5c2;">
          <button v-on:click="addProvider('voltera')" class="btn btn-outline"> Voltera </button>
        </div>
        <div class="column" style="background-color:#89c2d9;">
          <button v-on:click="addProvider('protergia')" class="btn btn-outline"> Protergia </button>
        </div>
        <div class="column" style="background-color:#a9d6e5;">
          <button v-on:click="addProvider('watt&volt')" class="btn btn-outline"> Watt & Volt </button>
        </div>
      </div>
      <h2 class = "pick-provider">
        Now set one of the following charging parameters:
      </h2>
      <div class = "checkboxes">
        <label> Set Time </label>
        <input type = "checkbox" value = "time"/>
        <label> Set kWh </label>
        <input type = "checkbox" value = "kwh"/>
        <label> Set Price </label>
        <input type = "checkbox" value = "price"/>
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
        station_data: '',
        vehicle_data: '',
        station_id: '',
        reg_plate: '',
        provide_name: '',
        plugged_in: '',
        provider_id: '',
        setting: '',
        error: ''
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
      Vue.axios.get('https://127.0.0.1:5000/evcharge/api/providerByUser?id='
      + this.$store.getters.user_id, { headers: headers })
      .then(response => {
        this.providers = response.data.providers
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
        Vue.axios.get('https://127.0.0.1:5000/evcharge/api/allProviders',
         { headers: headers })
        .then(response => {
            let providers = response.data.providers
            for (let i = 0, l = providers.length; i < l; i++) {
              if (provider_name == providers[i].name)
                this.provider_id = providers[i].id
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
   width: 500px;
   height: 380px;
   background-image: url(../assets/charging1.png);
   margin-top: 60px;
   margin-left: auto;
   margin-right: auto;
   background-size: 100%;
   background-repeat: no-repeat;
  }
  .successful-plug-in {
    text-align: center;
    margin-top: 40px;
    /*color: #16b800;*/
    font-weight: bold;
  }
  .pick-provider {
    text-align: center;
    margin-top: 20px;
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
</style>
