<template>
  <!-- Navigation Bar -->
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
   <a class="navbar-brand"> EV Charging System</a>
   <div class="collapse navbar-collapse" id="navbarNavDropdown">
     <ul class="navbar-nav">
       <li class="nav-item active">
         <router-link class="nav-link" to="/Home">Home</router-link>
       </li>
       <li class="nav-item">
        <router-link class="nav-link" to="/Myinfo"> Account Info </router-link>
       </li>
       <li class="nav-item">
        <router-link class="nav-link" to="/Bills"> Billing Info </router-link>
       </li>
       <li class="nav-item dropdown">
         <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
           Past Charges
         </a>
         <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
           <router-link class="dropdown-item" to="/SessionsPerStation">Charges per station</router-link>
           <router-link class="dropdown-item" to="/SessionsPerEV">Charges per electrical vehicle</router-link>
           <router-link class="dropdown-item" to="/SessionsPerProvider">Charges per provider</router-link>
         </div>
       </li>
       <li class="nav-item">
        <router-link class="nav-link" to="/AddVehicle"> Add a new Vehicle </router-link>
       </li>
       <li class="nav-item">
        <router-link class="nav-link" to="/Statistics"> Statistics </router-link>
       </li>
       <ul class="nav justify-content-end">
         <li class="nav-item">
           <router-link class = "nav-link pr-3" to="/logout"> Logout </router-link>
         </li>
       </ul>
     </ul>
   </div>
 </nav>


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
     <button type="submit" class="btn btn-dark btn-lg btn-block"> See Charges </button>
   </div>
 </form>

 <div class = "image_adddate"> </div>

</div>
</template>

<style>
  * {
    box-sizing: border-box;
    font-family: 'Nunito', sans-serif;
    color: #2c3e50;
  }
  a {
    font-size: 18px;
  }
  h1 {
    font-size: 30px;
    text-align: left;
  }
  h2 {
    font-size: 20px;
    text-align: left;
    margin-bottom: 30px;
  }
  .date_form {
    margin: auto;
    width: 50%;
    padding-top: 150px;
  }
  .button_dates {
    width: 20%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 50px;
  }
  .image_adddate {
   width: 300px;
   height: 270px;
   background-image: url(../assets/adddates2.png);
   margin-top: 100px;
   margin-left: auto;
   margin-right: auto;
   background-size: 100%;
   background-repeat: no-repeat;
  }
</style>
