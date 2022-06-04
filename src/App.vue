<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
</script>

<template>
  <router-view></router-view>
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Anek+Malayalam:wght@400&display=swap')
#app
  font-family: 'Anek Malayalam', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
</style>
