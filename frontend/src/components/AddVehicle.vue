<template>
  <div>
    <NavigationBar/>
    <div class="addcar_form">
      <h3> Add a new vehicle to your account: </h3>
      <form @submit.prevent = "addVehicle">
        <div class="form-group">
          <label for="reg_plate">Registration Plate</label>
          <input required v-model = "reg_plate" type="text" class="form-control" placeholder="Enter registration plate">
        </div>
        <div class="form-group">
          <label for="manufacturer">Manufacturer</label>
          <input required v-model = "manufacturer" type="text" class="form-control" placeholder="Enter manufacturer">
        </div>
        <div class="form-group">
          <label for="model_info">Model Info</label>
          <input required v-model = "model_info" type="text" class="form-control" placeholder="Enter model info">
        </div>
        <div class = "addcar_button">
          <button type="submit" class="btn btn-dark btn-block"> Add </button>
        </div>
      </form>
      <div class = "image_addcar"> </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs';
import NavigationBar from './NavigationBar.vue'
  export default {
    components: {
      NavigationBar
    },
    data(){
      return {
        form: {
          reg_plate: null,
          manufacturer: null,
          model_info: null
        }
      }
    },
    methods: {
      addVehicle() {
        this.$axios.post('/vehicle', qs.stringify(
          {
            reg_plate: this.form.reg_plate,
            manufacturer: this.form.manufacturer,
            model_info: this.form.model_info
          }
        )
        ).then(() => {
            this.$router.push('/Home')
        }).catch(err => console.log(err))
      }
    }
}
</script>

<style>
  .addcar_form {
    width: 40%;
    margin-top: 100px;
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
   width: 180px;
   height: 130px;
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
  h3 {
    text-align: center;
    font-size: 20px;
    margin-bottom: 20px;
  }
</style>
