/*
    [indicators.js]
    - Independent state management module for indicators

    Namespaced is TRUE:
    • getters    ==>  this.$store.getters['indicators/example']
    • actions    ==>  dispatch('indicators/example')
    • mutations  ==>  commit('indicators/example')

    Contents:
    • 1. State
    • 2. Getters
    • 3. Mutations
    • 4. Actions

*/

export const indicators = {
  namespaced: true,

  // (1). State
  state: {
    data: [],
    keys: [],
    currentShipType: '',
    currentDocked: '',
    currentSupercruise: '',
    currentWing: false,
    currentLanded: false,
    eliteRunning: false
  },

  // (2). Getters
  getters: {
    RETRIEVE: state => {
      return state.data
    },
    CURRENT_SHIP_TYPE: state => {
      return state.currentShipType
    },
    CURRENT_DOCKED: state => {
      return state.currentDocked
    },
    CURRENT_SUPERCRUISE: state => {
      return state.currentSupercruise
    },
    CURRENT_WING: state => {
      return state.currentWing
    },
    CURRENT_LANDED: state => {
      return state.currentLanded
    },
    CURRENT_RUNNING: state => {
      return state.eliteRunning
    }
  },

  // (3). Mutations
  mutations: {
    resetState: (state) => {
      state.data = []
      state.keys = []
      state.currentShipType = ''
      state.currentDocked = ''
      state.currentSupercruise = ''
      state.currentWing = ''
      state.currentLanded = ''
      state.eliteRunning = false
    },
    setShipType: (state, payload) => {
      state.currentShipType = payload
    },
    setCurrentDock: (state, payload) => {
      state.currentDocked = payload
    },
    setCurrentSupercruise: (state, payload) => {
      state.currentSupercruise = payload
    },
    setCurrentWing: (state, payload) => {
      state.currentWing = payload
    },
    setCurrentLanded: (state, payload) => {
      state.currentLanded = payload
    },
    setRunningState: (state, payload) => {
      state.eliteRunning = payload
    }
  },

  // (4). Actions
  actions: {
    CLEAR: ({commit}) => {
      commit('resetState')
    },
    SET_SHIP_TYPE: ({commit}, payload) => {
      commit('setShipType', payload)
    },
    SET_CURRENT_DOCK: ({commit}, payload) => {
      commit('setCurrentDock', payload)
    },
    SET_CURRENT_SUPERCRUISE: ({commit}, payload) => {
      commit('setCurrentSupercruise', payload)
    },
    SET_CURRENT_WING: ({commit}, payload) => {
      commit('setCurrentWing', payload)
    },
    SET_CURRENT_LANDED: ({commit}, payload) => {
      commit('setCurrentLanded', payload)
    },
    SET_RUNNING_STATE: ({commit}, payload) => {
      commit('setRunningState', payload)
    }
  }
}
