<template>
  <div>
    <NavigationBar/>
    <h2 v-if = "!this.msg" class = "stations-vue">
      EV charging stations where you
      have charged your electrical vehicle(s):  </h2>
    <div class = "show-stations" v-if = "!this.msg">
      <div class="single-station">
        <ul>
          <li v-for="station in stations" :key="station.id">
            <h6> Station id:  {{ this.station.id  }}  </h6>
            <h6> Address: {{ this.station_number }}, {{ this.station_street}},
            {{ this.station.city }}, {{ this.station.country}}. </h6>
            <h6> Station's average rating: {{ station_avg_rating }}.
            {{ this.station_num_ratings }} users have rated this station. </h6>
          </li>
        </ul>
      </div>
    <div v-if = "this.msg"> {{ this.msg }} </div>
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
        station_id: '',
        station_number: '',
        station_street: '',
        station_city: '',
        station_country: '',
        station_avg_rating: '',
        station_num_ratings: '',
        msg: ''
      }
    },
    created() {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        Vue.axios.get('https://127.0.0.1:5000/evcharge/api/stationByUser&id=' +
        this.$store.getters.user_id, { headers: headers })
        .then(response => {
           if (response.data.total == 0) {
             this.msg = "You haven't made any charges yet, so no stations were loaded!:("
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
  .stations_vue {
    text-align: center;
    margin-top: 20px;
    font-weight: bold;
  }
  .show-stations {
    max-width: 800px;
    margin: 0 auto;
  }
  .single-station {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #d49157; /* light orange */
  }
  .msg {
    color : #ff0062;
    text-align: center;
    font-size: 0.8em;
    font-weight: bold;
  }
</style>
