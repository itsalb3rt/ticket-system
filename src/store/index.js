import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/Auth'
import snackbar from './modules/Snackbar'
import tickets from './modules/Tickets'
import employees from './modules/Employees'
import notes from './modules/Notes'
import reports from './modules/Reports'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    snackbar,
    tickets,
    employees,
    notes,
    reports
  }
})