<script setup>
import { ref } from "vue";

const projects = ref([
  { title: "Lol", description: "Lollergoggles" },
  { title: "AGagg", description: "jgkgkgkgkgk" },
  { title: "srwtwtwt", description: "" },
  { title: "aseasese", description: "ssdfjdfjdfdfjjdf" },
  { title: "Lol", description: "Lollergoggles" },
  { title: "AGagg", description: "jgkgkgkgkgk" },
  { title: "srwtwtwt", description: "erteryeruerueru" },
  { title: "aseasese", description: "" },
  { title: "Lol", description: "" },
  { title: "AGagg", description: "jgkgkgkgkgk" },
  { title: "srwtwtwt", description: "erteryeruerueru" },
  { title: "aseasese", description: "ssdfjdfjdfdfjjdf" },
  { title: "AGagg", description: "" },
  { title: "srwtwtwt", description: "erteryeruerueru" },
  { title: "aseasese", description: "ssdfjdfjdfdfjjdf" },
]);
const hoveringDescription = ref(false);
</script>
<template>
  <q-layout>
    <q-page-container>
      <q-page>
        <div class="q-pa-md page">
          <div class="row">
            <div class="col-md-2"></div>
            <div class="col-md-8">
              <div class="row header items-center justify-center">
                <h4>projects</h4>
              </div>
              <div class="row items-center justify-center">
                <div class="col-6">{{ projects.length }} projects</div>

                <div class="col-6">
                  <q-btn class="toolbarAdd" flat icon="add">add project</q-btn>
                </div>
              </div>
              <q-separator spaced></q-separator>
              <div class="row">
                <div
                  v-for="project in projects"
                  v-bind:key="project"
                  class="col-md-3 col-xs-6"
                >
                  <q-card class="projectcard text-white">
                    <q-card-section
                      style="background-color: #fbb7b8 !important"
                    >
                      <div class="text-h6">{{ project.title }}</div>
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
              <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-btn fab icon="add" class="addfab" />
              </q-page-sticky>
            </div>
            <div class="col-md-2"></div>
          </div></div></q-page></q-page-container
  ></q-layout>
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
.addfab
  background-color: white
  height: 60px
  width: 60px
.header
  color: #F76F72
  font-family: 'Anek Malayalam', sans-serif
.toolbarAdd
  width: 100%

.header h4::after
  content: ""
  width: 10px
  height: 2px
  background: #F76F72
  display: inline-block
  animation: cursor-blink 1.2s steps(2) infinite

@keyframes cursor-blink
  0%
    opacity: 0
</style>
