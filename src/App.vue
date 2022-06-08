<script setup>
import { useQuasar } from "quasar";
import Axios from "axios";

Axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const q = useQuasar();
//q.dark.set(true);
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="slide-fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Anek+Malayalam:wght@400&display=swap')
#app
  font-family: 'Anek Malayalam', sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  background-color: #D9D9D9
::-webkit-scrollbar
  display: none
.slide-fade-enter-active
  transition: all .4s ease-in

.slide-fade-leave-active
  transition: all .3s cubic-bezier(.6, .9, .2,.9)

.slide-fade-enter-from,
.slide-fade-leave-to
  transform: translateX(-2000px)
</style>
