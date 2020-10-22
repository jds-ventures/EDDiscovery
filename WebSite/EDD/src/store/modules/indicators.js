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

import actions from './indicators/actions'
import statuses from './indicators/statuses'

export const indicators = {
  namespaced: true,

  // (1). State
  state: {
    status: [],
    statusOther: [],
    actions: [],
    currentShipType: '',
    currentDocked: '',
    currentSupercruise: '',
    currentWing: false,
    currentLanded: false,
    eliteRunning: false
  },

  // (2). Getters
  getters: {
    RETRIEVE_STATUS: state => {
      return state.status
    },
    RETRIEVE_STATUS_OTHER: state => {
      return state.statusOther
    },
    RETRIEVE_ACTIONS: state => {
      return state.actions
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
      state.status = []
      state.statusOther = []
      state.actions = []
      state.currentShipType = ''
      state.currentDocked = ''
      state.currentSupercruise = ''
      state.currentWing = ''
      state.currentLanded = ''
      state.eliteRunning = null
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
    },
    updateActionStatus: (state, payload) => {
      state.actions = payload
    },
    createIndicator: (state, payload) => {
      if (payload.active === false) return

      let obj = {
        src: 'http://192.168.0.15:6502/statusicons/' + payload.title + '.png',
        alt: payload.title,
        tooltip: payload.tooltip,
        enable: payload.enableIt
      }

      state.status.push(obj)
    },
    createAction: (state, payload) => {
      if (payload.active === false) return

      let obj = {
        src: 'http://192.168.0.15:6502/statusicons/' + payload.title + '.png',
        alt: payload.title,
        tooltip: payload.tooltip,
        socketMsg: payload.socketMsg,
        enable: payload.enableIt,
        duration: payload.duration
      }

      state.actions.push(obj)
    }
  },

  // (4). Actions
  actions: {
    CLEAR: ({commit}) => {
      commit('resetState')
    },
    UPDATE_ACTION_STATUS: ({commit}, payload) => {
      commit('updateActionStatus', payload)
    },
    HANDLE_INDICATOR_MESSAGE: ({commit, dispatch, state}, payload) => {
      let guifocus = payload['GUIFocus']

      switch (guifocus) {
        case 'GalaxyMap':
          payload['GalaxyMapOpen'] = true
          break
        case 'SystemMap':
          payload['SystemMapOpen'] = true
          break
        default:
          break
      }

      let newshiptype = payload['ShipType']
      let newinwing = payload['InWing'] != null && payload['InWing'] === true
      let newsupercruise = payload['Supercruise'] != null && payload['Supercruise'] === true
      let newlanded = payload['Landed'] != null && payload['Landed'] === true
      let newdocked = payload['Docked'] != null && payload['Docked'] === true

      if (newshiptype !== state.currentShipType || newinwing !== state.currentWing || newsupercruise !== state.currentSupercruise || newlanded !== state.currentLanded || newdocked !== state.currentDocked) {
        commit('setShipType', newshiptype)
        commit('setCurrentWing', newinwing)
        commit('setCurrentSupercruise', newsupercruise)
        commit('setCurrentLanded', newlanded)
        commit('setCurrentDock', newdocked)
        dispatch('SETUP_INDICATORS', payload)
      }

      let counter = 0
      state.statusOther = []

      if (payload['LegalState'] != null) {
        state.statusOther.push({
          id: counter++,
          text: 'Legal State: ' + payload['LegalState']
        })
      }
      if (payload['Firegroup'] >= 0 && newshiptype === 'MainShip') {
        state.statusOther.push({
          id: counter++,
          text: 'Fire Group: ' + 'ABCDEFGHIJK'[payload['Firegroup']]
        })
      }
      if (payload['ValidPips']) {
        state.statusOther.push({
          id: counter++,
          text: 'Pips: ' + 'S:' + payload['Pips'][0] + ' E:' + payload['Pips'][1] + ' W:' + payload['Pips'][2]
        })
      }
      if (payload['ValidPosition']) {
        state.statusOther.push({
          id: counter++,
          text: 'Pos: ' + payload['Position'][0] + ', ' + payload['Position'][1]
        })
        if (payload['ValidAltitude']) {
          var alt = payload['Position'][2]
          if (alt > 5000) {
            state.statusOther.push({
              id: counter++,
              text: 'Alt: ' + (alt / 1000.0) + 'km'
            })
          } else {
            state.statusOther.push({
              id: counter++,
              text: 'Alt: ' + alt + 'm'
            })
          }
        }
        if (payload['ValidHeading']) {
          state.statusOther.push({
            id: counter++,
            text: 'Hdr: ' + payload['Position'][3]
          })
        }
      }
      if (payload['ValidPlanetRadius']) {
        state.statusOther.push({
          id: counter++,
          text: 'Radius: ' + payload['PlanetRadius'] / 1000.0 + 'km'
        })
      }
    },
    SETUP_INDICATORS: ({commit, state}, payload) => {
      const innormalspace = !state.currentLanded && !state.currentDocked && !state.currentSupercruise
      const notdockedlanded = !state.currentDocked && !state.currentLanded

      if (state.currentShipType !== 'None') {
        commit('setRunningState', true)

        // Cycle through all possible Indicator types for Current Ship Type and displays what is required
        statuses[state.currentShipType].forEach(status => {
          let isActive

          if (status.active === true) {
            isActive = true
          } else if (status.active === 'notdockedlanded') {
            isActive = notdockedlanded
          } else if (status.active === 'innormalspace') {
            isActive = innormalspace
          } else {
            isActive = payload[status.active]
          }

          commit('createIndicator', {
            title: status.title,
            enableIt: payload[status.title],
            tooltip: status.tooltip,
            active: isActive
          })
        })

        // Cycle through all possible Actions for Current Ship Type and displays what is required
        actions[state.currentShipType].forEach(status => {
          let isActive

          if (status.active === true) {
            isActive = true
          } else if (status.active === 'notdockedlanded') {
            isActive = notdockedlanded
          } else if (status.active === 'innormalspace') {
            isActive = innormalspace
          } else if (status.active === 'inwing') {
            isActive = payload.InWing
          } else if (status.active === 'insupercruise') {
            isActive = payload.Supercruise
          } else if (status.active === 'landed') {
            isActive = payload.Landed
          } else {
            isActive = payload[status.active]
          }

          let focus, enableIt

          // Handle Toggle for if Map is open
          if (status.title === 'SystemMap' || status.title === 'GalaxyMap') {
            focus = payload['GUIFocus']

            if (focus.contains('SystemMap')) {
              enableIt = true
            } else if (focus.contains('GalaxyMap')) {
              enableIt = true
            } else {
              enableIt = false
            }
          } else {
            enableIt = payload[status.title]
          }

          console.log(payload)

          commit('createAction', {
            title: status.title,
            enableIt: enableIt,
            tooltip: status.tooltip,
            socketMsg: status.socketMsg,
            active: isActive,
            duration: status.duration
          })
        })
      } else {
        commit('setRunningState', false)
      }
    }
  }
}
