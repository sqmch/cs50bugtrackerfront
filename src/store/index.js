import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import axios from 'axios'
import router from '../router'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            token: useStorage('token', null),
            user: null,
            user_id: null,
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
            currentBugTitle: "",
            editedBugID: null,
            editedProjectID: null
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
                .then( (response) => {
                    this.getProjects()
                    this.createProjectTitle = ''
                    this.createdRoutineID = response.data.id
                })
        },
        editProject(project_id) {
            const authStore = useAuthStore()
            axios
                .put(
                    `users/${authStore.user_id}/projects/${project_id}`,
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
                    },
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.getExercises(project_id)
                    this.createBugTitle = ''
                })
        },

        editBug() {
            const authStore = useAuthStore()

            axios
                .put(
                    `users/${authStore.user_id}/projects/${this.editedProjectID}/bugs/${this.editedBugID}`,
                    {
                        current_title: this.currentBugTitle,
                        title: this.createBugTitle,
                    },
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.getBugs(this.editedProjectID)
                    this.createBugTitle = ''
                })
        },
        deleteExercise() {
            const authStore = useAuthStore()
            axios
                .delete(
                    `users/${authStore.user_id}/projects/${this.editedProjectID}/bugs/${this.editedBugID}`,
                    {
                        headers: { Authorization: 'Bearer ' + authStore.token },
                    }
                )
                .then((response) => {
                    this.getBugs(this.editedProjectID)
                })
        },
    }
})
