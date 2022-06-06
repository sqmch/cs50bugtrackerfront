<script setup>
import { ref } from "vue";

defineProps({});

const count = ref(0);
</script>

<template>
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
          <div class="logininput">
            <q-input
              color="black"
              v-model="email"
              filled
              type="email"
              label="Email"
            />
          </div>
          <div class="logininput">
            <q-input
              color="black"
              v-model="password"
              filled
              type="password"
              label="Password"
            />
          </div>
          <div class="logininput">
            <q-input
              color="black"
              v-model="repeatPassword"
              filled
              type="password"
              label="Repeat password"
            />
          </div>
          <div class="logininput">
            <q-btn
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
            />
          </div>
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
  padding: 10px
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
