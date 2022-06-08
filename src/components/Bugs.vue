<script setup>
import { ref, onMounted } from "vue";
import router from "../router";
import { useAuthStore, useGeneralStore } from "../store";
import { useQuasar } from "quasar";

const $q = useQuasar();
const generalStore = useGeneralStore();
const authStore = useAuthStore();

let editVisible = ref(false);
let loading = ref(false);
let confirmDelete = ref(false);
const addbugForm = ref(null);
const editForm = ref(null);
const hoveringDescription = ref(false);
const visible = ref(false);
const addButtonIcon = ref(true);
const checked = ref([]);
let hoveringBug = ref(false);

let titleRules = ref([
  (val) => (val !== null && val !== "") || "Please enter a description",
  (val) => val.length >= 3 || "Description must contain at least 3 characters",
]);

function addSubmit() {
  addbugForm.value.validate();
  generalStore.createBug(generalStore.currentProject.id);
  generalStore.createBugTitle = "";
}
function editSubmit() {
  editForm.value.validate();
  generalStore.editBug(generalStore.currentBug);
  generalStore.editBugTitle = "";
  generalStore.createBugTitle = "";
}
function confirmDeleteBug(bug) {
  confirmDelete.value = true;
  generalStore.deleteID = bug.id;
}
function deleteBug() {
  generalStore.deleteBug(generalStore.deleteID);
}
function editEvent(bug) {
  editVisible.value = !editVisible.value;
  generalStore.currentBug = bug;
  generalStore.createBugTitle = bug.title;
  generalStore.editBugTitle = bug.title;

  if (editVisible.value === true) {
    visible.value = false;
  } else {
    editVisible.value = !editVisible.value;
    visible.value = false;
  }
}

onMounted(() => {});
</script>

