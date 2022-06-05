<script setup>
import { ref } from "vue";
import router from "../router";
const projects = ref([
  { title: "wrkout", description: "Lollergoggles" },
  { title: "trvcker", description: "jgkgkgkgkgk" },
  { title: "rdb", description: "" },
  { title: "portfolio project", description: "ssdfjdfjdfdfjjdf" },
  { title: "treeclassifier", description: "Lollergoggles" },
  { title: "wschat", description: "jgkgkgkgkgk" },
  { title: "srwtwtwt", description: "erteryeruerueru" },
  { title: "aseasese", description: "" },
  { title: "Lol", description: "" },
  { title: "AGagg", description: "jgkgkgkgkgk" },
  { title: "srwtwtwt", description: "erteryeruerueru" },
  { title: "aseasese", description: "ssdfjdfjdfdfjjdf" },
  { title: "AGagg", description: "" },
  { title: "srwtwtwt", description: "erteryeruerueru" },
  { title: "aseasese", description: "ssdfjdfjdfdfjjdf" },
  { title: "wrkout", description: "Lollergoggles" },
  { title: "trvcker", description: "jgkgkgkgkgk" },
  { title: "rdb", description: "" },
  { title: "portfolio project", description: "ssdfjdfjdfdfjjdf" },
  { title: "treeclassifier", description: "Lollergoggles" },
  { title: "wschat", description: "jgkgkgkgkgk" },
]);
const hoveringDescription = ref(false);
const visible = ref(false);
const addButtonIcon = ref(true);
const title = ref("");
function test() {
  router.push("/bugs");
}
</script>
<template>
  <q-layout class="page">
    <q-page-container>
      <q-page>
        <div class="q-pa-md">
          <div class="row">
            <div class="col-md-2"></div>
            <!--MAIN COLUMN-->
            <div class="col-md-8">
              <!--HEADER ROW-->
              <div class="row header items-center justify-center">
                <h4>projects/</h4>
              </div>
              <div class="row items-center justify-center">
                <div class="col-6">{{ projects.length }} projects</div>

                <div class="col-6">
                  <q-btn
                    style="letter-spacing: 1px"
                    class="toolbarAdd"
                    flat
                    :icon="addButtonIcon ? 'add' : 'arrow_upward'"
                    @click="
                      visible = !visible;
                      addButtonIcon = !addButtonIcon;
                    "
                    >add project</q-btn
                  >
                </div>
              </div>
              <q-separator spaced></q-separator>
              <!--PROJECT GRID-->

              <div class="row">
                <div class="col-6"></div>
                <div class="col-md-12 col-xs-12">
                  <!--ADD PROJECT DRAWER-->

                  <q-slide-transition>
                    <div v-show="visible">
                      <div class="addprojectinput">
                        <q-input
                          color="black"
                          v-model="title"
                          filled
                          type="text"
                          label="Project title"
                        />
                      </div>
                      <div class="addprojectinput">
                        <q-btn class="addprojectbtn" label="Add project" />
                      </div>
                    </div>
                  </q-slide-transition>
                </div>
                <div
                  v-for="project in projects"
                  v-bind:key="project"
                  class="col-md-3 col-xs-6"
                >
                  <q-card class="projectcard text-white">
                    <q-card-section
                      transition-show="jump-down"
                      style="background-color: #fbb7b8 !important"
                    >
                      <div
                        class="row items-center justify-center"
                        @click="test"
                      >
                        <div class="projectTitle">{{ project.title }}</div>
                      </div>
                    </q-card-section>

                    <q-card-actions>
                      <q-btn icon="open_in_new" flat color="white">
                        <q-tooltip> Open project </q-tooltip></q-btn
                      >
                      <q-space></q-space>

                      <q-btn flat color="white" icon="delete"
                        ><q-tooltip> Delete project </q-tooltip></q-btn
                      >
                    </q-card-actions>
                  </q-card>
                </div>
              </div>
              <!--FLOATING ACTION BUTTONS-->
              <q-page-sticky position="bottom-left" :offset="[18, 18]">
                <q-btn to="/" fab icon="logout" class="addfab" />
              </q-page-sticky>
              <q-page-sticky position="bottom-right" :offset="[18, 18]">
                <q-btn
                  fab
                  icon="add"
                  class="addfab"
                  @click="
                    visible = !visible;
                    addButtonIcon = !addButtonIcon;
                  "
                />
              </q-page-sticky>
            </div>
            <div class="col-md-2"></div>
          </div></div></q-page></q-page-container
  ></q-layout>
</template>
<style lang="sass" scoped>
.page
  background-color: #D9D9D9
  height: 100%
.projectcard
  cursor: pointer
  background-color: #fbb7b8//#F76F72
  margin: 10px
  color: black!important
  transition: all .1s ease-in-out
  &:hover
    transform: scale(1.1)
.addfab
  background-color: #F76F72
  color: white
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
.addprojectinput
  padding: 10px
  color: #F76F72 !important
.addprojectbtn
  width: 100%
  height: 3em
  letter-spacing: 1px
  color: #FFFFFF!important
  background-color: #F76F72
  font-family: 'Anek Malayalam', sans-serif
.projectTitle
  font-size: 1.3em
  letter-spacing: .5px

@keyframes cursor-blink
  0%
    opacity: 0
</style>
