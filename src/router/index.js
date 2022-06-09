import * as VueRouter from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router'
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Home from "../components/Home.vue";
import Bugs from "../components/Bugs.vue";

import { check } from 'prettier'
import { useAuthStore } from '../store'


const routes = [
  { path: '/', component: Login },
	{ path: '/register', component: Register },
  {
    path: '/home', component: Home,
    meta: {
			requiresAuth: true,
		}, },
  {
    path: '/bugs', component: Bugs,
    meta: {
			requiresAuth: true,
		}, },
]

const router = VueRouter.createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: VueRouter.createWebHashHistory(),
  routes, // short for `routes: routes`
})

router.beforeEach((to) => {
    const store = useAuthStore()
    if (to.meta.requiresAuth && !store.token) return '/'
})

export default router
