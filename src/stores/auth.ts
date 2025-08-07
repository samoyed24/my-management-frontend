import { defineStore } from "pinia";

export const useUserAuthStore = defineStore('user', {
    state: () => ({
        username: localStorage.getItem('username') || '',
        role: localStorage.getItem('role') || '',
    }),
    getters: {
        isLoggedIn: (state) => !!state.username,
    },
    actions: {
        setUser(data: UserStoreData) {
            this.username = data.username
            this.role = data.role
            localStorage.setItem('username', data.username)
            localStorage.setItem('role', data.role)
        },
        clearUser() {
            this.username = ''
            this.role = ''
            localStorage.removeItem('username')
            localStorage.removeItem('role')
        }
    }
})