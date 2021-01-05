<template>
  <!-- Navigation Bar -->
   <div class = "home_general">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">EV Charging System</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Account Info</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Billing Info</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Past Charges</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Add a Vehicle</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Rate a Station</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Statistics</a>
            </li>
          </ul>
        </div>
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
        name: 'Home',
        data() {
            return {};
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
  font-size: 34px;
  text-align: left;
}

h2 {
  font-size: 22px;
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
