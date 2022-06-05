import * as VueRouter from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router'
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Home from "../components/Home.vue";
import Bugs from "../components/Bugs.vue";


const routes = [
  { path: '/', component: Login },
	{ path: '/register', component: Register },
  { path: '/home', component: Home },
  { path: '/bugs', component: Bugs },
]

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})
export default router
