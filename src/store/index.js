import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import axios from 'axios'
import router from '../router'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: useStorage('token', null),
            user: null,
            user_id: useStorage('user_id', null),
        }
    },
    actions: {
        setToken(token) {
            this.token = token
        },
        setUserId(user_id) {
            this.user_id = user_id
        },
        setUserName(username) {
            this.user = username
        }

    }
})
export const useGeneralStore = defineStore('general', {
    state: () => {
        return {
            projects: [],
            bugs: [],
            createProjectTitle: "",
            createBugTitle: "",
            editProjectTitle: "",
            editBugTitle: "",
            currentProjectTitle: "",
            currentBugTitle: "",
            editedBugID: null,
            editedProjectID: null,
            deleteID: null,
            currentProject: null,
            currentBug: null,
            isFixed: false
        }
    },
    getters: {},
    actions: {
        // PROJECTS
        ///////////
        getProjects() {
            const authStore = useAuthStore()
            axios
                .get(`users/${authStore.user_id}/projects`, {
                    headers: { Authorization: 'Bearer ' + authStore.token },
                })
                .then((response) => {
                    this.projects = response.data
                })

        },
        createProject() {
            const authStore = useAuthStore()
            axios
                .post(
                    `users/${authStore.user_id}/projects`,
                    {
                        user_id: authStore.user_id,
                        title: this.createProjectTitle,
                    },
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.getProjects()
                    this.createProjectTitle = ''
                })
        },
        editProject(project_id) {
            const authStore = useAuthStore()
            axios
                .put(
                    `users/${authStore.user_id}/projects/${project_id}`,
                    {
                        user_id: authStore.user_id,
                        title: this.editProjectTitle,
                    },
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.getProjects()
                })
        },
        deleteProject(project_id) {
            const authStore = useAuthStore()

            axios
                .delete(`users/${authStore.user_id}/projects/${project_id}`, {
                    headers: { Authorization: 'Bearer ' + authStore.token },
                })
                .then((response) => {
                    this.getProjects()

                })
        },
        // BUGS
        ///////
        getBugs(project_id) {
            const authStore = useAuthStore()
            axios
                .get(
                    `users/${authStore.user_id}/projects/${project_id}/bugs`,
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.bugs = response.data
                })
        },
        createBug(project_id) {
            const authStore = useAuthStore()

            axios
                .post(
                    `users/${authStore.user_id}/projects/${project_id}/bugs`,
                    {
                        owner_id:  project_id,
                        title: this.createBugTitle,
                        fixed: false
                    },
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.getBugs(project_id)
                    this.createBugTitle = ''
                })
        },

        editBug(bug_id) {
            const authStore = useAuthStore()

            axios
                .put(
                    `users/${authStore.user_id}/projects/${this.currentProject.id}/bugs/${bug_id}`,
                    {
                        project_id: this.currentProject.id,
                        title: this.editBugTitle,
                        fixed: this.isFixed
                    },
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.getBugs(this.currentProject.id)
                    this.createBugTitle = ''
                })
        },
        deleteBug(bug_id) {
            const authStore = useAuthStore()
            axios
                .delete(
                    `users/${authStore.user_id}/projects/${this.currentProject.id}/bugs/${bug_id}`,
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.getBugs(this.currentProject.id)
                })
        },
    }
})
