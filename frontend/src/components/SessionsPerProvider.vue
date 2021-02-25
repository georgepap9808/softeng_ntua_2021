<template>
  <div>
    <NavigationBar/>
    <h2 class = "instructions"> Search to pick the energy provider that interests you: </h2>
      <p class = "instructions_b">
        (The charges loaded will refer only to the selected provider and time span.) </p>
    <SearchBar/>
    <form class = "date_form" @submit.prevent = "add_date">
      <div class="form-group row">
        <label for="example-date-input" class="col-2 col-form-label">Start Date :</label>
        <div class="col-10">
          <input class="form-control" type="date" value="2021-01-01" id="example-date-input">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-date-input" class="col-2 col-form-label">End Date :</label>
        <div class="col-10">
          <input class="form-control" type="date" value="2021-01-01" id="example-date-input">
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
import SearchBar from './SearchBar.vue'
  export default {
    components: {
      NavigationBar,
      SearchBar
    }
  }
</script>

<style>
  * {
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
    color: #2c3e50;
  }
  .date_form {
    margin: auto;
    width: 50%;
    padding-top: 40px;
  }
  .button_dates {
    width: 20%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
  }
  .instructions {
    text-align: center;
    margin-top: 80px;
    margin-left: auto;
    margin-right: auto;
  }
  .instructions_b {
    margin-top: 0;
  }
  .image_adddate {
   width: 300px;
   height: 270px;
   background-image: url(../assets/adddates2.png);
   margin-top: 30px;
   margin-left: auto;
   margin-right: auto;
   background-size: 100%;
   background-repeat: no-repeat;
  }
</style>
