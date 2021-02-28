<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand"> EV Charging System</a>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/Home"> Home </router-link>
          </li>
          <li v-if = "this.$store.getters.charging_enabled" class="nav-item">
            <router-link class="nav-link" to="/Charge"> Charge Vehicle </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Myinfo"> Account Information </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Edit Account Information
            </a>
           <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
             <router-link class="dropdown-item" to="/AddVehicle">Add a new Vehicle</router-link>
              <router-link class="dropdown-item" to="/AddCard">Add a new Credit Card</router-link>
           </div>
          <li class="nav-item">
            <router-link class="nav-link" to="/Bills"> Billing Information </router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Your Past Charges
            </a>
           <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
             <router-link class="dropdown-item" to="/SessionsPerStation">Charges per station</router-link>
             <router-link class="dropdown-item" to="/SessionsPerProvider">Charges per provider</router-link>
             <router-link class="dropdown-item" to="/SessionsPerEV">Charges per electrical vehicle</router-link>
           </div>
         </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Get Information about
            </a>
           <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
             <router-link class="dropdown-item" to="/Stations">EV Charging Stations</router-link>
             <router-link class="dropdown-item" to="/Providers">Energy Providers</router-link>
           </div>
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
  p {
    font-size: 16px;
    text-align: center;
  }
</style>
