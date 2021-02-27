<template>
  <div>
    <NavigationBar/>
    <h2 class = "instructions"> Insert the registration (license) plate of one of your registered electrical vehicles: </h2>
    <div class = "instructions_b">
      <p> The charges loaded will refer only to the selected vehicle and time span. </p>
    </div>
    <div class = "charges_input_box">
      <label> Registration Plate: </label>
      <input class = "input-id" type="text" v-model="reg_p">
    </div>
    <form class = "date_form" @submit.prevent = "add_date">
      <div class="form-group row">
        <label for="example-date-input" class="col-2 col-form-label">Start Date :</label>
        <div class="col-10">
          <input class="form-control" type="date" value="2021-01-01">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-date-input" class="col-2 col-form-label">End Date :</label>
        <div class="col-10">
          <input class="form-control" type="date" value="2021-01-01">
        </div>
      </div>
      <div class = "button_dates">
        <button type="submit" class="btn btn-dark btn-block"> See Charges </button>
      </div>
    </form>
    <div class = "image_adddate"> </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
  export default {
    components: {
      NavigationBar
    },
    data(){
      return {
        reg_p: null
      }
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
  }
  h2 {
    font-weight: 750;
  }
  .instructions {
    text-align: center;
    margin-top: 70px;
    margin-left: auto;
    margin-right: auto;
  }
  .instructions_b {
    margin-top: 0;
  }
  .charges_input_box {
    margin: 0 auto;
    width: 50%;
  }
  .input-id {
    margin-top: 10px;
    margin-left: 2%;
  }
  .date_form {
    margin: auto;
    width: 50%;
    margin-top: 15px;
  }
  .button_dates {
    width: 20%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
  }
  .image_adddate {
   width: 310px;
   height: 270px;
   background-image: url(../assets/adddates1.png);
   margin-top: 40px;
   margin-left: auto;
   margin-right: auto;
   background-size: 100%;
   background-repeat: no-repeat;
  }
  label {
    margin-left: 0%;
    display: inline-block;
    font: 1rem 'Nunito', sans-serif;
  }
</style>
