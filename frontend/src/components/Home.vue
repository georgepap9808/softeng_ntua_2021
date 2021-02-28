<template>
  <div class = "main">
    <NavigationBar/>
    <div class = "welcome">
      <h3> Welcome {{ this.$store.getters.username }}! </h3>
    </div>
    <div class = "text">
      <h1> EV Charging <br> Management Software </h1>
      <h2> Lets you track,
        manage and optimize electrical
        vehicle charging. </h2>
     </div>
     <div class = "image"> </div>
     <div class = "project">
       <p> A project for Software Engineering, NTUA 2021 </p>
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
  h3 {
    font-weight: 1000;
  }
  p {
    font-size: 16px;
    text-align: center;
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
    width: 500px;
    height: 400px;
    background-image: url(../assets/car.png);
    margin: auto;
    background-size: 100%;
    background-repeat: no-repeat;
  }
</style>
