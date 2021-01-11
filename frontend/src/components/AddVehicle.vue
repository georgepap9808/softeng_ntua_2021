<template>
  <!-- Navigation Bar -->
<div class = "addcar">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
   <a class="navbar-brand"> EV Charging System</a>
   <div class="collapse navbar-collapse" id="navbarNavDropdown">
     <ul class="navbar-nav">
       <li class="nav-item active">
         <router-link class="nav-link" to="/home">Home</router-link>
       </li>
       <li class="nav-item">
        <router-link class="nav-link" to="/myinfo"> Account Info </router-link>
       </li>
       <li class="nav-item">
        <router-link class="nav-link" to="/bills"> Billing Info </router-link>
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
        <router-link class="nav-link" to="/addcar"> Add a new Vehicle </router-link>
       </li>
       <li class="nav-item">
        <router-link class="nav-link" to="/stats"> Statistics </router-link>
       </li>
       <ul class="nav justify-content-end">
         <li class="nav-item">
           <router-link class = "nav-link pr-3" to="/logout"> Logout </router-link>
         </li>
       </ul>
     </ul>
   </div>
 </nav>

<div class="addcar_form">
  <h3> Add a new vehicle to your account: </h3>
  <form>
   <div class="form-group">
     <label for="reg_plate">Registration Plate</label>
     <input type="text" class="form-control" placeholder="Enter registration plate">
   </div>
   <div class="form-group">
     <label for="Manufacturer">Manufacturer</label>
     <input type="text" class="form-control" placeholder="Enter manufacturer">
   </div>
   <div class="form-group">
     <label for="Manufacturer">Model Info</label>
     <input type="text" class="form-control" placeholder="Enter model info">
   </div>
    <div class = "addcar_button">
      <button type="submit" class="btn btn-dark btn-lg btn-block"> Add </button>
    </div>
   </form>
   <div class = "image_addcar"> </div>
  </div>
 </div>
</template>

<style>
.addcar_form {
  width: 40%;
  margin-top: 100px;
  /*border: 2px solid black;*/
  margin-left: auto;
  margin-right: auto;
}

.addcar_button {
  width: 20%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
}

.image_addcar {
 width: 130px;
 height: 100px;
 background-image: url(../assets/addcar.png);
 margin-top: 100px;
 margin-left: auto;
 margin-right: auto;
 background-size: 100%;
 background-repeat: no-repeat;
}

* {
  box-sizing: border-box;
  font-family: 'Nunito', sans-serif;
  color: #2c3e50;
}

a {
  font-size: 18px;
}

h1 {
  font-size: 34px;
  text-align: left;
}

h3 {
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  text-align: center;
}

</style>
