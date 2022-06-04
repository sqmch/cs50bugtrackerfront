// FILE: main.js

import { createApp } from "vue";
import { Quasar } from "quasar";
// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import * as VueRouter from 'vue-router';
// Import Quasar css
import "quasar/src/css/index.sass";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";
import Home from "./components/Home.vue";


const routes = [
  { path: '/', component: Login },
	{ path: '/register', component: Register },
  { path: '/home', component: Home },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

const myApp = createApp(App);

myApp.use(Quasar, {
	plugins: {}, // import Quasar plugins and add here
}).use(router);

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
