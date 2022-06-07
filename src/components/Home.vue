<script setup>
import { ref, onMounted } from "vue";
import router from "../router";
import { useAuthStore, useGeneralStore } from "../store";
import { useQuasar } from "quasar";

const $q = useQuasar();
const generalStore = useGeneralStore();
const authStore = useAuthStore();

let visible = ref(false);
let editVisible = ref(false);
let loading = ref(false);
let confirmDelete = ref(false);
const loginForm = ref(null);
const editForm = ref(null);

let titleRules = ref([
  (val) => (val !== null && val !== "") || "Please enter a title",
  (val) => val.length >= 3 || "Title must contain at least 3 characters",
]);

function onSubmit() {
  loginForm.value.validate();
  generalStore.createProject();
  generalStore.createProjectTitle = "";
}
function editSubmit() {
  editForm.value.validate();
  generalStore.editProject(generalStore.currentProject.id);
  generalStore.editProjectTitle = "";
  generalStore.createProjectTitle = "";
}
function confirmDeleteProject(project) {
  confirmDelete.value = true;
  generalStore.deleteID = project.id;
}
function deleteProject() {
  generalStore.deleteProject(generalStore.deleteID);
}
function editEvent(project) {
  generalStore.currentProject = project;
  generalStore.createProjectTitle = project.title;
  generalStore.editProjectTitle = project.title;

  if (editVisible.value === true) {
    visible.value = false;
  } else {
    editVisible.value = !editVisible.value;
    visible.value = false;
  }
}
function toBugs(project) {
  generalStore.currentProject = project;
  generalStore.getBugs(project.id);
  router.push("/bugs");
}
onMounted(() => {
  generalStore.getProjects();
});
</script>
<template>
  <q-layout class="page">
    <q-dialog v-model="confirmDelete" persistent>
      <q-card>
        <q-card-section class="row items-center justify-center">
          <q-icon name="warning" size="xl"></q-icon>
        </q-card-section>
        <q-card-section
          >Are you sure you want to delete this project?</q-card-section
        >

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="" v-close-popup />
          <q-btn
            @click="deleteProject"
            label="Delete"
            color="red"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <q-page-container>
      <q-page>
        <div class="q-pa-md">
          <div class="row">
            <div class="col-md-2 col-xs-1"></div>
            <!--MAIN COLUMN-->
            <div class="col-md-8 col-xs-10">
              <!--HEADER ROW-->
              <div class="row header items-center justify-center">
                <h4>projects/</h4>
              </div>
              <div class="row items-center justify-center">
                <div class="col-6">
                  {{ generalStore.projects.length }} projects
                </div>

                <div class="col-6">
                  <q-btn
                    style="letter-spacing: 1px"
                    class="toolbarAdd"
                    flat
                    :icon="!visible ? 'add' : 'arrow_upward'"
                    @click="
                      visible = !visible;
                      editVisible = false;
                      generalStore.createProjectTitle = '';
                    "
                    >add project</q-btn
                  >
                </div>
              </div>
              <q-separator spaced></q-separator>
              <!--PROJECT GRID-->

              <div class="row">
                <div class="col-md-6"></div>
                <div class="col-md-12 col-xs-12">
                  <!--ADD PROJECT DRAWER-->

                  <q-slide-transition>
                    <div v-show="visible">
                      <q-form
                        ref="loginForm"
                        @submit.prevent.stop="onSubmit"
                        class="q-validation-component"
                      >
                        <div class="addprojectinput">
                          <q-input
                            color="black"
                            v-model="generalStore.createProjectTitle"
                            filled
                            type="text"
                            label="Project title"
                            :rules="titleRules"
                          />
                        </div>
                        <div class="addprojectinput">
                          <q-btn
                            type="submit"
                            class="addprojectbtn"
                            label="Add project"
                            style="margin-bottom: 1em"
                          /><q-separator spaced></q-separator>
                        </div>
                      </q-form>
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
                            [ EDIT ] >> {{ generalStore.createProjectTitle }}
                          </div>
                          <q-input
                            color="black"
                            v-model="generalStore.editProjectTitle"
                            filled
                            type="text"
                            label="New title"
                            :rules="titleRules"
                          />
                        </div>
                        <div class="addprojectinput">
                          <q-btn
                            @click="editVisible = !editVisible"
                            type="submit"
                            class="addprojectbtn"
                            label="Edit title"
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
                <transition-group name="list">
                  <div
                    v-for="project in generalStore.projects"
                    v-bind:key="project.id"
                    class="col-md-3 col-xs-6"
                  >
                    <q-slide-transition appear :duration="1000">
                      <q-card class="projectcard text-white">
                        <q-card-section transition-show="jump-down">
                          <div
                            class="row items-center justify-center"
                            @click="toBugs(project)"
                          >
                            <div class="projectTitle">{{ project.title }}</div>
                          </div>
                        </q-card-section>

                        <q-card-actions>
                          <q-btn
                            flat
                            color="white"
                            icon="edit"
                            @click="editEvent(project)"
                          ></q-btn>
                          <q-space></q-space>
                          <q-btn
                            flat
                            color="white"
                            icon="delete"
                            @click="confirmDeleteProject(project)"
                          ></q-btn>
                        </q-card-actions> </q-card
                    ></q-slide-transition>
                  </div>
                </transition-group>
              </div>

              <!--FLOATING ACTION BUTTONS-->
              <q-page-sticky position="bottom-left" :offset="[18, 18]">
                <q-btn to="/" fab icon="logout" class="addfab"
                  ><q-tooltip> Sign out </q-tooltip></q-btn
                >
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
                  visible="!visible;"
                  addButtonIcon="!addButtonIcon;"
                  ><q-tooltip> Add project </q-tooltip></q-btn
                >
              </q-page-sticky>
            </div>
            <div class="col-md-2 col-xs-1"></div>
          </div></div></q-page></q-page-container
  ></q-layout>
</template>
<style lang="sass" scoped>
.page
  background-color: #D9D9D9
  height: 100%
.projectcard
  cursor: pointer
  background-color: #F99A9C//#fbb7b8//#F76F72
  margin: 10px
  color: white!important
  transition: all .1s ease-in-out
  &:hover
    transform: scale(1.1)
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
  letter-spacing: 1px
  color: #FFFFFF!important
  background-color: #676767
  font-family: 'Anek Malayalam', sans-serif
.projectTitle
  min-height: 75px
  font-size: 1.1em
  letter-spacing: .5px

@keyframes cursor-blink
  0%
    opacity: 0

.list-enter-active,
.list-leave-active
  transition: all 0.5s ease

.list-enter-from,
.list-leave-to
  opacity: 0
  transform: translateX(30px)
</style>
