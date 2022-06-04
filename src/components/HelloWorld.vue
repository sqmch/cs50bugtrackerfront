<script setup>
import { ref } from "vue";

defineProps({
  msg: String,
});

const count = ref(0);
</script>

<template>
  <div class="q-md">
    <div class="column items-center" style="height: 150px">
      <div class="col">One of three rows</div>
      <div class="col">One of three rows</div>
      <div class="col">One of three rows</div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.column > div

  padding: 10px 15px
  background: rgba(86, 61, 124, .15)
  border: 1px solid rgba(86, 61, 124, .2)
.doc-container > div + div
  margin-top: 1rem
.column
  height: 100vh
  background: rgba(255, 0, 0, .1)
</style>
