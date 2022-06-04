<script setup>
import { ref } from "vue";

const projects = ref([
  { title: "Lol", description: "Lollergoggles" },
  { title: "AGagg", description: "jgkgkgkgkgk" },
  { title: "srwtwtwt", description: "erteryeruerueru" },
  { title: "aseasese", description: "ssdfjdfjdfdfjjdf" },
  { title: "Lol", description: "Lollergoggles" },
  { title: "AGagg", description: "jgkgkgkgkgk" },
  { title: "srwtwtwt", description: "erteryeruerueru" },
  { title: "aseasese", description: "ssdfjdfjdfdfjjdf" },
  { title: "Lol", description: "Lollergoggles" },
  { title: "AGagg", description: "jgkgkgkgkgk" },
  { title: "srwtwtwt", description: "erteryeruerueru" },
  { title: "aseasese", description: "ssdfjdfjdfdfjjdf" },
  { title: "AGagg", description: "jgkgkgkgkgk" },
  { title: "srwtwtwt", description: "erteryeruerueru" },
  { title: "aseasese", description: "ssdfjdfjdfdfjjdf" },
]);
</script>
<template>
  <div class="q-pa-md page">
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8">
        <div class="header"><h4>Projects</h4></div>
        <div class="row">
          <div
            v-for="project in projects"
            v-bind:key="project"
            class="col-md-3 col-xs-6"
          >
            <q-card class="projectcard text-white">
              <q-card-section style="background-color: #fbb7b8 !important">
                <div class="text-h6">{{ project.title }}</div>
              </q-card-section>

              <q-card-section style="background-color: #fbb7b8 !important">
                {{ project.description }}
              </q-card-section>

              <q-separator dark />

              <q-card-actions>
                <q-btn flat>Open</q-btn>
                <q-space></q-space>
                <q-btn flat>Delete</q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.page
    background-color: #D9D9D9
.projectcard
    background-color: #F76F72
    margin: 10px
    color: black!important
    &:hover
        color: yellow
</style>
