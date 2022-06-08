<script setup>
import { ref } from "vue";
import axios from "axios";
import router from "../router";
import { useQuasar } from "quasar";

let username = ref("");
let password = ref("");
let repeatPassword = ref("");
let isPwd = ref(true);
let loading = ref(false);

const loginForm = ref(null);
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
  (val) => val === password.value || "Passwords don't match",
]);

function onSubmit() {
  loginForm.value.validate();
  createAccount();
}

function createAccount() {
  loading.value = true;

  axios
    .post("register", {
      username: username.value,
      password: password.value,
    })
    .then(function (response) {
      loading.value = false;

      router.push("/");
      $q.notify({
        type: "positive",
        message: "Account successfully created, please login.",
      });
    })
    .catch(function (error) {
      loading.value = false;
      console.log(error);
      if (error.response.status === 400) {
        $q.notify({
          type: "negative",
          message: "Username taken, please try again.",
        });
      } else {
        $q.notify({
          type: "negative",
          message: "Account creation failed, please try again later.",
        });
      }
    });
}
</script>

<template>
  <div class="q-md">
    <div class="page row items-center">
      <div class="col-md-4 col-xs-12"></div>
      <div class="col-md-4 col-xs-12">
        <div class="row items-start justify-center absolute-top">
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
                type="username"
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
              <q-input
                color="black"
                v-model="repeatPassword"
                filled
                type="password"
                label="Repeat password"
                :rules="passwordRules"
                autocomplete="off"
              />
            </div>
            <div class="logininput">
              <q-btn
                :loading="loading"
                type="submit"
                class="registerbtn"
                color="#F76F72"
                label="Create account"
                style="letter-spacing: 2px"
              />
            </div>
            <div class="logininput">
              <q-btn
                to="/"
                outline
                class="registerbtn"
                color="black"
                label="Sign in"
                style="letter-spacing: 2px"
              /></div
          ></q-form>
        </div>
      </div>
      <div class="col-md-4 col-xs-12"></div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.page
  background-color: #D9D9D9
  height: 100vh
.logininput
  padding: 5px
  color: #F76F72 !important
.registerbtn
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
