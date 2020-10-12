import Vue from 'vue'
import Vuex from 'vuex'

// Getters, Mutations & Actions
import * as state from './state'
import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

// Import Modules
import { journal } from './modules/journal'
import { indicators } from './modules/indicators'
import { starData } from './modules/starData'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,

  modules: {
    journal,
    indicators,
    starData
  }
})
