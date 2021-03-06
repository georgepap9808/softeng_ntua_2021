<template>
  <div class = "main-div">
    <NavigationBar/>
    <div class = "show-stations" v-if = "!this.msg">
      <h2 v-if = "!this.msg" class = "h2-stations">
        EV charging stations where you
        have charged your electrical vehicle(s):  </h2>
      <div v-if = "(!this.success)" class = "rate-station">
        <label> Choose a station to rate: </label>
        <select v-model = "station_data" class = "rate-select">
          <option v-for = "station in stations" :key = "station.id">
            [{{ station.id }}]
            {{ station.number }}, {{ station.street }},
            {{ station.city }}, {{ station.country}}
          </option>
        </select>
        <label class = "label_2"> add and submit your rating: </label>
        <input required v-model = "rating" type = "number" min = "1" max = "5">
      </div>
      <button v-if = "(!this.success)" class="btn btn-dark btn-sm"
        id = "rate-button" v-on:click="rate"> submit rating
      </button>
      <div v-if = "this.success" class = "msg"> {{ success }} </div>
      <div class="single-station" v-for="station in stations" :key="station.id">
        <ul>
          <li>
            <h6> Station id:  {{ station.id  }}  </h6>
            <h6> <b> Location: </b> {{ station.number }}, {{ station.street }},
            {{ station.city }}, {{ station.country}}. </h6>
            <h6> This station's <b> average rating </b>
              is {{ station.avg_rating | round }} / 5.
            </h6>
            <h6> This station has been rated {{ station.num_ratings }} times. </h6>
          </li>
        </ul>
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
        rating: '',
        success: '',
        error: ''
      }
    },
    methods: {
      rate: function() {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        var id = this.station_data.substring(1,2)
        Vue.axios.post('http://127.0.0.1:5000/evcharge/api/station/rating?id=' +
        id + '&rating=' + this.rating, { headers: headers })
        .then(() => {
          this.success = "Rating successfully submitted."
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
        Vue.axios.get('http://127.0.0.1:5000/evcharge/api/stationByUser?id=' +
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
  .show-stations {
    max-width: 800px;
    margin: 0 auto;
  }
  .single-station {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #EACDC2;
  }
  .msg {
    color : #ff0062;
    text-align: center;
    font-size: 0.8em;
    font-weight: bold;
  }
  .h2-stations {
    margin-top: 30px;
    font-weight: bold;
  }
  ul {
   list-style-type: none;
   padding: 0;
   margin: 0;
  }
  select {
    margin-left: 15px;
  }
  .rate-station {
    margin: 20px 0;
    padding-top: 20px;
  }
  .label_2 {
    margin-left: 10px;
    margin-right: 10px;
  }
  #rate-button {
    margin-left: 42%;
  }
</style>
