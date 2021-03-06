<template>
  <div class = "main-div">
    <NavigationBar/>
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
  .main-div {
    max-width: 1500px;
    margin: 0 auto;
  }
</style>
