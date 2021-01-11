<template>
  <!-- Navigation Bar -->
<div class = "sessions">
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
</style>
