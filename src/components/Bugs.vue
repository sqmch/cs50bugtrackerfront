<script setup>
import { ref } from "vue";
const bugsdata = ref([
  { id: 1, title: "fix the front signup store", checked: false },
  { id: 2, title: "assemble the div from components", checked: false },
  { id: 3, title: "registration sometimes fails with 404", checked: false },
  { id: 4, title: "user bricked pc in shopping cart", checked: false },
  { id: 5, title: "Do stuff with the other framework", checked: false },
  { id: 6, title: "Integration tests fail", checked: false },
]);
const bugs = ref(bugsdata);
const hoveringDescription = ref(false);
const visible = ref(false);
const addButtonIcon = ref(true);
const title = ref("");
const checked = ref([]);
let difference = ref([]);
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
                <div>
                  <q-btn flat to="/home" icon="chevron_left" size="xl" />
                </div>
                <div><h4>myproject/bugs/</h4></div>
              </div>
              <div class="row items-center justify-center">
                <div class="col-6">{{ bugs.length - checked.length }} bugs</div>

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
                    >{{ addButtonIcon ? "add bug" : "close" }}</q-btn
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
                          label="Title"
                        />
                      </div>
                      <div class="addprojectinput">
                        <q-btn
                          class="addprojectbtn"
                          label="Add bug"
                          style="margin-bottom: 1em"
                        />
                      </div>
                    </div>
                  </q-slide-transition>
                </div>
                <!--BUG DATA LOOP-->
                <div
                  v-for="bug in bugs"
                  v-bind:key="bug"
                  class="col-md-12 col-xs-12"
                >
                  <q-card
                    v-if="!checked.includes(bug.title)"
                    class="projectcard"
                  >
                    <q-card-actions>
                      <div class="row">
                        <div class="bugCheckbox col">
                          <q-checkbox
                            size="xl"
                            v-model="checked"
                            :val="bug.title"
                            color="white"
                            @click="test1(bug)"
                          />
                        </div>
                        <q-separator spaced vertical inset></q-separator>
                        <div class="q-pa-md projectTitle">{{ bug.title }}</div>
                      </div>
                      <q-space></q-space>

                      <q-btn flat color="white" icon="delete"
                        ><q-tooltip> Delete bug </q-tooltip></q-btn
                      >
                    </q-card-actions>
                  </q-card>
                </div>

                <div class="qa-pa-md col-12">
                  <div class="row" style="margin-top: 3em">
                    <div class="col">{{ checked.length }} fixed</div>
                  </div>
                  <div class="col"><q-separator spaced></q-separator></div>
                </div>
                <div
                  v-for="check in checked"
                  v-bind:key="check"
                  class="col-md-12 col-xs-12 checkedList"
                >
                  <q-card class="projectcard">
                    <q-card-actions>
                      <div class="row items-center justify-center">
                        <div class="bugCheckbox">
                          <q-checkbox
                            size="xl"
                            v-model="checked"
                            :val="check"
                            color="white"
                            class="text-red"
                          />
                        </div>

                        <q-separator vertical inset></q-separator>
                        <div class="q-pa-md projectTitle">
                          {{ check }}
                        </div>
                      </div>
                      <q-space></q-space>

                      <q-btn flat color="white" icon="delete"
                        ><q-tooltip> Delete bug </q-tooltip></q-btn
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
          </div></div
      ></q-page>
    </q-page-container>
  </q-layout>
</template>
<style lang="sass" scoped>
.page
    background-color: #D9D9D9
    height: 100%

.projectcard
    cursor: pointer
    background-color: #f99a9c
    margin: 10px
    transition: all .2s ease-in-out
    &:hover
        transform: scale(1.03)
        background-color: #F76F72

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
    font-size: 1.1em
    letter-spacing: .5px
    color: white
.checkedList
    text-decoration: line-through
@keyframes cursor-blink
    0%
        opacity: 0
</style>
