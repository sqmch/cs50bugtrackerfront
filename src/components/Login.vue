<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "../router";
import { useAuthStore } from "../store";
import { useQuasar } from "quasar";

let username = ref("");
let password = ref("");
let token = ref("");
let isPwd = ref(true);

const loginForm = ref(null);
const authStore = useAuthStore();

const $q = useQuasar();

let usernameRules = ref([
  (val) => (val !== null && val !== "") || "Please enter an username",
  (val) => val.length >= 3 || "Username must contain at least 3 characters",
  (val) =>
    val.match(/^[0-9a-zA-Z]+$/) || "Special characters not allowed in username",
]);
let passwordRules = ref([
  (val) => !!val || "Please enter a password",
  (val) => val.length >= 6 || "Password must contain at least 6 characters",
]);
let loading = ref(false);

function onSubmit() {
  loginForm.value.validate();
  login();
}

function login() {
  loading.value = true;
  axios
    .post("login", {
      username: username.value,
      password: password.value,
    })
    .then(function (response) {
      console.log(response.data);
      loading.value = false;
      authStore.setToken(response.data.token);
      authStore.setUserId(response.data.user_id);
      authStore.setUserName(username.value);
      router.push("home");
    })
    .catch(function (error) {
      loading.value = false;
      console.log(error);
      $q.notify({
        type: "negative",
        message: "Login failed, please check your username and/or password.",
      });
    });
}
</script>

<template>
  <q-layout class="page">
    <q-page-container>
      <q-page>
        <div class="q-md">
          <div class="page row items-center">
            <div class="col-md-4 col-xs-12"></div>
            <div class="col-md-4 col-xs-12">
              <div
                class="row items-start justify-center absolute-top"
                style="margin-top: 10vh"
              >
                <div class="logotext">
                  <h4>bugtrvcker</h4>
                </div>
              </div>
              <div class="row items-center justify-center"></div>
              <div>
                <q-form
                  ref="loginForm"
                  @submit.prevent.stop="onSubmit"
                  class="q-gutter-md q-validation-component"
                >
                  <div class="logininput">
                    <q-input
                      color="black"
                      v-model="username"
                      filled
                      type="text"
                      label="Username"
                      :rules="usernameRules"
                      autocomplete="on"
                    />
                  </div>
                  <div class="logininput">
                    <q-input
                      color="black"
                      v-model="password"
                      filled
                      type="password"
                      label="Password"
                      :rules="passwordRules"
                      autocomplete="current-password"
                    />
                  </div>
                  <div class="logininput">
                    <q-btn
                      :loading="loading"
                      type="submit"
                      class="loginbtn"
                      label="Sign in"
                      style="letter-spacing: 2px"
                    />
                  </div>
                  <div class="logininput">
                    <q-btn
                      to="/register"
                      outline
                      class="loginbtn"
                      color="black"
                      label="Create account"
                      style="letter-spacing: 2px"
                    /></div
                ></q-form>
              </div>
            </div>
            <div class="col-md-4 col-xs-12"></div>
          </div></div></q-page></q-page-container
  ></q-layout>
</template>

<style lang="sass" scoped>
.page
  background-color: #D9D9D9
  height: 100vh
.logininput
  padding: 10px
  color: #F76F72 !important

.loginbtn
  width: 100%
  height: 3em
  color: #FFFFFF
  background-color: #F76F72
  font-family: 'Anek Malayalam', sans-serif
.loginlogo
  margin-bottom: 50px
.logotext
  color: #F76F72
  font-family: 'Anek Malayalam', sans-serif
.logotext h4::after
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
