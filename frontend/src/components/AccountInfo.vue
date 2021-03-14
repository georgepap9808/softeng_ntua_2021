<template>
  <div class = "main-div">
    <NavigationBar/>
    <h3 class = "account_title"> Some information about your account: </h3>
    <div class = "basic_account_info">
      <p> Full Name:
        {{ this.first_name }} {{ this.last_name}}
      </p>
      <p> Address:
        {{ this.street_number }} {{ this.street }}, {{ this.city }}, {{ this.zip_code}}
      </p>
    </div>
    <p class = "user-statistics">
      Some interesting facts about you: <br>
      Since <b> your first EV charge on {{ this.min_year }}-{{ this.min_month }}-{{ this.min_day }}</b>,
      you have made <b>{{ this.sessions_total }} charges</b>, in a total of <b> {{ this.stations_total }} different
      stations!</b> <br> You have consumed <b>{{ this.kwh_total | round }} kWhs of energy</b> and charged your
      electrical vehicle(s) for a total of <b>{{ this.duration_total }} <br> minutes</b>. Your average charging
      time per session is <b>{{ this.avg_duration | round }} minutes</b>, your <b>average charging cost</b> is <b>
      {{ this.avg_cost | round }}€</b>, <br>  while your <b>mean energy consumption</b> is <b>{{ this.avg_kwh | round }} kWhs</b>.
      We wish you a lot more happy charging! ⚡
    </p>
    <div class = "image_account"> </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
import Vue from 'vue';
  export default {
    components: {
      NavigationBar
    },
    data(){
      return {
        first_name: '',
        last_name: '',
        country: '',
        city: '',
        street: '',
        street_number: '',
        zip_code: '',
        stations_total: 10,
        sessions_total: '',
        kwh_total: 0,
        duration_total: 0,
        cost_total: 0,
        avg_duration: '',
        avg_kwh: '',
        avg_cost: '',
        min_year: 2021,
        min_month: 12,
        min_day: 31
      }
    },
    methods: {
      displayAccountInfo () {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        // basic accound info
        Vue.axios.get('httpss://127.0.0.1:5000/evcharge/api/admin/users/'
        + this.$store.getters.username, { headers: headers})
          .then(response => {
            this.first_name = response.data.first_name,
            this.last_name = response.data.last_name,
            this.country = response.data.country,
            this.city = response.data.city,
            this.street = response.data.street,
            this.street_number = response.data.number,
            this.zip_code = response.data.zip_code
          })
           .catch(err => console.log(err))
        // total of stations where the user has made charges
        Vue.axios.get('https://127.0.0.1:5000/evcharge/api/admin/users/stationByUser?id='
        + this.$store.getters.user_id, { headers: headers })
          .then(response =>
            this.stations_total = response.data.stations.length
         )
          .catch(err => console.log(err))
        // all the rest
        let all_sessions = []
        Vue.axios.get('https://127.0.0.1:5000/evcharge/api/SessionsPerDate/2010-01-01/2021-12-31'
        + '?id=' + this.$store.getters.user_id, {headers: headers})
        .then(response => {
            all_sessions = response.data.sessions
            let len = all_sessions.length
            this.sessions_total = len
            for (let j = 0; j < len; j++){
              this.kwh_total += all_sessions[j].kwh_delivered
              this.cost_total += all_sessions[j].kwh_cost * all_sessions[j].kwh_delivered
              // charging duration calculation
              let finishing_hour = parseInt((all_sessions[j].finishing_time).substring(11,13))
              let finishing_min = parseInt((all_sessions[j].finishing_time).substring(14,16))
              let starting_hour = parseInt((all_sessions[j].starting_time).substring(11,13))
              let starting_min = parseInt((all_sessions[j].starting_time).substring(14,16))
              let duration = (finishing_hour*60 + finishing_min) -
                             (starting_hour*60 + starting_min);
              this.duration_total += duration
              // find the very first charging session
              let year = (all_sessions[j].starting_time).substring(0,4)
              let month = (all_sessions[j].starting_time).substring(5,7)
              let day = (all_sessions[j].starting_time).substring(8,10)
              if ((this.min_year > year) || ((this.min_year == year)&(this.min_month > month)) ||
                  ((this.min_year == year)&(this.min_month == month)&(this.min_day > day))) {
                this.min_year = year; this.min_month = month; this.min_day = day;
              }
            }
            this.avg_kwh = this.kwh_total / len
            this.avg_cost = this.cost_total / len
            this.avg_duration = this.duration_total / len
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
    font-size: 18px;
  }
  h3 {
    font-size: 20px;
  }
  .main-div {
    max-width: 1500px;
    margin: 0 auto;
  }
  .account_title {
    font-weight: 750;
    margin-top: 70px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
  .basic_account_info {
    border: 2px black;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    width: 30%;
  }
  .user-statistics {
    margin-top: 30px;
    text-align: left;
    margin-left: 24%;
  }
  .image_account {
     width: 350px;
     height: 330px;
     background-image: url(../assets/info.png);
     margin-top: 40px;
     margin-left: auto;
     margin-right: auto;
     background-size: 100%;
     background-repeat: no-repeat;
  }
</style>
