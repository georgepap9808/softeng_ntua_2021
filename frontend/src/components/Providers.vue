<template>
  <div class = "main-div">
    <NavigationBar/>
    <h2 v-if = "!this.msg" class = "providers-vue">
      Energy providers and supporting kWh costs </h2>
    <div class = "show-providers" v-if = "!this.msg">
      <div class="single-provider">
        <ul>
          <li v-for="provider in providers" :key="provider.id">
            <h6> Provider id:  {{ this.provider.id  }} </h6>
            <h6> Name: {{ this.provider_name }} </h6>
            <h6> This energy provider offers  </h6>
          </li>
        </ul>
      </div>
      <div v-if = "this.msg"> {{ this.msg }} </div>
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
        provider_id: '',
        provider_name: '',
        provider_kWh: '',
        msg: ''
      }
    },
    created() {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        Vue.axios.get('http://127.0.0.1:5000/evcharge/api/...&id=' +
        this.$store.getters.user_id, { headers: headers })
        .then(response => {
           if (response.data.total == 0) {
             this.msg = ""
           }
           else {
             this.stations = response.data.providers
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
  .providers-vue {
    text-align: center;
    margin-top: 20px;
  }
  .show-providers {
    max-width: 800px;
    margin: 0 auto;
  }
  .single-provider {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #D9FFF8;
  }
  .msg {
    color : #ff0062;
    text-align: center;
    font-size: 0.8em;
    font-weight: bold;
  }
</style>
