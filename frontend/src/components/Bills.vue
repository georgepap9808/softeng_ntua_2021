<template>
  <div class = "main-div">
    <NavigationBar/>
    <div class="show-bills">
      <h2 v-if = "!this.pay_bill" class = "bills-title"> Your Billing History: </h2>
      <p v-if = "!this.pay_bill" class = "monthly-bills"> Charging bills are issued monthly. </p>
      <div v-if = "show_more" class="single-bill">
        <h6 style="margin-bottom:30px;"> <b> Charges included in the selected bill: </b> </h6>
        <ul v-for="session in sessions" :key="session.id">
          <li>
            <h6> <b> Starting Time: </b> {{ session.starting_time }} </h6>
            <h6> <b> Finishing Time: </b> {{ session.finishing_time }} </h6>
            <h6> <b> Total Energy Consumption: </b> {{ session.kwh_delivered | round }} kWh </h6>
            <h6> <b> Total Cost: </b> {{ session.kwh_cost*session.kwh_delivered | round }} € </h6>
            <br>
          </li>
        </ul>
      </div>
      <div v-if = "this.pay_bill">
        <h2 class = "bills-title"> Bill Payment: </h2>
        <div class = "single-bill">
          <p> Selected bill for period: <b> {{ this.bill_data.period_start_date }} - {{ this.bill_data.period_end_date }} </b> </p>
          <p class = "payment-instructions">
            <b> Choose one of your credit cards </b> to pay the selected bill!
            In case you want use a new card, <br> you can always add a new
            one through the <b>'Add a New Card' </b> subpage.
          </p>
          <div class = "select-card">
            <label id = "select-label"> Pick a credit card for your transaction: </label>
            <select v-model = "card_data">
              <option v-for = "card in cards" :key = "card.id">
                card number:
                {{ card.card_number.substring(0,4) }}********{{ card.card_number.substring(12,16) }}
                exp. date: {{ card.card_expiration }}
              </option>
            </select>
          </div>
          <h6 style = "margin-top = 10px;">
            <b> Sum </b> to be paid: <b> {{ this.bill_data.total_cost | round }}€ </b>
          </h6>
          <div class = "pay-final-button">
            <button v-on:click="pay_b" class="btn btn-dark"> Pay </button>
          </div>
        </div>
         <div v-if = "error" class = "error"> {{ error }} </div>
         <div v-if = "success" class = "success"> {{ success }} </div>
         <div class = "image_pay"> </div>
      </div>
      <div v-if = "(!show_more)&(!pay_bill)">
        <label class = "checkbox"> Show me only the bills I haven't paid yet. </label>
        <input class = "checkbox_input" type = "checkbox" value = "true" v-model = "only_unpaid">
      </div>
      <div v-if = "(!show_more)&(!pay_bill)">
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
                <button v-on:click="pay_a(bill)"
                class="btn btn-outline-dark btn-sm"> pay this bill </button>
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
        show_more_err: '',
        pay_bill: '',
        bill_data: '',
        cards: [],
        card_data: ''
      }
    },
    methods: {
      pay_a(bill) {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        this.bill_data = bill
        this.pay_bill = "true"
        Vue.axios.get('https://127.0.0.1:5000/evcharge/api/card?user_id=' +
          this.$store.getters.user_id, { headers: headers })
         .then(response =>
           this.cards = response.data.cards
         )
         .catch(err => {
           this.error = 'Something went wrong, please try again later.'
           console.log(err)
         })
      },
      pay_b() {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        // add card_data.card_number to include card use in transaction
        this.pay_bill = "true"
        Vue.axios.put('https://127.0.0.1:5000/evcharge/api/bill?bill_id=' +
          this.bill_data.id, { headers: headers })
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
        Vue.axios.get('https://127.0.0.1:5000/evcharge/api/SessionsPerDate/' + date_from +
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
      Vue.axios.get('https://127.0.0.1:5000/evcharge/api/bill'
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
  .payment_instructions {
    margin-top: 10px;
    text-align: left;
    font-size: 16px;
  }
  .select-charges {
    margin-left: 25%;
  }
  #select-label {
    margin-right: 34px;
  }
  .pay-final-button {
    margin-top: 20px;
    margin-left: 45%;
  }
  .image_pay {
   width: 280px;
   height: 270px;
   background-image: url(../assets/card.png);
   margin-top: 70px;
   margin-left: auto;
   margin-right: auto;
   background-size: 100%;
   background-repeat: no-repeat;
  }
</style>
