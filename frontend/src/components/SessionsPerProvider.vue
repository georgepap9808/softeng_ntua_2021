<template>
  <div class = "main-div">
    <NavigationBar/>
    <div v-if = "!this.charges_loaded">
      <h2 class = "instructions"> <b> Pick the energy provider and time period
        that interest you: </b> </h2>
      <p class = "instructions-b">
        The charges loaded will refer only to the selected provider and time span. </p>
      <div class = "select-charges">
        <label id = "select-label"> <b> Pick a provider: </b> </label>
        <select v-model = "provider_data">
          <option v-for = "provider in providers" :key = "provider.id">
            [{{ provider.id }}] {{ provider.name }}
          </option>
        </select>
      </div>
      <form class = "date-form" @submit.prevent = "showCharges()">
        <div class="form-group row">
          <label for="example-date-input" class="col-2 col-form-label"> <b> Start Date: </b> </label>
          <div class="col-10">
            <input class="form-control" type="date" v-model = "date_from">
          </div>
        </div>
        <div class="form-group row">
          <label for="example-date-input" class="col-2 col-form-label"> <b> End Date: </b></label>
          <div class="col-10">
            <input class="form-control" type="date" v-model = "date_to">
          </div>
        </div>
        <div v-if = "error" class = "message"> {{ error }} </div>
        <div v-if = "no_charges" class = "message"> {{ no_charges }} </div>
        <div class = "button-dates">
          <button type="submit" class="btn btn-dark btn-block"> See Charges </button>
        </div>
      </form>
      <div class = "image-adddate"> </div>
    </div>
    <div v-if = "this.charges_loaded">
      <div class="show-charges">
        <h2> <b> All of your relevant charging sessions: </b> </h2>
        <div class="single-charge" v-for="charge in charges" :key="charge.id">
          <ul>
            <li>
              <h6> <b> Starting Time: </b> {{ charge.starting_time }} </h6>
              <h6> <b> Finishing Time: </b> {{ charge.finishing_time }} </h6>
              <h6> <b> Total Cost: </b> {{ charge.kwh_cost }} € </h6>
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
        providers: [],
        provider_data: '',
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
        var provider_id = this.provider_data.substring(1,2)
        Vue.axios.get('http://127.0.0.1:5000/evcharge/api/SessionsPerProvider/' + this.date_from +
        '/' + this.date_to + '?id=' + this.$store.getters.user_id +
        '&provider_id=' + provider_id, {headers: headers})
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
        // most probably providerbyUser
        Vue.axios.get('http://127.0.0.1:5000/evcharge/api/providers', { headers: headers })
        .then(response => {
          this.providers = response.data.providers
        })
        .catch(err => {
          this.error = 'Something went wrong, please try again later.'
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
  .date-form {
    margin: 15px auto;
    width: 50%;
  }
  .button-dates {
    width: 20%;
    margin: 50px auto;
  }
  .image-adddate {
   width: 280px;
   height: 260px;
   background-image: url(../assets/adddates2.png);
   margin-top: 40px;
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
  .select-charges {
    margin-left: 25%;
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
