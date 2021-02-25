<template>
  <p> Logging you out...</p>
</template>

<script>
  export default {
    data() {
      return {
        name: null,
        password: null
      }
    },
    methods:{
      logout: function(){
        this.$store.dispatch('logout')
        .then(()=>{
          this.$router.push('/login')
        });
      }
    },
    beforeMount(){ this.logout() },
}
</script>

<style>
  p {
    font-family: 'Nunito', sans-serif;
    color: #2c3e50;
  }
</style>
