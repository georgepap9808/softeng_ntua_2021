<template>
  <div class = "main-div">
    <NavigationBar/>
    <div class = "show-providers" v-if = "!this.msg">
      <h2 class = "providers-vue">
      <b>  Energy providers and supporting kWh costs: </b> </h2>
      <div class="single-provider" v-for="provider in providers" :key="provider.id">
        <ul>
          <li>
            <h6> Provider id:  {{ provider.id  }} </h6>
            <h6> <b> Name: </b> {{ provider.name }} </h6>
            <h6> This energy provider costs <b> 1kWh </b> with <b> {{ provider.kwh_cost }}€ </b> </h6>
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
        providers: [],
        provider_id: '',
        provider_name: '',
        provider_kWh: ''
      }
    },
    created() {
        const headers = {
          'Content-Type': 'text/json',
          'X-OBSERVATORY-AUTH': this.$store.getters.token
        }
        Vue.axios.get('http://127.0.0.1:5000/evcharge/api/allProviders', { headers: headers })
        .then(response => {
          this.providers = response.data.providers
        })
        .catch(err => {
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
    margin-top: 30px;
  }
  .show-providers {
    max-width: 800px;
    margin: 0 auto;
  }
  .single-provider {
    padding: 20px;
    margin: 20px 0;
    box-sizing: border-box;
    background: #E8D2AE;
  }
  ul {
   list-style-type: none;
   padding: 0;
   margin: 0;
  }
</style>
