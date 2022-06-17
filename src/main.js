// FILE: main.js

import { createApp } from "vue";
import { Quasar, Notify } from "quasar";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import router from "./router/index.js";
import axios from "axios"
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import App from "./App.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Home from "./components/Home.vue";
import Bugs from "./components/Bugs.vue";

axios.interceptors.response.use(
	function(response) {
		return response;
	},
	function(error) {
		router.push("/login");
		return Promise.reject(error);
	}
);


// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.

const myApp = createApp(App);

myApp.use(Quasar, {
	plugins: {Notify}, // import Quasar plugins and add here
}).use(router).use(createPinia());

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