<template>
  <q-layout class="page">
    <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center justify-center">
          <q-icon name="warning" size="xl"></q-icon>
        </q-card-section>
        <q-card-section
          >Are you sure you want to delete this bug?</q-card-section
        >

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="" v-close-popup />
          <q-btn @click="deleteBug" label="Delete" color="red" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
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
                <div class="col-6">
                  {{ generalStore.bugs.length - generalStore.checked.length }}
                  {{
                    generalStore.bugs.length - generalStore.checked.length === 1
                      ? "bug"
                      : "bugs"
                  }}
                </div>

                <div class="col-6">
                  <q-btn
                    style="letter-spacing: 1px"
                    class="toolbarAdd"
                    flat
                    :icon="addButtonIcon ? 'add' : 'arrow_upward'"
                    @click="
                      visible = !visible;
                      editVisible = false;
                      addButtonIcon = !addButtonIcon;
                    "
                    >{{ addButtonIcon ? "add bug" : "close" }}</q-btn
                  >
                </div>
              </div>
              <q-separator spaced></q-separator>
              <!--PROJECT GRID-->

              <div class="row items-center">
                <div class="col-6"></div>
                <div class="col-md-12 col-xs-12">
                  <!--ADD PROJECT DRAWER-->

                  <q-slide-transition>
                    <div v-show="visible">
                      <q-form
                        ref="addbugForm"
                        @submit.prevent.stop="addSubmit"
                        class="q-validation-component"
                      >
                        <div class="addprojectinput">
                          <q-input
                            color="black"
                            v-model="generalStore.createBugTitle"
                            filled
                            type="text"
                            label="Bug description"
                            :rules="titleRules"
                          />
                        </div>
                        <div class="addprojectinput">
                          <q-btn
                            type="submit"
                            class="addprojectbtn"
                            label="Add bug"
                            style="margin-bottom: 1em"
                          />
                          <q-separator spaced></q-separator></div
                      ></q-form>
                    </div>
                  </q-slide-transition>
                  <q-slide-transition>
                    <div v-show="editVisible">
                      <q-form
                        ref="editForm"
                        @submit.prevent.stop="editSubmit"
                        class="q-validation-component"
                      >
                        <div class="addprojectinput">
                          <div class="text-h6" style="margin-bottom: 20px">
                            [ EDIT ] >> {{ generalStore.createBugTitle }}
                          </div>
                          <q-input
                            color="black"
                            v-model="generalStore.editBugTitle"
                            filled
                            type="text"
                            label="New bug description"
                            :rules="titleRules"
                          />
                        </div>
                        <div class="addprojectinput">
                          <q-btn
                            @click="editVisible = !editVisible"
                            type="submit"
                            class="addprojectbtn"
                            label="Edit"
                            style="margin-bottom: 1em"
                          />

                          <q-btn
                            @click="editVisible = !editVisible"
                            flat
                            class="addprojectbtn"
                            label="Close"
                            style="margin-bottom: 1em"
                          /><q-separator spaced></q-separator>
                        </div>
                      </q-form>
                    </div>
                  </q-slide-transition>
                </div>
                <!--BUG DATA LOOP-->
                <transition-group name="list">
                  <div
                    v-for="bug in generalStore.bugs"
                    v-bind:key="bug.id"
                    class="col-md-12 col-xs-12"
                  >
                    <q-slide-transition appear :duration="1000">
                      <q-card
                        v-if="!generalStore.checked.includes(bug.id)"
                        class="projectcard"
                      >
                        <q-card-section>
                          <div class="row items-center">
                            <div class="bugCheckbox col-2">
                              <div class="row justify-center">
                                <q-checkbox
                                  @click="generalStore.checkBug(bug)"
                                  class="cbox"
                                  dark
                                  size="md"
                                  v-model="generalStore.checked"
                                  :val="bug.id"
                                  color="white"
                                />
                              </div>
                            </div>
                            <!--<q-separator inset vertical spaced></q-separator>-->
                            <div class="projectTitle col-8">
                              {{ bug.title }}
                            </div>

                            <q-space></q-space>
                            <div class="col-2">
                              <q-btn
                                size="md"
                                flat
                                color="white"
                                icon="edit"
                                @click="editEvent(bug)"
                              ></q-btn>
                              <q-btn
                                size="md"
                                flat
                                color="white"
                                icon="delete"
                                @click="confirmDeleteBug(bug)"
                              ></q-btn>
                            </div>
                          </div>
                        </q-card-section> </q-card
                    ></q-slide-transition>
                  </div>
                  <div class="qa-pa-md col-12">
                    <div class="row" style="margin-top: 3em">
                      <div class="col">
                        {{ generalStore.checked.length }} fixed
                      </div>
                    </div>
                    <div class="col"><q-separator spaced></q-separator></div>
                  </div>
                  <div
                    v-for="bug in generalStore.bugs"
                    v-bind:key="bug.id"
                    class="col-md-12 col-xs-12"
                  >
                    <q-slide-transition appear :duration="1000">
                      <q-card
                        class="projectcard"
                        v-if="generalStore.checked.includes(bug.id)"
                        style="background-color: #676767 !important"
                      >
                        <q-card-section>
                          <q-skeleton v-if="false" :animation="wave" />
                          <div class="row items-center">
                            <div class="bugCheckbox col-2">
                              <div class="row justify-center">
                                <q-checkbox
                                  @click="generalStore.unCheckBug(bug)"
                                  dark
                                  size="md"
                                  v-model="generalStore.checked"
                                  :val="bug.id"
                                  color="black"
                                  class="cbox"
                                />
                              </div>
                            </div>
                            <!--<q-separator inset vertical spaced></q-separator>-->
                            <div class="projectTitle col-8 checkedList">
                              {{ bug.title }}
                            </div>
                            <q-space></q-space>
                            <div class="col-2">
                              <q-btn
                                size="md"
                                flat
                                color="white"
                                icon="edit"
                                @click="editEvent(bug)"
                              ></q-btn>
                              <q-btn
                                size="md"
                                flat
                                color="white"
                                icon="delete"
                                @click="confirmDeleteBug(bug)"
                              ></q-btn>
                            </div>
                          </div>
                        </q-card-section>
                        <q-slide-transition>
                          <q-card-actions></q-card-actions> </q-slide-transition></q-card
                    ></q-slide-transition>
                  </div>
                </transition-group>
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
  transform: scale(0.95)
  background-color: #DE6366//#8d8d8d//#f99a9c
  transition: all .1s ease-in-out
  &:hover
    transform: scale(0.99)
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
  background-color: #676767
  font-family: 'Anek Malayalam', sans-serif
.projectTitle
  font-size: 1em
  letter-spacing: .5px
  color: white
.checkedList
  text-decoration: line-through
@keyframes cursor-blink
  0%
    opacity: 0
.cbox:hover
  transition: all .2s ease-in-out
  transform: scale(1.2)

.list-enter-active,
.list-leave-active
  transition: all 0.5s ease

.list-enter-from,
.list-leave-to
  opacity: 0
  transform: translateX(30px)
</style>
