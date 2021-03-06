<template>
  <div class = "main-div">
    <NavigationBar/>
    <div class = "welcome">
      <h3> <b> Welcome {{ this.$store.getters.username }}! </b> </h3>
    </div>
    <div class = "text">
      <h1> EV Charging <br> Management Software </h1>
      <h2> Lets you track,
        manage and optimize electrical
        vehicle charging. </h2>
        <p id = "home-paragraph">
          Enrich your experience as an electrical vehicle driver
          by using a charging management  software which enables
          you to manage, monitor and improve your ev charges.
          Εasily <br> pay your charging bills, supervise your charging
          sessions and gain access to providers <br> and stations information.
        </p>
     </div>
     <div class = "image"> </div>
     <div>
       <p>
         All pictures are credited to their rightful owners. <br>
         A project for Software Engineering, NTUA 2021 </p>
     </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
  export default {
    components: {
      NavigationBar
    }
}
</script>

<style>
  * {
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
    color: #2c3e50;
  }
  h1 {
    font-size: 30px;
    text-align: left;
    font-weight: 1000;
  }
  h2 {
    font-size: 20px;
    text-align: left;
    margin-bottom: 30px;
  }
  #home-paragraph {
    text-align: left;
    font-size: 18px;
  }
  p {
    font-size: 14px;
    text-align: center;
  }
  .main-div {
    max-width: 1500px;
    margin: 0 auto;
  }
  .welcome {
    padding-top: 120px;
    margin: auto;
    width: 50%;
    text-align: center;
  }
  .text {
    margin: auto;
    padding-left: auto;
    width: 50%;
  }
  .image {
    width: 600px;
    height: 260px;
    background-image: url(../assets/car.png);
    margin: auto;
    background-size: 100%;
    background-repeat: no-repeat;
  }
</style>
