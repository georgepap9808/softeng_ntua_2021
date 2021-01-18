<template>
  <div>
      <!-- Navigation Bar -->
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
export default {
        components:{
        }
}
</script>


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
  .text {
    padding-top: 150px;
    margin: auto;
    padding-left: auto;
    width: 50%;
    /*border: 2px solid black; */
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
