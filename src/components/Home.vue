<script setup>
import { ref } from "vue";

const lorem = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
);
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
  <div class="q-pa-md">
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
              <q-card-section>
                <div class="text-h6">{{ project.title }}</div>
              </q-card-section>

              <q-card-section>
                {{ project.description }}
              </q-card-section>

              <q-separator dark />

              <q-card-actions>
                <q-btn flat>Open</q-btn>
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
.projectcard
    background-color: #F76F72
    margin: 10px
    &:hover
        color: yellow
</style>
