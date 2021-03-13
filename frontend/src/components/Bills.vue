<template>
  <div class = "main-div">
    <NavigationBar/>
    <div class="show-bills">
      <h2 class = "bills-title"> Your Billing History: </h2>
      <p class = "monthly-bills"> Charging bills are issued monthly. </p>
      <div v-if = "show_more" class="single-bill">
        <!-- <div v-if = "show_more_err" class = "message"> {{ this.show_more_err }} </div> -->
        <h6 style="margin-bottom:30px;"> <b> Charges included in the selected bill: </b> </h6>
        <ul v-for="session in sessions" :key="session.id">
          <li>
            <h6 class = "h6-charges"> <b> Starting Time: </b> {{ session.starting_time }} </h6>
            <h6 class = "h6-charges"> <b> Finishing Time: </b> {{ session.finishing_time }} </h6>
            <h6> <b> Total Energy Consumption: </b> {{ session.kwh_delivered | round }} kWh </h6>
            <h6> <b> Total Cost: </b> {{ session.kwh_cost*session.kwh_delivered | round }} € </h6>
            <br>
          </li>
        </ul>
      </div>
      <div v-if = "!show_more">
        <label class = "checkbox"> Show me only the bills I haven't paid yet. </label>
        <input class = "checkbox_input" type = "checkbox" value = "true" v-model = "only_unpaid">
      </div>
      <div v-if = "error" class = "error"> {{ error }} </div>
      <div v-if = "success" class = "success"> {{ success }} </div>
      <div v-if = "!show_more">
        <div class="single-bill" v-for="bill in bills" :key="bill.id">
          <ul>
            <li v-if = "(!only_unpaid)|(only_unpaid&!bill.is_paid)">
              <div class = "see-more">
                <button v-on:click="showMore(bill.period_start_date)"
                class="btn btn-outline-dark btn-sm"> show more </button>
              </div>
              <h6> <b> Starting Date: </b> {{ bill.period_start_date }} </h6>
              <h6> <b> Finishing Date: </b> {{ bill.period_end_date}} </h6>
              <h6> <b> Total Cost </b> for this month was: {{ bill.total_cost | round }}€ </h6>
              <h6 class = "msg-payment" v-if = "bill.is_paid"> This bill has already been paid! </h6>
              <div v-if = "(!bill.is_paid)&(!success)" class = "pay-bill">
                <button v-on:click="pay(bill.id)"
                class="btn btn-dark btn-sm"> pay this bill </button>
              </div>
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
        bills: [],
        no_bills: '',
        error: '',
        success: '',
        only_unpaid: '',
        show_more: '',
        sessions: [],
        show_more_err: ''
      }
    },
    methods: {
      pay(bill_id) {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        Vue.axios.put('http://127.0.0.1:5000/evcharge/api/bill?bill_id=' +
          bill_id, { headers: headers })
         .then(() =>
           this.success = 'Selected bill was successfully paid.'
         )
         .catch(err => {
           this.error = 'Something went wrong, please try again later.'
           console.log(err)
         })
      },
      showMore(start_date){
        var month = start_date.substring(5,7)
        var year = start_date.substring(0,4)
        var date_from = year + '-' + month + '-' + '01'
        var date_to = year + '-' + month + '-' + '30'
        // in a later version --> a more extensive month check
        this.show_more = true
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        Vue.axios.get('http://127.0.0.1:5000/evcharge/api/SessionsPerDate/' + date_from +
        '/' + date_to + '?id=' + this.$store.getters.user_id, {headers: headers})
        .then(response =>
             this.sessions = response.data.sessions
        )
        .catch(err => {
          this.show_more_err = 'Something went wrong, please try again later.'
          console.log(err)
        })
      }
    },
    created() {
      const headers = {
        'Content-Type': 'text/json',
        'X-OBSERVATORY-AUTH': this.$store.getters.token
      }
      Vue.axios.get('http://127.0.0.1:5000/evcharge/api/bill'
       + '?user_id=' + this.$store.getters.user_id, {headers: headers})
      .then(response => {
         if (response.data.total == 0) {
           this.no_bills = "It seems you haven't made any charges! No bills to be loaded."
         }
         else {
           this.bills = response.data.bills
         }
      })
      .catch(err => {
        this.error = 'Something went wrong, please try again later.'
        console.log(err)
      })
    }
  }
</script>

<style>
  .main-div {
    max-width: 1500px;
    margin: 0 auto;
  }
  .show-bills {
    max-width: 800px;
    margin: 0 auto;
  }
  .single-bill {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #DBF4AD;
  }
  .error {
    color : #ff0062;
    text-align: center;
    font-size: 0.8em;
    font-weight: bold;
  }
  .success {
    color : #16b800;
    text-align: center;
    font-size: 0.8em;
    font-weight: bold;
  }
  .bills-title {
    margin-top: 30px;
    font-weight: bold;
  }
  .checkbox {
    font-size: 15px;
    margin-top: 0px;
  }
  .checkbox_input {
    margin-left: 4px;
  }
  .pay-bill {
    margin-left: 43%;
  }
  .msg-payment {
    text-align: center;
  }
  .see-more {
    margin-left: 85%;
  }
  ul {
   list-style-type: none;
   padding: 0;
   margin: 0;
  }
  .monthly-bills {
   text-align: left;
   margin-top: 0px;
  }
</style>
