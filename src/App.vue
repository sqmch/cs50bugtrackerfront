<script setup>
import { useQuasar } from "quasar";
import Axios from "axios";

Axios.defaults.baseURL = import.meta.env.VITE_API_URL;
const q = useQuasar();
//q.dark.set(true);
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
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
::-webkit-scrollbar
  display: none

.fade-enter-active,
.fade-leave-active
  transition: opacity 0.2s ease

.fade-enter-from,
.fade-leave-to
  opacity: 0
</style>
