import httpClient from '@/api/HttpClient'

export default {
    namespaced: true,
    state: {
        employees: []
    },
    getters: {
        getEmployees(state) {
            return state.employees
        }
    },
    actions: {
        get({
            commit
        }) {
            return httpClient.get(`/employees/employees`)
        },
        patch({
            commit
        }, payload) {
            return httpClient.patch(`/employees/employees/${payload.id_user}`, payload)
        },
        save({
            commit
        }, payload) {
            return httpClient.post(`/employees/employees/`, payload)
        }
    },
    mutations: {
        SET_EMPLOYEES(state, payload) {
            state.employees = payload
        }
    }
}